import React from 'react';
import Body from './Body';
import Sidebar from './Sidebar';

const Main = () => {
   return (
      <main className="dashboard">
         <Sidebar />
         <Body />
      </main>
   );
};

export default Main;