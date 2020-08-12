import { Field } from 'formik'
import styled from 'styled-components'

export const FieldStyled = styled.input`
  border: none;
  padding: 5px 17px 6px;
  background: none;
  outline: none;
  font-size: 18px;
  font-family: 'Montserrat';
  color: ${(props) => props.color};
  width: 100%;
  line-height: 22px;
  resize: vertical;
  box-shadow: none;

  &[type='time'],
  &[type='date'] {
    resize: none;
  }

  &[type='time']::-webkit-calendar-picker-indicator,
  &[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  &::placeholder {
    color: ${(props) => props.color};
    opacity: 0.6;
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

export const InputStyled = styled.div`
  margin-bottom: 11px;
  width: 100%;
`

export const SmallerInputStyled = styled(InputStyled)`
  @media (min-width: 1024px) {
    width: 60%;
    margin-left: 20px;
  }
`

export const RowOnMediumScreen = styled.div`
  width: 100%;
  display: block;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  }
`
