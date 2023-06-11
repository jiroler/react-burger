import { useDispatch, useSelector } from 'react-redux'
import styles from './ingredient-details-page.module.css'
import cn from 'classnames'
import { useEffect } from 'react'
import { getIngredients } from '../../services/slices/ingredients'
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details'
import { useParams } from 'react-router-dom'
import { setIngredientDetails } from '../../services/slices/ingredient-details'

const IngredientDetailsPage = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const { isPending, items, error } = useSelector(store => store.ingredients)
    const item = items.find(item => item._id === params?.id)

    useEffect(() => {
        dispatch(getIngredients({ endpoint: '/ingredients' }))
    }, [dispatch])

    useEffect(() => {
        dispatch(setIngredientDetails({ item }))
    }, [item, dispatch])

    return (
        <>
            {error &&
            <h1 className={cn(styles.title, 'text text_type_main-large mt-10 error')}>{error}</h1>
            }
            {isPending &&
            <h1 className={cn(styles.title, 'text text_type_main-large mt-10')}>Загрузка...</h1>
            }

            {item && (
                <>
                    <p className={cn(styles.title, 'text text_type_main-large mt-10')}>Детали ингредиента</p>
                    <IngredientDetails/>
                </>
            )}
        </>
    )
}

export default IngredientDetailsPage
