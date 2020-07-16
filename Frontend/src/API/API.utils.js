import React from 'react'
import axiosAPI from './API'
import PropTypes from 'prop-types'

const useFetch = (url) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState({})
  const [error, setError] = React.useState('')

  const getData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosAPI(url)
      setResponse({ ...response })
    } catch (error) {
      const { status, statusText } = error.response
      setError({ status, statusText, ...error.response })
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
