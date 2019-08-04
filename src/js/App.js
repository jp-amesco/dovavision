import React, {Component} from 'react';
import Panel from './panel';
import '../styles/css/app.css';

class App extends Component {

  render() {
    return (
      <div className='container'>
        <div className='box'>
        </div>
         <Panel size='panel-large' btnType='btn-success'/>
      </div>
    );
  }
}



export default App;
