import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Padding30 = styled.div`
  margin: 0 auto;
  padding: 0 30px;

  @media (min-width: 1024px) {
    width: 100%;
    padding: 0 80px;
  }
`

export const DebugLink = styled(Link)`
  color: #f0f0f0;
  padding: 6px;
  display: block;
`

export const IconLink = styled(Link)`
  color: #f0f0f0;
`
