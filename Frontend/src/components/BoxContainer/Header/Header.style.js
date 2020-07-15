import styled from 'styled-components'

export const HeaderStyled = styled.div`
  margin-top: 88px;
  margin-bottom: 13px;
  width: 100%;

  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 80px;
    margin-top: 120px;
  }
`
export const H3Styled = styled.div`
  margin-top: 10px;
`

export const DescriptionStyled = styled.p`
  margin-top: 12px;
  margin-bottom: 25px;
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 600;

  @media (min-width: 1024px) {
    margin-bottom: 60px;
  }
`
