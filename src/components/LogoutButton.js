import React from 'react';
import fire from '../config/Fire';
import { useDispatch } from 'react-redux';
import { updateUserInfo, setUserData } from '../redux/actions';

const LogoutButton = props => {
   const dispatch = useDispatch();
   const logout = async () => {
      await fire.auth().signOut();
      dispatch(updateUserInfo(null));
      dispatch(setUserData(null));
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