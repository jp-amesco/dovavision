import React, { Component } from 'react';
import Navbar from '../elements/navbar.js';
import StockList from '../components/home/StockList';
import GraphPanel from '../components/home/GraphPanel';
import StockName from '../components/home/StockName';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let navbar = <Navbar/>;
    let stockList = <StockList />;
    let stockName = <StockName />;
    
    return (
      <div className='home-container-grid'>
        {navbar}
        <div className='content'>
          <div className='row row-2'>
            <div className='col'>
              <div className='panel'>
                <GraphPanel />
              </div>
            </div>
            <div className='col col-2'>
              {stockName}
              <div className='panel panel-future'></div>
            </div>
          </div>
          <div className='row row-3'>
            {stockList}
            <div className='col'>
              <div className='panel panel-teste-2'></div>
            </div>
            <div className='col'>
              <div className='panel panel-teste-3'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;