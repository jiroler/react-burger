import styles from './burger-ingredients.module.css'
import cn from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import Tabs from './tabs/tabs'
import TabGroup from './tab-group/tab-group'
import { useLocation, useNavigate } from 'react-router-dom'
import { setIngredientDetails } from '../../services/slices/ingredient-details'
import { useDispatch } from 'react-redux'

const tabs = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинка' }
]

const BurgerIngredients = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].type)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleIngredientClick = useCallback(item => {
        dispatch(setIngredientDetails({ item }))
        navigate(`/ingredients/${item._id}`, { state: { previousLocation: location } })
    }, [dispatch, navigate])

    const containerRef = useRef(null)
    const tabGroupRefs = useRef(tabs.reduce((acc, tab) => {
        acc[tab.type] = null
        return acc
    }, {}))

    const tabClickHandler = useCallback(type => {
        const containerNode = containerRef.current
        const tabGroupNode = tabGroupRefs.current[type]

        containerNode.scrollTop = tabGroupNode.offsetTop - containerNode.offsetTop
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

                for (const [type, tabGroupNode] of Object.entries(tabGroupRefs.current)) {
                    const currentOffset = Math.abs((tabGroupNode.offsetTop - containerNode.offsetTop) - containerNode.scrollTop)
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
        </section>
    )
}

export default BurgerIngredients
