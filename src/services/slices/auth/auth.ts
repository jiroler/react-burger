import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { request, requestWithRefresh } from '../../../utils/api'
import cookies from 'js-cookie'
import { ECookie } from '../../../utils/types'
import { TAppDispatch, TRootState } from '../../store'

type TUser = {
    user: {
        name: string,
        email: string
    } | null,
    isLoginPending: boolean,
    loginError: string | null,
    isRegisterPending: boolean,
    registerError: string | null,
    isForgotPending: boolean,
    forgotError: string | null,
    isResetPending: boolean,
    resetError: string | null,
    isUpdatePending: boolean,
    updateError: string | null,
    isAuthChecked: boolean,
    isAuthPending: boolean,
    authError: string | null,
    isLogoutPending: boolean,
    logoutError: string | null
}

const initialState: TUser = {
    user: null,
    isLoginPending: false,
    loginError: null,
    isRegisterPending: false,
    registerError: null,
    isForgotPending: false,
    forgotError: null,
    isResetPending: false,
    resetError: null,
    isUpdatePending: false,
    updateError: null,
    isAuthChecked: false,
    isAuthPending: false,
    authError: null,
    isLogoutPending: false,
    logoutError: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoginPending = true
            state.loginError = null
        },
        loginSuccess: (state, action: PayloadAction<{user: {name: string, email: string}}>) => {
            state.isLoginPending = false
            state.user = action.payload.user
        },
        loginError: (state, action: PayloadAction<{message: string}>) => {
            state.isLoginPending = false
            state.loginError = action.payload.message
        },

        registerRequest: (state) => {
            state.isRegisterPending = true
            state.registerError = null
        },
        registerSuccess: (state) => {
            state.isRegisterPending = false
        },
        registerError: (state, action: PayloadAction<{message: string}>) => {
            state.isRegisterPending = false
            state.registerError = action.payload.message
        },

        forgotRequest: (state) => {
            state.isForgotPending = true
            state.forgotError = null
        },
        forgotSuccess: (state) => {
            state.isForgotPending = false
        },
        forgotError: (state, action: PayloadAction<{message: string}>) => {
            state.isForgotPending = false
            state.forgotError = action.payload.message
        },

        resetRequest: (state) => {
            state.isResetPending = true
            state.resetError = null
        },
        resetSuccess: (state) => {
            state.isResetPending = false
        },
        resetError: (state, action: PayloadAction<{message: string}>) => {
            state.isResetPending = false
            state.resetError = action.payload.message
        },

        updateRequest: (state) => {
            state.isUpdatePending = true
            state.updateError = null
        },
        updateSuccess: (state, action: PayloadAction<{user: {name: string, email: string}}>) => {
            state.isUpdatePending = false
            state.user = action.payload.user
        },
        updateError: (state, action: PayloadAction<{message: string}>) => {
            state.isUpdatePending = false
            state.updateError = action.payload.message
        },

        authRequest: (state) => {
            state.isAuthChecked = false
            state.isAuthPending = true
            state.authError = null
        },
        authSuccess: (state, action) => {
            state.isAuthChecked = true
            state.isAuthPending = false
            state.user = action.payload.user
        },
        authError: (state, action: PayloadAction<{message: string}>) => {
            state.isAuthChecked = true
            state.isAuthPending = false
            state.authError = action.payload.message
            state.user = null
        },

        logoutRequest: (state) => {
            state.isLogoutPending = true
            state.logoutError = null
        },
        logoutSuccess: (state) => {
            state.isLogoutPending = false
            state.user = null
        },
        logoutError: (state, action: PayloadAction<{message: string}>) => {
            state.isLogoutPending = false
            state.logoutError = action.payload.message
        }
    }
})

export const {
    loginRequest, loginSuccess, loginError,
    registerRequest, registerSuccess, registerError,
    forgotRequest, forgotSuccess, forgotError,
    resetRequest, resetSuccess, resetError,
    updateRequest, updateSuccess, updateError,
    authRequest, authSuccess, authError,
    logoutRequest, logoutSuccess, logoutError
} = authSlice.actions

type TAnyAuthArgs = {
    formData?: Record <string, string>,
    onSuccess?: () => void
}

export const register = ({ formData, onSuccess }: TAnyAuthArgs) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
        if (getState().auth.isRegisterPending) return
        if (! formData!.name) throw new Error('Введите имя')
        if (! formData!.email) throw new Error('Введите e-mail')
        if (! formData!.password) throw new Error('Введите пароль')

        dispatch(registerRequest())
        const json = await request('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        dispatch(registerSuccess())
        cookies.set(ECookie.refreshToken, json.refreshToken)
        cookies.set(ECookie.accessToken, json.accessToken)

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = (error as Error)?.message || 'Неизвестная ошибка'
        dispatch(registerError({ message }))
    }
}

export const login = ({ formData, onSuccess }: TAnyAuthArgs) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
        if (getState().auth.isLoginPending) return
        if (! formData!.email) throw new Error('Введите e-mail')
        if (! formData!.password) throw new Error('Введите пароль')

        dispatch(loginRequest())
        const json = await request('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        dispatch(loginSuccess({ user: json.user }))
        cookies.set(ECookie.refreshToken, json.refreshToken)
        cookies.set(ECookie.accessToken, json.accessToken)

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = (error as Error)?.message || 'Неизвестная ошибка'
        dispatch(loginError({ message }))
    }
}

export const forgot = ({ formData, onSuccess }: TAnyAuthArgs) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
        if (getState().auth.isForgotPending) return
        if (! formData!.email) throw new Error('Введите e-mail')

        dispatch(forgotRequest())
        await request('/password-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        dispatch(forgotSuccess())

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = (error as Error)?.message || 'Неизвестная ошибка'
        dispatch(forgotError({ message }))
    }
}

export const reset = ({ formData, onSuccess }: TAnyAuthArgs) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
        if (getState().auth.isResetPending) return
        if (! formData!.password) throw new Error('Введите пароль')
        if (! formData!.token) throw new Error('Введите код')

        dispatch(resetRequest())
        await request('/password-reset/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        dispatch(resetSuccess())

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = (error as Error)?.message || 'Неизвестная ошибка'
        dispatch(resetError({ message }))
    }
}

export const logout = ({ onSuccess }: TAnyAuthArgs) => async (dispatch: TAppDispatch) => {
    try {

        dispatch(logoutRequest())
        await request('/auth/logout', {
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
        const message = (error as Error)?.message || 'Неизвестная ошибка'
        dispatch(logoutError({ message }))
    }
}

export const auth = () => async (dispatch: TAppDispatch) => {
    try {
        dispatch(authRequest())
        const json = await requestWithRefresh('/auth/user')

        dispatch(authSuccess({ user: json.user }))

    } catch (error) {
        const message = (error as Error)?.message || 'Неизвестная ошибка'
        dispatch(authError({ message }))
    }
}

export const update = ({ formData, onSuccess }: TAnyAuthArgs) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
        if (getState().auth.isUpdatePending) return

        dispatch(updateRequest())
        const json = await requestWithRefresh('/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        dispatch(updateSuccess({ user: json.user }))

        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    } catch (error) {
        const message = (error as Error)?.message || 'Неизвестная ошибка'
        dispatch(updateError({ message }))
    }
}

export default authSlice
