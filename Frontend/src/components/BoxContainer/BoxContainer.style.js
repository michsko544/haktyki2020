import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isDarkMode ? '#232327' : '#FCFCFC')};
  display: flex;

  @media (min-width: 1024px) {
    width: 965px;
    height: 607px;
    border-radius: 7px;
  }
`
