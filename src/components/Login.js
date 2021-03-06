import React, { useState } from 'react';
import fire from '../config/Fire';
import { Link } from 'react-router-dom';

const Login = props => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const login = e => {
      e.preventDefault();
      fire
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(u => {
            props.history.push('/dashboard');
         }).catch(err => {
            setErrorMessage(err.message);
         });
   }

   return (
      <main className='login'>
         <form onSubmit={login}>
            <input
               placeholder='Email'
               type='email'
               onChange={e => setEmail(e.target.value)}
               value={email}
            />
            <input
               placeholder='Password'
               type='password'
               onChange={e => setPassword(e.target.value)}
               value={password}
            />
            <button
               type='submit'
               className='login__btn'
            >
               Log in
            </button>
            {
               errorMessage && 
               <p className='login__message'>
                  {errorMessage}
               </p>
            }
            
         </form>
         <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
      </main>
   );
};

export default Login;