import cn from 'classnames'
import styles from './menu-item.module.css'
import { NavLink } from 'react-router-dom'
import { ElementType, FC, PropsWithChildren } from 'react'

// eslint-disable-next-line camelcase
const setActiveLink = ({ isActive }: {isActive: boolean}) => cn('text text_type_main-default m-4 ml-1 mr-1 p-5 pt-4 pb-4', styles.item, { text_color_inactive: ! isActive })

type PropTypes = PropsWithChildren<{
    icon: ElementType,
    path: string
}>

const MenuItem: FC<PropTypes> = (props) => {
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

export default MenuItem
