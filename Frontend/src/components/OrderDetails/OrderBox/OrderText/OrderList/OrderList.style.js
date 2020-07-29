import styled from 'styled-components'

export const Name = styled.p`
  font-size: 14px;
  line-height: 17px;
  margin-top: 10px;
  color: ${(props) => props.color};

  @media (min-width: 1024px) {
    font-size: 18px;
    line-height: 22px;
  }
`

export const Order = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  background: -webkit-linear-gradient(
    162deg,
    ${(props) => props.firstcolor} 0%,
    ${(props) => props.secondcolor} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 17px;
  }
`

export const Coupon = styled.p`
  font-size: 12px;
  line-height: 17px;
  color: ${(props) => props.color};

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 22px;
  }
`
