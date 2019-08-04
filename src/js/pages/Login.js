import React, {Component} from 'react';
import Panel from '../components/panel';
import Button from '../components/button.js';
import Input from '../components/input.js';
import $ from 'jquery';
import Request from '../helpers/request.js'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: '',
      password: ''
    };
    this.getData = this.getData.bind(this);
  }

  getData () {
    const request = new Request();
    this.setState({
      username: $('#email').val(),
      password: $('#password').val()
    }, () => {
      request.post(this.state, 'http://127.0.0.1:8000/login/')
        .done(function (data) {
          console.log(data);
        })
        .fail(function (error) {
          console.log(error)
        }); 
    });    
  }

  render() {
    let label = <h2>Login</h2>
  	let inputEmail = <div className="item"><Input type='text' name='email' id='email' class='input input--transparent' placeholder='Email...'/></div>;
  	let inputPassword = <div className="item"><Input type='password' name='password' id='password' class='input input--transparent' placeholder='Senha'/></div>;
  	let buttons = <div className="item subgrid">
      <Button class='subgrid--item btn btn--success' text='Entrar' onClick={this.getData}/>
      <Link className='subgrid--item btn btn--primary' to="/register">Castratar</Link>
    </div>
	  let content = [label, inputEmail, inputPassword, buttons]; 
    return (
      <div className='login-container-grid'>
     	  <Panel class='panel grid-container' content={content}/>
      </div>
    );
  }
}

export default Login;
