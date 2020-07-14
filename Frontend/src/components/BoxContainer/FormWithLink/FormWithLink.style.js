import styled from 'styled-components'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 10px 0;

  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 80px;
  }
`

export const OptionLinkStyled = styled.p`
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? '#FCFCFC' : '#232327')};
  font-size: 14px;
  width: 100%;
  text-align: center;
  margin-top: 18px;
`
OptionLinkStyled.defaultProps = {
  isDarkMode: '#FCFCFC',
}
