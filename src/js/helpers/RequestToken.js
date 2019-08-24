import axios from 'axios'

class RequestToken {
    constructor() {

    }

    getAccessToken(data, url) {
        return axios.post(url + '/o/token/', data)
            .then(res => {
                return res;
            }).catch(error => {
                return error.response;
            });
    }
}

export {RequestToken as default};