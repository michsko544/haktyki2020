import React from 'react'
import PropTypes from 'prop-types'
import { TextWrapper } from '../OrderBox.style'
import Header from './Header'

const OrderText = ({ title, info, children }) => {
  return (
    <TextWrapper>
      <Header title={title} info={info} />
      {children}
    </TextWrapper>
  )
}

Header.PropTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  children: PropTypes.any,
}

export default OrderText
