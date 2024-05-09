import { useState } from 'react';
import {Button, Placeholder} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import '../App.css';

function HeaderUtama() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <header className="App-header"> 
        <div className='Header-menu'>      
          <div className="Right-side">
            <div className="Heading">
              <h3 className="Header-brand">Product Roadmap</h3>
            </div>
            <div className="Button flex-container">
              {/* Panggil handleShow saat tombol ditekan */}
              <button type="button" className="btn-newgroup" onClick={handleShow}>+ Add New Group</button>
            </div>
          </div>
          <div className="Left-side"></div>
        </div>      
      </header>
      <hr></hr>

      {/* Modal */}
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h4 className="judul-modal">Add New Group</h4>
              <button className="close-btn" onClick={handleClose}>X</button>
            </div>
            <div className="modal-body">
              {/* Isi modal di sini */}
              <form className='formulir'>
                <div className="kolom">
                  <label For="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" required placeholder='Placeholder'/>
                </div>
                <div className="kolom">
                  <label For="desc" className="form-label">Description</label>
                  <textarea className="form-control" id="desc" required placeholder='Placeholder'></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleClose}>Cancel</button>
              <button className="btn-action" onClick={handleClose}>Submit</button>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
}

export default HeaderUtama;