import React, { Component } from 'react';
import AreaChart from '../graphs/AreaChart';
import { connect } from 'react-redux';

class GraphPanel extends Component {
    constructor(props) {
        super(props);
    }

    makeChart() {
        return <AreaChart 
            timeSeries={this.props.timeSeries} 
            stockName={this.props.stockName} 
        />
    }

    formatData() {
        // for (const date in this.timeSeries) {
        //     let cordenates = {};
        //     let prices = [];
        //     for (const key in this.timeSeries[date]) {
        //         let volume = Object.keys(this.timeSeries[date]).pop()
        //         if (volume !== key) {
        //             prices.push(parseFloat(this.timeSeries[date][key]).toFixed(2))
        //         }
        //     }
        //     cordenates = {
        //         x: new Date(date),
        //         y: prices
        //     }
        //     data.push(cordenates);
        // }
    }

    render() {
        return <div className='col panel-graph'>
            {this.makeChart()}
        </div>
    }
}

export default connect(state => ({ stockName: state.stock.activeStock, timeSeries: state.stock.timeSeries }))(GraphPanel);
