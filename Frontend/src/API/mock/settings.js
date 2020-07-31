const data = {
	fullname: 'Jeszusz Json',
    userId: 2138,
    blik: '32423432432',
    account: '423423546456354654'
}

export const mockSettings = (mockAdapter) => {
    mockAdapter
        .onGet(`${process.env.REACT_APP_API_URL}/user/me`)
        .reply(200, data)
}