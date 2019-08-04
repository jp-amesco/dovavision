import React, {Component} from 'react';

class Input extends Component {
  render() {
    return <input 
    	type={this.props.type} 
    	name={this.props.name} 
    	id={this.props.id} 
    	className={this.props.class} 
    	placeholder={this.props.placeholder}
    />
  }
}

export default Input;