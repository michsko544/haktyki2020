const response = {
  user: 'Tomek Adamczyk',
  userId: 17,
  blik: '565 434 333',
  account: '77 6665 4445 3444 0000 0054',
}

export const mockMe = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/user/me`)
    .reply(200, response)
    .onPost(`${process.env.REACT_APP_API_URL}/user/me`)
    .reply(200, response)
}
