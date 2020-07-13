import { Field } from 'formik'
import styled from 'styled-components'

export const FieldStyled = styled(Field)`
    border: none;
    border-bottom: 1px solid ${props => props.borderColor};
`;

FieldStyled.defaultProps = {
    borderColor: "white"
}