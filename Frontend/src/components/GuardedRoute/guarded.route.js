import React from 'react'
import Store from './../App/App.store'
import { Route, Redirect } from 'react-router-dom'

export const GuardedRoute = ({ component: Component, ...rest }) => {
    const store = Store.useStore()

    const isAuthenticated = () => {
        return store.get('authToken') !== ''
    }

    const isFullyRegistered = () => {
        return store.get('user').length > 0
    }

    const canActivate = () => isAuthenticated() && isFullyRegistered()

    return (
        <Route {...rest} render={(props) => (
            canActivate() ? <Component {...props} /> : <Redirect to='/login' />
        )} />
    )

}
