import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredients from './slices/ingredients'
import burgerConstructor from './slices/burger-constructor'
import ingredientDetails from './slices/ingredient-details'
import order from './slices/order'
import auth from './slices/auth'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'burgerConstructor',
    storage,
    whitelist: ['burgerConstructor']
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth,
    ingredients,
    burgerConstructor,
    ingredientDetails,
    order
}))

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
