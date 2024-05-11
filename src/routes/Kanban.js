import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Kanban.css';
import '../App.css';
import ItemTask from './ItemTask';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

function Kanban() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [todoItems, setTodoItems] = useState([]);

  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const colors = ["#01959F", "#FEEABC", " #F5B1B7", "#B8DBCA"];
  const bgColors= ['#F7FEFF', "#FFFCF5", "#FFFAFA", "#F8FBF9"];
  const fontColors = [" #01959F", "#FA9810", "#E11428", "#43936C"];
  const borderTextColors = ["#4DB5BC", "#FEEABC", "#F5B1B7", "#B8DBCA"];

  const [show, setShow] = useState(false);
  const [taskName, setTaskname] = useState('');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseDel = () => setShowDelete(false);
  const handleShowDel = (todoId, itemId) => {
    setSelectedTodoId(todoId);
    setSelectedItemId(itemId);
    setShowDelete(true);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);


  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (todo) {
      fetchTodoItems(todo.id);
    }
  }, [todo]);

  const fetchData = async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
    try {
      const response = await axios.get('https://todo-api-18-140-52-65.rakamin.com/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(response.data);
      fetchTodoItems();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTodoItems = async () => { // Fungsi untuk mengambil data items
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
    try {
      const response = await axios.get(`https://todo-api-18-140-52-65.rakamin.com/todos/${todo.id}/items`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodoItems(response.data);
      fetchData();
    } catch (error) {
      console.error('Error fetching todo items:', error);
    }
  };

  const handleDelete = async ($todo_id, $id) => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
    try {
      await axios.delete(`https://todo-api-18-140-52-65.rakamin.com/todos/${$todo_id}/items/${$id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleCloseDel();
      fetchData();
      if (todo) {
        fetchTodoItems(todo.id);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (todo) => {
    setTaskname('');
    setProgress('');
    setShow(true);
    setTodo(todo); // Assuming you have a state variable named 'todo'
 
  };
  
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
      // Setelah menambahkan task, tutup modal
      handleClose();
      fetchTodoItems();
    } catch (error) {
      console.error('Error adding new task:', error);
      setError('Failed to add new task');
    }
  };

  return (
    <div>
      <div className="kanban-content">
        {todos.map((todo, index) => (
          <div className="card mb-3" key={todo.id} style={{ backgroundColor: bgColors[index % colors.length], borderColor: colors[index % colors.length] }}>
            <div className="card-header">
              <div className='card-title' style={{ color: fontColors[index % colors.length], borderColor: borderTextColors[index % colors.length] }}>{todo.title}</div>
            </div>
            <div className="card-body">
              <h5 className="card-desc">{todo.description}</h5>
              <div className="card-content">
                {/* Render todo items here */}
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
            <div className="card-footer">
              <button type="button" className="btn-newtask" onClick={() => handleShow(todo)}>
                <i class="fa-solid fa-plus"></i> New Task 
              </button>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h4 className="judul-modal">Create Task</h4>
              <button className="close-btn" onClick={handleClose}>X</button>
            </div>
            <div className="modal-body">
              <form className='formulir'>
                {error && <div className='text-danger'>{error}</div>}
                <div className="kolom">
                  <label htmlFor="taskName" className="form-label">Task Name</label>
                  <input type="text" className="form-control" id="taskName" required placeholder='Type your Task' value={taskName} onChange={(e) => setTaskname(e.target.value)} />
                </div>
                <div className="kolom">
                  <label htmlFor="progress" className="form-label">Progress</label>
                  <input type="number" min={0} max={100} className="form-control" id="progress" required placeholder='70%' value={progress} onChange={(e) => setProgress(e.target.value)} style={{ width: '30%' }} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleClose}>Cancel</button>
              <button className="btn-action" onClick={handleSaveTask}>Save Task</button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <ModalDelete handleClose={handleCloseDel} handleDelete={handleDelete} todoId={selectedTodoId} itemId={selectedItemId} />
      )}

      {showEdit && (
        <ModalEdit handleClose={handleCloseEdit} />
      )}      
              
    </div>
  );
}

export default Kanban;
