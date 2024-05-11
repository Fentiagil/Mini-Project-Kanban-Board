import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Kanban.css';
import '../App.css';
import ItemTask from './ItemTask';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import ModalAdd from './ModalAdd';

function Kanban() {
  // MENYIMPAN DATA TODOS DAN ITEMS
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [todoItems, setTodoItems] = useState([]);

  // GET TODO ID DAN ITEM ID UNTUK CRUD
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  // MENAMPILKAN MODAL
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
  const handleShowEdit = () => setShowEdit(true);

  // FUNC UNTUK GET DATA TODOS
  const fetchData = async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
    try {
      const response = await axios.get('https://todo-api-18-140-52-65.rakamin.com/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // FUNC UNTUK GET DATA ITEMS
  const fetchTodoItems = async () => { 
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
    try {
      const response = await axios.get(`https://todo-api-18-140-52-65.rakamin.com/todos/${todo.id}/items`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodoItems(response.data);
    } catch (error) {
      console.error('Error fetching todo items:', error);
    }
  };

  // FUNC UNTUK DELETE DATA ITEMS
  const handleDelete = async ($todo_id, $id) => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
    try {
      await axios.delete(`https://todo-api-18-140-52-65.rakamin.com/todos/${$todo_id}/items/${$id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleCloseDel();
      fetchTodoItems();
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
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
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
      fetchTodoItems();
    } catch (error) {
      console.error('Error adding new task:', error);
      setError('Failed to add new task');
    }
  };

  // FUNC UNTUK EDIT DATA TASK
  const handleEditTask = async ($todo_id, $id) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
      const response = await axios.patch(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${$todo_id}/items/${$id}`,
        {
          target_todo_id: $todo_id, 
          name: taskName, 
          progress_percentage: progress 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Task Updated:', response.data);
      handleCloseEdit();
      fetchTodoItems();
    } catch (error) {
      console.error('Error update task:', error);
      setError1('Failed to update task');
    }
  };

  useEffect(() => {
    fetchData();
    if (todo) {
      fetchTodoItems(todo.id);
    }
  }, [todo]);
  

  return (
    <div>
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
                {todoItems.map(item => {
                  if (item.todo_id === todo.id) {
                    return (
                      <>
                      <ItemTask key={item.id} item={item} handleShowDel={handleShowDel} handleShowEdit={handleShowEdit} />
                      </>
                    );               
                  }                  
                })}
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
        <ModalEdit handleClose={handleCloseEdit} handleEditTask={handleEditTask} todoId={selectedTodoId} itemId={selectedItemId} setTaskname={setTaskname} taskName={taskName} progress={progress} setProgress={setProgress} error={error1} />
      )} 
    
              
    </div>
  );
}

export default Kanban;
