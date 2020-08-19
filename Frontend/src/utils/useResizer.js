import { useState } from 'react'
import { preloader } from './preloader'
import { imgUrlBuilder } from './imgUrlBuilder';

export const useResizer = (className, urls, delta) => {
    const [ timeoutRef, setTimeoutRef ] = useState(null)
    const [ rtime, setRtime ] = useState(null)
    const [ timeout, setTimeout] = useState(false)
    const [imageProps, setImageProps] = useState({
        w: 340,
        h: 200,
        dpr: window.devicePixelRatio,
      })

    const onResize = () => {
        setRtime(new Date())
        
        if (timeout === false) {
          setTimeout(true)
          clearTimeout(timeoutRef)
          setTimeoutRef(setTimeout(resizeEnd, delta))
        }
      }

      const resizeEnd = async () => {
        console.log('[DEBUG]', timeoutRef, rtime, timeout, imageProps, className, urls, delta)

        if (new Date() - rtime < delta) {
          clearTimeout(timeoutRef)
          setTimeoutRef(setTimeout(resizeEnd, delta))
        } else {
            setTimeout(false)
            if(className === null) return
          const photo = document.querySelector(`.${className}`)
          if (typeof photo === 'object') {

            const width = photo?.clientWidth
            const height = photo?.clientHeight
            const dpr = window?.devicePixelRatio

            if (
              width !== imageProps.w ||
              height !== imageProps.h ||
              dpr !== imageProps.dpr
            ) {
              try {
                await Promise.all(
                  urls.map(url => preloader(imgUrlBuilder(url, width, height, dpr)))
                )
              } catch (e) {
                console.warn('Preloader failed: ', e)
              }
  
              setImageProps({
                w: width,
                h: height,
                dpr: dpr,
              })
            }
          }
        }
      } 

      return {
          onResize,
          imageProps,
          timeoutRef
      }
}