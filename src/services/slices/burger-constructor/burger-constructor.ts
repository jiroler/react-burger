import { PayloadAction, nanoid } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { TConstructorIngredient, TIngredient } from '../../../utils/types'

type TBurgerConstructor = {
    bun: TConstructorIngredient | null,
    components: TConstructorIngredient[]
}

const initialState: TBurgerConstructor = {
    bun: null,
    components: []
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredientToConstructor: {
            reducer: (state, action: PayloadAction<{item: TConstructorIngredient}>) => {
                const item = action.payload.item

                if (item.type === 'bun') {
                    state.bun = item
                } else {
                    state.components.push(item)
                }
            },
            prepare: (payload: {item: TIngredient, uuid?: string}) => {
                const uniqueItem: TConstructorIngredient =
                    {
                        ...payload.item,
                        uuid: payload.uuid || nanoid()
                    }
                return { payload: { item: uniqueItem } }
            }
        },
        removeComponentFromConstructor: (state, action) => {
            state.components = state.components.filter(item => item.uuid !== action.payload.item.uuid)
        },
        moveComponent: (state, action: PayloadAction<{uuid: string, index: number}>) => {
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
export default burgerConstructorSlice
