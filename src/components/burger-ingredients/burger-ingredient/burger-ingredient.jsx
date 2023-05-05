import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.css'
import cn from 'classnames'
import { func, number } from 'prop-types'
import { dataItemType } from '../../../utils/types'
import { memo } from 'react'

const BurgerIngredient = memo(({ item, count, handleClick }) => {
    const onClick = () => {
        handleClick(item)
    }

    return (
        <div className={cn(styles.box, 'pb-4')} onClick={onClick}>
            <img src={item.image} alt={item.name} className='ml-4 mr-4'/>
            <p className={cn(styles.price, 'text text_type_digits-default mt-1')}>
                {item.price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className="text text_type_main-default mt-1 pr-1 pl-1">
                {item.name}
            </p>
            {count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
        </div>
    )
})

BurgerIngredient.propTypes = {
    handleClick: func.isRequired,
    item: dataItemType,
    count: number
}

export default BurgerIngredient
