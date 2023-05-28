import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

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
        },
        clearConstructor: (state) => {
            state.bun = null
            state.components = []
        }
    }
})

export const { addIngredientToConstructor, removeComponentFromConstructor, moveComponent, clearConstructor } = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer
