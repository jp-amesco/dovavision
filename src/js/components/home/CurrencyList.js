import React, {Component} from 'react'
import Currency from '../../helpers/Currency';
import Table from '../Table.js';

class CurrencyList extends Component {
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

    async getData() {
        let currency = new Currency();
        let data = await currency.getAllCurrency();
        let content = [];
        for (const key in data) {
            let currency = [
                data[key].name,
                data[key].code,
                'R$ ' + parseFloat(data[key].bid).toFixed(2)
            ];
            content.push(currency);
        }

        this.setState({
            content: content
        })
    }

    render() {
        return <div className='col pd-top'>
            <div className='panel panel-table' style={{height: this.state.height}}>
                <Table headers={['Nome', 'Código', 'Preço']} content={this.state.content}/>
            </div>
        </div>
    }
}

export default CurrencyList;