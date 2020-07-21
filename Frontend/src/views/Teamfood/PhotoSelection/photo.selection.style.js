import styled from 'styled-components'
import { css } from 'styled-components'
import { device } from './../../../responsive.breakpoints'

export const PhotoSelectionStyled = styled.div`
    width: 100%;
    height: max(160px, 20vh);
    border-radius: 7px;
    background: transparent;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    transition: background .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    @media ${device.tablet} {
      height: 160px;
    }

    @media ${device.laptop} {
      width: 160px;
      height: 100px;
    }

    ${(props) =>
      props.selected &&
      css`
        background: linear-gradient(
          116deg,
          ${(props) => props.from} 25%,
          ${(props) => props.to} 100%
        );
      `}

    &::after {
        position: absolute;
        background: url('${(props) => props.url}');
        background-size: cover;
        top: 2px; left: 2px; right: 2px; bottom: 2px;
        content: '';
        border-radius: 7px;
    }
`

PhotoSelectionStyled.defaultProps = {
  from: '#36B7FF',
  to: '#A736FF',
}
