import { createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/api'

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
        getIngredientsSuccess: {
            reducer: (state, action) => {
                state.items = action.payload.items
                state.isPending = false
                state.error = null
            },
            prepare: (payload) => {
                return {
                    payload: {
                        items: payload.items.map(item => {
                            item.count = 0
                            return item
                        })
                    }
                }
            }
        },
        getIngredientsError: (state, action) => {
            state.isPending = false
            state.error = action.payload.message
        },
        incrementIngredient: (state, action) => {
            const item = state.items.find(item => item._id === action.payload.id)
            if (! item) return
            item.count ++
        },
        decrementIngredient: (state, action) => {
            const item = state.items.find(item => item._id === action.payload.id)
            if (! item) return
            item.count --
        }
    }
})

const { getIngredientsRequest, getIngredientsSuccess, getIngredientsError } = ingredientsSlice.actions

export const getIngredients = ({ url }) => async dispatch => {
    try {
        dispatch(getIngredientsRequest())

        const response = await fetch(baseUrl + url)
        if (response.ok) {
            const json = await response.json()
            dispatch(getIngredientsSuccess({ items: json.data }))
        } else {
            throw new Error(`Ошибка ${response.status}`)
        }

    } catch (error) {
        const message = error?.message || 'Ошибка загрузки'
        dispatch(getIngredientsError({ message }))
    }
}

export const { incrementIngredient, decrementIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer
