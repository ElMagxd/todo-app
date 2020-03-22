import React from 'react';
import { useSelector } from 'react-redux';


const ClearAll = props => {
   const user = useSelector(state => state.user);
   const userData = useSelector(state => state.userData);
   const currentList = useSelector(state => state.currentList);

   const clearAllData = () => {
      const setNewUserData = props.setState;
      let taskLists = userData.taskLists
      taskLists[currentList].tasks = [];
      setNewUserData(user.email, { taskLists: taskLists });
   }

   return (
      <button
         className="clearAll"
         onClick={clearAllData}
      >
         Clear all
      </button>
   );
};

export default ClearAll;