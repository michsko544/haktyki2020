import React from 'react'
import PropTypes from 'prop-types'
import { H2Styled } from './H2.style'

const H2 = ({ children, color }) => {
    return (
        <H2Styled color={color}>{children}</H2Styled>
    )
}

H2.propTypes = {
    color: PropTypes.string,
    children: PropTypes.any
}

H2.defaultProps  = {
    color: "#000000",
    children: null
}

export default H2
