import styled from 'styled-components'

export const GradientBoxStyled = styled.div`
  width: 42px;
  height: 42px;
  background: linear-gradient(
    116deg,
    ${(props) => props.from} 25%,
    ${(props) => props.to} 100%
  );
  border-radius: 7px;
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.11);
  cursor: pointer;
  transition: .1s cubic-bezier(0.55, 0.085, 0.68, 0.53);

  &:hover {
    transform: scale(1.15);
  }
`
