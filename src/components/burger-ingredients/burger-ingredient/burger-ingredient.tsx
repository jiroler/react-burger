import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.css'
import cn from 'classnames'
import { FC, memo } from 'react'
import { useDrag } from 'react-dnd'
import { TIngredient } from '../../../utils/types'
import { useAppSelector } from '../../../hooks'

type TProps = {
    handleClick: (item: TIngredient) => void,
    item: TIngredient
}

const BurgerIngredient: FC<TProps> = memo(({ item, handleClick }) => {
    const onClick = () => {
        handleClick(item)
    }

    const count = useAppSelector(store =>
        store.burgerConstructor.bun?._id !== item._id
            ? store.burgerConstructor.components.filter(component => component._id === item._id).length
            : 2
    )

    const [{ isDragging }, ref] = useDrag({
        type: 'ingredient',
        item: { item },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div ref={ref} className={cn(styles.box, { [styles.dragging]: isDragging }, 'pb-4')} onClick={onClick}>
            <img src={item.image} alt={item.name} className='ml-4 mr-4'/>
            <p className={cn(styles.price, 'text text_type_digits-default mt-1')}>
                {item.price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className="text text_type_main-default mt-1 pr-1 pl-1">
                {item.name}
            </p>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        </div>
    )
})

export default BurgerIngredient
