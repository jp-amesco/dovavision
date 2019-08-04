import React, {Component} from 'react';

class Panel extends Component {
  render() {
    return <div className={this.props.className}>{this.props.content}</div>;
  }
}

export default Panel;