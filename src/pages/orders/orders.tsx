import { useCallback, useEffect } from 'react'
import { useProfileHint } from '../../hooks/use-profile-hint'
import styles from './orders.module.css'
import cn from 'classnames'
import { OrderItem } from '../../components/order-item/order-item'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { connectionClose, connectionStart } from '../../services/slices/socket'
import { socketUrlOrdersAll } from '../../utils/api'
import Preloader from '../../components/preloader/preloader'
import { TOrder } from '../../utils/types'

const OrdersPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { orders, isConnecting, isConnected, error } = useAppSelector(store => store.socket)

    useEffect(() => {
        dispatch(connectionStart({ url: socketUrlOrdersAll }))

        return () => {
            dispatch(connectionClose())
        }
    }, [dispatch])

    const handleOrderClick = useCallback((item: TOrder) => {
        navigate(`/profile/orders/${item._id}`, { state: { previousLocation: location } })
    }, [navigate, location])

    const { setHint } = useProfileHint()
    useEffect(() => {
        setHint('В этом разделе вы можете просмотреть свою историю заказов')
    }, [setHint])

    if (isConnecting) return <Preloader/>

    if (error) return <h1 className={cn('text text_type_main-large mt-10 error center')}>{error}</h1>

    if (isConnected && orders.length) {
        return (
            <div className={cn(styles.items, 'custom-scroll pr-2')}>
                {orders.map(item => (
                    <OrderItem key={item._id} item={item} handleClick={handleOrderClick} showStatus/>
                ))}
            </div>
        )
    }

    return null
}

export default OrdersPage
