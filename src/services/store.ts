import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredients from './slices/ingredients'
import burgerConstructor from './slices/burger-constructor'
import order from './slices/order'
import auth from './slices/auth'
import socket from './slices/socket'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { socketMiddleware } from './middlewares/socketMiddleware'

const persistConfig = {
    key: 'burgerConstructor',
    storage,
    whitelist: ['burgerConstructor']
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth,
    ingredients,
    burgerConstructor,
    order,
    socket
}))

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(socketMiddleware())
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType <typeof store.getState>
