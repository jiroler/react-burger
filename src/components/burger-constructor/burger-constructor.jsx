import styles from './burger-constructor.module.css'
import cn from 'classnames'
import useModal from '../../hooks/use-modal'
import { useEffect, useMemo } from 'react'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import ConstructorItem from './constructor-item/constructor-item'
import OrderSummary from './order-summary/order-summary'
import { useDispatch, useSelector } from 'react-redux'
import { makeOrder } from '../../services/slices/order'

const url = '/orders'

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const { bun, components } = useSelector(store => store.burgerConstructor)
    const [isModalVisible, openModal, closeModal] = useModal()
    const { number, error } = useSelector(store => store.order)

    const ingredients = components.map(item => item._id).concat(bun?._id || [])

    const handleOrder = () => {
        dispatch(makeOrder({ url, ingredients }))
    }

    useEffect(() => {
        number && openModal()
    }, [number, openModal])

    const modal = useMemo(() => {
        if (! number) return null

        return (
            <Modal handleClose={closeModal}>
                <OrderDetails number={number}/>
            </Modal>
        )
    }, [closeModal, number])

    return (
        <section className='pt-25 pl-4'>
            <div className={styles.items}>
                {bun && <ConstructorItem type="top"
                    isLocked
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                    uuid={bun.uuid}
                />}
                <div className={cn(styles.components, 'custom-scroll')}>
                    {components.map(item => (
                        <div key={item.uuid} className={styles.item}>
                            <ConstructorItem
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                uuid={item.uuid}
                            />
                        </div>
                    ))}
                </div>
                {bun && <ConstructorItem
                    type="bottom"
                    isLocked
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                    uuid={bun.uuid}
                />}
            </div>

            <OrderSummary handleOrder={handleOrder}/>

            {error && <p className={cn(styles.error, 'text text_type_main-medium p-4')}>{error}</p>}

            {isModalVisible && modal}
        </section>
    )
}

export default BurgerConstructor
