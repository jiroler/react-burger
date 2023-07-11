import { useCallback, useEffect } from 'react'
import { useProfileHint } from '../../hooks/use-profile-hint'
import styles from './orders.module.css'
import cn from 'classnames'
import { OrderItem } from '../../components/order-item/order-item'
import { feed } from '../../utils/fake'
import { useLocation, useNavigate } from 'react-router-dom'

const OrdersPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleOrderClick = useCallback((item: typeof feed.orders[0]) => {
        navigate(`/profile/orders/${item._id}`, { state: { previousLocation: location } })
    }, [navigate, location])

    const { setHint } = useProfileHint()
    useEffect(() => {
        setHint('В этом разделе вы можете просмотреть свою историю заказов')
    }, [setHint])

    return (
        <div className={cn(styles.items, 'custom-scroll pr-2')}>
            {feed.orders.map(feed => (
                <OrderItem key={feed._id} item={feed} handleClick={handleOrderClick} showStatus/>
            ))}
        </div>
    )
}

export default OrdersPage
