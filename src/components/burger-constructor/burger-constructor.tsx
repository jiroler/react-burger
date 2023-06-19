import styles from './burger-constructor.module.css'
import cn from 'classnames'
import useModal from '../../hooks/use-modal'
import { useCallback, useEffect, useMemo } from 'react'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import ConstructorItem from './constructor-item/constructor-item'
import OrderSummary from './order-summary/order-summary'
import { makeOrder } from '../../services/slices/order'
import { useDrop } from 'react-dnd'
import { addIngredientToConstructor } from '../../services/slices/burger-constructor'
import { auth } from '../../services/slices/auth'
import { useNavigate } from 'react-router-dom'
import Preloader from '../preloader/preloader'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { TIngredient } from '../../utils/types'

const BurgerConstructor = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { bun, components } = useAppSelector(store => store.burgerConstructor)
    const { isPending, number, error } = useAppSelector(store => store.order)
    const [isModalVisible, openModal, closeModal] = useModal()

    const ingredients = components.map(item => item._id)
    if (bun) {
        ingredients.unshift(bun._id)
        ingredients.push(bun._id)
    }

    const { user, isAuthChecked } = useAppSelector(store => store.auth)

    useEffect(() => {
        ! isAuthChecked && dispatch(auth())
    }, [isAuthChecked, dispatch])

    const handleOrder = () => {
        user
            ? dispatch(makeOrder({ ingredients, onSuccess: openModal }))
            : navigate('/login')
    }

    const modal = useMemo(() => (
        number !== null &&
            <Modal handleClose={closeModal}>
                <OrderDetails number={number}/>
            </Modal>
    ), [closeModal, number])

    // Добавление ингредиента
    const [{ isOver, canDrop }, dropTarget] = useDrop<{item: TIngredient}, void, {isOver: boolean, canDrop: boolean}>({
        accept: 'ingredient',
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop({ item }) {
            dispatch(addIngredientToConstructor({ item }))
        }
    })

    // Для сортировки
    const findIndex = useCallback((uuid: string) => {
        return components.findIndex(item => item.uuid === uuid)
    }, [components])

    if (! isAuthChecked) return <Preloader/>

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

            <OrderSummary handleOrder={handleOrder} isPending={isPending}/>

            {error && <p className={cn(styles.error, 'text text_type_main-medium p-4')}>{error}</p>}

            {isModalVisible && modal}
        </section>
    )
}

export default BurgerConstructor
