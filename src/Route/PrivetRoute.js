import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Islogin from '../Utils/Index';

function PrivetRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest}
            render = {props => (
                Islogin() ?
                    <Component {...props} />
                    :
                    <Redirect to='/' />

            )
            }
        />
    );
}

export default PrivetRoute;