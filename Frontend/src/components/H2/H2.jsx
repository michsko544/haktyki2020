import React from 'react'
import PropTypes from 'prop-types'
import { H2Styled } from './H2.style'

const H2 = ({ children }) => {
    return (
        <H2Styled>{children}</H2Styled>
    )
}

H2.propTypes = {
    children: PropTypes.any
}

H2.defaultProps  = {
    children: null
}

export default H2
