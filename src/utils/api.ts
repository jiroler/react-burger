import cookies from 'js-cookie'
import { ECookie } from './types'

export const baseUrl = 'https://norma.nomoreparties.space/api'
export const socketUrlOrdersAll = 'wss://norma.nomoreparties.space/orders/all'
export const socketUrlOrders = 'wss://norma.nomoreparties.space/orders'

const checkResponse = async (response: Response) => {
    if (response.ok) {
        return response.json()
    }
    throw await response.json()
}

const checkSuccess = (json: {success?: boolean}) => {
    if (json && json.success) {
        return json
    }
    throw new Error(`Ответ не success: ${json}`)
}

export const request = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${baseUrl}${endpoint}`, options)
    const json = await checkResponse(response)

    checkSuccess(json)

    return json
}

export const requestWithToken = async (endpoint: string, options?: RequestInit) => {
    if (! options) options = {}
    options.headers = new Headers(options.headers)
    options.headers.set('authorization', String(cookies.get(ECookie.accessToken)))

    const response = await fetch(`${baseUrl}${endpoint}`, options)
    const json = await checkResponse(response)

    checkSuccess(json)

    return json
}

export const requestWithRefresh = async (endpoint: string, options?: RequestInit) => {
    try {
        return await requestWithToken(endpoint, options)
    } catch (error) {
        // retry
        if ((error as Error)?.message === 'jwt expired') {
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
