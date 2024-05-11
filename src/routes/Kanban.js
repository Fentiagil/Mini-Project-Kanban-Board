import React, { useState , useEffect } from 'react';
import axios from 'axios';
import '../assets/Kanban.css';
import '../App.css';
import ItemTask from './ItemTask';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import ModalAdd from './ModalAdd';
import ModalAddGroup from './ModalAddGroup';
import HeaderUtama from './HeaderUtama';

function Kanban() {
  // MENYIMPAN DATA TODOS DAN ITEMS
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [todoItems, setTodoItems] = useState([]);

  //TOKEN 
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjIsImV4cCI6MTcyNDA1NTcyMn0.obRPo6qN-JM8qjRPqG7jTs4wKddWNA7dmmLNBaaU3AA';

  // GET TODO ID DAN ITEM ID UNTUK CRUD
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // GET DATA NAME DAN PERCENTAGE DARI TASK
  const [selectedName, setSelectedName] = useState(null);
  const [selectedProgress, setSelectedProgress] = useState(null);

  // PENGATURAN WARNA KANBAN GROUP
  const colors = ["#01959F", "#FEEABC", " #F5B1B7", "#B8DBCA"];
  const bgColors= ['#F7FEFF', "#FFFCF5", "#FFFAFA", "#F8FBF9"];
  const fontColors = [" #01959F", "#FA9810", "#E11428", "#43936C"];
  const borderTextColors = ["#4DB5BC", "#FEEABC", "#F5B1B7", "#B8DBCA"];

  // DATA UNTUK MODAL ADD
  const [taskName, setTaskname] = useState('');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');

  // DATA UNTUK MODAL ADD GROUP
  const [showGroup, setShowGroup] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error2, setError2] = useState('');

  // MENAMPILKAN MODAL
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // HANDLE MODAL ADD GROUP
  const handleCloseGroup = () => setShowGroup(false);
  const handleShowGroup = () => setShowGroup(true);

  // HANDLE SUBMIT NEW GROUP
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://todo-api-18-140-52-65.rakamin.com/todos',
        { title, description },
        { headers: { Authorization: `Bearer ${token}`} }
      );
      console.log('Group added successfully:', response.data);
      handleCloseGroup();
      fetchData();
    } catch (error) {
      console.error('Error adding group:', error2);
      setError2('Error adding group. Please try again later.');
    }
  };

  // HANDLE MODAL ADD TASK
  const handleClose = () => setShow(false);
  const handleShow = (todo) => {
    setTaskname('');
    setProgress('');
    setShow(true);
    setTodo(todo);
  };

  // HANDLE MODAL DELETE TASK
  const handleCloseDel = () => setShowDelete(false);
  const handleShowDel = (todoId, itemId) => {
    setSelectedTodoId(todoId);
    setSelectedItemId(itemId);
    setShowDelete(true);
  };

  // HANDLE MODAL EDIT TASK
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (Name, Persen, todoId, itemId) => {
    setSelectedTodoId(todoId);
    setSelectedItemId(itemId);
    setSelectedName(Name);
    setSelectedProgress(Persen);
    setShowEdit(true);
  };

  //FUNC UNTUK GET DATA TODOS
  const fetchData = async () => {
    try {
      const response = await axios.get('https://todo-api-18-140-52-65.rakamin.com/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(response.data);
      setTodoItems([]); 
      response.data.forEach(todo => {
        fetchTodoItems(todo.id);
      });
      // if (todo) {
      //   fetchTodoItems(todo.id);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //FUNC UNTUK GET DATA ITEMS
  const fetchTodoItems = async ($todo_id) => { 
    try {
      console.log("Fetching todo items for todo_id:", $todo_id); 
      const response = await axios.get(`https://todo-api-18-140-52-65.rakamin.com/todos/${$todo_id}/items`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Response for todo items:", response.data);
      setTodoItems(prevTodoItems => [...prevTodoItems, ...response.data]);
    } catch (error) {
      console.error('Error fetching todo items:', error);
    }
  };

  // FUNC UNTUK DELETE DATA ITEMS
  const handleDelete = async ($todo_id, $id) => {
    try {
      await axios.delete(`https://todo-api-18-140-52-65.rakamin.com/todos/${$todo_id}/items/${$id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleCloseDel();
      if (todo) {
        fetchTodoItems(todo.id);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // FUNC UNTUK ADD DATA TASK
  const handleSaveTask = async () => {
    try {

      const response = await axios.post(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${todo.id}/items`,
        {
          name: taskName,
          progress_percentage: progress
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('New task added:', response.data);
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error adding new task:', error);
      setError('Failed to add new task');
    }
  };

  // FUNC UNTUK EDIT DATA TASK
  const handleEditTask = async ($todo_id, $id) => {
    try {

      const response = await axios.patch(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${$todo_id}/items/${$id}`,
        {
          target_todo_id: $todo_id, 
          name: selectedName, 
          progress_percentage: selectedProgress
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Task Updated:', response.data);
      handleCloseEdit();
      fetchData();
    } catch (error) {
      console.error('Error update task:', error);
      setError1('Failed to update task');
    }
  };

  const moveTask = async ($todo_id, $id, direction) => {
    const targetTodoId = direction === 'right' ? $todo_id + 1 : $todo_id - 1;
    
    try {
      const response = await axios.patch(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${$todo_id}/items/${$id}`,
        { target_todo_id: targetTodoId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Task Moved:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <div>
      <HeaderUtama handleShowGroup={handleShowGroup} />

      {/* KANBAN GROUP CONTENT */}
      <div className="kanban-content">

        {/* MENAMPILKAN GROUP TASK */}
        {todos.map((todo, index) => (
          <div className="card mb-3" key={todo.id} style={{ backgroundColor: bgColors[index % colors.length], borderColor: colors[index % colors.length] }}>
            
            {/* CARD HEADER */}
            <div className="card-header">
              <div className='card-title' style={{ color: fontColors[index % colors.length], borderColor: borderTextColors[index % colors.length] }}>{todo.title}</div>
            </div>

            {/* CARD BODY */}
            <div className="card-body">
              <h5 className="card-desc">{todo.description}</h5>

              {/* GROUP TASK ITEMS CONTENT */}
              <div className="card-content">
              {todoItems
              .filter(item => item.todo_id === todo.id)
              .map(filteredItem => (
                <ItemTask key={filteredItem.id} item={filteredItem} handleShowDel={handleShowDel} handleShowEdit={handleShowEdit} moveTask={moveTask} />
              ))}
              </div>
            </div>

            {/* CARD FOOTER */}
            <div className="card-footer">
              <button type="button" className="btn-newtask" onClick={() => handleShow(todo)}>
                <i class="fa-solid fa-plus"></i> New Task 
              </button>
            </div>

          </div>
        ))}
      </div>
      {/* END KANBAN GROUP CONTENT */}

      {/* MODAL ADD NEW GROUP */}
      {showGroup && (
        <ModalAddGroup handleClose={handleCloseGroup} error={error2} handleSubmit={handleSubmit} setDescription={setDescription} description={description} title={title} setTitle={setTitle} />
      )}

      {/* MODAL ADD NEW TASK */}
      {show && (
        <ModalAdd handleClose={handleClose} handleSaveTask={handleSaveTask} setTaskname={setTaskname} taskName={taskName} progress={progress} setProgress={setProgress} error={error} />
      )}

      {/* MODAL DELETE TASK */}
      {showDelete && (
        <ModalDelete handleClose={handleCloseDel} handleDelete={handleDelete} todoId={selectedTodoId} itemId={selectedItemId} />
      )}

      {/* MODAL EDIT TASK */}
      {showEdit && (
        <ModalEdit Name={selectedName} Persen={selectedProgress} handleClose={handleCloseEdit} handleEditTask={handleEditTask} todoId={selectedTodoId} itemId={selectedItemId} setSelectedName={setSelectedName}  setSelectedProgress={setSelectedProgress} error={error1} />
      )} 
              
    </div>
  );
}

export default Kanban;
