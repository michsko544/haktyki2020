import React from 'react'
import PropTypes from 'prop-types'
import { H1Styled } from './H1.style'

const H1 = ({ children }) => {
    return (
        <H1Styled>{children}</H1Styled>
    )
}

H1.propTypes = {
    children: PropTypes.any
}

H1.defaultProps  = {
    children: null
}

export default H1
