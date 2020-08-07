import React from 'react'
import Store from './App.store'
import { DebugLink } from './App.style'

export const AppDebug = () => {
  const store = Store.useStore()
  
  const injectAuthData = () => {
    const setAuthToken = store.set('authToken')
    setAuthToken('aaaa-bbbb-cccc')
  }

  const deleteAuthData = () => {
    const setAuthToken = store.set('authToken')
    setAuthToken('')
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
