import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.css'
import cn from 'classnames'
import { number } from 'prop-types'
import { dataItemType } from '../../../utils/data'

export default function BurgerIngredient({ item, count }) {
    return (
        <div className={styles.box}>
            <img src={item.image} alt={item.name} className='ml-4 mr-4'/>
            <p className={cn(styles.price, 'text text_type_digits-default mt-1')}>
                {item.price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className="text text_type_main-default mt-1">
                {item.name}
            </p>
            {count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
        </div>
    )
}

BurgerIngredient.propTypes = {
    item: dataItemType,
    count: number
}
