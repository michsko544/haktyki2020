import React from 'react'
import PropTypes from 'prop-types'
import ImageLoadingLogic from '../ImageLoadingLogic'
import { HeroimageStyled } from './'
import { useRandomThematicImg } from '../../API'

const Heroimage = ({ propImage }) => {
  const { image, getImage, isLoading, error } = useRandomThematicImg()

  React.useEffect(() => {
    if (!propImage) getImage('dinner')
  }, [])

  return (
    <>
      <ImageLoadingLogic
        image={propImage || image?.urls?.regular}
        isLoading={isLoading}
        error={error}
        alt="heroimage"
        component={HeroimageStyled}
      />
    </>
  )
}

Heroimage.propTypes = {
  propImage: PropTypes.string,
}

Heroimage.defaultProps = {
  propImage: '',
}

export default Heroimage
