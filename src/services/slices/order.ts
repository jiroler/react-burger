import { createSlice } from '@reduxjs/toolkit'
import { clearConstructor } from './burger-constructor'
import { requestWithToken } from '../../utils/api'
import { TAppDispatch, TRootState } from '../store'

type TNumber = number | null

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        number: null as TNumber,
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

export const makeOrder = ({ ingredients, onSuccess }: { ingredients: string[], onSuccess?: () => void }) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
        if (getState().order.isPending) return
        if (getState().burgerConstructor.bun === null) throw new Error('Добавьте булку')
        if (getState().burgerConstructor.components.length === 0) throw new Error('Добавьте ингредиенты')

        dispatch(makeOrderRequest())
        const json = await requestWithToken('/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients })
        })

        dispatch(makeOrderSuccess({ number: json.order?.number }))
        dispatch(clearConstructor())

        if (typeof onSuccess === 'function') {
            onSuccess()
        }

    } catch (error) {
        const message = (error as Error)?.message || 'Ошибка загрузки'
        dispatch(makeOrderError({ message }))
    }
}

export default orderSlice.reducer
