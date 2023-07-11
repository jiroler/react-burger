import { useNavigate } from 'react-router-dom'
import { FeedItem } from '../../components/feed-item/feed-item'
import { feed } from '../../utils/fake'
import styles from './feed.module.css'
import cn from 'classnames'

export const FeedPage = () => {
    const navigate = useNavigate()
    const handleClick = (item: typeof feed.orders[0]) => {
        navigate(`/feed/${item._id}`)
    }

    return (
        <main className={styles.feed}>
            <section className="pt-10">
                <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
                <div className={cn(styles.items, 'custom-scroll pr-2')}>
                    {feed.orders.map(feed => (
                        <FeedItem key={feed._id} item={feed} handleClick={handleClick}/>
                    ))}
                </div>
            </section>
            <section className='pt-25 ml-15'>
                <div className={styles.numbers}>
                    <div>
                        <p className="text text_type_main-medium mb-6">Готовы:</p>
                        <div className={styles.table}>
                            {['034533', '034533', '034533', '034533', '034533', '034533'].map(number => (
                                <p className='text text_type_digits-default text_color_success'>{number}</p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mb-6">В работе:</p>
                        <div className={styles.table}>
                            {['034533', '034533', '034533', '034533', '034533', '034533'].map(number => (
                                <p className='text text_type_digits-default'>{number}</p>
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
