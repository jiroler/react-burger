import { memo } from 'react'
import styles from './tabs.module.css'
import cn from 'classnames'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { arrayOf, exact, string } from 'prop-types'

const activeTab = 'bun'

const Tabs = memo(({ items }) => {
    return (
        <div className={cn(styles.tabs, 'mt-5 mb-10')}>
            {items.map(item => (
                <Tab key={item.type} active={item.type === activeTab}>{item.name}</Tab>
            ))}
        </div>
    )
})

Tabs.propTypes = {
    items: arrayOf(exact({
        type: string.isRequired,
        name: string.isRequired
    })).isRequired
}

export default Tabs