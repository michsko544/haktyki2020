/**
 * Co tu jeszcze w tokenie powinno być?
 */

const loginToken = {
    authToken: 'aaaa-bbbb-cccc-dddd'
}

export const mockLogin = (mockAdapter) => {
    mockAdapter
        .onPost(`${process.env.REACT_APP_API_URL}/login`,
        { login: 'test', password: 'test' })
        .reply(200, loginToken)
}