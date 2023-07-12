import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TOrder, TSocketData } from '../../utils/types'

type TSocket = {
    isConnected: boolean,
    isConnecting: boolean,
    orders: TOrder[],
    total: number,
    totalToday: number,
    error: string | null
}

const initialState: TSocket = {
    isConnected: false,
    isConnecting: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
}

const socket = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectionStart: (state, _action: PayloadAction<{url: string}>) => {
            state.error = null
            state.isConnecting = true
        },
        connectionSuccess: (state) => {
            state.isConnected = true
            state.isConnecting = false
        },
        connectionClose: (state) => {
            state.isConnected = false
        },
        connectionError: (state, action) => {
            state.isConnected = false
            state.error = String(action.payload)
        },
        getMessage: (state, action: PayloadAction<{data: TSocketData}>) => {
            const data = action.payload.data
            state.orders = data.orders
            state.total = data.total
            state.totalToday = data.totalToday
        },
        sendMessage: (_state, _action: PayloadAction<{data: any[]}>) => {}
    }
})

export const { connectionStart, connectionSuccess, connectionClose, connectionError, getMessage, sendMessage } = socket.actions

export default socket.reducer
