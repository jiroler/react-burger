import styles from './burger-constructor.module.css'
import cn from 'classnames'
import { dataItemType } from '../../utils/types'
import { arrayOf } from 'prop-types'
import useModal from '../../hooks/use-modal'
import { useMemo } from 'react'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import ConstructorItem from './constructor-item/constructor-item'
import OrderSummary from './order-summary/order-summary'

const BurgerConstructor = ({ bun, components }) => {
    const [isModalVisible, openModal, closeModal] = useModal()

    const modal = useMemo(() => (
        <Modal handleClose={closeModal}>
            <OrderDetails/>
        </Modal>
    ), [closeModal])

    return (
        <section className='pt-25 pl-4'>
            <div className={styles.items}>
                <ConstructorItem type="top"
                    isLocked
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <div className={cn(styles.components, 'custom-scroll')}>
                    {components.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <ConstructorItem
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </div>
                <ConstructorItem
                    type="bottom"
                    isLocked
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>

            <OrderSummary handleOrder={openModal}/>

            {isModalVisible && modal}
        </section>
    )
}

BurgerConstructor.propTypes = {
    bun: dataItemType,
    components: arrayOf(dataItemType).isRequired
}

export default BurgerConstructor
