import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import '../styles/css/app.css';
import store from './store';

class App extends Component {

  render() {
    return (
      <div className='container'>
        <div className='box'>
        </div>
          <Provider store={store}>
            <Routes />
          </Provider>
      </div>
    );
  }
}



export default App;
