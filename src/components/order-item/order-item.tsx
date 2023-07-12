import { FC } from 'react'
import styles from './order-item.module.css'
import cn from 'classnames'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderStatus } from '../order-status/order-status'
import { TOrder } from '../../utils/types'
import { getIngredientsMap } from '../../services/slices/ingredients'
import { useAppSelector } from '../../hooks'

type TProps = {
    item: TOrder,
    handleClick: (item: TOrder) => void,
    showStatus?: boolean,
}

const maxIngredients = 6

export const OrderItem: FC<TProps> = ({ item, showStatus, handleClick }) => {
    const more = item.ingredients.length - maxIngredients
    const ingredients = item.ingredients.slice(0, maxIngredients).reverse()

    const ingredientsMap = useAppSelector(getIngredientsMap)
    const totalPrice = ingredients.reduce((acc, _id) => {
        acc += ingredientsMap[_id].price
        return acc
    }, 0)

    return (
        <div key={item._id} className={cn(styles.item, 'p-6')} onClick={() => { handleClick(item) }}>
            <div className={styles.between}>
                <p className={cn(styles.number, 'text text_type_digits-default')}>#{item.number}</p>
                <FormattedDate className='text_type_main-default text_color_inactive' date={new Date(item.createdAt)}/>
            </div>

            <p className={cn(styles.number, 'text text_type_main-medium mt-6')}>{item.name}</p>

            {showStatus && <OrderStatus status={item.status} className='mt-2'/>}

            <div className={cn(styles.between, 'mt-6')}>
                <div className={styles.thumbs}>
                    {ingredients.map((_id, index) => (
                        <div key={index} className={styles.gradient}>
                            <div className={styles.thumb}>
                                <img src={ingredientsMap[_id].image_mobile} alt={item.name} />
                            </div>
                            {index === 0 && more > 0 &&
                                <div className={cn(styles.more, 'text text_type_digits-default')}>
                                    <span className='text text_type_main-default'>+</span>
                                    {more}
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <p className={cn(styles.price, 'text text_type_digits-default')}>
                    {totalPrice} <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}
