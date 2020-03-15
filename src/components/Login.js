import React, { useState } from 'react';
import fire from '../config/Fire';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const login = e => {
      e.preventDefault();
      fire
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(u => {
            console.log(u);
         }).catch(err => {
            setErrorMessage(err.message);
         });
   }

   const signup = e => {
      e.preventDefault();
      fire
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .catch(err => {
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
            <button
               onClick={signup}
               className='login__signup'
            >
               Sign up
            </button>
            <p className='login__message'>
               {errorMessage}
            </p>
         </form>
      </main>
   );
};

export default Login;