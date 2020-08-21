import styled from 'styled-components'

export const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

export const Margins = styled.div`
  width: 100%;
  height: fit-content;
  padding: 30px 30px 130px;

  @media (min-width: 420px) {
    width: 420px;
    margin: 0 auto;
  }

  @media (min-width: 1024px) {
    margin: unset;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    padding-top: 64px;
    padding-bottom: 30px;
    width: 50%;
  }
`

export const TextDisplayer = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;

  @media (min-width: 1024px) {
    height: fit-content;
    max-height: 100%;
    overflow-y: auto;
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
    padding: 0px 20px 10px;
  }
`

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
  padding: 0 28px;
  z-index: 31;

  @media (min-width: 420px) {
    left: 50%;
    max-width: 420px;
    transform: translateX(-50%);
  }

  @media (min-width: 1024px) {
    margin-top: 20px;
    padding: 0;
    max-width: unset;
    position: unset;
    transform: unset;
    left: 0;
  }

  & > :last-child {
    margin-top: 16px;
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
