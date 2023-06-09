import styles from './burger-ingredients.module.css'
import cn from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import Tabs from './tabs/tabs'
import TabGroup from './tab-group/tab-group'
import { useLocation, useNavigate } from 'react-router-dom'
import { TIngredient } from '../../utils/types'

const tabs: {type: string, name: string}[] = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинка' }
]

const BurgerIngredients = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].type)

    const navigate = useNavigate()
    const location = useLocation()

    const handleIngredientClick = useCallback((item: TIngredient) => {
        navigate(`/ingredients/${item._id}`, { state: { previousLocation: location } })
    }, [navigate, location])

    const containerRef = useRef<HTMLDivElement>(null)
    const tabGroupRefs = useRef<{[key:string]: HTMLParagraphElement | null}>(tabs.reduce((acc, tab) => {
        acc[tab.type] = null
        return acc
    }, {} as {[key:string]: HTMLParagraphElement | null}))

    const tabClickHandler = useCallback((type: string) => {
        const containerNode = containerRef.current
        const tabGroupNode = tabGroupRefs.current[type]

        containerNode!.scrollTop = tabGroupNode!.offsetTop - containerNode!.offsetTop
        setActiveTab(type)
    }, [])

    useEffect(() => {
        const containerNode = containerRef.current
        let debounceTimeout: NodeJS.Timeout

        const scrollListener = () => {
            debounceTimeout && clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(() => {
                let nearestType = ''
                let minOffset = Infinity

                for (const [type, tabGroupNode] of Object.entries(tabGroupRefs.current)) {
                    const currentOffset = Math.abs((tabGroupNode!.offsetTop - containerNode!.offsetTop) - containerNode!.scrollTop)
                    if (currentOffset < minOffset) {
                        minOffset = currentOffset
                        nearestType = type
                    }
                }

                setActiveTab(nearestType)
            }, 100)
        }

        containerNode!.addEventListener('scroll', scrollListener)
        return () => {
            containerNode!.removeEventListener('scroll', scrollListener)
        }
    }, [])

    return (
        <section className='pt-10'>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <Tabs items={tabs} activeTab={activeTab} clickHandler={tabClickHandler}/>
            <div ref={containerRef} className={cn(styles.ingredients, 'custom-scroll')}>
                {tabs.map(tab => (
                    <TabGroup
                        ref={(node: HTMLParagraphElement) => tabGroupRefs.current[tab.type] = node}
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
