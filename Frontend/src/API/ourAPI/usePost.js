import { useState } from 'react'
import axiosAPI from './API'
import PropTypes from 'prop-types'

const usePost = (url) => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const sendData = async (data) => {
    try {
      setIsLoading(true)
      const response = await axiosAPI.post(url, data)
      setIsLoading(false)
      setResponse({ ...response.data, statusCode: response.status })
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.log(`Posting data on ${url}`, data)
        console.log('Response: ', response)
      }
    } catch (error) {
      setError({
        code: error.response?.status,
        text: error.response?.statusText,
      })
      if (process.env.REACT_APP_DEBUG === 'true')
        console.log('Error', error.response)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    response,
    sendData,
    isLoading,
    error,
  }
}

usePost.propTypes = {
  url: PropTypes.string.required,
  data: PropTypes.required,
}

export default usePost
