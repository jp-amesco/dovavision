import React, {Component} from 'react';
import $ from 'jquery'; 

class Message extends Component {

    componentDidMount() {
        $('#message').animate({opacity: 0}, 2500);
    }

    render() {
        return <div 
            id='message' 
            className={
                `message message--${this.props.type}`}
            >
            <strong>{this.props.message}</strong>
            </div>
    }
}

export default Message;