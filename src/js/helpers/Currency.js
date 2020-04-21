import axios from 'axios';

class Currency{

    getCurrency(startDate, endDate, qnt = 100) {
        let url = process.env.REACT_APP_AWESOME_API + '/USD-BRL/' + qnt;
        
        return axios.get(url, {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            return error.error
        })
    }

    getAllCurrency() {
        let url = process.env.REACT_APP_AWESOME_API + '/json/all';
        return axios.get(url)
            .then(res => {
                return res.data
            }).catch(error => {
                return error.data
            })
    }
}

export default Currency;