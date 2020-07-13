import styled from 'styled-components'

export const ButtonStyled = styled.button`
    width: 100%;
    height: 64px;
    text-transform: uppercase;
    border-radius: 9px;
    border: 2px solid ${props => props.color};
    font-size: 18px;
    font-weight: bold;
    font-family: "Montserrat";
    text-align: center;
    color: ${props => props.color};
    background: none;
    cursor: pointer
`;

ButtonStyled.defaultProps = {
    color: "black"
}