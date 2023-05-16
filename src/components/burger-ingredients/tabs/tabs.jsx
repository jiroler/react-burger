import { memo } from 'react'
import styles from './tabs.module.css'
import cn from 'classnames'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { arrayOf, exact, func, string } from 'prop-types'

const Tabs = memo(({ items, activeTab, clickHandler }) => {
    return (
        <div className={cn(styles.tabs, 'mt-5 mb-10')}>
            {items.map(item => (
                <Tab
                    onClick={() => clickHandler(item.type)}
                    key={item.type}
                    active={item.type === activeTab}
                >
                    {item.name}
                </Tab>
            ))}
        </div>
    )
})

Tabs.propTypes = {
    items: arrayOf(exact({
        type: string.isRequired,
        name: string.isRequired
    })).isRequired,
    activeTab: string.isRequired,
    clickHandler: func.isRequired
}

export default Tabs
