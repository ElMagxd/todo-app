import React, { useState, useEffect } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import ClearAll from './ClearAll';
import fire from '../config/Fire';
import { useSelector, useDispatch } from 'react-redux';
import {setUserData} from '../redux/actions';

require("firebase/firestore");

const Body = () => {
   const db = fire.firestore();
   const dispatch = useDispatch();
   const userData = useSelector(state => state.userData);
   const user = useSelector(state => state.user);

   const setUserDataFn = (userEmail, data) => {
      db
         .collection('users')
         .doc(userEmail)
         .set(data)
         .then(() => {
            dispatch(setUserData(data));
         })
         .catch(err => {
            console.log(err);
         });
   }

   const getUserData = (userEmail) => {
      db
         .collection('users')
         .doc(userEmail)
         .get()
         .then(doc => {
            if(doc.exists) {
               if(doc.data().tasks === undefined) {
                  let dataObj = {
                     tasks: '[]'
                  };
                  dispatch(setUserData(dataObj));
                  setUserDataFn(user.email, dataObj);
               } else {
                  dispatch(setUserData(doc.data()));
               }
            } else {
               db
                  .collection('users')
                  .doc(userEmail)
                  .set({
                     tasks: '[]'
                  });
            }
         }).catch(err => {
            console.log('Get user data error: ', err);
         });
      return userData;
   };

   useEffect(() => {
      
      getUserData(user.email);
   }, []);
   // getUserData(user.email);


   let jsonData = '[]';
   if (userData != null) jsonData = userData.tasks;

   const handleChange = id => {
      let newData = JSON.parse(jsonData);
      const index = newData.map(item => item.id).indexOf(id);
      let isCompleted = newData[index].completed;
      newData[index].completed = !isCompleted;
      setUserDataFn(user.email, {tasks: JSON.stringify(newData)});
   }

   const deleteItem = id => {
      let newData = JSON.parse(jsonData);
      const index = newData.map(item => item.id).indexOf(id);
      newData.splice(index, 1);
      setUserDataFn(user.email, {tasks: JSON.stringify(newData)});
   }

   const activeTasks = JSON.parse(jsonData).filter(task => task.completed === false);
   const completedTasks = JSON.parse(jsonData).filter(task => task.completed === true);

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
            setUserDataFn={setUserDataFn}
         />

         {finalTasks}
         
         {JSON.parse(jsonData).length > 0 ? <ClearAll setState={setUserDataFn}/> : null}
      </div>
   );
};

export default Body;
