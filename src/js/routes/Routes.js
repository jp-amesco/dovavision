import Home from '../pages/Home';
import Login from '../pages/Login';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class Routes extends Component {

    render () {
        console.log(this.props)
        return <BrowserRouter>
            <Switch>
                <Route path="/" exact={true}>
                    <Redirect to='/login'/>
                </Route>
                <Route path="/login" exact={true} component={Login} />
                <Route path="/register" exact={true} component={Register} />
                <PrivateRoutes path="/home" exact={true} component={Home} isAuthenticated={this.props.isAuthenticated}/>
            </Switch>
        </BrowserRouter>
    }
}
const mapStateToProps = state => ({ 
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Routes);