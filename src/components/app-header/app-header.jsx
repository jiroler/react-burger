import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import MenuItem from './menu-item/menu-item'
import { memo } from 'react'

const AppHeader = memo(() => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>

                <span className={styles.left}>
                    <MenuItem icon={BurgerIcon} active>Конструктор</MenuItem>
                    <MenuItem icon={ListIcon}>Лента заказов</MenuItem>
                </span>

                <Logo/>

                <span className={styles.right}>
                    <MenuItem icon={ProfileIcon}>Личный кабинет</MenuItem>
                </span>

            </nav>
        </header>
    )
})

export default AppHeader
