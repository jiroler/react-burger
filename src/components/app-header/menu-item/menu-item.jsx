import cn from 'classnames'
import styles from './menu-item.module.css'
import { NavLink } from 'react-router-dom'
import { elementType, string } from 'prop-types'

// eslint-disable-next-line camelcase
const setActiveLink = ({ isActive }) => cn('text text_type_main-default m-4 ml-1 mr-1 p-5 pt-4 pb-4', styles.item, { text_color_inactive: ! isActive })

const MenuItem = (props) => {
    const Icon = props.icon

    return (
        <NavLink to={props.path} className={setActiveLink}>
            {({ isActive }) => (
                <>
                    <Icon type={isActive ? 'primary' : 'secondary'}/>
                    {props.children}
                </>
            )}
        </NavLink>
    )
}

MenuItem.propTypes = {
    icon: elementType,
    path: string
}

export default MenuItem
