import React, {Component} from 'react';

class MyButton extends Component {
  render() {
    return <button className={this.props.className} onClick={this.props.onClick}>{this.props.text}</button>;
  }
}

export default MyButton;