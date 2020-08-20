export const capitalizeAllWords = (values) => {
  const capitalizeFirstLetter = (v) => v.charAt(0).toUpperCase() + v.slice(1)

  return values
    .split(' ')
    .map((v) => capitalizeFirstLetter(v))
    .join(' ')
}
