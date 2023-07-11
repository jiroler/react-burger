import { feed } from '../../utils/fake'
import { FC } from 'react'
import styles from './order-details.module.css'
import cn from 'classnames'
import { OrderStatus } from '../order-status/order-status'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

type TProps = {
    item: typeof feed.orders[0]
}

type TIngredient = {
    _id: string,
    name: string,
    price: number,
    count: number
}

const items: TIngredient[] = [
    { _id: '1', name: 'Флюоресцентная булка R2-D3', price: 20, count: 2 },
    { _id: '2', name: 'Филе Люминесцентного тетраодонтимформа традиционный галактический', price: 300, count: 1 },
    { _id: '3', name: 'Соус традиционный галактический', price: 123, count: 1 },
    { _id: '4', name: 'Филе Люминесцентного тетраодонтимформа', price: 300, count: 1 },
    { _id: '5', name: 'Соус традиционный галактический', price: 123, count: 1 },
    { _id: '6', name: 'Плоды фалленианского дерева', price: 450, count: 1 },
    { _id: '7', name: 'Филе Люминесцентного тетраодонтимформа', price: 300, count: 1 },
    { _id: '8', name: 'Плоды фалленианского дерева', price: 450, count: 1 }
]

export const OrderDetails: FC<TProps> = ({ item }) => {

    return (
        <div className={styles.body}>
            <p className='text text_type_main-medium mt-10 mb-3'>{item.status}</p>
            <OrderStatus status={item.status} />
            <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
            <div className={cn(styles.table, 'custom-scroll pr-6')}>
                {items.map(item => (
                    <div key={item._id} className={styles.row}>
                        <div className={styles.item}>
                            <div className={styles.gradient}>
                                <div className={styles.thumb}></div>
                            </div>
                            <p className={cn(styles.name, 'text text_type_main-default')}>{item.name}</p>
                        </div>
                        <p className={cn(styles.price, 'text text_type_digits-default')}>
                            {item.count} x {item.price} <CurrencyIcon type="primary"/>
                        </p>
                    </div>
                ))}
            </div>
            <div className={cn(styles.footer, 'mt-10')}>
                <FormattedDate className='text_type_main-default text_color_inactive' date={new Date(item.createdAt)}/>
                <p className={cn(styles.price, 'text text_type_digits-default')}>
                    {123} <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}
