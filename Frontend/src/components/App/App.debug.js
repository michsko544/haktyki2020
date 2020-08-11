import React from 'react'
import Store from './App.store'
import { DebugLink } from './App.style'

export const AppDebug = () => {
  const store = Store.useStore()

  const setAuthToken = store.set('authToken')
  const setUser = store.set('user')
  const setUserId = store.set('userId')

  const injectAuthData = () => {
    setAuthToken('aaaa-bbbb-cccc')
    setUser('Tomek Adamek')
    setUserId(0)
  }

  const deleteAuthData = () => {
    setAuthToken('')
    setUser('')
    setUserId(0)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <button type="button" onClick={injectAuthData}>
          Inject auth data
        </button>
        <button type="button" onClick={deleteAuthData}>
          Delete auth data
        </button>
        <DebugLink to="/">Home</DebugLink>
        <DebugLink to="/login">Login</DebugLink>
        <DebugLink to="/register">Register</DebugLink>
        <DebugLink to="/greeter">Greeter</DebugLink>
        <DebugLink to="/settings">Settings</DebugLink>
        <DebugLink to="/teamfood">TeamFood</DebugLink>
      </div>
    </>
  )
}
