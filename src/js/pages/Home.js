import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return <h1>{this.props.token}</h1>;
    }
}

export default Home;