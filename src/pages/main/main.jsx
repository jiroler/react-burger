import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/slices/ingredients'
import styles from './main.module.css'
import cn from 'classnames'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import Preloader from '../../components/preloader/preloader'

const MainPage = () => {

    const dispatch = useDispatch()
    const { items, isPending, error } = useSelector(store => store.ingredients)

    useEffect(() => {
        dispatch(getIngredients({ endpoint: '/ingredients' }))
    }, [dispatch])

    return (
        <>
            {error && <h1 className={cn(styles.info, 'text text_type_main-large error')}>{error}</h1>}

            {isPending && <Preloader/>}

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

export default MainPage
