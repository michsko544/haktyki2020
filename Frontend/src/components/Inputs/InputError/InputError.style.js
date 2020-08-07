import styled from 'styled-components'

export const ErrorStyled = styled.p`
  font-size: 12px;
  padding: 4px 17px;
  color: ${(props) => props.color};
  width: 100%;
`

ErrorStyled.defaultProps = {
  color: '#FFF',
}
