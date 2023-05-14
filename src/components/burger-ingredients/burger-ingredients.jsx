import styles from './burger-ingredients.module.css'
import cn from 'classnames'
import useModal from '../../hooks/use-modal'
import Modal from '../modal/modal'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    const [activeTab, setActiveTab] = useState('bun')

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

    const containerRef = useRef(null)
    const tabGroupRefs = useRef(tabs.reduce((acc, tab) => {
        acc[tab.type] = null
        return acc
    }, {}))

    const tabClickHandler = useCallback(type => {
        containerRef.current.scrollTop = tabGroupRefs.current[type].offsetTop - containerRef.current.offsetTop
        setActiveTab(type)
    }, [])

    useEffect(() => {
        const containerNode = containerRef.current
        let debounceTimeout

        const scrollListener = () => {
            debounceTimeout && clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(() => {
                let nearestType = ''
                let minOffset = Infinity

                for (const [type, tabGroupElement] of Object.entries(tabGroupRefs.current)) {
                    const currentOffset = Math.abs((tabGroupElement.offsetTop - containerRef.current.offsetTop) - containerRef.current.scrollTop)
                    if (currentOffset < minOffset) {
                        minOffset = currentOffset
                        nearestType = type
                    }
                }

                setActiveTab(nearestType)
            }, 100)
        }

        containerNode.addEventListener('scroll', scrollListener)
        return () => {
            containerNode.removeEventListener('scroll', scrollListener)
        }
    }, [])

    return (
        <section className='pt-10'>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <Tabs items={tabs} activeTab={activeTab} clickHandler={tabClickHandler}/>
            <div ref={containerRef} className={cn(styles.ingredients, 'custom-scroll')}>
                {tabs.map(tab => (
                    <TabGroup
                        ref={node => tabGroupRefs.current[tab.type] = node}
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
