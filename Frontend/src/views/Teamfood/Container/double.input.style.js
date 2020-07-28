import styled from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const DoubleInputStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    @media ${device.tablet} {
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }
`
