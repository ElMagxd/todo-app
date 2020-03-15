import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Body from './components/Body';
import fire from './config/Fire';
import Login from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from './redux/actions';

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
			{user ? <Body/> : <Login/>}
		</div>
	);
}

export default App;