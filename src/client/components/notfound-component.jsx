import React from 'react';
import HeaderComponent from "./header-component";

export class NotfoundComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='main-container'>
                    <h1>404 Page Not Found</h1>
                </div>
            </div>
        )
    }
}
