import React, { useEffect } from 'react'
import { PhotoSelectionStyled } from './photo.selection.style'
import Store from './../../../components/App/App.store'
import { AppThemes } from './../../../components/App/App.themes'
import { useResizeObserver } from '../../../utils'

const PhotoSelection = ({ photo, ...props }) => {
  const store = Store.useStore()
  const { imageRef, imageUrl, setImage } = useResizeObserver()

    useEffect(() => {
        setImage(photo.urls.raw)
    }, [photo.urls.raw, setImage])

  return (
    <PhotoSelectionStyled
        {...props}
      from={AppThemes[store.get('themeId')].from}
      to={AppThemes[store.get('themeId')].to}
      url={imageUrl}
      selected={photo.selected}
      ref={imageRef}
    />
  )
}

export default PhotoSelection
