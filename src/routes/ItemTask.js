import '../assets/Kanban.css';
import '../assets/ItemTask.css';
import '../App.css';
import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ItemTask({ item, handleShowEdit, handleShowDel, moveTask }) {

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

            <button className="trigger-area btn-setting" onClick={toggleDropdown}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>

            {showDropdown && (
                <div className="dropdown-menu">
                    <ul>
                        <li type="button" className="btn-mvRight" onClick={() => moveTask(item.todo_id, item.id, 'right')}>
                            <div className="menu-btn">
                                <i class="fa-solid fa-arrow-right"></i>
                                <p className='text-btn'>Move Right </p>
                            </div>
                        </li>

                        <li type="button" className="btn-mvLeft" onClick={() => moveTask(item.todo_id, item.id, 'left')}>
                            <div className="menu-btn">
                                <i class="fa-solid fa-arrow-left"></i>
                                <p className='text-btn'>Menu Left </p>
                            </div>
                        </li> 

                        <li type="button" className="btn-edit" onClick={() => handleShowEdit(item.todo_id, item.id)}>
                            <div className="menu-btn">
                                <i class="fa-regular fa-pen-to-square"></i>
                                <p className='text-btn'>Edit </p>
                            </div>                                                       
                        </li>

                        <li type="button" className="btn-delete" onClick={() => handleShowDel(item.todo_id, item.id)}>
                            <div className="menu-btn">
                                <i class="fa-regular fa-trash-can"></i>
                                <p className='text-btn'> Delete </p>
                            </div>                           
                        </li>
                    </ul>
                </div>
            )}
                                        
        </div>  
    </div><br></br>
    </>
  );
}

export default ItemTask;
