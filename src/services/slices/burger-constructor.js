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
                    state.components.push(item)
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
        removeComponentFromConstructor: (state, action) => {
            state.components = state.components.filter(item => item.uuid !== action.payload.item.uuid)
        },
        moveComponent: (state, action) => {
            const { uuid, index } = action.payload
            const originalIndex = state.components.findIndex(item => item.uuid === uuid)
            const component = state.components[originalIndex]

            state.components.splice(originalIndex, 1)
            state.components.splice(index, 0, component)
        }
    }
})

const { addIngredientToConstructor, removeComponentFromConstructor } = burgerConstructorSlice.actions

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

export const removeComponent = ({ item }) => dispatch => {
    dispatch(removeComponentFromConstructor({ item }))
    dispatch(decrementIngredient({ id: item._id }))
}

export const { moveComponent } = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer
