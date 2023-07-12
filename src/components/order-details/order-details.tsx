import { FC, useEffect } from 'react'
import styles from './order-details.module.css'
import cn from 'classnames'
import { OrderStatus } from '../order-status/order-status'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { useModalTitle } from '../../hooks/use-modal-title'
import { useAppSelector } from '../../hooks'
import { getIngredientsMap } from '../../services/slices/ingredients'

type TIngredient = {
    _id: string,
    name: string,
    price: number,
    count: number
}

export const OrderDetails: FC = () => {
    const params = useParams()
    const { setModalTitle } = useModalTitle()

    const item = useAppSelector(store => store.socket.orders?.find(item => item._id === params.id) || null)

    useEffect(() => {
        item && setModalTitle(`#${item.number}`)
    }, [item, setModalTitle])

    const ingredientsMap = useAppSelector(getIngredientsMap)

    if (! item) return null

    const { totalPrice, ingredients } = item.ingredients.reduce((acc, _id) => {
        acc.totalPrice += ingredientsMap[_id].price
        const existingIngredient = acc.ingredients.find(item => item._id === _id)
        if (existingIngredient) {
            existingIngredient.count ++
        } else {
            acc.ingredients.push({
                _id,
                name: ingredientsMap[_id].name,
                price: ingredientsMap[_id].price,
                count: 1
            })
        }
        return acc
    }, { totalPrice: 0, ingredients: [] } as {totalPrice: number, ingredients: TIngredient[]})

    return (
        <div className={styles.body}>
            <p className='text text_type_main-medium mt-10 mb-3'>{item.name}</p>
            <OrderStatus status={item.status} />
            <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
            <div className={cn(styles.table, 'custom-scroll pr-6')}>
                {ingredients.map(item => (
                    <div key={item._id} className={styles.row}>
                        <div className={styles.item}>
                            <div className={styles.gradient}>
                                <div className={styles.thumb}>
                                    <img src={ingredientsMap[item._id].image_mobile} alt={item.name} />
                                </div>
                            </div>
                            <p className={cn(styles.name, 'text text_type_main-default')}>{item.name}</p>
                        </div>
                        <p className={cn(styles.price, 'text text_type_digits-default')}>
                            {item.count} x {item.price} <CurrencyIcon type="primary"/>
                        </p>
                    </div>
                ))}
            </div>
            <div className={cn(styles.footer, 'mt-10 mb-10')}>
                <FormattedDate className='text_type_main-default text_color_inactive' date={new Date(item.createdAt)}/>
                <p className={cn(styles.price, 'text text_type_digits-default')}>
                    {totalPrice} <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}
