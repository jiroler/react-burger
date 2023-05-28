import { createSlice } from '@reduxjs/toolkit'
import { request } from '../../utils/api'

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [],
        isPending: false,
        error: null
    },
    reducers: {
        getIngredientsRequest: (state) => {
            state.isPending = true
            state.error = null
        },
        getIngredientsSuccess: (state, action) => {
            state.items = action.payload.items
            state.isPending = false
            state.error = null
        },
        getIngredientsError: (state, action) => {
            state.isPending = false
            state.error = action.payload.message
        }
    }
})

const { getIngredientsRequest, getIngredientsSuccess, getIngredientsError } = ingredientsSlice.actions

export const getIngredients = ({ endpoint }) => async dispatch => {
    try {
        dispatch(getIngredientsRequest())

        const json = await request(endpoint)
        dispatch(getIngredientsSuccess({ items: json.data }))
    } catch (error) {
        const message = error?.message || 'Ошибка загрузки'
        dispatch(getIngredientsError({ message }))
    }
}

export default ingredientsSlice.reducer
