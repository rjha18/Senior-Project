import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Axios from 'axios';
import Menu from './Components/Menu';
import Shop from './Components/Shop';

export default class App extends React.Component {
	constructor() {
		super();
		Axios.get('http://localhost:8080/api/shop/data').then(function(response) {
			console.log(response);
		});
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Menu} />
					<Route path="/shop" component={Shop} />
					<Route path="/about" component={Menu} />
					<Route path="/contact" component={Menu} />
				</Switch>
			</Router>
		);
	} 
}

const node = document.getElementById('app');
ReactDOM.render(<App />, node);