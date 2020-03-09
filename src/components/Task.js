import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Task = props => {
   return (
      <div className="task">
         <input
            className="task__checkbox"
            type="checkbox"
            defaultChecked={props.completed}
            onChange={props.handleChange}
            id={`taskCheckBox-${props.taskId}`}
         />
         <label htmlFor={`taskCheckBox-${props.taskId}`} className="task__text">{props.text}</label>
         
         <button
            className="task__delete"
            onClick={props.deleteFn}
         >
            <FontAwesomeIcon icon={faTrash} />
         </button>
      </div>
   );
};

export default Task;