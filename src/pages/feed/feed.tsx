import { useLocation, useNavigate } from 'react-router-dom'
import { OrderItem } from '../../components/order-item/order-item'
import { feed } from '../../utils/fake'
import styles from './feed.module.css'
import cn from 'classnames'
import { useCallback } from 'react'

export const FeedPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleOrderClick = useCallback((item: typeof feed.orders[0]) => {
        navigate(`/feed/${item._id}`, { state: { previousLocation: location } })
    }, [navigate, location])

    return (
        <main className={styles.feed}>
            <section className="pt-10">
                <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
                <div className={cn(styles.items, 'custom-scroll pr-2')}>
                    {feed.orders.map(feed => (
                        <OrderItem key={feed._id} item={feed} handleClick={handleOrderClick}/>
                    ))}
                </div>
            </section>
            <section className='pt-25 ml-15'>
                <div className={styles.numbers}>
                    <div>
                        <p className="text text_type_main-medium mb-6">Готовы:</p>
                        <div className={styles.table}>
                            {['0345331', '0345332', '0345333', '0345334', '0345335', '034533'].map(number => (
                                <p key={number} className='text text_type_digits-default text_color_success'>{number}</p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mb-6">В работе:</p>
                        <div className={styles.table}>
                            {['0345331', '0345332', '0345333', '0345334', '0345335', '034533'].map(number => (
                                <p key={number} className='text text_type_digits-default'>{number}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                <p className={cn(styles.done, 'text text_type_digits-large')}>28752</p>
                <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                <p className={cn(styles.done, 'text text_type_digits-large')}>138</p>
            </section>
        </main>
    )
}
