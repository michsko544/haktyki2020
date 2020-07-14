import { Field } from 'formik'
import styled from 'styled-components'

export const FieldStyled = styled(Field)`
    border: none;
    border-bottom: 1px solid ${props => props.borderColor};
    padding: 5px 17px;
    background: none;
    outline: none;
    font-size: 18px;
    color: ${props => props.isDarkMode ? "#FCFCFC" : "black"};
    width:100%;
`;

FieldStyled.defaultProps = {
    borderColor: "black",
    isDarkMode: true
}

export const Label = styled.label`
    font-size: 11px;
    padding: 0px 9px;
    color: ${props => props.textColor};
    width:100%;
`;

Label.defaultProps = {
    textColor: "black",
}

export const ErrorStyled = styled.p`
    font-size: 12px;
    padding: 4px 17px;
    color: ${props => props.isDarkMode ? "#FCFCFC" : "black"};
    width: 100%;
`;

ErrorStyled.defaultProps = {
    isDarkMode: true,
}