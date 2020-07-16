import styled from 'styled-components'

export const ButtonStyled = styled.button`
  width: 100%;
  height: 64px;
  position: relative;
  display:flex;
  justify-content:center;
  align-items:center;
  box-sizing: border-box;
  
  background-color: ${(props) => (props.isDarkMode ? '#232327' : '#FCFCFC')};
  background-clip: padding-box;
  border: solid 2px transparent;
  border-radius: 9px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index:-1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(162deg, ${(props) => props.firstColor} 0%, ${(
  props
) => props.secondColor} 100%);
  }

  &:after {
    content: "${(props) => props.text}";
    position: absolute;
    display:flex;
    justify-content: center;
    align-items:center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-family: 'Montserrat';
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
    background: -webkit-linear-gradient(162deg, ${(props) =>
      props.firstColor} 0%, ${(props) => props.secondColor} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`

ButtonStyled.defaultProps = {
  color: 'black',
}

export const ButtonFormWrapper = styled.div`
  margin-top: 25px;
`
