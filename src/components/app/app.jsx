
import { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/slices/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
    const dispatch = useDispatch()
    const { items, isPending, error } = useSelector(store => store.ingredients)

    useEffect(() => {
        dispatch(getIngredients({ endpoint: '/ingredients' }))
    }, [dispatch])

    return (
        <>
            <AppHeader/>

            {error &&
                <h1 className={cn(styles.info, styles.error, 'text text_type_main-large')}>{error}</h1>
            }
            {isPending &&
                <h1 className={cn(styles.info, 'text text_type_main-large')}>Загрузка...</h1>
            }

            {items.length > 0 &&
                <main className={styles.main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </main>
            }
        </>
    )
}

export default App
