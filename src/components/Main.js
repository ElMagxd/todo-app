import React from 'react';
import Body from './Body/Body';
import Sidebar from './Sidebar/Sidebar';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Main = () => {
   const user = useSelector(state => state.user);

   return (
      <main className="dashboard">
         {!user && <Redirect to="/login" />}
         <Sidebar />
         <Body />
      </main>
   );
};

export default Main;