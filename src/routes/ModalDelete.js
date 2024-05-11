// ModalDelete.js
import '../assets/Kanban.css';
import '../App.css';
import React from 'react';

function ModalDelete({ handleClose, todoId, itemId, handleDelete }) {
  
  return (
    <div className="modal-overlay">
      <div className="modal-delete">
        <div className="modal-header-delete">
          <h4 className="judul-modal">Delete Task</h4>
          <button className="close-btn" onClick={handleClose}>X</button>
        </div>
        <div className="modal-body-delete">
          <p className="text-delete">Are you sure want to delete this task? your action can't be reverted.</p>
        </div>
        <div className="modal-footer-delete">
          <button className="btn-cancel" onClick={handleClose}>Cancel</button>
          <button className="btn-action" style={{backgroundColor:"#E11428"}} onClick={() => handleDelete(todoId, itemId)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
