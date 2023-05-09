import styles from './burger-ingredients.module.css'
import cn from 'classnames'
import useModal from '../../hooks/use-modal'
import Modal from '../modal/modal'
import { useCallback, useMemo, useState } from 'react'
import IngredientDetails from './ingredient-details/ingredient-details'
import Tabs from './tabs/tabs'
import TabGroup from './tab-group/tab-group'

const tabs = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинка' }
]

const BurgerIngredients = () => {
    const [isModalVisible, openModal, closeModal] = useModal()
    const [modalItem, setModalItem] = useState(null)

    const handleIngredientClick = useCallback(item => {
        if (! item) return
        setModalItem(item)
        openModal()
    }, [openModal])

    const modal = useMemo(() => (
        modalItem &&
            <Modal title="Детали ингредиента" handleClose={closeModal}>
                <IngredientDetails item={modalItem}/>
            </Modal>
    ), [modalItem, closeModal])

    return (
        <section className='pt-10'>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <Tabs items={tabs}/>
            <div className={cn(styles.ingredients, 'custom-scroll')}>
                {tabs.map(tab => (
                    <TabGroup
                        key={tab.type}
                        name={tab.name}
                        type={tab.type}
                        handleIngredientClick={handleIngredientClick}
                    />
                ))}
            </div>

            {isModalVisible && modal}
        </section>
    )
}

export default BurgerIngredients
