import styles from './burger-ingredients.module.css'
import cn from 'classnames'
import { arrayOf } from 'prop-types'
import { dataItemType } from '../../utils/types'
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

const BurgerIngredients = ({ data }) => {
    const [isModalVisible, openModal, closeModal] = useModal()
    const [modalItem, setModalItem] = useState(null)

    const handleIngredientClick = useCallback(item => {
        if (! item) return
        setModalItem(item)
        openModal()
    }, [openModal])

    const tabGroups = useMemo(() => {
        return tabs.reduce((acc, tab) => {
            acc.push({
                ...tab,
                items: data.filter(item => item.type === tab.type)
            })
            return acc
        }, [])
    }, [data])

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
                {tabGroups.map(group => (
                    <TabGroup
                        key={group.type}
                        name={group.name}
                        type={group.type}
                        items={group.items}
                        handleIngredientClick={handleIngredientClick}
                    />
                ))}
            </div>

            {isModalVisible && modal}
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: arrayOf(dataItemType).isRequired
}

export default BurgerIngredients
