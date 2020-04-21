import React, { Component } from 'react'
import Select from '../../elements/select'
import { connect } from 'react-redux';
import requestStock from '../../helpers/requestStock';
import * as StockActions from '../../store/actions/stock'
import axios from 'axios';

class StockName extends Component {
    constructor(props) {
        super(props);
        this.sendRequest = this.sendRequest.bind(this)
        this.toggleCompany = this.toggleCompany.bind(this)
        this.state = {
            companyOptions: [],
            stockOptions: [],
            accessToken: localStorage.getItem('accessToken')
        }
    }

    componentDidMount() {
        this.setCompanyOptions();
    }

    setCompanyOptions() {
        this.makeRequest('GET', 'company')
            .then(res => {
                this.setState({
                    companyOptions: res.data
                })
                this.setStockOptions(res.data[0].id)
            }).catch(error => {
                console.log(error.response)
            })
    }

    setStockOptions(id) {
        this.makeRequest('GET', 'company/' + id + '/stocks')
            .then(res => {
                this.setState({
                    stockOptions: res.data
                })
                this.sendRequest(res.data[0].api_name, this.props.interval)
            }).catch(error => {
                console.log(error)
            })
    }

    makeRequest(method, url) {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: { Authorization: 'Bearer ' + this.state.accessToken }
        })

        return axiosInstance({
            method: method,
            url: url
        });
    }

    toggleCompany(e) {
        this.setStockOptions(e.target.value);
    }

    changeStockName(e) {
        this.sendRequest(e.target.value, this.props.interval);
    }

    changeIntervalChart(e) {
        this.sendRequest(this.props.stockName, e.target.value)
    }

    makeCompanyOptions() {
        const options = {};
        for (let i = 0; i < this.state.companyOptions.length; i++) {
            options[this.state.companyOptions[i].id] = this.state.companyOptions[i].name;
        }
        return options;
    }

    makeStockOptions() {
        const options = {};
        for (let i = 0; i < this.state.stockOptions.length; i++) {
            options[this.state.stockOptions[i].api_name] = this.state.stockOptions[i].name;
        }
        return options;
    }

    async sendRequest(stockName, interval) {
        const timeSeries = await requestStock('TIME_SERIES_INTRADAY', stockName, interval);
        return this.props.toggleStockInfo(stockName, timeSeries, interval);
    }

    render() {
        return <div className='panel panel-stock-name'> 
            <div className='row company-name'>
                <h1 className=''>Magazine Luiza</h1>
            </div>
            <div className='row'>
                <div className='chart-options'>
                    <Select options={this.makeCompanyOptions()} size='small' changeStockName={this.toggleCompany.bind(this)} />
                    <Select options={this.makeStockOptions()} size='small' />
                </div>
            </div>
            <div className='row'>
                <div className='chart-options'>
                    <Select options={['Area']} size='small' />
                    <Select options={{ '60min': '60 minutos', '30min': '30 minutos', '15min': '15 minutos', '5min': '5 minutos' }} size='small' changeStockName={this.changeIntervalChart.bind(this)}/>
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