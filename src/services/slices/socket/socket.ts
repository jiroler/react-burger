import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TOrder, TSocketData } from '../../../utils/types'

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

const socketSlice = createSlice({
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
        connectionError: (state, action: PayloadAction<Event>) => {
            state.isConnected = false
            state.error = String(action.payload)
        },
        getMessage: (state, action: PayloadAction<{data: TSocketData}>) => {
            const data = action.payload.data
            if (data.success) {
                state.orders = data.orders!.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                state.total = data.total!
                state.totalToday = data.totalToday!
            } else {
                state.error = data.message!
            }
        },
        sendMessage: (_state, _action: PayloadAction<{data: any}>) => {}
    }
})

export const { connectionStart, connectionSuccess, connectionClose, connectionError, getMessage, sendMessage } = socketSlice.actions

export default socketSlice
