import React from 'react';
import '../assets/Kanban.css';
import '../App.css';

function ModalAddGroup({handleClose, handleSubmit, setDescription, description, title, setTitle, error}) {
  return (
    <div className="modal-overlay">
        {/* MODAL ADD NEW GROUP */}
        <div className="modal">

            {/* MODAL HEADER */}
            <div className="modal-header">
                <h4 className="judul-modal">Add New Group</h4>
                <button className="close-btn" onClick={handleClose}>X</button>
            </div>

            {/* MODAL BODY */}
            <div className="modal-body">
                {/* FORM INPUT */}
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

            {/* MODAL FOOTER */}
            <div className="modal-footer">
                <button className="btn-cancel" onClick={handleClose}>Cancel</button>
                <button className="btn-action" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
  </div>
  );
}

export default ModalAddGroup;
