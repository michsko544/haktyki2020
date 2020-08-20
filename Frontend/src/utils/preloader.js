export const preloader = (url) => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = (e) => resolve(e)
    img.onerror = (e) => reject(e)
    img.src = url
})
