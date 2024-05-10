import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Kanban.css';
import '../App.css';

// import { BsPlusCircle } from 'react-icons-bs';

function Kanban() {
  const [todos, setTodos] = useState([]);
  const colors = ["#01959F", "#FEEABC", " #F5B1B7", "#B8DBCA"];
  const bgColors= ['#F7FEFF', "#FFFCF5", "#FFFAFA", "#F8FBF9"];
  const fontColors = [" #01959F", "#FA9810", "#E11428", "#43936C"];
  const borderTextColors = ["#4DB5BC", "#FEEABC", "#F5B1B7", "#B8DBCA"];

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

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
      
  
    return (
      <div>
        <div className="kanban-content">
          {/* Menggunakan map untuk menampilkan setiap todo */}
          {todos.map((todo, index) => (
            <div className="card mb-3" key={todo.id} style={{ backgroundColor: bgColors[index % colors.length], borderColor: colors[index % colors.length] }}>
              <div className="card-header" >
                <div className='card-title'style={{color: fontColors[index % colors.length], borderColor: borderTextColors[index % colors.length] }}>{todo.title}</div>
              </div>
              <div className="card-body">
                <h5 className="card-desc">{todo.description}</h5>
                <div className="card-content">

                </div>
              </div>
              <div className="card-footer">
              <button type="button" className="btn-newtask" onClick={handleShow}> New Task </button>
              {/* <BsPlusCircle /> */}
              </div>
            </div>
          ))}
        </div>

      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h4 className="judul-modal">Add New Group</h4>
              <button className="close-btn" onClick={handleClose}>X</button>
            </div>
            <div className="modal-body">
              <form className='formulir'> 
              {error && <div className='text-danger'>{error}</div>}         
                <div className="kolom">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" required placeholder='Placeholder' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="kolom">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <textarea className="form-control" id="desc" required placeholder='Placeholder' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleClose}>Cancel</button>
              <button className="btn-action" >Submit</button>
            </div>
          </div>
        </div>
      )}

      </div>
    );
  }

export default Kanban;
