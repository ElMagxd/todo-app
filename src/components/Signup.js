import React, { useState } from 'react';
import fire from '../config/Fire';
import { Link } from 'react-router-dom';

const Login = props => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfiramtion, setPasswordConfiramtion] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const signup = e => {
      e.preventDefault();
      if(password !== passwordConfiramtion) {
         setErrorMessage('Passwords do not match');
         return;
      }
      fire
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then(() => {
            props.history.push('/dashboard');
         })
         .catch(err => {
            setErrorMessage(err.message);
         });
   }

   return (
      <main className='login'>
         <form onSubmit={signup}>
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
            <input
               placeholder='Confirm password'
               type='password'
               onChange={e => setPasswordConfiramtion(e.target.value)}
               value={passwordConfiramtion}
            />
            <button
               type='submit'
               onClick={signup}
               className='login__signup'
            >
               Sign up
            </button>
            {
               errorMessage && 
               <p className='login__message'>
                  {errorMessage}
               </p>
            }
         </form>
         <p>Already have an account? <Link to='/login'>Log in</Link></p>
      </main>
   );
};

export default Login;