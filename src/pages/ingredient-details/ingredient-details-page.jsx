import { useDispatch, useSelector } from 'react-redux'
import styles from './ingredient-details-page.module.css'
import cn from 'classnames'
import { useEffect } from 'react'
import { getIngredients } from '../../services/slices/ingredients'
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details'
import Preloader from '../../components/preloader/preloader'

const IngredientDetailsPage = () => {

    const dispatch = useDispatch()
    const { isPending, items, error } = useSelector(store => store.ingredients)

    useEffect(() => {
        dispatch(getIngredients({ endpoint: '/ingredients' }))
    }, [dispatch])

    return (
        <>
            {error &&
            <h1 className={cn(styles.title, 'text text_type_main-large mt-10 error')}>{error}</h1>
            }

            {isPending && <Preloader/>}

            {items.length && (
                <>
                    <p className={cn(styles.title, 'text text_type_main-large mt-10')}>Детали ингредиента</p>
                    <IngredientDetails/>
                </>
            )}
        </>
    )
}

export default IngredientDetailsPage
