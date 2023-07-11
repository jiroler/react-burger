import { FC } from 'react'
import { feed } from '../../utils/fake'
import styles from './feed-item.module.css'
import cn from 'classnames'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderStatus } from '../order-status/order-status'

type TProps = {
    item: typeof feed.orders[0],
    handleClick: (item: typeof feed.orders[0]) => void,
    showStatus?: boolean,
}

const maxIngredients = 6

export const FeedItem: FC<TProps> = ({ item, showStatus, handleClick }) => {

    const more = item.ingredients.length - maxIngredients
    const ingredients = item.ingredients.slice(0, maxIngredients).reverse()

    return (
        <div className={cn(styles.item, 'p-6')} onClick={() => { handleClick(item) }}>
            <div className={styles.between}>
                <p className={cn(styles.number, 'text text_type_digits-default')}>#{item.number}</p>
                <FormattedDate className='text_type_main-default text_color_inactive' date={new Date(item.createdAt)}/>
            </div>
            <p className={cn(styles.number, 'text text_type_main-medium mt-6')}>{item.status}</p>
            {showStatus && <OrderStatus status={item.status} className='mt-2'/>}
            <div className={cn(styles.between, 'mt-6')}>
                <div>
                    {ingredients.map((_v, index) => (
                        <div className={styles.gradient}>
                            <div className={styles.thumb}></div>
                            {index === 0 && more > 0 &&
                                <div className={styles.more}>+{more}</div>
                            }
                        </div>
                    ))}
                </div>
                <p className={cn(styles.price, 'text text_type_digits-default')}>
                    {123} <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}
