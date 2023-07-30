import authSlice, { loginRequest, loginSuccess, loginError, registerRequest, registerSuccess, registerError, forgotRequest, forgotSuccess, forgotError, resetRequest, resetSuccess, resetError, updateRequest, updateSuccess, updateError, authRequest, authSuccess, authError, logoutRequest, logoutSuccess, logoutError, register, login, forgot, reset, update, auth, logout } from './auth'
import fetchMock from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store'
import { TAppDispatch, TRootState } from '../../store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore<Pick<TRootState, 'auth'>, TAppDispatch>(middlewares)

fetchMock.enableMocks()

describe('authSlice reducer', () => {
    it('should handle loginRequest', () => {
        const action = loginRequest()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), isLoginPending: true })
    })

    it('should handle loginSuccess', () => {
        const user = { name: 'Alex Bes', email: 'jiroler@gmail.com' }
        const action = loginSuccess({ user })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), user })
    })

    it('should handle loginError', () => {
        const errorMessage = 'Login failed'
        const action = loginError({ message: errorMessage })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), loginError: errorMessage })
    })

    it('should handle registerRequest', () => {
        const action = registerRequest()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), isRegisterPending: true })
    })

    it('should handle registerSuccess', () => {
        const action = registerSuccess()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState() })
    })

    it('should handle registerError', () => {
        const errorMessage = 'Registration failed'
        const action = registerError({ message: errorMessage })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), registerError: errorMessage })
    })

    it('should handle forgotRequest', () => {
        const action = forgotRequest()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), isForgotPending: true })
    })

    it('should handle forgotSuccess', () => {
        const action = forgotSuccess()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState() })
    })

    it('should handle forgotError', () => {
        const errorMessage = 'Forgot password failed'
        const action = forgotError({ message: errorMessage })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), forgotError: errorMessage })
    })

    it('should handle resetRequest', () => {
        const action = resetRequest()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), isResetPending: true })
    })

    it('should handle resetSuccess', () => {
        const action = resetSuccess()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState() })
    })

    it('should handle resetError', () => {
        const errorMessage = 'Password reset failed'
        const action = resetError({ message: errorMessage })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), resetError: errorMessage })
    })

    it('should handle updateRequest', () => {
        const action = updateRequest()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), isUpdatePending: true })
    })

    it('should handle updateSuccess', () => {
        const user = { name: 'Alex Bes 123', email: 'jiroler@gmail.com' }
        const action = updateSuccess({ user })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), user })
    })

    it('should handle updateError', () => {
        const errorMessage = 'Update failed'
        const action = updateError({ message: errorMessage })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), updateError: errorMessage })
    })

    it('should handle authRequest', () => {
        const action = authRequest()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({
            ...authSlice.getInitialState(),
            isAuthChecked: false,
            isAuthPending: true
        })
    })

    it('should handle authSuccess', () => {
        const user = { name: 'Authenticated User', email: 'authenticated@example.com' }
        const action = authSuccess({ user })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({
            ...authSlice.getInitialState(),
            isAuthChecked: true,
            isAuthPending: false,
            user
        })
    })

    it('should handle authError', () => {
        const errorMessage = 'Authentication failed'
        const action = authError({ message: errorMessage })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({
            ...authSlice.getInitialState(),
            isAuthChecked: true,
            isAuthPending: false,
            authError: errorMessage,
            user: null
        })
    })

    it('should handle logoutRequest', () => {
        const action = logoutRequest()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), isLogoutPending: true })
    })

    it('should handle logoutSuccess', () => {
        const action = logoutSuccess()
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), user: null })
    })

    it('should handle logoutError', () => {
        const errorMessage = 'Logout failed'
        const action = logoutError({ message: errorMessage })
        const newState = authSlice.reducer(undefined, action)
        expect(newState).toEqual({ ...authSlice.getInitialState(), logoutError: errorMessage })
    })
})

describe('authSlice reducer (async)', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('should handle register', async () => {
        const store = mockStore({ [authSlice.name]: authSlice.getInitialState() })
        const mockResponse = { success: true }
        const formData = { name: 'Alex Bes', email: 'jiroler@gmail.com', password: '******' }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(register({ formData }))

        const expectedActions = [
            { type: registerRequest.type, payload: undefined },
            { type: registerSuccess.type, payload: undefined }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should handle login', async () => {
        const store = mockStore({ [authSlice.name]: authSlice.getInitialState() })
        const mockResponse = { success: true, user: { name: 'Alex Bes', email: 'jiroler@gmail.com' } }
        const formData = { email: 'jiroler@gmail.com', password: '******' }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(login({ formData }))

        const expectedActions = [
            { type: loginRequest.type, payload: undefined },
            { type: loginSuccess.type, payload: { user: { name: 'Alex Bes', email: 'jiroler@gmail.com' } } }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should handle forgot', async () => {
        const store = mockStore({ [authSlice.name]: authSlice.getInitialState() })
        const mockResponse = { success: true }
        const formData = { email: 'jiroler@gmail.com' }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(forgot({ formData }))

        const expectedActions = [
            { type: forgotRequest.type, payload: undefined },
            { type: forgotSuccess.type, payload: undefined }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should handle reset', async () => {
        const store = mockStore({ [authSlice.name]: authSlice.getInitialState() })
        const mockResponse = { success: true }
        const formData = { password: '******', token: '123' }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(reset({ formData }))

        const expectedActions = [
            { type: resetRequest.type, payload: undefined },
            { type: resetSuccess.type, payload: undefined }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should handle update', async () => {
        const store = mockStore({ [authSlice.name]: authSlice.getInitialState() })
        const mockResponse = { success: true, user: { name: 'Alex Bes 123', email: 'jiroler@gmail.com' } }
        const formData = { name: 'Alex Bes 123', email: 'jiroler@gmail.com' }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(update({ formData }))

        const expectedActions = [
            { type: updateRequest.type, payload: undefined },
            { type: updateSuccess.type, payload: { user: { name: 'Alex Bes 123', email: 'jiroler@gmail.com' } } }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should handle auth', async () => {
        const store = mockStore({ [authSlice.name]: authSlice.getInitialState() })
        const mockResponse = { success: true, user: { name: 'Alex Bes', email: 'jiroler@gmail.com' } }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(auth())

        const expectedActions = [
            { type: authRequest.type, payload: undefined },
            { type: authSuccess.type, payload: { user: { name: 'Alex Bes', email: 'jiroler@gmail.com' } } }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should handle logout', async () => {
        const store = mockStore({ [authSlice.name]: authSlice.getInitialState() })
        const mockResponse = { success: true }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(logout({}))

        const expectedActions = [
            { type: logoutRequest.type, payload: undefined },
            { type: logoutSuccess.type, payload: undefined }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })
})
