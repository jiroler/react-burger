import cookies from 'js-cookie'
import { ECookie } from './types'

export const baseUrl = 'https://norma.nomoreparties.space/api'

const checkResponse = async (response) => {
    if (response.ok) {
        return response.json()
    }
    throw await response.json()
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

export const requestWithToken = async (endpoint, options) => {
    if (! options) options = {}
    if (! options.headers) options.headers = {}

    options.headers.authorization = cookies.get(ECookie.accessToken)

    const response = await fetch(`${baseUrl}${endpoint}`, options)
    const json = await checkResponse(response)

    checkSuccess(json)

    return json
}

export const requestWithRefresh = async (endpoint, options) => {
    try {
        return await requestWithToken(endpoint, options)
    } catch (error) {
        // retry
        if (error?.message === 'jwt expired') {
            const json = await request('/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: cookies.get(ECookie.refreshToken) })
            })

            cookies.set(ECookie.refreshToken, json.refreshToken)
            cookies.set(ECookie.accessToken, json.accessToken)

            return await requestWithToken(endpoint, options)
        } else {
            throw error
        }
    }
}
