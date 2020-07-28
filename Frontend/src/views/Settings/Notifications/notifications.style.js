import styled from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const NotificationStyled = styled.div`
    @media ${device.tablet} {
        grid-column: span 2;
    }
`
