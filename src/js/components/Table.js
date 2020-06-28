import React, { Component } from "react";

class Table extends Component {

    makeHeader() {
        let headers = [];
        for (let i = 0; i < this.props.headers.length; i++) {
            let width = 40;
            if (i === 1) {
                width = 20;
            }
            let th = <th className={`header w-${width}`} key={i.toString()}>{this.props.headers[i]}</th>
            headers.push(th);
        }
        return headers;
    }

    makeLine() {
        let content = []
        for (let i = 0; i < this.props.content.length; i++) {
            const line = <tr className='line' key={i.toString()}>{this.makeContent(this.props.content[i])}</tr>     
            content.push(line);
        }
        return content;
    }

    makeContent(content) {
        let line = []
        for (let i = 0; i < content.length; i++) {
            let width = 40;
            if (i === 1) {
                width = 20;
            }
            const td = <td className={`w-${width}`} key={i.toString()}>{content[i]}</td>;
            line.push(td);
        }
        return line;
    }

    render() {
        return <table className='table'>
            <thead>
                <tr>
                    {this.makeHeader()}
                </tr>
            </thead>
            <tbody>
                {this.makeLine()}
            </tbody>
        </table>  
    }
}

export default Table;