import $ from 'jquery'; 
import { connect } from 'react-redux';
import signIn from '../helpers/signIn';
import React, {Component} from 'react';
import Input from '../elements/input.js';
import Button from '../elements/button.js';
import Message from '../elements/message.js';
import { Link } from 'react-router-dom';
import * as AuthenticationActions from '../store/actions/authenticated';

// require('dotenv').config()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorLogin: false
    };
    this.errorMessage = this.errorMessage.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        email: this.props.location.state.email,
        password: this.props.location.state.password,
        errorLogin: this.props.location.state.errorLogin
      });
    }
    const { history } = this.props;
    //use the state via location.state
    //and replace the state via
    history.replace()
  }

  /**
   *  efetua o login
   */
  login() {
    const email = $('#email').val();
    const password = $('#password').val();
    const response = signIn(email, password);
    response.then(res => {
      if (res.status === 200) {
        this.props.authenticated(
          res.data.access_token, 
          res.data.refresh_token
        )
        localStorage.setItem('accessToken', res.data.access_token);
        this.props.history.push('/home');
      } else {
        this.setState({
          errorLogin: true
        }) 
      }
    }).catch(error => {

    })
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
    let login = <div className='item'><Button className='btn btn--success' text='Entrar' onClick={this.login} /></div>;
    let cadastrar = <div className='item'><Link className='btn btn--primary' to="/register">Cadastrar</Link></div>;

    return (
      <div className='login-container-grid'>
        {errorMessage}
        <div className='panel grid-container'>
          {label}
          {inputEmail}
          {inputPassword}
          {login}
          {cadastrar}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  authenticated: (accessToken, refreshToken) => dispatch(
    AuthenticationActions.authenticated(accessToken, refreshToken)
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
