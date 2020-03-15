import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddTask = props => {
   const [inputValue, setInputValue] = useState('');
   const user = useSelector(state => state.user);
   const userData = useSelector(state => state.userData);
   
   let tasksData;
   // localStorage.length < 1 ? tasksData = [] : tasksData = JSON.parse(localStorage.getItem('tasksData'));
   !userData ? tasksData = [] : tasksData = JSON.parse(userData.tasks);

   // const setJsonData = props.setState;

   const changedInputValue = event => {
      setInputValue(event.target.value);
   }

   const makeUniqueId = () => {
      if (tasksData.length < 1) {
         return 1;
      }
      let objectId = tasksData.map(item => item.id);
      let maxItem = Math.max(...objectId);
      return maxItem + 1;
   }

   const sendToLS = e => {
      e.preventDefault();
      if (inputValue.length < 1) {
         return false
      }

      let newTask = {
         id: makeUniqueId(),
         task: inputValue,
         completed: false
      };
      tasksData.push(newTask);
      const setFireData = props.setUserDataFn;
      setFireData(user.email, {tasks: JSON.stringify(tasksData)});

      setInputValue('');
   }

   return (
      <form className="addTask" onSubmit={sendToLS}>
         <input
            className="addTask__input"
            placeholder="Write the task"
            onChange={changedInputValue}
            value={inputValue}
         />
         <button type="submit">
            Add new task
         </button>
      </form>
   );
};

export default AddTask;