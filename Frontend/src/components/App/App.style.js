import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container30 = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media (min-width: 1024px) {
    padding: 0 80px;
  }
`

export const DebugLink = styled(Link)`
  color: #f0f0f0;
  padding: 6px;
`
