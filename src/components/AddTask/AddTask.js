import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import './AddTask.scss';

const AddTask = props => {
   const [inputValue, setInputValue] = useState('');
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const user = useSelector(state => state.user);
   const userData = useSelector(state => state.userData);
   const currentList = useSelector(state => state.currentList);

   const hadleCloseModal = () => {
      setModalIsOpen(false);
   }

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
         setModalIsOpen(true);
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
      <>
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
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={hadleCloseModal}
            shouldCloseOnOverlayClick={true}
            overlayClassName={"addTask-error-overlay"}
            className={"addTask-error"}
            contentLabel="Adding a new task list"
            closeTimeoutMS={200}
         >
            <p className="addTask-error__note">
               You didn't write anything. Please write the task
            </p>
            <button type="button" onClick={hadleCloseModal} className="addTask-error__ok">
               Got it!
            </button>
         </Modal>
      </>
   );
};

export default AddTask;