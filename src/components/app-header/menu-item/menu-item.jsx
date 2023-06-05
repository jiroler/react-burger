import cn from 'classnames'
import styles from './menu-item.module.css'
import { bool } from 'prop-types'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {
    const Icon = props.icon

    return (
        <Link to={props.path} className={cn('text text_type_main-default m-4 ml-1 mr-1 p-5 pt-4 pb-4', styles.item, { [styles.active]: props.active })}>
            <Icon type={props.active ? 'primary' : 'secondary'}/>
            {props.children}
        </Link>
    )
}

MenuItem.propTypes = {
    active: bool
}

export default MenuItem
