import '../assets/Kanban.css';
import '../assets/ItemTask.css';
import '../App.css';
import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

function ItemTask({ item, handleShowEdit, handleShowDel }) {

const [showDropdown, setShowDropdown] = useState(false);

const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
};

const moveTask = async (direction) => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjAsImV4cCI6MTcyMzg5MzA2OH0.Dut3wk9ZNXYYiIfUIX8vJarrkcRXzMzPZ5Kin4gsZnI';
    const targetTodoId = direction === 'right' ? item.todo_id + 1 : item.todo_id - 1;
    
    try {
      const response = await axios.patch(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${item.todo_id}/items/${item.id}`,
        { target_todo_id: targetTodoId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Task Moved:', response.data);
      // Lakukan sesuatu setelah berhasil memindahkan task, seperti memuat ulang data
    } catch (error) {
      console.error('Error moving task:', error);
      // Handle error
    }
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
                        <li type="button" className="btn-mvRight" onClick={() => moveTask('right')}>
                            <div className="menu-btn">
                                <i class="fa-solid fa-arrow-right"></i>
                                <p className='text-btn'>Move Right </p>
                            </div>
                        </li>

                        <li type="button" className="btn-mvLeft" onClick={() => moveTask('left')}>
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
