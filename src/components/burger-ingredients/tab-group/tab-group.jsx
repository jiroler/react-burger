import { memo, useContext } from 'react'
import styles from './tab-group.module.css'
import cn from 'classnames'
import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import { IngredientsContext } from '../../../services/ingredients-context'
import { func, string } from 'prop-types'

const TabGroup = memo(({ name, type, handleIngredientClick }) => {

    const items = useContext(IngredientsContext).filter(item => item.type === type)

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
    type: string.isRequired,
    handleIngredientClick: func.isRequired
}

export default TabGroup
