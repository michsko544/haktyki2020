import styled from 'styled-components'

export const HeroimagePosition = styled.div`
  width: 100%;

  @media (min-width: 420px) {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    width: 50%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
`

export const HeroimageStyled = styled.img`
  height: 280px;
  width: 100%;
  max-width: 400px;
  border-radius: 9px;
  object-fit: cover;
  object-position: center;
  margin: 20px 0;

  @media (min-width: 1024px) {
    max-width: unset;
    height: 100%;
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

  @media (min-width: 420px) {
    margin-top: 80px;
    height: 300px;
    border-radius: 8px;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
    height: unset;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`
