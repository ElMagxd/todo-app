import React from 'react';
import Task from '../Task';
import AddTask from '../AddTask';
import ClearAll from '../ClearAll';
import fire from '../../config/Fire';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../redux/actions';
import './Body.scss';

const Body = () => {
   const db = fire.firestore();
   const dispatch = useDispatch();
   const user = useSelector(state => state.user);
   const userData = useSelector(state => state.userData);
   const currentList = useSelector(state => state.currentList);
   let currentListTasks;

   const setUserDataFn = (userEmail, data) => {
      db
         .collection('users')
         .doc(userEmail)
         .set(data)
         .then(() => {
            // dispatch(setUserData(data));
         })
         .catch(err => {
            console.log(err);
         });
      // NOTE Works better & faster
      dispatch(setUserData(data));
   }

   /*if (userData && userData.taskLists.length) {
      if (userData.taskLists.length <= currentList) {
         currentListTasks = userData.taskLists[userData.taskLists.length - 1].tasks;
      } else {
         currentListTasks = userData.taskLists[currentList].tasks;
      }
   }*/
   if (userData && userData.taskLists.length) {
      currentListTasks = userData.taskLists[currentList].tasks;
   }



   const handleChange = id => {
      const index = currentListTasks.map(item => item.id).indexOf(id);
      let isCompleted = currentListTasks[index].completed;
      currentListTasks[index].completed = !isCompleted;
      let taskLists = userData.taskLists;
      taskLists[currentList].tasks = currentListTasks;
      setUserDataFn(user.email, { taskLists: taskLists });
   }

   const deleteItem = id => {
      const index = currentListTasks.map(item => item.id).indexOf(id);
      currentListTasks.splice(index, 1);
      let taskLists = userData.taskLists;
      taskLists[currentList].tasks = currentListTasks;
      setUserDataFn(user.email, { taskLists: taskLists });
   }

   let finalTasks;
   if (currentListTasks) {
      const activeTasks = currentListTasks.filter(task => task.completed === false);
      const completedTasks = currentListTasks.filter(task => task.completed === true);
      finalTasks = [...activeTasks, ...completedTasks];
   }

   return (
      <div className="Body">
         <AddTask setUserDataFn={setUserDataFn} />

         {currentListTasks &&
            finalTasks.map(item => {
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
            })
         }

         {currentListTasks && !!currentListTasks.length && <ClearAll setState={setUserDataFn} />}
      </div>
   );
};

export default Body;
