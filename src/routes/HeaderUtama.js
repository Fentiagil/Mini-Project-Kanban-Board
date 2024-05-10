import { useState } from 'react';
import axios from 'axios';
import '../App.css';

function HeaderUtama() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
      const response = await axios.post(
        'https://todo-api-18-140-52-65.rakamin.com/todos',
        { title, description },
        { headers: { Authorization: `Bearer ${token}`} }
      );
      console.log('Group added successfully:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error adding group:', error);
      setError('Error adding group. Please try again later.');
    }
  };

  return (
    <>
      <header className="App-header"> 
        <div className='Header-menu'>      
          <div className="Right-side">
            <div className="Heading">
              <h3 className="Header-brand">Product Roadmap</h3>
            </div>
            <div className="Button flex-container">
              <button type="button" className="btn-newgroup" onClick={handleShow}>+ Add New Group</button>
            </div>
          </div>
          <div className="Left-side"></div>
        </div>      
      </header>
      <hr></hr>

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
              <button className="btn-action" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderUtama;
