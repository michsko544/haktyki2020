import styled from 'styled-components'

export const Title = styled.h5`
  font-weight: 500;
  font-size: 18px;
  line-height: 17px;
  color: ${({ fontcolor }) => fontcolor};

  @media (min-width: 1024px) {
    font-size: 24px;
    line-height: 29px;
  }
`

export const Info = styled.p`
  font-size: 12px;
  line-height: 15px;
  margin-top: 7px;
  color: ${({ fontcolor }) => fontcolor};

  @media (min-width: 1024px) {
    font-size: 18px;
    line-height: 22px;
  }
`

export const SmallTitle = styled(Info)`
  font-weight: 500;
  margin-top: 25px;
  margin-bottom: 10px;
  color: ${({ fontcolor }) => fontcolor};
`
