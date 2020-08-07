import styled from 'styled-components'

export const RecordStyled = styled.div`
  margin: 10px 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    min-height: ${({ hascoupon }) => (hascoupon ? '100px' : 'fit-content')};
  }
`

export const CouponInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  min-height: fit-content;
  width: 100%;
  padding: 5px 10px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  transition: opacity 0.3s ease;
  opacity: 0;
  z-index: 30;

  ${RecordStyled}:hover & {
    opacity: 1;
  }
`

export const Name = styled.p`
  font-size: 14px;
  line-height: 17px;
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
