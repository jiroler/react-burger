import { memo } from 'react'
import styles from './tab-group.module.css'
import cn from 'classnames'
import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import { arrayOf, func, string } from 'prop-types'
import { dataItemType } from '../../../utils/types'

const TabGroup = memo(({ name, items, handleIngredientClick }) => {
    return (
        <>
            <p className='text text_type_main-medium'>{name}</p>
            <div className={cn(styles.container, 'p-4 pt-6 pb-10')}>
                {items.map(item => (
                    <BurgerIngredient key={item._id} item={item} count={item.fat % 10} handleClick={handleIngredientClick}/>
                ))}
            </div>
        </>
    )
})

TabGroup.propTypes = {
    name: string.isRequired,
    items: arrayOf(dataItemType).isRequired,
    handleIngredientClick: func.isRequired
}

export default TabGroup
