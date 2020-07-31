import React from 'react'
import { PhotoSelectionStyled } from './photo.selection.style'
import Store from './../../../components/App/App.store'
import { AppThemes } from './../../../components/App/App.themes';

const PhotoSelection = ({...props}) => {
    const store = Store.useStore()
    return (
        <PhotoSelectionStyled from={AppThemes[store.get('themeId')].from} to={AppThemes[store.get('themeId')].to} url="https://www.helpguide.org/wp-content/uploads/fast-foods-candy-cookies-pastries-768.jpg"/>
    )
}

export default PhotoSelection
