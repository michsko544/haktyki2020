import React from 'react'
import PropTypes from 'prop-types'
import { H4Styled } from './H4.style'
import { AppBackgroundThemes } from './../../App/App.themes'
import Store from './../../App/App.store'

const H4 = ({ children, ...props }) => {
  const store = Store.useStore()

  return (
    <H4Styled
      {...props}
      color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}
    >
      {children}
    </H4Styled>
  )
}

H4.propTypes = {
  color: PropTypes.string,
  children: PropTypes.any,
}

H4.defaultProps = {
  color: '#000000',
  children: null,
}

export default H4
