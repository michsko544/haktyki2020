import styled from 'styled-components'

export const ErrorStyled = styled.p`
  color: ${({ color }) => color};
  font-size: 20px;
  margin-bottom: 5px;
  width: 100%;

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`

export const Advice = styled.p`
  color: ${({ color }) => color};
  font-size: 15px;
  margin-top: 15px;
  width: 100%;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`
