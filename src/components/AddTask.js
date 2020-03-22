import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddTask = props => {
   const [inputValue, setInputValue] = useState('');
   const user = useSelector(state => state.user);
   const userData = useSelector(state => state.userData);
   const currentList = useSelector(state => state.currentList);

   const changedInputValue = event => {
      setInputValue(event.target.value);
   }

   const makeUniqueId = (arr) => {
      if (arr.length < 1) {
         return 1;
      }
      let objectId = arr.map(item => item.id);
      let maxItem = Math.max(...objectId);
      return maxItem + 1;
   }

   const sendToLS = e => {
      e.preventDefault();

      if (userData.taskLists.length < 1) {
         // throw new Error('No list created');
         console.warn('No list created. Create a new list. Then add tasks to it.');
         return false;
      }

      if (inputValue.length < 1) {
         return false
      }

      let taskLists = userData.taskLists;

      let newTask = {
         id: makeUniqueId(taskLists[currentList].tasks),
         task: inputValue,
         completed: false
      };

      taskLists[currentList].tasks.push(newTask);

      const setFireData = props.setUserDataFn;
      setFireData(user.email, { taskLists: taskLists });

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