import React, {Component} from 'react';
import Panel from '../elements/panel';
import Button from '../elements/button.js';
import Input from '../elements/input.js';
import $ from 'jquery'; 
import { Link } from 'react-router-dom';
import RequestToken from '../helpers/RequestToken';
require('dotenv').config()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      refreshToken: '',
      username: '',
      password: '',
      url: 'http://localhost:8000',
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      grantType: 'password'
    };
    this.getData = this.getData.bind(this);
  }

  /**
   *  obtém os dados informados no login
   */
  getData() {
    /**
    * passamos a função de login como callback porque o setState é assincrono
    * então o login tem q ocorrer depois que obtemos os dados do usuário
    * o bind é utilizado para que o this seja referente a classe e não a função
    */
    this.setState({
      username: $('#email').val(),
      password: $('#password').val()
    }, this.login.bind(this));
  }
  
  /**
   *  efetua a requisição dos tokens para autenticação
   */
  async login() {
    const data = {
      grant_type: this.state.grantType,
      client_id: this.state.clientId,
      client_secret: this.state.clientSecret,
      username: this.state.username,
      password: this.state.password
    }

    const requestToken = new RequestToken();
    const response = await requestToken.getAccessToken(data, this.state.url);
    if (response.status === 200) {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
    // this.setState({
    //   token: response.access_token,
    //   refreshToken: response.refresh_token
    // });
  }

        // axios.get('https://www.alphavantage.co/query', {
        //   params: {
        //     function: 'TIME_SERIES_DAILY',
        //     symbol: 'MGLU3.SAO',
        //     apikey: '8FT0NHJ333EUA1VA',
        //     interval: '5min'
        //   }
        // })
        // .then(function (response) {
        //   console.log(response.data);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // })
        


  render() {
    let label = <h2>Login</h2>
  	let inputEmail = <div className="item"><Input type='text' name='email' id='email' class='input input--transparent' placeholder='Email...'/></div>;
  	let inputPassword = <div className="item"><Input type='password' name='password' id='password' class='input input--transparent' placeholder='Senha'/></div>;
  	let buttons = <div className="item subgrid">
      <Button className='subgrid--item btn btn--success' text='Entrar' onClick={this.getData}/>
      <Link className='subgrid--item btn btn--primary' to="/register">Castratar</Link>
    </div>
	  let content = [label, inputEmail, inputPassword, buttons]; 
    return (
      <div className='login-container-grid'>
     	  <Panel className='panel grid-container' content={content}/>
      </div>
    );
  }
}

export default Login;
