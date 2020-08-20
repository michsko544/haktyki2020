export const displayTime = (order) => {
    const [hours,minutes] = order.time.split(':')
    return `${hours}:${minutes}`
}