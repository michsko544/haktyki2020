import styled from 'styled-components'

export const FixedContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 10;
`

export const Padding50 = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media (min-width: 1024px) {
    padding: 0 50px;
  }
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 10px 0 80px;

  @media (min-width: 1024px) {
    width: 50%;
    max-width: unset;
    padding-right: 50px;
    margin-bottom: 65px;
  }
`
