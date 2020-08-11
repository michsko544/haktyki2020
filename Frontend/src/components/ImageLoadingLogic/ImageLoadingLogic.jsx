import React from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader'
import defaultImage from '../../images/frytki.png'
import { LoaderPosition } from './'

const ImageLoadingLogic = ({
  image,
  isLoading,
  error,
  alt,
  component: Component,
  ...props
}) => {
  return (
    <>
      {isLoading && (
        <LoaderPosition>
          <Loader />
        </LoaderPosition>
      )}
      {error && <Component src={defaultImage} alt={alt} {...props} />}
      {image && <Component src={image || defaultImage} alt={alt} {...props} />}
    </>
  )
}

ImageLoadingLogic.propTypes = {
  image: PropTypes.oneOfType(PropTypes.string, PropTypes.bool, PropTypes.func),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  alt: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
}

export default ImageLoadingLogic
