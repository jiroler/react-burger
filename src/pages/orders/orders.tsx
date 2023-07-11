import { useEffect } from 'react'
import { useProfileHint } from '../../hooks/use-profile-hint'
import styles from './orders.module.css'
import cn from 'classnames'
import { FeedItem } from '../../components/feed-item/feed-item'
import { feed } from '../../utils/fake'
import { useNavigate } from 'react-router-dom'

const OrdersPage = () => {
    const navigate = useNavigate()
    const handleClick = (item: typeof feed.orders[0]) => {
        navigate(`/profile/orders/${item._id}`)
    }

    const { setHint } = useProfileHint()
    useEffect(() => {
        setHint('В этом разделе вы можете просмотреть свою историю заказов')
    }, [setHint])

    return (
        <div className={cn(styles.items, 'custom-scroll pr-2')}>
            {feed.orders.map(feed => (
                <FeedItem key={feed._id} item={feed} handleClick={handleClick} showStatus/>
            ))}
        </div>
    )
}

export default OrdersPage
