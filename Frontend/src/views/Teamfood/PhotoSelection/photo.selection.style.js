import styled from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const PhotoSelectionStyled = styled.div`
    width: 160px;
    height: 100px;
    border-radius: 7px;
    background: url('${prop => prop.url}');
    background-size: cover;
    cursor: pointer;
`