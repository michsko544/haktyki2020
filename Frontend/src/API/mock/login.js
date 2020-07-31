const loginToken = {
    authToken: 'aaaa.bbbb.cccc',
	fullname: 'Jeszusz Json',
	userId: 2138
}

export const mockLogin = (mockAdapter) => {
    mockAdapter
        .onPost(`${process.env.REACT_APP_API_URL}/login`)
        .reply(400, loginToken)
}