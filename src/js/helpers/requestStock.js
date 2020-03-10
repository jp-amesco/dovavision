import axios from 'axios';

function getStock(func, symbol, interval) {
    let url = process.env.REACT_APP_ALPHA_VANTAGE_URL;
    return axios.get(url, {
        params: {
            function: func,
            symbol: symbol,
            apikey: process.env.REACT_APP_ALPHA_VANTAGE_KEY,
            interval: interval,
            outputsize: 'compact'
        }    
    }).then(res => {
        return res.data['Time Series (' + interval + ')']
    }).catch(error => {
        return error.error
    })
}

export default getStock;