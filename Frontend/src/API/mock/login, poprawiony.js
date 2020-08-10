
const loginToken = {
    authToken: 'aaaa.bbbb.cccc',
	fullname: 'Jeszusz Json',
	userId: 2138
}

export const mockLogin = (mockAdapter) => {
    mockAdapter
        .onPost(`${process.env.REACT_APP_API_URL}/login`,
        { login: 'test', password: 'test' })
        .reply(200, loginToken)
}