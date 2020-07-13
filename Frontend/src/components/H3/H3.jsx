import React from 'react'
import PropTypes from 'prop-types'
import { H3Styled } from './H3.style'

const H3 = ({ children, color }) => {
    return (
        <H3Styled color={color}>{children}</H3Styled>
    )
}

H3.propTypes = {
    color: PropTypes.string,
    children: PropTypes.any
}

H3.defaultProps  = {
    color: "#000000",
    children: null
}

export default H3
