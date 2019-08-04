import React, {Component} from 'react';
import Panel from '../elements/panel';
import Input from '../elements/input.js';
import Button from '../elements/button.js';
import $ from 'jquery';
import { Link } from 'react-router-dom'

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			passwordConfirm: '',
			email: '',
			birth: new Date()
		}
	}
	
	getElements() {
		const title = <div className="item"><h2>Cadastre-se</h2></div>
		const inputName = <div className="item"><Input type='text' name='name' id='name' class='input' placeholder='Informe seu nome...'/></div>;
		const inputPassword = <div className="item"><Input type='password' name='password' id='password' class='input' placeholder='Informe sua senha...'/></div>;
		const inputPasswordConfirm = <div className="item"><Input type='password' name='passwordConfirm' id='passwordConfirm' class='input' placeholder='Confirme sua senha...'/></div>;
		const inputEmail = <div className="item"><Input type='text' name='email' id='email' class='input' placeholder='Informe seu email...'/></div>;
		const inputBirth = <div className="item"><Input type='date' name='birth' id='birth' class='input' placeholder='Informe sua data de nascimento...'/></div>;
		const buttonRegister= <Button className='item btn btn--success' text='Cadastrar' onClick={this.getData}/>
		const buttonBack= <Link className='item btn btn--primary' to="/register">Voltar</Link>
    	console.log(this.state)  
	
		return [
			title,
			inputName,
			inputPassword,
			inputPasswordConfirm,
			inputEmail,
			inputBirth,
			buttonRegister,
			buttonBack
		];
	}

	render() {
		const elements = this.getElements();
		return (
			<div className="register-container-grid">
				<Panel className='panel grid-container' content={elements}/>
			</div>
		)
	}
}

export default Register;