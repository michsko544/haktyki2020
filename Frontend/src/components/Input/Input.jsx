import React from 'react'
import PropTypes from 'prop-types'

import { FieldStyled, Label, ErrorStyled, Underline } from './'

const Input = ({ label, error, name, ...props }) => {
  const isDarkMode = true
  const firstcolor = '#46D3FF'
  const secondcolor = '#3687FF'

  return (
    <>
      <Label htmlFor={name} firstcolor={firstcolor} secondcolor={secondcolor}>
        {label}
      </Label>
      <Underline firstcolor={firstcolor} secondcolor={secondcolor}>
        <FieldStyled
          isdarkmode={isDarkMode.toString()}
          autoComplete="off"
          name={name}
          id={name}
          {...props}
        />
      </Underline>
      <Error error={error} isdarkmode={isDarkMode.toString()} />
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}

export const Error = ({ error, isdarkmode }) => {
  return <ErrorStyled isdarkmode={isdarkmode}>{error}</ErrorStyled>
}

Error.propTypes = {
  error: PropTypes.string,
  isDarkMode: PropTypes.bool,
}

export default Input
