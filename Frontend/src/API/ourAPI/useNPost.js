import axiosAPI from './API'

export const useNPost = (url) => {
    const send = async (data) => {
        const response = await axiosAPI.post(url, data)
        if (process.env.REACT_APP_DEBUG === 'true') {
            console.debug(`Posting data on ${url}`, data)
            console.debug('Response: ', response)
          }

          return { 
              ...response.data, 
              statusCode: response.status 
            }
    }

    return {
        send
    }
}

export default useNPost
