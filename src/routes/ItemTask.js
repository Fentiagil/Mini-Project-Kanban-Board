// ModalDelete.js
import '../assets/Kanban.css';
import '../App.css';
import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ItemTask({ item, handleShowEdit, handleShowDel }) {

const [showDropdown, setShowDropdown] = useState(false);

const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
};

return (
    <>
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
                        <li type="button" className="btn-edit" onClick={() => handleShowEdit(item.id)}><i class="fa-regular fa-pen-to-square"></i> Edit</li>
                        <li type="button" className="btn-delete" onClick={() => handleShowDel(item.todo_id, item.id)}><i class="fa-regular fa-trash-can"></i> Delete</li>
                    </ul>
                </div>
            )}
                                        
        </div>  
    </div>

    {/* <ModalDelete show={showDelete} handleClose={handleCloseDel} handleDelete={handleDelete} key={item.id} item={item} hidden/> 
    <ModalEdit show={showEdit} handleClose={handleCloseEdit} key={item.id} item={item} hidden/>  */}
    
    </>
  );
}

export default ItemTask;
