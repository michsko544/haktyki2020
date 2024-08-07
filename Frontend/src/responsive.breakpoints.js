const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  lessThanLaptop: '1023px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

/**
 * Breakpoints used in custom elements inside the app
 */
export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  lessThanLaptop: `(max-width: ${size.lessThanLaptop})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`
}
