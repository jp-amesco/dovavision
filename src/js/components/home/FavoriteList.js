import axios from 'axios';
import Table from '../Table.js';
import React, {Component} from 'react'
import { connect } from 'react-redux';
import Currency from '../../helpers/Currency';

class FavoriteList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: [],
            height: 458
        }

        this.getData = this.getData.bind(this)
        this.calcHeight = this.calcHeight.bind(this)
    }
   
    componentDidMount() {
        this.getData();
        window.addEventListener('resize', this.calcHeight)
        this.calcHeight();
    }

    calcHeight() {
        if (window.innerHeight < 900) {
            this.setState({
                height: 285
            });
        } else {
            this.setState({
                height: 458
            });
        }
    }

    getData() {
        let content = [];
        const stocks = this.props.user.stock_set ?? [];
        for (let i = 0 ; i < stocks.length; i++) {
            content.push([
                stocks[i].company.name,
                stocks[i].name
            ]);
        }
        return content;
    }

    makeRequest(method, url) {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: { Authorization: 'Bearer ' + this.props.accessToken }
        })

        return axiosInstance({
            method: method,
            url: url
        });
    }

    render() {
        return <div className='col pd-top'>
            <div className='panel panel-table' style={{height: this.state.height}}>
                <Table headers={['Nome', 'Código']} content={this.getData()}/>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    accessToken: state.user.accessToken
});

export default connect(mapStateToProps)(FavoriteList);