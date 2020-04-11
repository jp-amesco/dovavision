import { connect } from 'react-redux';
import React, { Component } from 'react';
import AreaChart from '../graphs/AreaChart';
import formatDate from '../../helpers/formatDate';
import getDollar from '../../helpers/requestDollar'

class GraphPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priceDaily: {}
        }
    }
    
    componentDidMount() {
        this.formatData();
    }

    makeChart() {
        return <AreaChart 
            stockName={this.props.stockName} 
            data={this.state.priceDaily}
            color='#0080e0'
        />
    }


    async formatData() {
        let endDate = new Date();
        let startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        endDate = endDate.toISOString().split('T')[0].replace(/-/g, '');
        startDate = startDate.toISOString().split('T')[0].replace(/-/g, '');

        let dollarPrices = await getDollar(startDate, endDate)
        let priceDaily = {
            label: [],
            timeSeries: []
        }

        for (let i = 0; i < dollarPrices.length; i++) {
            priceDaily.label.push(formatDate(new Date(dollarPrices[i].timestamp * 1000), true));
            priceDaily.timeSeries.push(parseFloat(dollarPrices[i].bid).toFixed(2));
        } 

        priceDaily.label = priceDaily.label.reverse();
        priceDaily.timeSeries = priceDaily.timeSeries.reverse();

        this.setState({
            priceDaily: priceDaily
        });
    }

    render() {
        return <div className='col panel-graph'>
            {
                Object.keys(this.state.priceDaily).length 
                    ? this.makeChart()
                    : null
            }
        </div>
    }
}

export default connect(
    state => ({ stockName: state.stock.activeStock, timeSeries: state.stock.timeSeries })
)(GraphPanel);
