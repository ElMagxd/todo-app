import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import ClearAll from './ClearAll';

const Body = () => {
   let jsonData = localStorage.getItem('tasksData');
   if (jsonData == null) { jsonData = '[]'; }
   
   const [data, setData] = useState(jsonData);

   const handleChange = id => {
      let newData = JSON.parse(data);
      const index = newData.map(item => item.id).indexOf(id);
      let isCompleted = newData[index].completed;
      newData[index].completed = !isCompleted;
      setData(JSON.stringify(newData));
      localStorage.setItem('tasksData', JSON.stringify(newData));
   }

   const deleteItem = id => {
      let newData = JSON.parse(data);
      const index = newData.map(item => item.id).indexOf(id);
      newData.splice(index, 1);
      setData(JSON.stringify(newData));
      localStorage.setItem('tasksData', JSON.stringify(newData));
   }

   const activeTasks = JSON.parse(data).filter(task => task.completed === false);
   const completedTasks = JSON.parse(data).filter(task => task.completed === true);

   const finalTasks = [...activeTasks, ...completedTasks].map(item => {
      return (
         <Task
            text={item.task}
            completed={item.completed}
            key={item.id}
            handleChange={() => handleChange(item.id)}
            deleteFn={() => deleteItem(item.id)}
            taskId={item.id}
         />
      );
   });

   return (
      <div className="Body">
         <AddTask
            setState={setData}
         />

         {finalTasks}
         
         {JSON.parse(jsonData).length > 0 ? <ClearAll setState={setData}/> : null}
      </div>
   );
};

export default Body;
