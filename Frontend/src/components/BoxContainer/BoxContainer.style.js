import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: relative;

  @media (min-width: 1024px) {
    height: 100vh;
    position: fixed;
  }
`

export const Box = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => (props.isDarkMode ? '#232327' : '#FCFCFC')};
  display: flex;
  box-shadow: 1px 2px 9px rgba(4, 4, 4, 0.25);
  position: fixed;
  top: 20px;
  left: 0;
  overflow-y: scroll;
  height: 100%;
  flex-direction: column;

  @media (min-width: 1024px) {
    position: relative;
    top: unset;
    left: unset;
    width: 965px;
    height: 607px;
    min-height: unset;
    overflow-y: unset;
    border-radius: 7px;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 10px 0 80px;

  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 80px;
  }
`
