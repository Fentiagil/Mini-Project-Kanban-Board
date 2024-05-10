import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Kanban.css';
import '../App.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Kanban() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [todoItems, setTodoItems] = useState([]);

  const colors = ["#01959F", "#FEEABC", " #F5B1B7", "#B8DBCA"];
  const bgColors= ['#F7FEFF', "#FFFCF5", "#FFFAFA", "#F8FBF9"];
  const fontColors = [" #01959F", "#FA9810", "#E11428", "#43936C"];
  const borderTextColors = ["#4DB5BC", "#FEEABC", "#F5B1B7", "#B8DBCA"];

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [taskName, setTaskname] = useState('');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
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
    } catch (error) {
      console.error('Error fetching todo items:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (todo) => {
    setTaskname('');
    setProgress('');
    setShow(true);
    setTodo(todo); // Assuming you have a state variable named 'todo'
 
  };
  
  const handleCloseDel = () => setShowDelete(false);
  const handleShowDel = () => setShowDelete(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

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
      // Ambil ulang data untuk menampilkan task baru
      fetchData();
    } catch (error) {
      console.error('Error adding new task:', error);
      setError('Failed to add new task');
    }
  };
  
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
                      <div className="card-task" key={item.id}>
                        <p className="item-name">{item.name}</p>
                        <div className="item-menu">
                          <div className="progress">
                            <div className="progress-container">
                              <div className="progress-bar">
                              <ProgressBar now={item.progress_percentage} />
                              </div>                              
                            </div>
                            <p className="item-persen">{item.progress_percentage}%</p>
                          </div>
                          <button className="trigger-area" onClick={toggleDropdown}>
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          {showDropdown && (
                              <div className="dropdown-menu">
                                <ul>
                                  <li><i class="fa-solid fa-arrow-right"> </i>Move Right</li>
                                  <li><i class="fa-solid fa-arrow-left"></i> Menu Left</li>
                                  <li type="button" className="btn-edit" onClick={handleShowEdit}><i class="fa-regular fa-pen-to-square"></i> Edit</li>
                                  <li type="button" className="btn-delete" onClick={handleShowDel}><i class="fa-regular fa-trash-can"></i> Delete</li>
                                </ul>
                              </div>
                            )}                    
                        </div>                     
                      </div>
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
        <div className="modal-overlay">
          <div className="modal-delete">
            <div className="modal-header-delete">
              <h4 className="judul-modal">Delete Task</h4>
              <button className="close-btn" onClick={handleCloseDel}>X</button>
            </div>
            <div className="modal-body-delete">
              <p className="text-delete">Are you sure want to delete this task? your action can't be reverted.</p>
            </div>
            <div className="modal-footer-delete">
              <button className="btn-cancel" onClick={handleCloseDel}>Cancel</button>
              <button className="btn-action" style={{backgroundColor:"#E11428"}}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h4 className="judul-modal">Edit Task</h4>
              <button className="close-btn" onClick={handleCloseEdit}>X</button>
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
              <button className="btn-cancel" onClick={handleCloseEdit}>Cancel</button>
              <button className="btn-action" >Save Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kanban;
