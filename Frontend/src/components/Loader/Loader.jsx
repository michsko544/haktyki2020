import React from 'react'
import { LoaderStyled } from './Loader.style'
import { useColors } from '../../utils'

const Loader = ({ ...props }) => {
  const [state, setState] = React.useState(3)
  const { mode } = useColors()

  React.useEffect(() => {
    const timeout = setTimeout(incrementState, 600)
    return () => {
      clearTimeout(timeout)
    }
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  const incrementState = () => {
    if (state === 5) setState(1)
    else setState(state + 1)
  }

  const handleDisplayDots = () => {
    switch (state) {
      case 1:
        return '.'
      case 2:
        return '..'
      case 3:
        return '...'
      case 4:
        return '....'
      case 5:
        return '.....'
      default:
        return '...'
    }
  }

  return (
    <LoaderStyled color={mode.fontColor} {...props}>
      Ładowanie{handleDisplayDots()}
    </LoaderStyled>
  )
}

export default Loader
