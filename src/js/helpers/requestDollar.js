import axios from 'axios';

function getDollar(startDate, endDate, qnt = 100) {
    let url = process.env.REACT_APP_AWESOME_API + '/USD-BRL' + '/' + qnt;

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

export default getDollar;