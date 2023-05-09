
import { useEffect, useReducer } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'
import cn from 'classnames'
import useFetchIngredients from '../../hooks/use-fetch-ingredients'
import { ConstructorContext } from '../../services/constructor-context'

const url = 'https://norma.nomoreparties.space/api/ingredients'

const constructorReducer = (state, action) => {
    const updatedState = {
        bun: state.bun,
        components: [...state.components],
        totalPrice: state.totalPrice
    }

    switch (action.type) {
        case 'add':
            if (action.payload.type === 'bun') {
                if (state.bun !== null) return state
                updatedState.bun = action.payload
                updatedState.totalPrice += action.payload.price * 2
            } else {
                updatedState.components.push(action.payload)
                updatedState.totalPrice += action.payload.price
            }
            return updatedState
        default:
            throw new Error('Unexpected constructor action')
    }

}

const App = () => {

    const { data, isLoaded, error } = useFetchIngredients(url)
    const [constructorState, constructorDispatch] = useReducer(constructorReducer, {
        bun: null,
        components: [],
        totalPrice: 0
    })

    useEffect(() => {
        if (! data.length) return

        const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)]

        for (let i = 0; i < 10; i ++) {
            constructorDispatch({ type: 'add', payload: getRandomItem(data) })
        }
    }, [data])

    return (
        <>
            <AppHeader/>

            {error &&
                <h1 className={cn(styles.error, 'text text_type_main-large')}>{error}</h1>
            }

            {isLoaded &&
                <main className={styles.main}>
                    <BurgerIngredients data={data}/>
                    <ConstructorContext.Provider value={{ constructorState, constructorDispatch }}>
                        <BurgerConstructor/>
                    </ConstructorContext.Provider>
                </main>
            }
        </>
    )
}

export default App
