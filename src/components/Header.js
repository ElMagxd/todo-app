import React from 'react';
import logo from '../logo512.png';
import LogoutButton from './LogoutButton';
import { useSelector } from 'react-redux';

const Header = () => {
   const user = useSelector(state => state.user);
   return (
      <header className="header">
         <img className="header__logo" src={logo} alt="React"></img>
         <h1>Do your stuff</h1>
         {user && <LogoutButton/>}
      </header>
   );
};

export default Header;