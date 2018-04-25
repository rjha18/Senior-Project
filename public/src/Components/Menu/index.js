import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation'

export default class Menu extends React.Component {
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