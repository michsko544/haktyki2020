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
      setResponse({ ...response.data })
      console.log(response.data)
    } catch (error) {
      setError(error.response.status.toString())
      console.log(error.response.status)
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
