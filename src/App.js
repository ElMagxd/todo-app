import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Body from './components/Body';
import fire from './config/Fire';
import Login from './components/Login';
import Signup from './components/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from './redux/actions';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const authListener = () => {
		fire.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch(updateUserInfo(user));
			} else {
				dispatch(updateUserInfo(null));
			}
		});
	};

	useEffect(() => {
	 	authListener();
	},[]);

	return (
		<div className="App">
			<Header/>
			{user && <Redirect to='/dashboard'/>}
			<Switch>
				<Route exact path={['/', '/login']} component={Login}/>
				<Route exact path='/dashboard' component={Body}/>
				<Route exact path='/signup' component={Signup}/>
			</Switch>
		</div>
	);
}

export default App;