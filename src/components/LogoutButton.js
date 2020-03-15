import React from 'react';
import fire from '../config/Fire';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../redux/actions';

const LogoutButton = () => {
   const dispatch = useDispatch();
   const logout = () => {
      fire.auth().signOut();
      dispatch(updateUserInfo(null));
   }
   return (
      <button
            className='logout-button'
            onClick={logout}
         >
            Log out
      </button>
   );
};

export default LogoutButton;