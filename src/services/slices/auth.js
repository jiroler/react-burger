import { createSlice } from '@reduxjs/toolkit'
import { request } from '../../utils/api'
import cookies from 'js-cookie'
import { ECookie } from '../../utils/types'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isPending: false,
        error: null,
        user: null
    },
    reducers: {
        authRequest: (state) => {
            state.isPending = true
            state.error = null
        },
        registerSuccess: (state, action) => {
            state.isPending = false
            state.user = action.payload.user
        },
        loginSuccess: (state, action) => {
            state.isPending = false
            state.user = action.payload.user
        },
        refreshSuccess: (state) => {
            state.isPending = false
        },
        logoutSuccess: (state) => {
            state.isPending = false
            state.user = null
        },
        getUserSuccess: (state, action) => {
            state.isPending = false
            state.user = action.payload.user
        },
        updateUserSuccess: (state, action) => {
            state.isPending = false
            state.user = action.payload.user
        },
        authError: (state, action) => {
            state.isPending = false
            state.error = action.payload.message
        }
    }
})

const { authRequest, authError, registerSuccess, loginSuccess, refreshSuccess, logoutSuccess, getUserSuccess, updateUserSuccess } = authSlice.actions

export const register = ({ endpoint, formData, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().auth.isPending) return
        if (! formData.name) throw new Error('Введите имя')
        if (! formData.email) throw new Error('Введите e-mail')
        if (! formData.password) throw new Error('Введите пароль')

        dispatch(authRequest())
        const json = await request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        dispatch(registerSuccess(json))
        cookies.set(ECookie.refreshToken, json.refreshToken)
        cookies.set(ECookie.accessToken, json.accessToken)

        if (typeof onSuccess === 'function') {
            onSuccess()
        }

    } catch (error) {
        const message = error?.message || 'Неизвестная ошибка'
        dispatch(authError({ message }))
    }
}

export const login = ({ endpoint, formData, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().auth.isPending) return
        if (! formData.email) throw new Error('Введите e-mail')
        if (! formData.password) throw new Error('Введите пароль')

        dispatch(authRequest())
        const json = await request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        dispatch(loginSuccess(json))
        cookies.set(ECookie.refreshToken, json.refreshToken)
        cookies.set(ECookie.accessToken, json.accessToken)

        if (typeof onSuccess === 'function') {
            onSuccess()
        }

    } catch (error) {
        const message = error?.message || 'Неизвестная ошибка'
        dispatch(authError({ message }))
    }
}

export const refresh = ({ endpoint, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().auth.isPending) return

        dispatch(authRequest())
        const json = await request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: cookies.get(ECookie.refreshToken) })
        })

        dispatch(refreshSuccess(json))
        cookies.set(ECookie.refreshToken, json.refreshToken)
        cookies.set(ECookie.accessToken, json.accessToken)

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = error?.message || 'Неизвестная ошибка'
        dispatch(authError({ message }))
    }
}

export const logout = ({ endpoint, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().auth.isPending) return

        dispatch(authRequest())
        await request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: cookies.get(ECookie.refreshToken) })
        })

        dispatch(logoutSuccess())
        cookies.remove(ECookie.refreshToken)
        cookies.remove(ECookie.accessToken)

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = error?.message || 'Неизвестная ошибка'
        dispatch(authError({ message }))
    }
}

export const getUser = ({ endpoint, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().auth.isPending) return

        dispatch(authRequest())
        const json = await request(endpoint, {
            headers: { authorization: cookies.get(ECookie.accessToken) }
        })

        dispatch(getUserSuccess(json))

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = error?.message || 'Неизвестная ошибка'
        dispatch(authError({ message }))

        // retry
        if (message === 'jwt expired') {
            dispatch(refresh({
                endpoint: '/auth/token',
                onSuccess: () => {
                    dispatch(getUser({ endpoint, onSuccess }))
                }
            }))
        }
    }
}

export const updateUser = ({ endpoint, formData, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().auth.isPending) return

        dispatch(authRequest())
        const json = await request(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: cookies.get(ECookie.accessToken)
            },
            body: JSON.stringify(formData)
        })

        dispatch(updateUserSuccess(json))

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = error?.message || 'Неизвестная ошибка'
        dispatch(authError({ message }))

        // retry
        if (message === 'jwt expired') {
            dispatch(refresh({
                endpoint: '/auth/token',
                onSuccess: () => {
                    dispatch(updateUser({ endpoint, formData, onSuccess }))
                }
            }))
        }
    }
}

export default authSlice.reducer
