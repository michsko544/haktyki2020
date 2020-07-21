import React from 'react'
import PropTypes from 'prop-types'
import { ButtonStyled } from './'
import Store from './../App/App.store'
import { AppThemes, AppBackgroundThemes } from './../App/App.themes'

const Button = ({ text, handleOnClick, ...props }) => {
  const isDarkMode = true
  const store = Store.useStore()

  return (
    <>
      <ButtonStyled
        text={text}
        firstColor={AppThemes[store.get('themeId')].from}
        secondColor={AppThemes[store.get('themeId')].to}
        background={AppBackgroundThemes[store.get('themeBackgroundId')].alternate}
        onClick={handleOnClick}
        {...props}
      />
    </>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
}

export default Button
