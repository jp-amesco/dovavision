import $ from 'jquery';
import axios from 'axios'
import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../elements/input.js';
import singIn from '../helpers/signIn.js';
import DatePicker from 'react-datepicker';
import Button from '../elements/button.js';
import Message from '../elements/message.js';
import 'react-datepicker/dist/react-datepicker.css';
import * as AuthenticationActions from '../store/actions/authenticated';
require('dotenv').config()

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      passwordConfirm: '',
      email: '',
      birth: new Date(),
      errorMessage: '',
      errorRegister: '',
      url: process.env.REACT_APP_API_URL
    }
    this.getData = this.getData.bind(this);
    this.register = this.register.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.changeBirth = this.changeBirth.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        email: this.props.location.state.email,
        name: this.props.location.state.name,
        password: this.props.location.state.password,
        confirmPassword: this.props.location.state.confirmPassword,
        birth: this.props.location.state.props,
        errorMessage: this.props.location.state.errorMessage,
        errorRegister: false
      });
    }
    const { history } = this.props;
    //use the state via location.state
    //and replace the state via
    history.replace()
  }

  changeBirth(date) {
    this.setState({
      birth: date
    })
  }

  getData() {
    this.setState({
      name: $('#name').val(),
      password: $('#password').val(),
      confirmPassword: $('#passwordConfirm').val(),
      email: $('#email').val(),
      errorMessage: '',
      errorRegister: false,
    }, () => this.register())
  }

  register() {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorRegister: true,
        errorMessage: 'As senhas precisam ser iguais'
      });
      return;
    }

    const data = {
      name: this.state.name,
      date_of_birth: moment(this.state.birth).format('YYYY-MM-DD'),
      email: this.state.email,
      password: this.state.password
    }

    axios.post(this.state.url + 'user', data)
      .then(res => {
        const response = singIn(
          res.data.email,
          this.state.password
        );

        response.then(res => {
          if (res.status === 200) {
            this.props.authenticated(
              res.data.access_token,
              res.data.refresh_token
            )
            localStorage.setItem('accessToken', res.data.access_token);
            this.props.history.push('/home');
          }
        })
      }).catch(error => {
        console.log(error.response)
        this.setState({
          errorRegister: true,
          errorMessage: 'Dados inválido, tente novamente'
        });
      })
  }

  errorMessage() {
    return <Message
      message={this.state.errorMessage}
      type='error'
    />
  }

  render() {
    let errorMessage;
    if (this.state.errorRegister) {
      errorMessage = this.errorMessage();
    }
    const title = <div className="item"><h2 className='title'>Cadastre-se</h2></div>
    const inputName = <div className="item"><Input uniqueKey='name' type='text' name='name' id='name' className='input' placeholder='Informe seu nome...' /></div>;
    const inputPassword = <div className="item"><Input uniqueKey='password' type='password' name='password' id='password' className='input' placeholder='Informe sua senha...' /></div>;
    const inputPasswordConfirm = <div className="item"><Input uniqueKey='passwordConfirm' type='password' name='passwordConfirm' id='passwordConfirm' className='input' placeholder='Confirme sua senha...' /></div>;
    const inputEmail = <div className="item"><Input uniqueKey='email' type='text' name='email' id='email' className='input' placeholder='Informe seu email...' /></div>;
    const inputBirth = <div className="item"><DatePicker onChange={this.changeBirth} selected={this.state.birth} dateFormat="dd/MM/yyyy" name='birth' id='birth' className='input' placeholder='Informe sua data de nascimento...' /></div>;
    const buttonRegister = <Button className='item btn btn--success' text='Cadastrar' onClick={this.getData} />
    const buttonBack = <Link className='item btn btn--primary' to="/login">Voltar</Link>

    return (
      <div className="register-container-grid with-image">
        {errorMessage}
        <div className='panel grid-container'>
          {title}
          {inputName}
          {inputPassword}
          {inputPasswordConfirm}
          {inputEmail}
          {inputBirth}
          {buttonRegister}
          {buttonBack}
        </div>
      </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);