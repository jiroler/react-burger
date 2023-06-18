import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './button-with-pending.module.css'
import cn from 'classnames'
import IconLoader from '../icons/icon-loader'
import { bool, func, string } from 'prop-types'

const ButtonWithPending = ({ isPending, extraClass, children, ...buttonProps }) => {
    return (
        <div className={cn(styles.pendingButton, extraClass, { [styles.isPending]: isPending })}>

            {isPending && <IconLoader extraClass={styles.spin}/>}

            <Button {...buttonProps} disabled={isPending || buttonProps.disabled }>
                {children}
            </Button>
        </div>
    )
}

ButtonWithPending.propTypes = {
    isPending: bool.isRequired,
    extraClass: string,
    type: string,
    size: string,
    onClick: func,
    htmlType: string
}

export default ButtonWithPending
