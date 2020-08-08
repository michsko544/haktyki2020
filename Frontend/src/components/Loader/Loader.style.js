import styled from 'styled-components'

export const LoaderStyled = styled.p`
  width: 100%;
  font-size: 15px;
  color: ${({ color }) => color};

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`
