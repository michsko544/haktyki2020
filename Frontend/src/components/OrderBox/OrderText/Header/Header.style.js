import styled from 'styled-components'

export const Title = styled.h5`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 20px;
  color: ${({ isdarkmode }) => (isdarkmode === 'true' ? '#FCFCFC' : 'black')};

  @media (min-width: 1024px) {
    font-size: 24px;
    line-height: 29px;
    margin-top: 64px;
  }
`

export const Info = styled.p`
  font-size: 12px;
  line-height: 15px;
  margin-top: 7px;
  color: ${({ isdarkmode }) => (isdarkmode === 'true' ? '#FCFCFC' : 'black')};

  @media (min-width: 1024px) {
    font-size: 18px;
    line-height: 22px;
  }
`

export const SmallTitle = styled(Info)`
  font-weight: 500;
  margin-top: 30px;
  color: ${({ isdarkmode }) => (isdarkmode === 'true' ? '#FCFCFC' : 'black')};
`
