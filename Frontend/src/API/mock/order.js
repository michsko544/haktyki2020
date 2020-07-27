export const mockOrder = (mockAdapter) => {
    mockAdapter
        .onPost(`${process.env.REACT_APP_API_URL}/order`)
        .reply(201, null)
}