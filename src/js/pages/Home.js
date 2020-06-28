import React, { Component } from 'react';
import Navbar from '../elements/navbar.js';
import GraphCurrencyPanel from '../components/home/GraphCurrencyPane';
import GraphStockPanel from '../components/home/GraphStockPanel';
import CurrencyList from '../components/home/CurrencyList';
import FavoriteList from '../components/home/FavoriteList';
import { connect } from 'react-redux';
import StockName from '../components/home/StockName';
import * as UserActions from '../store/actions/user'; 
import ProfileModal from '../components/ProfileModal';
import axios from 'axios';
import Modal from 'react-modal'
import FuturePrice from '../components/home/FuturePrice';
import Move from '../components/home/Move';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.sendRequest();
  }

  async sendRequest() {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: { Authorization: 'Bearer ' + this.props.accessToken }
    })

    await axiosInstance({
      method: 'GET',
      url: 'user/current'
    }).then(res => {
      this.props.toggleUser(res.data)
    }).catch(error => {
      console.log(error.error)
    })
  }

  render() {
    return (
      <div className='home-container-grid'>
        <Navbar />
        <div className='content'>
          <div className='row row-65'>
            <div className='col'>
              <div className='panel'>
                <GraphStockPanel />
              </div>
            </div>
            <div className='col col-2'>
              <StockName />
              <div className="row row-50 no-padding">
                <div className="col col-pd-r">
                  <FuturePrice />
                </div>
                <div className="col col-pd-l">
                  <Move />
                </div>                
              </div>
            </div>
          </div>
          <div className='row row-3'>
            <FavoriteList />
            <CurrencyList />
            <div className="col pd-top">
              <div className="panel">
                <GraphCurrencyPanel />
              </div>
            </div>
          </div>
          <Modal 
            isOpen={this.props.profileModalIsOpen}
            className='register-container-grid'
            ariaHideApp={false}
          >
            <ProfileModal/>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  profileModalIsOpen: state.modal.profileModalIsOpen
});

const mapDispatchToProps = dispatch => ({
  toggleUser: (user) => dispatch(UserActions.toggleUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);