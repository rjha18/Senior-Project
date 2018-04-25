import React from 'react';

export default class Logo extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="logo">
                <img src="./src/Images/logo.jpg" alt=""/>
            </div>
        );
    }
}