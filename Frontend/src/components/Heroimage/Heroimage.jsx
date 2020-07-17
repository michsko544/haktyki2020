import React from 'react'
import PropTypes from 'prop-types'
import { HeroimageStyled } from './'

const Heroimage = ({ image }) => {
  return <HeroimageStyled src={image} alt="heroimage" />
}

Heroimage.propTypes = {
  image: PropTypes.string.isRequired,
}

export default Heroimage
