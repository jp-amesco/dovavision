import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Authentication from './helpers/Authentication';

/** Função para validar se o usuario tem acesso a rotas privadas  */
function PrivateRoutes ({ component: Component, ...rest }) {
    return <Route
        {...rest}
        render ={props => {
            const authentication = new Authentication();

            if (authentication.isAuthenticated(props)) {
                return (<Component {...props} />)
            }
            return (<Redirect 
                to={{
                    pathname:'/login',
                    state: {from: props.location}
                }}
            />)
        }} 
    />
}

function Routes () {
    return <BrowserRouter>
        <Switch>
            <Route path="/login" exact={true} component={Login} />
            <Route path="/register" exact={true} component={Register} />
            <PrivateRoutes path="/home" exact={true} component={Home} />
        </Switch>
    </BrowserRouter>
}

export default Routes;