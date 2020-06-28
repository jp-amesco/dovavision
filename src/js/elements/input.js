import React, {Component} from 'react';

class Input extends Component {
  render() {
  	const response = [];

	if (this.props.label) {
		const label = <labe className={this.props.labelClass}>{this.props.label}</labe>
		response.push(label);
	}
	const input =  <input 
		key={this.props.uniqueKey}
    	type={this.props.type} 
    	name={this.props.name} 
    	id={this.props.id} 
    	className={this.props.className} 
		placeholder={this.props.placeholder}
		defaultValue={this.props.value}
    />; 
	response.push(input);

    return response;
  }
}

export default Input;