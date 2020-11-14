import React, { Component } from 'react';
import { GoThreeBars } from 'react-icons/go';
import { RiCloseLine, RiLogoutBoxLine } from 'react-icons/ri';
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip"
import axios from 'axios';
import * as StockActions from '../store/actions/stock';
import * as AuthenticationActions from '../store/actions/authenticated';
import * as ModalActions from '../store/actions/modal';
import * as UserActions from '../store/actions/user'; 

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
           opened: false
        };
        this.openCloseNav = this.openCloseNav.bind(this);
        this.addFavouriteStock = this.addFavouriteStock.bind(this);
        this.removeFavouriteStock = this.removeFavouriteStock.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleModalProfile = this.toggleModalProfile.bind(this);
    }

    openCloseNav() {
        this.setState({
            opened: !this.state.opened
        })
    }

    addFavouriteStock() {
        let data = {
            stock_id: this.props.stock.id
        };

        this.makeRequest('POST', 'user/add-favourite-stock', data)
            .then(res => {
                this.props.setFavourite(true);
                this.makeRequest('GET', 'user/current')
                    .then(response => {
                        this.props.toggleUser(response.data)
                    }).catch(err => {
                        console.log(err)
                    })
            }).catch(error => {
                console.log(error)
            });
    }

    removeFavouriteStock() {
        let data = {
            stock_id: this.props.stock.id
        };

        this.makeRequest('POST', 'user/remove-favourite-stock', data)
            .then(res => {
                this.props.setFavourite(false);
                this.makeRequest('GET', 'user/current')
                    .then(response => {
                        this.props.toggleUser(response.data)
                    }).catch(err => {
                        console.log(err)
                    })
            }).catch(error => {
                console.log(error)
            });
    }

    makeRequest(method, url, data) {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: { Authorization: 'Bearer ' + this.props.accessToken }
        })

        return axiosInstance({
            method: method,
            url: url,
            data: data
        });
    }

    logout() {
        let data = {
            token: this.props.accessToken,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET
        } 

        this.makeRequest('POST', 'o/revoke_token/', data)
            .then(res => {
                this.props.logout();
                localStorage.removeItem('accessToken');
            })
            .catch(error => {
                console.log(error)
            });
    }

    getFavouritButton() {
        return this.props.isFavourite
            ? <a href='#' className={`row ${this.state.opened ? 'row-35' : ''}`} onClick={this.removeFavouriteStock.bind(this)}>
                <div className="col text-center">
                    <Tooltip content='Adicionar aos favoritos' placement='right'>
                        <AiFillStar size={25} className='navbar--icon' />
                    </Tooltip>
                </div>
                <div className={`col ${this.state.opened ? '' : 'col-none'}`}>
                    <p className='navbar--icon'>Adicionar aos favoritos</p>
                </div>
            </a>
            : <a href='#' className={`row ${this.state.opened ? 'row-35' : ''}`} onClick={this.addFavouriteStock.bind(this)}>
                <div className="col text-center">
                    <Tooltip content='Adicionar aos favoritos' placement='right'>
                        <AiOutlineStar size={25} className='navbar--icon' />
                    </Tooltip>
                </div>
                <div className={`col ${this.state.opened ? '' : 'col-none'}`}>
                    <p className='navbar--icon'>Adicionar aos favoritos</p>
                </div>
            </a>
    }

    toggleModalProfile() {
        this.props.toggleProfile(!this.props.isOpen);
    }

    navbar() {
        let icon = this.state.opened 
            ? <RiCloseLine size={40} className='navbar--icon' /> 
            : <GoThreeBars size={40} className='navbar--icon' /> 

        return <div className={`navbar navbar-${this.state.opened ? 'opened': 'closed'}`}>
            <div className='row text-center'>
                <a className='btn-black' onClick={this.openCloseNav}>
                    {icon}
                </a>
            </div>
            <a onClick={this.toggleModalProfile} className={`row ${this.state.opened ? 'row-35' : ''}`}>
                <div className="col text-center">
                    <Tooltip content='Perfil' placement='right'>
                        <BsFillPeopleFill size={25} className='navbar--icon' />
                    </Tooltip>
                </div>
                <div className={`col ${this.state.opened ? '' : 'col-none'}`}>
                    <p className='navbar--icon'>Perfil</p>
                </div>
            </a>
            {this.getFavouritButton()}
            <a href='#' className={`row ${this.state.opened ? 'row-35' : ''}`}>
                <div className="col text-center">
                    <Tooltip content='Logout' placement='right'>
                        <RiLogoutBoxLine size={25} className='navbar--icon' onClick={this.logout}/>
                    </Tooltip>
                </div>
                <div className={`col ${this.state.opened ? '' : 'col-none'}`}>
                    <p className='navbar--icon'>Logout</p>
                </div>
            </a>
        </div>
    }

    render() {
        return this.navbar();
    }
}

const mapStateToProps = state => ({
    stock: state.stock.stock,
    isFavourite: state.stock.isFavourite,
    user: state.user.user,
    accessToken: state.user.accessToken,
    isOpen: state.modal.profileModalIsOpen
});

const mapDispatchToProps = dispatch => ({
    setFavourite: (isFavourite) => dispatch(StockActions.setFavourite(isFavourite)),
    logout: () => dispatch(
        AuthenticationActions.logout()
    ),
    toggleProfile: (isOpen) => dispatch(ModalActions.toggleProfile(isOpen)),
    toggleUser: (user) => dispatch(UserActions.toggleUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);