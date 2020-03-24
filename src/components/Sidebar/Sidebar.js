import React, { useState } from 'react';
import Modal from 'react-modal';
import './Sidebar.scss';
import fire from '../../config/Fire';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setCurrentList } from '../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [inputValue, setInputValue] = useState('');
   const user = useSelector(state => state.user);
   const userData = useSelector(state => state.userData);
   const currentList = useSelector(state => state.currentList);
   const dispatch = useDispatch();
   const db = fire.firestore();
   let taskList;

   if (userData) {
      taskList = userData.taskLists;
   }

   const addNewTaskList = e => {
      e.preventDefault();
      if (inputValue.length >= 1) {

         let shortInputValue = inputValue;
         // if (inputValue.length > 30) {
         //    shortInputValue = shortInputValue.slice(0, 27) + '...';
         // }

         setModalIsOpen(false);

         let newObj = {
            name: shortInputValue,
            tasks: []
         };

         taskList.push(newObj);

         db
            .collection('users')
            .doc(user.email)
            .set({ taskLists: taskList })
            .then(e => {
               dispatch(setCurrentList(userData.taskLists.length - 1));
            });
      }

      setInputValue('');
   }

   const addBtnHandler = () => {
      setModalIsOpen(true);
   }

   const hadleCloseModal = () => {
      setModalIsOpen(false);
   }

   const changeList = listId => {
      dispatch(setCurrentList(listId));
   }

   const deleteList = (e, listId) => {
      e.stopPropagation();
      taskList.splice(listId, 1);
      db
         .collection('users')
         .doc(user.email)
         .set({ taskLists: taskList })
         .then(e => {
            // dispatch(setUserData({ taskLists: taskList }));
         });
      dispatch(setUserData({ taskLists: taskList }));

      if (currentList >= userData.taskLists.length) {
         dispatch(setCurrentList(currentList - 1))
      }
   }

   return (
      <aside className="sidebar">
         <button
            className="sidebar__add"
            onClick={addBtnHandler}
         >
            + Add new list
         </button>
         <ul className="sidebar__list">
            {
               taskList &&
               taskList.map((item, index) => {
                  return (
                     <li
                        className={"sidebar__item " + (currentList === index ? "active" : null)}
                        onClick={() => changeList(index)}
                        key={index}
                     >
                        <span>{item.name}</span>
                        <button
                           className="sidebar__item-delete"
                           onClick={e => deleteList(e, index)}
                        >
                           <FontAwesomeIcon icon={faTrash} />
                        </button>
                     </li>
                  )
               })
            }
         </ul>
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={hadleCloseModal}
            shouldCloseOnOverlayClick={true}
            overlayClassName={"addTaskList"}
            className={"addTaskList__content"}
            contentLabel="Adding a new task list"
            closeTimeoutMS={200}
         >
            <form
               onSubmit={addNewTaskList}
               className="addTaskList__form"
            >
               <header>
                  <h1 className="addTaskList__title">
                     Add new task list
                  </h1>
               </header>
               <main>
                  <label>
                     Task list name
                     <input
                        placeholder='e.g. "Shopping list"'
                        onChange={e => setInputValue(e.target.value)}
                        maxLength="60"
                     />
                  </label>
               </main>
               <footer>
                  <button type="button" onClick={hadleCloseModal} className="addTaskList__close">
                     Cancel
                  </button>
                  <button type="submit" disabled={!inputValue.length} className="addTaskList__add">
                     Add
                  </button>
               </footer>
            </form>
         </Modal>
      </aside>
   );
};

Modal.setAppElement('#root');

export default Sidebar;