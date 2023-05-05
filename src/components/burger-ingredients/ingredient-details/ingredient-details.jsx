import { useEffect, useRef } from 'react'
import styles from './ingredient-details.module.css'
import cn from 'classnames'
import { dataItemType } from '../../../utils/types'

const IngredientDetails = ({ item }) => {
    const imageRef = useRef()

    // Prevent modal jump due to image loading
    useEffect(() => {
        const onLoad = event => event.target.classList.remove(styles.fixedImageHeight)
        const imageNode = imageRef.current

        imageNode.addEventListener('load', onLoad)

        return () => {
            imageNode.removeEventListener('load', onLoad)
        }
    }, [])

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

IngredientDetails.propTypes = {
    item: dataItemType
}

export default IngredientDetails
