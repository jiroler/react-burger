import IconLoader from '../icons/icon-loader'
import styles from './preloader.module.css'
import cn from 'classnames'

const Preloader = () => {
    return (
        <p className={cn(styles.preloader, 'm-10')}>
            <IconLoader extraClass={styles.spin}/>
        </p>
    )
}

export default Preloader
