import { connect } from 'react-redux';
import React, { Component } from 'react';
import AreaChart from '../graphs/AreaChart';
import formatDate from '../../helpers/formatDate';

class GraphPanelStock extends Component {

    makeChart() {
        return <AreaChart 
            stockName={this.props.stockName} 
            data={this.formatData()}
            color='#0080e0'
            title='Gráfico do preço das ações'
            subtitle='Movimento dos preços'
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

    render() {
        return <div className='col panel-graph'>
            {this.makeChart()}
        </div>
    }
}

export default connect(state => ({ stockName: state.stock.stock.api_name, timeSeries: state.stock.timeSeries }))(GraphPanelStock);
