export const baseUrl = 'https://norma.nomoreparties.space/api'

const checkResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    throw new Error(`Ошибка ${response.status}`)
}

const checkSuccess = (response) => {
    if (response && response.success) {
        return response
    }
    throw new Error(`Ответ не success: ${response}`)
}

export const request = async (endpoint, options) => {
    const response = await fetch(`${baseUrl}${endpoint}`, options)
    const json = await checkResponse(response)

    checkSuccess(json)

    return json
}
