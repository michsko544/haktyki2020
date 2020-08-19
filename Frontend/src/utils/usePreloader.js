import { useState, useEffect } from 'react'
import { preloader } from './preloader';
import { imgUrlBuilder } from './imgUrlBuilder';

export const usePreloader = () => {
    const [ queue, setQueue ] = useState(null)
    const [ imageUrl, setImageUrl ] = useState(null)

    const enqueueImage = (settings) => setQueue(settings)

    useEffect(() => {
        const interval = setTimeout(async () => {
            await preloader(imgUrlBuilder(queue.image, queue.width, queue.height, queue.dpr))
            setImageUrl(imgUrlBuilder(queue.image, queue.width, queue.height, queue.dpr))
        }, 250)

        return () => {
            clearTimeout(interval)
        }
    }, [queue])

    return {
        enqueueImage,
        imageUrl
    }
}