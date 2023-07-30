import thunk from 'redux-thunk'
import orderSlice, { makeOrder, makeOrderError, makeOrderRequest, makeOrderSuccess } from './order'
import fetchMock from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store'
import { TAppDispatch, TRootState } from '../../store'
import { clearConstructor } from '../burger-constructor/burger-constructor'

const middlewares = [thunk]
const mockStore = configureMockStore<Pick<TRootState, 'order'>, TAppDispatch>(middlewares)

fetchMock.enableMocks()

describe('orderSlice reducer', () => {
    it('should handle makeOrderRequest', () => {
        const nextState = orderSlice.reducer(undefined, makeOrderRequest())
        expect(nextState).toEqual({ number: null, isPending: true, error: null })
    })

    it('should handle makeOrderSuccess', () => {
        const payload = { number: 123 }
        const nextState = orderSlice.reducer(undefined, makeOrderSuccess(payload))
        expect(nextState).toEqual({ number: 123, isPending: false, error: null })
    })

    it('should handle makeOrderError', () => {
        const payload = { message: 'Error message' }
        const nextState = orderSlice.reducer(undefined, makeOrderError(payload))
        expect(nextState).toEqual({ number: null, isPending: false, error: 'Error message' })
    })
})

describe('orderSlice reducer (async)', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('should handle makeOrder', async () => {

        const store = mockStore({ [orderSlice.name]: orderSlice.getInitialState() })
        const mockResponse = { success: true, order: { number: 123 } }
        const ingredients = ['123', '456']

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(makeOrder({ ingredients }))

        const expectedActions = [
            { type: makeOrderRequest.type, payload: undefined },
            { type: makeOrderSuccess.type, payload: { number: 123 } },
            { type: clearConstructor.type, payload: undefined }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })
})
