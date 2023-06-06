import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import reportWebVitals from './reportWebVitals'
import App from './components/app/app'
import { configureStore } from '@reduxjs/toolkit'
import ingredients from './services/slices/ingredients'
import burgerConstructor from './services/slices/burger-constructor'
import ingredientDetails from './services/slices/ingredient-details'
import order from './services/slices/order'
import auth from './services/slices/auth'
import { Provider } from 'react-redux'

const store = configureStore({
    reducer: {
        auth,
        ingredients,
        burgerConstructor,
        ingredientDetails,
        order
    }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
