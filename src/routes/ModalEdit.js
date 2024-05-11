// ModalEdit.js
import React, { useState } from 'react';
import '../assets/Kanban.css';
import '../App.css';

function ModalEdit({handleClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h4 className="judul-modal">Edit Task</h4>
          <button className="close-btn" onClick={handleClose}>X</button>
        </div>
        <div className="modal-body">
          <form className='formulir'>
           
            <div className="kolom">
              <label htmlFor="taskName" className="form-label">Task Name</label>
              <input type="text" className="form-control" id="taskName" required placeholder='Type your Task'  />
            </div>
            <div className="kolom">
              <label htmlFor="progress" className="form-label">Progress</label>
              <input type="number" min={0} max={100} className="form-control" id="progress" required placeholder='70%' style={{ width: '30%' }} />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleClose}>Cancel</button>
          <button className="btn-action" >Save Task</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
