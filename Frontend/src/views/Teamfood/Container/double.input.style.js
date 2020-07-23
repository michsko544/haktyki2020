import styled from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const DoubleInputStyled = styled.div`
    display: flex;
    flex-direction: column;
    
    & > * {
        flex: 1;
    }

    @media ${device.tablet} {
        flex-direction: row;
        gap: 12px;
    }
`
