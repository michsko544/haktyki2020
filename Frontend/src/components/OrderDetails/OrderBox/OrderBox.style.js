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

  @media (min-width: 420px) {
    width: 420px;
  }

  @media (min-width: 1024px) {
    width: 100%;
    padding: 0 50px;
  }
`

export const TextDisplayer = styled.div`
  width: 100%;
  margin: 30px 0 130px;

  @media (min-width: 1024px) {
    width: 50%;
    height: 100%;
    margin: 64px 0 40px;
    max-height: ${(props) => (props.firstStage === 'true' ? '400px' : '520px')};
    max-width: unset;
    padding-right: 50px;
  }
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  @media (min-width: 1024px) {
    height: 100%;
    overflow-y: auto;
    max-width: unset;
  }
`

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
  padding: 0 28px;

  @media (min-width: 420px) {
    left: 50%;
    max-width: 420px;
    transform: translateX(-50%);
  }

  @media (min-width: 1024px) {
    margin-top: 20px;
    margin-bottom: 40px;
    max-width: unset;
    position: unset;
    transform: unset;
    left: 0;
  }
`

export const CloseBtnBackground = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 15px;
  top: 15px;
  background-color: ${({ background }) => background};
  border-radius: 50%;
  z-index: 30;
  cursor: pointer;

  @media (min-width: 1024px) {
    right: 20px;
    top: 20px;
  }
`
