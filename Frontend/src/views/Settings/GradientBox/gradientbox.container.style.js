import styled from 'styled-components'

export const GradientBoxContainerStyled = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0;

    & > *:first-child {
        margin: 6px 6px 6px 0;
    }

    & > *:last-child {
        margin: 6px 0 6px 6px;
    }

    & > * {
        margin: 6px;
    }
`
