import $ from 'jquery';
import axios from 'axios'
import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Input from '../elements/input.js';
import DatePicker from 'react-datepicker';
import Button from '../elements/button.js';
import * as UserActions from '../store/actions/user'; 
import * as ModalActions from '../store/actions/modal';

class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            birth: new Date(),
            errorMessage: '',
            errorRegister: '',
            url: process.env.REACT_APP_API_URL
        }
        this.closeModal = this.closeModal.bind(this)
        this.changeBirth = this.changeBirth.bind(this);
        this.getData = this.getData.bind(this);
    }

    closeModal () {
        this.props.toggleProfile(!this.props.isOpen);
    }

    changeBirth(date) {
        this.setState({
            birth: date
        })
    }

    getData() {
        this.setState({
            name: $('#name').val(),
            email: $('#email').val(),
            birth: this.state.birt,
            errorMessage: '',
            errorRegister: false,
        }, () => this.update())
    }

    async update() {
        const data = {
            name: this.state.name,
            date_of_birth: moment(this.state.birth).format('YYYY-MM-DD'),
            email: this.state.email,
            password: this.state.password
        }

        const axiosInstance = axios.create({
            baseURL: this.state.url,
            headers: { Authorization: 'Bearer ' + this.props.accessToken }
        })

        await axiosInstance({
            method: 'PATCH',
            url: 'user/' + this.props.user.id, 
            data: data
        }).then(res => {
            this.props.toggleUser(res.data)
            this.closeModal()
        }).catch(error => {
            console.log(error.response)
            // this.setState({
            //   errorRegister: true,
            //   errorMessage: error.response.data['email'][0]
            // });
        })
    }

    render() {
        return (
            <div className='panel grid-container'>
                <div className="item">
                    <h2 className='title'>Atualizar dados</h2>
                </div>
                <div className="item">
                    <Input uniqueKey='name' type='text' name='name' id='name' className='input' placeholder='Informe seu nome...' value={this.props.user.name} />
                </div>
                <div className="item">
                    <Input uniqueKey='email' type='text' name='email' id='email' className='input' placeholder='Informe seu email...' value={this.props.user.email} />
                </div>
                <div className="item">
                    <DatePicker onChange={this.changeBirth} selected={this.state.birth} dateFormat="dd/MM/yyyy" name='birth' id='birth' className='input' placeholder='Informe sua data de nascimento...' />
                </div>
                <Button className='item btn btn--success' text='Atualizar' onClick={this.getData} />
                <Button className='item btn btn--danger' text='Fechar' onClick={this.closeModal} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    accessToken: state.user.accessToken,
    isOpen: state.modal.profileModalIsOpen
});

const mapDispatchToProps = dispatch => ({
    toggleProfile: (isOpen) => dispatch(ModalActions.toggleProfile(isOpen)),
    toggleUser: (user) => dispatch(UserActions.toggleUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);