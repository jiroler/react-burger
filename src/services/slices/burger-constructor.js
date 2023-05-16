import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { decrementIngredient, incrementIngredient } from './ingredients'

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null,
        components: []
    },
    reducers: {
        addIngredientToConstructor: {
            reducer: (state, action) => {
                const item = action.payload.item

                if (item.type === 'bun') {
                    state.bun = item
                } else {
                    state.components.unshift(item)
                }
            },
            prepare: (payload) => {
                payload.item = {
                    ...payload.item,
                    uuid: uuidv4()
                }
                return { payload }
            }
        },
        removeIngredientFromConstructor: (state, action) => {
            const removingItem = action.payload.item

            if (removingItem.type === 'bun') {
                state.bun = null
            } else {
                state.components = state.components.filter(item => item.uuid !== removingItem.uuid)
            }
        }
    }
})

const { addIngredientToConstructor, removeIngredientFromConstructor } = burgerConstructorSlice.actions

export const addIngredient = ({ item }) => (dispatch, getState) => {
    const bun = getState().burgerConstructor.bun

    if (item.type === 'bun') {
        if (item._id === bun?._id) return

        // Старая булка заменяется
        if (bun !== null) {
            dispatch(decrementIngredient({ id: bun._id }))
            dispatch(decrementIngredient({ id: bun._id }))
        }

        // Дублируем булку
        dispatch(incrementIngredient({ id: item._id }))
    }

    dispatch(addIngredientToConstructor({ item }))
    dispatch(incrementIngredient({ id: item._id }))
}

export const removeIngredient = ({ item }) => dispatch => {
    dispatch(removeIngredientFromConstructor({ item }))
    dispatch(decrementIngredient({ id: item._id }))
}

export default burgerConstructorSlice.reducer
