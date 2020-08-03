import React from 'react'
import PropTypes from 'prop-types'
import { HeroimageStyled } from './'
import axios from 'axios'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'

const Heroimage = ({ image }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)

  const unsplashAPI = axios.create({
    baseURL: 'https://api.unsplaash.com/photos/',
  })

  const getPhoto = async () => {
    try {
      setIsLoading(true)
      const response = await unsplashAPI('/random?query=dinner')
      setResponse({ ...response.data })
      console.log('unsplash', response.data)
    } catch (error) {
      setError({
        code: error.response?.status.toString(),
        text: 'Nie można załadować zdjęcia',
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    unsplashAPI.defaults.headers.common['Authorization'] =
      'Client-ID AheeFF2nmSimgHa7CyYxlsMXc7b8-HzuACqD4LXW9ls'
    if (image) getPhoto()
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error.code} advice={error.text} />}

      <HeroimageStyled
        src={response ? response.urls.regular : ''}
        alt="heroimage"
      />
    </>
  )
}

Heroimage.propTypes = {
  image: PropTypes.string.isRequired,
}

export default Heroimage
