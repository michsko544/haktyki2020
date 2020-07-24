import React from 'react'
import Store from './../App/App.store'
import { Route, Redirect } from 'react-router-dom'

export const GuardedRoute = ({ component: Component, ...rest }) => {
    const store = Store.useStore()

    const isAuthenticated = () => {
        return store.get('authToken') !== ''
    }

    return (
        <Route {...rest} render={(props) => (
            isAuthenticated() ? <Component {...props} /> : <Redirect to='/login' />
        )} />
    )

}
