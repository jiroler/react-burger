import { fakeSocketData } from '../../../utils/fake'
import socketSlice, { connectionClose, connectionError, connectionStart, connectionSuccess, getMessage } from './socket'

describe('socketSlice reducers', () => {
    it('should handle connectionStart', () => {
        const action = connectionStart({ url: 'wss://example.com' })
        const newState = socketSlice.reducer(undefined, action)
        expect(newState).toEqual({ isConnected: false, isConnecting: true, orders: [], total: 0, totalToday: 0, error: null })
    })

    it('should handle connectionSuccess', () => {
        const newState = socketSlice.reducer(undefined, connectionSuccess())
        expect(newState).toEqual({ isConnected: true, isConnecting: false, orders: [], total: 0, totalToday: 0, error: null })
    })

    it('should handle connectionClose', () => {
        const initialState = socketSlice.reducer(undefined, connectionSuccess())
        const newState = socketSlice.reducer(initialState, connectionClose())
        expect(newState).toEqual({ isConnected: false, isConnecting: false, orders: [], total: 0, totalToday: 0, error: null })
    })

    it('should handle connectionError', () => {
        const initialState = socketSlice.reducer(undefined, connectionSuccess())
        const action = connectionError(new Event('error'))
        const newState = socketSlice.reducer(initialState, action)
        expect(newState).toEqual({ isConnected: false, isConnecting: false, orders: [], total: 0, totalToday: 0, error: '[object Event]' })
    })

    it('should handle getMessage', () => {
        const initialState = socketSlice.reducer(undefined, connectionSuccess())
        const action = getMessage({ data: fakeSocketData })
        const newState = socketSlice.reducer(initialState, action)
        expect(newState).toEqual({ isConnected: true, isConnecting: false, orders: fakeSocketData.orders, total: fakeSocketData.total, totalToday: fakeSocketData.totalToday, error: null })
    })
})
