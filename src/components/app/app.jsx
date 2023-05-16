
import { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/slices/ingredients'
import { addIngredientToConstructor } from '../../services/slices/burger-constructor'

const url = '/ingredients'

const App = () => {
    const dispatch = useDispatch()
    const { items, isPending, error } = useSelector(store => store.ingredients)

    useEffect(() => {
        dispatch(getIngredients({ url }))
    }, [dispatch])

    useEffect(() => {
        if (! items.length) return

        const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)]

        for (let i = 0; i < 6; i ++) {
            dispatch(addIngredientToConstructor({ item: getRandomItem(items) }))
        }
    }, [dispatch, items])

    return (
        <>
            <AppHeader/>

            {error &&
                <h1 className={cn(styles.error, 'text text_type_main-large')}>{error}</h1>
            }
            {isPending && <p>Загрузка #todo</p> }

            {items.length > 0 &&
                <main className={styles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            }
        </>
    )
}

export default App
