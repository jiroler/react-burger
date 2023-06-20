import { forwardRef, memo } from 'react'
import styles from './tab-group.module.css'
import cn from 'classnames'
import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import { useAppSelector } from '../../../hooks'
import { TIngredient } from '../../../utils/types'

type TProps = {
    name: string,
    type: string,
    handleIngredientClick: (item: TIngredient) => void
}

const TabGroup = memo(forwardRef<HTMLParagraphElement, TProps>(({ name, type, handleIngredientClick }, titleRef) => {
    const items = useAppSelector(store => store.ingredients.items.filter(item => item.type === type))

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

export default TabGroup
