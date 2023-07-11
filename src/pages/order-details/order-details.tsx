import styles from './order-details.module.css'
import cn from 'classnames'
import { feed } from '../../utils/fake'
import { OrderDetails } from '../../components/order-details/order-details'

const item = feed.orders[0]

export const OrderDetailsPage = () => {

    return (
        <div className={styles.wrapper}>
            <p className={cn(styles.title, 'text text_type_digits-default')}>#{item.number}</p>
            <OrderDetails item={item}/>
        </div>
    )
}
