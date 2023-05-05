import { memo } from 'react'
import styles from './constructor-item.module.css'
import cn from 'classnames'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { bool, number, string } from 'prop-types'

const textSuffixes = {
    top: ' (верх)',
    bottom: ' (низ)'
}

const ConstructorItem = memo(({ type, isLocked, text, price, thumbnail }) => {
    return (
        <div className={styles.item}>
            {! isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                text={text + (textSuffixes[type] ?? '')}
                isLocked={isLocked}
                price={price}
                thumbnail={thumbnail}
                extraClass={cn(styles.dark, 'mr-4')}
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
