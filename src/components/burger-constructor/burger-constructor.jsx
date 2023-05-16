import styles from './burger-constructor.module.css'
import cn from 'classnames'
import useModal from '../../hooks/use-modal'
import { useCallback, useMemo } from 'react'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import ConstructorItem from './constructor-item/constructor-item'
import OrderSummary from './order-summary/order-summary'
import { useDispatch, useSelector } from 'react-redux'
import { makeOrder } from '../../services/slices/order'
import { useDrop } from 'react-dnd'
import { addIngredient } from '../../services/slices/burger-constructor'

const url = '/orders'

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const { bun, components } = useSelector(store => store.burgerConstructor)
    const [isModalVisible, openModal, closeModal] = useModal()
    const { number, error } = useSelector(store => store.order)

    const ingredients = components.map(item => item._id).concat(bun?._id || [])

    const handleOrder = () => {
        dispatch(makeOrder({ url, ingredients, onSuccess: openModal }))
    }

    const modal = useMemo(() => {
        if (! number) return null

        return (
            <Modal handleClose={closeModal}>
                <OrderDetails number={number}/>
            </Modal>
        )
    }, [closeModal, number])

    const [{ isOver, canDrop }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop({ item }) {
            dispatch(addIngredient({ item }))
        }
    })

    const findIndex = useCallback(uuid => {
        return components.findIndex(item => item.uuid === uuid)
    }, [components])

    return (
        <section className='pt-25 pl-4'>
            <div ref={dropTarget} className={cn(
                styles.items,
                { [styles.droppable]: canDrop },
                { [styles.hovered]: isOver }
            )}>
                {bun && <ConstructorItem
                    type="top"
                    isLocked
                    item={bun}
                />}
                <div className={cn(styles.components, 'custom-scroll')}>
                    {components.map((item, index) => (
                        <ConstructorItem key={item.uuid} item={item} originalIndex={index} findIndex={findIndex}/>
                    ))}
                </div>
                {bun && <ConstructorItem
                    type="bottom"
                    isLocked
                    item={bun}
                />}
            </div>

            <OrderSummary handleOrder={handleOrder}/>

            {error && <p className={cn(styles.error, 'text text_type_main-medium p-4')}>{error}</p>}

            {isModalVisible && modal}
        </section>
    )
}

export default BurgerConstructor
