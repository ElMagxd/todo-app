import React from 'react';
import Body from './Body/Body';
import Sidebar from './Sidebar/Sidebar';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';

const Main = () => {
   const user = useSelector(state => state.user);

   return (
      <main className="dashboard">
         {!user && <Redirect to="/login" />}

         <Scrollbar style={{ width: '30%', height: '90vh', borderRight: '2px solid #eee' }}>
            <Sidebar />
         </Scrollbar>

         <Scrollbar style={{ width: '100%', height: '90vh' }}>
            <Body />
         </Scrollbar>
      </main>
   );
};

export default Main;