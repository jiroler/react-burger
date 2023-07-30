import styles from './order-details.module.css'
import cn from 'classnames'
import { OrderDetails } from '../../components/order-details/order-details'
import { ModalContext, useModalTitle } from '../../hooks/use-modal-title'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { FC, useEffect } from 'react'
import { getIngredients } from '../../services/slices/ingredients/ingredients'
import { connectionClose, connectionStart } from '../../services/slices/socket/socket'
import { socketUrlOrders, socketUrlOrdersAll } from '../../utils/api'
import Preloader from '../../components/preloader/preloader'

type TProps = {
    onlyCurrentUser?: boolean
}

export const OrderDetailsPage: FC<TProps> = ({ onlyCurrentUser }) => {
    const { contextValue, title } = useModalTitle()
    const dispatch = useAppDispatch()

    const { isConnecting, error: socketError } = useAppSelector(store => store.socket)
    const { isPending, error: fetchError } = useAppSelector(store => store.ingredients)

    useEffect(() => {
        dispatch(getIngredients())
        dispatch(connectionStart({ url: onlyCurrentUser ? socketUrlOrders : socketUrlOrdersAll }))

        return () => {
            dispatch(connectionClose())
        }
    }, [dispatch, onlyCurrentUser])

    if (isConnecting || isPending) return (<Preloader/>)

    if (socketError || fetchError) return (<h1 className={cn('text text_type_main-large mt-10 error center')}>{socketError || fetchError}</h1>)

    return (
        <ModalContext.Provider value={contextValue}>
            <div className={styles.wrapper}>
                <p className={cn(styles.title, 'text text_type_digits-default')}>{title}</p>
                <OrderDetails/>
            </div>
        </ModalContext.Provider>
    )
}
