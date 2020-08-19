import { useState, useEffect, useRef } from 'react'
import { usePreloader } from './usePreloader'

export const useResizeObserver = () => {
  const imageRef = useRef()
  const [image, setImage] = useState(null)
  const { enqueueImage, imageUrl } = usePreloader()

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        const [size] = entries
        let { width, height } = size.contentRect
        width = Math.ceil(width)
        height = Math.ceil(height)
        const dpr = window.devicePixelRatio
        
        enqueueImage({ image, width, height, dpr })
      }
    })

    ro.observe(imageRef.current)

    return () => ro.disconnect()
  }, [imageRef, image]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    imageRef,
    imageUrl,
    setImage,
  }
}
