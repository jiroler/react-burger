
import { useEffect, useMemo, useState } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'

const url = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {

    const [state, setState] = useState({
        data: [],
        isLoaded: false,
        hasError: false
    })

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setState({ ...state, isLoaded: true, data: json.data }))
            .catch(() => setState({ ...state, isLoaded: false, hasError: true }))
    }, [])

    const fakeOrder = useMemo(() => {
        const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)]

        const allBuns = state.data.filter(item => item.type === 'bun')
        const allComponents = state.data.filter(item => item.type !== 'bun')
        const fakeComponents = []

        while (fakeComponents.length < 6) {
            fakeComponents.push(getRandomItem(allComponents))
        }

        return {
            bun: getRandomItem(allBuns),
            components: fakeComponents
        }
    }, [state.data])

    return (
        <>
            <AppHeader/>

            {state.hasError &&
                <h1 className={styles.error}>Произошла ошибка загрузки данных</h1>
            }

            {state.isLoaded &&
                <main className={styles.main}>
                    <BurgerIngredients data={state.data}/>
                    <BurgerConstructor {...fakeOrder}/>
                </main>
            }
        </>
    )
}

export default App
