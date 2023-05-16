import { memo } from 'react'
import styles from './constructor-item.module.css'
import cn from 'classnames'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { bool, number, string } from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeIngredient } from '../../../services/slices/burger-constructor'

const textSuffixes = {
    top: ' (верх)',
    bottom: ' (низ)'
}

const ConstructorItem = memo(({ type, isLocked, item }) => {
    const dispatch = useDispatch()
    const handleRemove = () => {
        if (isLocked) return
        dispatch(removeIngredient({ item }))
    }

    return (
        <div className={styles.item}>
            {! isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                text={item.name + (textSuffixes[type] ?? '')}
                isLocked={isLocked}
                price={item.price}
                thumbnail={item.image}
                extraClass={cn(styles.dark, 'mr-4')}
                handleClose={handleRemove}
            />
        </div>
    )
})

ConstructorItem.propTypes = {
    text: string.isRequired,
    price: number.isRequired,
    thumbnail: string.isRequired,
    type: string,
    isLocked: bool
}

export default ConstructorItem
