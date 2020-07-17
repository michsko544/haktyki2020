import styled from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const PhotoSelectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin: 8px 0;

    > :nth-child(2n - 1) {
        justify-self: end;
    }

    > button {
        width: 240px;
        grid-column: span 2;
        justify-self: center !important;
    }
`