import React, {Component} from 'react';

class MyButton extends Component {
  render() {
    return <button className={this.props.class} onClick={this.props.onClick}>{this.props.text}</button>;
  }
}

export default MyButton;