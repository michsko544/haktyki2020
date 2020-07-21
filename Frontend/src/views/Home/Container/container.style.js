import styled from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const ContainerStyled = styled.div`
  min-width: 320px;
  max-width: 704px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  box-sizing: border-box;
  padding: 0 32px 32px;
  background: ${props => props.background};

  H3 {
      margin: 24px 0 16px;
  }

  div.your-order {
    & > * {
      margin: 0 0 24px;
    }
  }

  div.orders {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 24px;
  }

  @media ${device.tablet} {
    padding: 32px;
    margin: 16px auto 0;
    box-shadow: 1px 2px 9px rgba(4, 4, 4, 0.25);
    grid-template-columns: 300px 1fr;
    max-width: calc(100vw - 64px);
    border-radius: 7px 7px 0 0;
    gap: 24px;

    H3 {
        margin: 0 0 16px;
    }
  }

  @media ${device.laptop} {
    max-width: min(calc(100vw - 64px), 1130px);
  }

  @media ${device.laptopL} {
    max-width: 1130px;
  }
`
