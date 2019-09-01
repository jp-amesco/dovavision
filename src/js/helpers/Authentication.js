import axios from 'axios';


class Authentication {
    constructor() {
        this.url = process.env.REACT_APP_API_URL;
        this.clientId = process.env.REACT_APP_CLIENT_ID;
        this.clientSecret = process.env.REACT_APP_CLIENT_SECRET;  
    }
    
    /** Verifica se o usuario está autenticado */
    isAuthenticated (props) {
        if (!props.location.token) { 
            return false;
        }
        return true;
    }

    /** Faz a requisição to token de acesso do usuário */
    async requestToken(email, password) {
        const data = {
            grant_type: 'password',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            username: email,
            password: password
        }  
        return await axios.post(this.url + '/o/token/', data)
            .then(res => {
                return res;
            }).catch(error => {
                return {
                    status: error.response.status,
                    data: error.response.data
                }
            });
    }
}
    
export default Authentication; 