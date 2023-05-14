import { createSlice } from '@reduxjs/toolkit'

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        items: []
    },
    reducers: {}
})

export default ingredientsSlice.reducer
