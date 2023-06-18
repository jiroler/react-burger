import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './button-with-pending.module.css'
import cn from 'classnames'
import IconLoader from '../icons/icon-loader'

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

export default ButtonWithPending
