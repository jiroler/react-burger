import { createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/api'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        number: null,
        isPending: false,
        error: null
    },
    reducers: {
        makeOrderRequest: (state) => {
            state.isPending = true
            state.error = null
        },
        makeOrderSuccess: (state, action) => {
            state.number = action.payload.number
            state.isPending = false
            state.error = null
        },
        makeOrderError: (state, action) => {
            state.isPending = false
            state.error = action.payload.message
        }
    }
})

const { makeOrderRequest, makeOrderSuccess, makeOrderError } = orderSlice.actions

export const makeOrder = ({ url, ingredients, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().order.isPending) return

        dispatch(makeOrderRequest())
        const response = await fetch(baseUrl + url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients })
        })

        if (response.ok) {
            const json = await response.json()

            if (! json.success) throw new Error(json.message)
            dispatch(makeOrderSuccess({ number: json.order?.number }))

            if (typeof onSuccess === 'function') {
                onSuccess()
            }
        } else {
            throw new Error(`Ошибка ${response.status}`)
        }
    } catch (error) {
        const message = error?.message || 'Ошибка загрузки'
        dispatch(makeOrderError({ message }))
    }
}

export default orderSlice.reducer
