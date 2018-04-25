import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Menu from './Components/Menu';

export default class App extends React.Component {
	constructor() {
		super();
		Axios.get('http://localhost:8080/api/shop/data').then(function(response) {
			console.log(response);
		});
	}

	render() {
		return (
			<Menu/>
		);
	} 
}

const node = document.getElementById('app');
ReactDOM.render(<App />, node);