/* eslint-disable camelcase */
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { request } from '../../../utils/api'
import { TAppDispatch, TRootState } from '../../store'
import { TIngredient } from '../../../utils/types'

type TIngredients = {
    items: TIngredient[],
    isPending: boolean,
    error: string | null
}

const initialState: TIngredients = {
    items: [],
    isPending: false,
    error: null
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredientsRequest: (state) => {
            state.isPending = true
            state.error = null
        },
        getIngredientsSuccess: (state, action: PayloadAction<{items: TIngredient[]}>) => {
            state.items = action.payload.items
            state.isPending = false
            state.error = null
        },
        getIngredientsError: (state, action: PayloadAction<{message: string}>) => {
            state.isPending = false
            state.error = action.payload.message
        }
    }
})

export const { getIngredientsRequest, getIngredientsSuccess, getIngredientsError } = ingredientsSlice.actions

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

export default ingredientsSlice
