/* eslint-disable camelcase */
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { request } from '../../utils/api'
import { TAppDispatch, TRootState } from '../store'
import { TIngredient } from '../../utils/types'

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [] as TIngredient[],
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

export const getIngredients = () => async (dispatch: TAppDispatch) => {
    try {
        dispatch(getIngredientsRequest())

        const json = await request('/ingredients')
        dispatch(getIngredientsSuccess({ items: json.data }))
    } catch (error) {
        const message = (error as Error)?.message || 'Ошибка загрузки'
        dispatch(getIngredientsError({ message }))
    }
}

type TIngredientsMap = {
    [key: string]: Pick<TIngredient, 'name' | 'image_mobile' | 'price'>
}

export const getIngredientsMap = createSelector(
    (store: TRootState) => store.ingredients.items,
    (ingredients) => ingredients.reduce((acc, item) => {
        acc[item._id] = {
            name: item.name,
            image_mobile: item.image_mobile,
            price: item.price
        }
        return acc
    }, {} as TIngredientsMap)
)

export default ingredientsSlice.reducer
