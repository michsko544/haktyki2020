const registerResponse = {
    idk: 'idk'
}

export const mockRegister = (mockAdapter) => {
    mockAdapter
        .onPost(`${process.env.REACT_APP_API_URL}/login`)
        .reply(201, registerResponse)
}
