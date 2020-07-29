import { useState } from 'react'
import axiosAPI from './API'
import PropTypes from 'prop-types'

const defaultResponse = {
    authToken: '',
    userId: 0,
    fullname: ''
}

const usePost = (url) => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(defaultResponse)
  const [error, setError] = useState({})

  const sendData = async (data) => {
    try {
      setIsLoading(true)
      console.log(`Posting data on ${url}`, data)
      const response = await axiosAPI.post(url, data)
      setIsLoading(false)
      setResponse({ ...response.data })
      console.log('Response: ', response)
    } catch (error) {
      console.log('Error', error.response)
      setIsLoading(false)
      setError({
        code: error.response.status,
        text: error.response.statusText,
      })
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
