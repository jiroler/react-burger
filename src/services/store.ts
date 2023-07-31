import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './slices/ingredients/ingredients'
import burgerConstructorSlice from './slices/burger-constructor/burger-constructor'
import orderSlice from './slices/order/order'
import authSlice from './slices/auth/auth'
import socketSlice from './slices/socket/socket'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { socketMiddleware } from './middlewares/socketMiddleware'

const persistConfig = {
    key: 'burgerConstructor',
    storage,
    whitelist: ['burgerConstructor']
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth: authSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    order: orderSlice.reducer,
    socket: socketSlice.reducer
}))

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(socketMiddleware())
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType <typeof store.getState>
