import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation'

export default class Shop extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="menu">
                <Logo/>
                <Navigation/>
            </div>
        )
    }
}