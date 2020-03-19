import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import fire from './config/Fire';
import Login from './components/Login';
import Signup from './components/Signup';
import Preloader from './components/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from './redux/actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


function App() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const [authing, setAuthing] = useState(false);

	const authListener = async () => {
		setAuthing(true);
		fire.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch(updateUserInfo(user));

			} else {
				dispatch(updateUserInfo(null));
			}
			setAuthing(false);
		});
	};

	useEffect(() => {
		authListener();
	}, []);

	// if (authing) { return <Preloader /> }

	return (
		<>
			<CSSTransition
				in={authing}
				timeout={300}
				classNames="preloader"
				unmountOnExit
			>
				<Preloader />
			</CSSTransition>
			{user && <Redirect to='/dashboard' />}
			<div className="App">
				<Header />
				<Switch>
					<Route exact path={['/', '/login']} component={Login} />
					<Route exact path='/dashboard' component={Main} />
					<Route exact path='/signup' component={Signup} />
				</Switch>
			</div>
		</>
	);
}

export default App;