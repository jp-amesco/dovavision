import React, {Component} from 'react'
import requestStock from '../../helpers/requestStock';

class StockList extends Component {
    constructor(props) {
        super(props);
        this.timeSeries = {}

        this.state = {
            listData: false
        };
    }

    // componentDidMount() {
    //     if (!this.state.listData) {
    //         this.getData();
    //     }
    // }

    async getData() {
        this.timeSeries = await requestStock('TIME_SERIES_INTRADAY', 'MGLU3.SA', '5min')
        this.setState({
            listData: true
        })
    }

    render() {
        return <div className='col'>
            <div className='panel panel-teste-1'>
                
            </div>
        </div>
    }
}

export default StockList;