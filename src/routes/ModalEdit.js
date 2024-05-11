import React from 'react';
import '../assets/Kanban.css';
import '../App.css';

function ModalEdit({handleClose, handleEditTask, todoId, itemId, setTaskname, taskName, progress, setProgress, error}) {

  return (

    <div className="modal-overlay">

      <div className="modal">

        {/* MODAL HEADER */}
        <div className="modal-header">
          <h4 className="judul-modal">Edit Task</h4>
          <button className="close-btn" onClick={handleClose}>X</button>
        </div>

        {/* MODAL BODY */}
        <div className="modal-body">

          {/* FORM EDIT TASK */}
          <form className='formulir'> 

            {/* HANDLE ERROR */}
            {error && <div className='text-danger'>{error}</div>}
          
            {/* Hidden input untuk menyimpan todoId */}
            <input type="hidden" id="todoId" value={todoId} />

            <div className="kolom">
              <label htmlFor="taskName" className="form-label">Task Name</label>
              <input type="text" className="form-control" id="taskName" required placeholder={taskName} value={taskName} onChange={(e) => setTaskname(e.target.value)} />
            </div>

            <div className="kolom">
              <label htmlFor="progress" className="form-label">Progress</label>
              <input type="number" min={0} max={100} className="form-control" id="progress" required placeholder={progress} value={progress} onChange={(e) => setProgress(e.target.value)} style={{ width: '30%' }} />
            </div>

          </form>

        </div>

        {/* MODAL FOOTER */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleClose}>Cancel</button>
          <button className="btn-action" onClick={() => handleEditTask(todoId, itemId)} >Save Task</button>
        </div>

      </div>
      
    </div>
  );
}

export default ModalEdit;
