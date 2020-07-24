import styled from 'styled-components'

export const HeroimageStyled = styled.img`
  width: 100%;
  height: 280px;
  max-width: 400px;
  border-radius: 9px;
  object-fit: cover;
  object-position: center;
  margin: 20px 0;

  @media (min-width: 1024px) {
    width: 50%;
    height: 100%;
    max-width: unset;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    margin: 0;
  }
`

export const OrderDetailsImg = styled(HeroimageStyled)`
  border-radius: 0;
  height: 200px;
  margin: 0;
  max-width: 420px;

  @media (min-width: 480px) {
    margin: 0 auto;
  }
`
