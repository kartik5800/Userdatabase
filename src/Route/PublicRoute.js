import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Islogin from '../Utils/Index';

function PublicRoute({ component: Component, restricted = false, ...rest }) {
    return (
        <Route {...rest}
            render={props => (
                Islogin() && restricted ?
                    <Redirect to='/home' />
                    :
                    <Component {...props} />
            )
            }
        />
    );
}

export default PublicRoute;