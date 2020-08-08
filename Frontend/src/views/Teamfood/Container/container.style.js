import styled from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const ContainerStyled = styled.div`
  min-width: 320px;
  max-width: 704px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  box-sizing: border-box;
  padding: 0 32px 32px;
  background: ${props => props.background};

  @media ${device.tablet} {
    padding: 32px;
    margin: 16px auto 0;
    box-shadow: 1px 2px 9px rgba(4, 4, 4, 0.25);
    grid-template-columns: 1fr;
    max-width: calc(100vw - 64px);
    border-radius: 7px;
    gap: 24px;
  }

  @media ${device.laptop} {
    max-width: min(calc(100vw - 64px), 1130px);
  }

  @media ${device.laptopL} {
    max-width: 1130px;
  }
`
