import React from 'react'
import axiosAPI from './API'
import PropTypes from 'prop-types'

const useFetch = (url) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)

  const getData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosAPI(url)
      setResponse({ ...response.data, statusCode: response.status })
      if (process.env.REACT_APP_DEBUG === 'true') console.log(response.data)
    } catch (error) {
      setError({
        code: error.response?.status || -1,
        text: 'Coś poszło nie tak',
      })
      if (process.env.REACT_APP_DEBUG === 'true') console.log(error.response)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    response,
    getData,
    isLoading,
    error,
  }
}

useFetch.propTypes = {
  url: PropTypes.string.required,
}

export default useFetch
