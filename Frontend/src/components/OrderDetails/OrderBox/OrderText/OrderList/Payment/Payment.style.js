import styled from 'styled-components'

export const Number = styled.div`
  font-weight: bold;
  width: 100%;
  font-size: 1.15em;
  background: -webkit-linear-gradient(
    162deg,
    ${(props) => props.firstcolor} 0%,
    ${(props) => props.secondcolor} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 1024px) {
    font-size: 1.25em;
  }
`
