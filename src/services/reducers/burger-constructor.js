import { createSlice } from '@reduxjs/toolkit'

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null,
        components: [],
        totalPrice: 0
    },
    reducers: {}
})

export default burgerConstructorSlice.reducer
