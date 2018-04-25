import React from 'react';

export default class Navigation extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ul>
                <li> <a href="shop.html"> shop </a> </li>
                <li> <a id="demo" href=""> about </a> </li>
                <li> <a href=""> contact </a> </li>
            </ul>
        );
    }
}