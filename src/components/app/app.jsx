
import { useMemo } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'
import useFetch from '../../hooks/use-fetch'

const url = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {

    const { data, isLoaded, error } = useFetch(url)

    const fakeOrder = useMemo(() => {
        const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)]

        const allBuns = data.filter(item => item.type === 'bun')
        const allComponents = data.filter(item => item.type !== 'bun')
        const fakeComponents = []

        while (fakeComponents.length < 6) {
            fakeComponents.push(getRandomItem(allComponents))
        }

        return {
            bun: getRandomItem(allBuns),
            components: fakeComponents
        }
    }, [data])

    return (
        <>
            <AppHeader/>

            {error &&
                <h1 className={styles.error}>{error}</h1>
            }

            {isLoaded &&
                <main className={styles.main}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor {...fakeOrder}/>
                </main>
            }
        </>
    )
}

export default App
