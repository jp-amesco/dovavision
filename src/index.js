import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './js/pages/Login';
import Home from './js/pages/Home';
import Register from './js/pages/Register';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/css/app.css'

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/login" exact={true} component={Login} /> 
			<Route path="/register" exact={true} component={Register} /> 
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
