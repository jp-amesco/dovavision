import React, { Component } from 'react';
import Navbar from '../elements/navbar.js';
import GraphCurrencyPanel from '../components/home/GraphCurrencyPane';
import GraphStockPanel from '../components/home/GraphStockPanel';
import CurrencyList from '../components/home/CurrencyList';
import StockName from '../components/home/StockName';

class Home extends Component {

  render() {
    let navbar = <Navbar/>;
    
    return (
      <div className='home-container-grid'>
        {navbar}
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
                  <div className='panel panel-future'>
                    {/* <StockPrice /> */}
                  </div>
                </div>
                <div className="col col-pd-l">
                  <div className='panel panel-future'>

                  </div>
                </div>                
              </div>
            </div>
          </div>
          <div className='row row-3'>
            <div className='col pd-top'>
              <div className='panel panel-teste-2'></div>
            </div>
            <CurrencyList />
            <div className="col pd-top">
              <div className="panel">
                <GraphCurrencyPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;