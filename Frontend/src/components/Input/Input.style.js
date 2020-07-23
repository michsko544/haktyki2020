import { Field } from 'formik'
import styled from 'styled-components'

export const FieldStyled = styled(Field)`
  border: none;
  padding: 5px 17px 6px;
  background: none;
  outline: none;
  font-size: 18px;
  font-family: 'Montserrat';
  color: ${props => props.color};
  width: 100%;
  line-height: 22px;
  resize: vertical;

  &[type="time"]::-webkit-calendar-picker-indicator, &[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1)
  }

  &::placeholder {
    color: ${props => props.color};
  }
`

FieldStyled.defaultProps = {
  isdarkmode: 'true',
}

export const Underline = styled.div`
  position: relative;
  width: 100%;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background: -webkit-linear-gradient(
      162deg,
      ${(props) => props.firstcolor} 0%,
      ${(props) => props.secondcolor} 100%
    );
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

FieldStyled.defaultProps = {
  firstcolor: 'black',
  secondcolor: 'black',
}

export const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  padding: 0px 9px;
  background: -webkit-linear-gradient(
    162deg,
    ${(props) => props.firstcolor} 0%,
    ${(props) => props.secondcolor} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 100%;
`

Label.defaultProps = {
  textColor: 'black',
}

export const ErrorStyled = styled.p`
  font-size: 12px;
  padding: 4px 17px;
  color: ${props => props.color};
  width: 100%;
`

ErrorStyled.defaultProps = {
  isdarkmode: 'true',
}

export const InputStyled = styled.div`
  margin-bottom: 11px;
`
