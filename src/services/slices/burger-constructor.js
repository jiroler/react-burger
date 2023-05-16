import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null,
        components: [],
        totalPrice: 0
    },
    reducers: {
        addIngredientToConstructor: {
            reducer: (state, action) => {
                const item = action.payload.item

                if (! item) return

                if (item.type === 'bun') {
                    if (state.bun !== null) {
                        state.totalPrice -= state.bun.price * 2
                    }
                    state.bun = item
                    state.totalPrice += item.price * 2
                } else {
                    state.components.push(item)
                    state.totalPrice += item.price
                }
            },
            prepare: (payload) => {
                if (payload.item) {
                    payload.item = {
                        ...payload.item,
                        uuid: uuidv4()
                    }
                }
                return { payload }
            }
        },
        removeIngredientFromConstructor: (state, action) => {
            const removingItem = state.bun.uuid === action.payload.uuid
                ? state.bun
                : state.components.find(item => item.uuid === action.payload.uuid)

            if (! removingItem) return

            if (removingItem.type === 'bun') {
                state.bun = null
                state.totalPrice -= removingItem.price * 2
            } else {
                state.components = state.components.filter(item => item.uuid !== removingItem.uuid)
                state.totalPrice -= removingItem.price
            }
        }
    }
})

export const { addIngredientToConstructor, removeIngredientFromConstructor } = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer
