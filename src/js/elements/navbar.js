import React, { Component } from 'react';
import { GoGrabber, GoGlobe } from 'react-icons/go';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
           opened: false
        };
        this.openCloseNav = this.openCloseNav.bind(this);
    }

    openCloseNav() {
        this.setState({
            opened: !this.state.opened
        })
    }

    navbar() {
        let icon = this.state.opened 
            ? <GoGlobe size={40} className='navbar--icon' /> 
            : <GoGrabber size={40} className='navbar--icon' /> 

        return <div className={`navbar navbar-${this.state.opened ? 'opened': 'closed'}`}>
            <button onClick={this.openCloseNav}>
                {icon}
            </button>
        </div>
    }

    render() {
        return this.navbar();
    }
}

export default Navbar;