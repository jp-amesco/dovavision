import React, { Component } from "react";

class Select extends Component {
    constructor(props) {
        super(props);
    }

    makeOptions() {
        const options = [];
        if (this.props.options !== undefined) {
            for (const key in this.props.options) {
                options.push(<option className={`option option--${this.props.size}`} value={key}>{this.props.options[key]}</option>);
            }
        }
        return options;
    }   

    render() {
        return <select className={`select select--${this.props.size}`} onChange={this.props.changeStockName}>
            {this.makeOptions()}
        </select>
    }
}

export default Select