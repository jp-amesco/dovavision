import React, {Component} from 'react';
import Button from '../elements/button.js';
import Input from '../elements/input.js';
import $ from 'jquery'; 
import { Link } from 'react-router-dom';
import Authentication from '../helpers/Authentication';
require('dotenv').config()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.signIn = this.signIn.bind(this);
  }

  /**
   *  efetua o login
   */
  signIn() {
    const auth = new Authentication();
    const email = $('#email').val();
    const password = $('#password').val();

    const response = auth.requestToken(email, password);
    response.then(value => {
      if (value.data.error !== undefined) {
        console.log('asdasd'); 
      }
      this.props.history.push(
        {
          pathname: '/home',
          token: value.data.access_token,
          refreshToken: value.data.refresh_token
        }
      );
    });
  }

  render() {
    let label = <h2>Login</h2>
  	let inputEmail = <div className="item"><Input uniqueKey='email' type='text' name='email' id='email' class='input input--transparent' placeholder='Email...'/></div>;
    let inputPassword = <div className="item"><Input uniqueKey='password' type='password' name='password' id='password' class='input input--transparent' placeholder='Senha'/></div>;
  	let buttons = <div className="item subgrid">
      <Button className='subgrid--item btn btn--success' text='Entrar' onClick={this.signIn}/>
      <Link className='subgrid--item btn btn--primary' to="/register">Castratar</Link>
    </div>

    return (
      <div className='login-container-grid'>
        <div className='login-container-grid'>
          <div className='panel grid-container'>
            {label}
            {inputEmail}
            {inputPassword}
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
