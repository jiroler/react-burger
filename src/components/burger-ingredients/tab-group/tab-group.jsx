import { forwardRef, memo } from 'react'
import styles from './tab-group.module.css'
import cn from 'classnames'
import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import { func, string } from 'prop-types'
import { useSelector } from 'react-redux'

const TabGroup = memo(forwardRef(({ name, type, handleIngredientClick }, titleRef) => {
    const items = useSelector(store => store.ingredients.items.filter(item => item.type === type))

    return (
        <>
            <p ref={titleRef} className='text text_type_main-medium'>{name}</p>
            <div className={cn(styles.container, 'p-4 pt-6 pb-10')}>
                {items.map(item => (
                    <BurgerIngredient key={item._id} item={item} handleClick={handleIngredientClick}/>
                ))}
            </div>
        </>
    )
}))

TabGroup.propTypes = {
    name: string.isRequired,
    type: string.isRequired,
    handleIngredientClick: func.isRequired
}

export default TabGroup
