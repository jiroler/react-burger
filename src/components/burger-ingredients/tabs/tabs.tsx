import { FC, memo } from 'react'
import styles from './tabs.module.css'
import cn from 'classnames'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

type TProps = {
    items: {
        type: string,
        name: string
    }[],
    activeTab: string,
    clickHandler: (type: string) => void
}

const Tabs: FC<TProps> = memo(({ items, activeTab, clickHandler }) => {
    return (
        <div className={cn(styles.tabs, 'mt-5 mb-10')}>
            {items.map(item => (
                <Tab
                    onClick={() => clickHandler(item.type)}
                    key={item.type}
                    active={item.type === activeTab}
                    value={item.type}
                >
                    {item.name}
                </Tab>
            ))}
        </div>
    )
})

export default Tabs
