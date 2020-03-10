import React, { Component } from 'react'
import Select from '../../elements/select'
import { connect } from 'react-redux';
import requestStock from '../../helpers/requestStock';
import * as StockActions from '../../store/actions/stock'

class StockName extends Component {
    constructor(props) {
        super(props);
        this.sendRequest = this.sendRequest.bind(this)
    }

    componentDidMount() {
        this.sendRequest(this.props.stockName, this.props.interval);
    }

    changeStockName(e) {
        this.sendRequest(e.target.value, this.props.interval);
    }

    changeIntervalChart(e) {
        this.sendRequest(this.props.stockName, e.target.value)
    }

    async sendRequest(stockName, interval) {
        const timeSeries = await requestStock('TIME_SERIES_INTRADAY', stockName, interval);
        return this.props.toggleStockInfo(stockName, timeSeries, interval);
    }

    render() {
        return <div className='panel panel-stock-name'> 
            <div className='row company-name'>
                <h1 class=''>Magazine Luiza</h1>
            </div>
            <div className='row'>
                <div className='chart-options'>
                    <Select options={['Area']} size='small' />
                    <Select options={{ '60min': '60 minutos', '30min': '30 minutos', '15min': '15 minutos', '5min': '5 minutos' }} size='small' changeStockName={this.changeIntervalChart.bind(this)}/>
                </div>
            </div>
            <div className='row'>
                <div className='chart-options'>
                    <Select options={['MGLU3.SA']} size='small' />
                    <Select options={{ '60min': '60 minutos', '30min': '30 minutos', '15min': '15 minutos', '5min': '5 minutos' }} size='small' changeStockName={this.changeIntervalChart.bind(this)} />
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    stockName: state.stock.activeStock,
    interval: state.stock.interval
});

const mapDispatchToProps = dispatch => ({
    toggleStockInfo: (stockName, timeSeries, interval) => dispatch(StockActions.toggleStockInfo(stockName, timeSeries, interval)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockName);