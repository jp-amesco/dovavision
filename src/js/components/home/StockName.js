import React, { Component } from 'react'
import Select from '../../elements/select'
import { connect } from 'react-redux';
import requestStock from '../../helpers/requestStock';
import * as StockActions from '../../store/actions/stock'
import axios from 'axios';
import $ from 'jquery';

class StockName extends Component {
    constructor(props) {
        super(props);
        this.sendRequest = this.sendRequest.bind(this)
        this.toggleCompany = this.toggleCompany.bind(this)
        this.state = {
            companyOptions: [],
            stockOptions: [],
            accessToken: localStorage.getItem('accessToken'),
            companyName: ''
        }
    }

    componentDidMount() {
        this.setCompanyOptions();
    }

    setCompanyOptions() {
        this.makeRequest('GET', 'company')
            .then(res => {
                this.setState({
                    companyOptions: res.data,
                })
                this.setStockOptions(res.data[0].id, res.data[0].name)
            }).catch(error => {
                console.log(error.response)
            })
    }

    setStockOptions(id, companyName) {
        this.makeRequest('GET', 'company/' + id + '/stocks')
            .then(res => {
                this.setState({
                    stockOptions: res.data,
                    companyName: companyName
                })
                if (res.data.length > 0) {
                    this.predictValue(res.data[0])
                }
            }).catch(error => {
                console.log(error)
            })
    }

    predictValue(stock) {
        this.makeRequest('GET', 'stock/' + stock.id + '/predict')
            .then(res => {
                this.sendRequest(stock, this.props.interval, res.data.move, res.data.price)    
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
        this.setStockOptions(e.target.value, $(e.target).find('option:selected').text());
    }

    changeStockName(e) {
        this.sendRequest(e.target.value, this.props.interval);
    }

    changeIntervalChart(e) {
        this.sendRequest(this.props.stock, e.target.value, this.props.move, this.props.futurePrice)
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

    async sendRequest(stock, interval, move, futurePrice) {
        let favouriteStocks = this.props.user.stock_set;
        let isFavourite = false;
        for (let i = 0; i < favouriteStocks.length; i++) {
            if (stock.id === favouriteStocks[i].id) {
                isFavourite = true;
            }
        }
        this.props.setFavourite(isFavourite);
        const timeSeries = await requestStock('TIME_SERIES_INTRADAY', stock.api_name, interval);
        return this.props.toggleStockInfo(stock, timeSeries, interval, move, futurePrice);
    }
    
    render() {
        return <div className='panel panel-stock-name'>
            <div className='row company-name'>
                <h1 className=''>{this.state.companyName}</h1>
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
    stock: state.stock.stock,
    interval: state.stock.interval,
    user: state.user.user,
    move: state.stock.move,
    futurePrice: state.stock.futurePrice,
});

const mapDispatchToProps = dispatch => ({
    toggleStockInfo: (stock, timeSeries, interval, move, futurePrice) => dispatch(StockActions.toggleStockInfo(stock, timeSeries, interval, move, futurePrice)),
    setFavourite: (isFavourite) => dispatch(StockActions.setFavourite(isFavourite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockName);