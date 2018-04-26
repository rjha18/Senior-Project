import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ul>
                <li> <Link to="/shop"> shop </Link> </li>
                <li> <Link to="/"> about </Link> </li>
                <li> <Link to="/"> contact </Link> </li>
            </ul>
        );
    }
}