import styled from 'styled-components'
import { device } from './../../responsive.breakpoints'

export const HeaderStyled = styled.header`
  min-width: 320px;
  max-width: 704px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'heading heading icons'
    'content content content';
  box-sizing: border-box;
  padding: 32px;

  background: #232327;

  H1 {
    grid-area: heading;
  }

  div.icons {
    align-self: center;
    grid-area: icons;

    svg {
        width: 32px;
        height: 32px;
    }
  }

  button {
    margin-top: 20px;
    grid-area: content;
  }

  @media ${device.lessThanLaptop} {
      H1 {
          font-size: 24px;
      }
  }

  @media ${device.tablet} {
    box-shadow: 1px 2px 9px rgba(4, 4, 4, 0.25);
    max-width: calc(100vw - 64px);
    border-radius: 0 0 7px 7px;
    button {
        max-width: 340px;
    }
  }

  @media ${device.laptop} {
    max-width: min(calc(100vw - 64px), 1130px);
    grid-template-areas:
    'heading . icons'
    'content . .';
    
  }

  @media ${device.laptopL} {
    max-width: 1130px;
  }

  @media ${device.desktop} {
  }
`
