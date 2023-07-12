import { useLocation, useNavigate } from 'react-router-dom'
import { OrderItem } from '../../components/order-item/order-item'
import styles from './feed.module.css'
import cn from 'classnames'
import { useCallback, useEffect } from 'react'
import { connectionClose, connectionStart } from '../../services/slices/socket'
import { socketUrlOrdersAll } from '../../utils/api'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { EOrderStatus, TOrder } from '../../utils/types'
import Preloader from '../../components/preloader/preloader'
import { getIngredients } from '../../services/slices/ingredients'

export const FeedPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { orders, total, totalToday, isConnecting, isConnected, error: socketError } = useAppSelector(store => store.socket)
    const { isPending, error: fetchError } = useAppSelector(store => store.ingredients)

    const numbersReady = useAppSelector(store => {
        return store.socket.orders
            .filter(item => item.status === EOrderStatus.done)
            .map(item => item.number)
            .slice(0, 10)
    })
    const numbersPending = useAppSelector(store => {
        return store.socket.orders
            .filter(item => item.status === EOrderStatus.pending || item.status === EOrderStatus.created)
            .map(item => item.number)
            .slice(0, 10)
    })

    useEffect(() => {
        dispatch(getIngredients())
        dispatch(connectionStart({ url: socketUrlOrdersAll }))

        return () => {
            dispatch(connectionClose())
        }
    }, [dispatch])

    const handleOrderClick = useCallback((item: TOrder) => {
        navigate(`/feed/${item._id}`, { state: { previousLocation: location } })
    }, [navigate, location])

    if (isConnecting || isPending) return (<Preloader/>)
    if (socketError || fetchError) return (<h1 className={cn('text text_type_main-large mt-10 error center')}>{socketError || fetchError}</h1>)

    if (isConnected && orders.length) {
        return (
            <main className={styles.feed}>
                <section className="pt-10">
                    <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
                    <div className={cn(styles.items, 'custom-scroll pr-2')}>
                        {orders.map(order => (
                            <OrderItem key={order._id} item={order} handleClick={handleOrderClick}/>
                        ))}
                    </div>
                </section>
                <section className='pt-25 ml-15'>
                    <div className={styles.numbers}>
                        <div>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            <div className={styles.table}>
                                {numbersReady.map(number => (
                                    <p key={number} className='text text_type_digits-default text_color_success'>{number}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            <div className={styles.table}>
                                {numbersPending.map(number => (
                                    <p key={number} className='text text_type_digits-default'>{number}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                    <p className={cn(styles.done, 'text text_type_digits-large')}>{total}</p>
                    <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                    <p className={cn(styles.done, 'text text_type_digits-large')}>{totalToday}</p>
                </section>
            </main>
        )
    }

    return null
}
