import { createSlice } from '@reduxjs/toolkit'
import { clearConstructor } from './burger-constructor'
import { request } from '../../utils/api'
import cookies from 'js-cookie'
import { ECookie } from '../../utils/types'

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

export const makeOrder = ({ endpoint, ingredients, onSuccess }) => async (dispatch, getState) => {
    try {
        if (getState().order.isPending) return
        if (getState().burgerConstructor.bun === null) throw new Error('Добавьте булку')
        if (getState().burgerConstructor.components.length === 0) throw new Error('Добавьте ингредиенты')

        dispatch(makeOrderRequest())
        const json = await request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: cookies.get(ECookie.accessToken) },
            body: JSON.stringify({ ingredients })
        })

        dispatch(makeOrderSuccess({ number: json.order?.number }))
        dispatch(clearConstructor())

        if (typeof onSuccess === 'function') {
            onSuccess()
        }

    } catch (error) {
        const message = error?.message || 'Ошибка загрузки'
        dispatch(makeOrderError({ message }))
    }
}

export default orderSlice.reducer
