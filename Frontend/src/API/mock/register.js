const registerResponse = {
    status: 'CREATED'
}

export const mockRegister = (mockAdapter) => {
    mockAdapter
        .onPost(`${process.env.REACT_APP_API_URL}/register`)
        .reply(201, registerResponse)
}
