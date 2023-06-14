import { Link } from 'react-router-dom'
import styles from './error.module.css'
import cn from 'classnames'

const ErrorPage = ({ code, message }) => {
    return (
        <section className={cn(styles.error, 'mt-20 mb-20')}>
            <p className={cn(styles.code, 'text text_type_digits-large text_color_inactive')} data-text={code}>{code}</p>
            <p class="text text_type_main-medium text_color_inactive">{message}</p>
            <p class="text text_type_main-default text_color_inactive">It looks like you found a glitch in the matrix...</p>
            <Link to="/" className="text text_type_main-default mt-10">← Back to Home</Link>
        </section>
    )
}

export default ErrorPage
