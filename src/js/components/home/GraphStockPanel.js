import { connect } from 'react-redux';
import React, { Component } from 'react';
import AreaChart from '../graphs/AreaChart';
import formatDate from '../../helpers/formatDate';

class GraphPanel extends Component {
    constructor(props) {
        super(props);
    }

    makeChart() {
        return <AreaChart 
            stockName={this.props.stockName} 
            data={this.formatData()}
            color='#0080e0'
        />
    }

    formatData() {
        let priceDaily = {
            label: [],
            timeSeries: []
        };

        for (const date in this.props.timeSeries) {
            priceDaily.label.push(formatDate(new Date(date), true));
            priceDaily.timeSeries.push(parseFloat(this.props.timeSeries[date]['4. close']).toFixed(2));
        }
        return priceDaily;
    }

    // formatData() {
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
    // }

    render() {
        return <div className='col panel-graph'>
            {this.makeChart()}
        </div>
    }
}

export default connect(state => ({ stockName: state.stock.activeStock, timeSeries: state.stock.timeSeries }))(GraphPanel);
