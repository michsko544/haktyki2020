import React from 'react'
import PropTypes from 'prop-types'
import { HeroimageStyled, LoaderPosition } from './'
import Loader from '../Loader'
import defaultImage from '../../images/frytki.png'
import { useRandomThematicImg } from '../../API'

const Heroimage = ({ propImage }) => {
  const { image, getImage, isLoading, error } = useRandomThematicImg('dinner')

  React.useEffect(() => {
    if (!propImage) getImage()
  }, [])

  return (
    <>
      {isLoading && (
        <LoaderPosition>
          <Loader />
        </LoaderPosition>
      )}
      {error && <HeroimageStyled src={defaultImage} alt="heroimage" />}
      {image ? (
        <HeroimageStyled
          src={image.urls.regular || defaultImage}
          alt="heroimage"
        />
      ) : (
        propImage && <HeroimageStyled src={propImage} alt="heroimage" />
      )}
    </>
  )
}

Heroimage.propTypes = {
  image: PropTypes.string,
}

Heroimage.defaultProps = {
  image: '',
}

export default Heroimage
