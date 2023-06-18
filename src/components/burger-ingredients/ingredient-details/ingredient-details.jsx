import { useEffect, useRef } from 'react'
import styles from './ingredient-details.module.css'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const IngredientDetails = () => {
    const imageRef = useRef()
    const params = useParams()
    const item = useSelector(store => store.ingredients.items?.find(item => item._id === params.id) || null)

    // Prevent modal jump due to image loading
    useEffect(() => {
        if (! item) return

        const onLoad = event => event.target.classList.remove(styles.fixedImageHeight)
        const imageNode = imageRef.current

        imageNode.addEventListener('load', onLoad)

        return () => {
            imageNode.removeEventListener('load', onLoad)
        }
    }, [item])

    if (! item) return null

    return (
        <div className={cn(styles.body, 'pb-15')}>
            <img ref={imageRef} className={styles.fixedImageHeight} src={item.image_large} alt={item.name} />
            <p className="text text_type_main-medium mt-4">{item.name}</p>

            <ul className={cn(styles.nutrients, 'mt-8 text text_type_main-default text_color_inactive')}>
                <li>
                    <span>Калории,ккал</span>
                    <span className='text_type_digits-default'>{item.calories}</span>
                </li>
                <li>
                    <span>Белки, г</span>
                    <span className='text_type_digits-default'>{item.proteins}</span>
                </li>
                <li>
                    <span>Жиры, г</span>
                    <span className='text_type_digits-default'>{item.fat}</span>
                </li>
                <li>
                    <span>Углеводы, г</span>
                    <span className='text_type_digits-default'>{item.carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails
