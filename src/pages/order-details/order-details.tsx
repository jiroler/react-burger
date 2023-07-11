import styles from './order-details.module.css'
import cn from 'classnames'
import { OrderDetails } from '../../components/order-details/order-details'
import { ModalContext, useModalTitle } from '../../hooks/use-modal-title'

export const OrderDetailsPage = () => {
    const { contextValue, title } = useModalTitle()

    return (
        <ModalContext.Provider value={contextValue}>
            <div className={styles.wrapper}>
                <p className={cn(styles.title, 'text text_type_digits-default')}>{title}</p>
                <OrderDetails/>
            </div>
        </ModalContext.Provider>
    )
}
