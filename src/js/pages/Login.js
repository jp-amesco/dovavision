import React, {Component} from 'react';
import Button from '../elements/button.js';
import Input from '../elements/input.js';
import $ from 'jquery'; 
import { Link } from 'react-router-dom';
import Authentication from '../helpers/Authentication';
import Message from '../elements/message.js';
require('dotenv').config()


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorLogin: false
    };
    this.errorMessage = this.errorMessage.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state) {
      this.setState({
        email: this.props.location.state.email,
        password: this.props.location.state.password,
        errorLogin: this.props.location.state.errorLogin
      });
    }
    const { location, history } = this.props;
    //use the state via location.state
    //and replace the state via
    history.replace()
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
      let errorLogin = false;
      if (value.data.error !== undefined) {
        errorLogin = true; 
      }

      this.props.history.replace(
        '/home',
        {
          email: this.state.email,
          password: this.state.password,
          token: value.data.access_token,
          refreshToken: value.data.refresh_token,
          errorLogin: errorLogin 
        }
      );
    });
  }

  errorMessage() {
    return <Message 
      message='Email ou senha incorretos, tente novamente'
      type='error' 
    />
  }

  render() {
    let inputClass = 'input'; 
    let errorMessage;
    if (this.state.errorLogin) {
      errorMessage = this.errorMessage();
    }
    let label = <h2 className='title'>Login</h2>
  	let inputEmail = <div className="item"><Input uniqueKey='email' type='text' name='email' id='email' className={inputClass} placeholder='Email...' /></div>;
    let inputPassword = <div className="item" ><Input uniqueKey='password' type='password' name='password' id='password' className={inputClass} placeholder='Senha...'/></div>;
  	let buttons = <div className="item subgrid">
      <Button className='subgrid--item btn btn--success' text='Entrar' onClick={this.signIn}/>
      <Link className='subgrid--item btn btn--primary' to="/register">Cadastrar</Link>
    </div>

    return (
      <div className='login-container-grid'>
        {errorMessage}
        <div className='panel grid-container'>
          {label}
          {inputEmail}
          {inputPassword}
          {buttons}
        </div>
      </div>
    );
  }
}

export default Login;
