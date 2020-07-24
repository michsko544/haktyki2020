import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const CustomRoute = ({ component: Component, customGuard, redirectTo ,...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            customGuard ? <Component {...props} /> : <Redirect to={redirectTo} />
        )} />
    )

}
