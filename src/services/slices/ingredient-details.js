import { createSlice } from '@reduxjs/toolkit'

const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: {
        item: null
    },
    reducers: {
        setIngredientDetails: (state, action) => {
            if (! action.payload.item) return
            state.item = action.payload.item
        },
        clearIngredientDetails: (state) => {
            state.item = null
        }
    }
})

export const { setIngredientDetails, clearIngredientDetails } = ingredientDetailsSlice.actions
export default ingredientDetailsSlice.reducer
