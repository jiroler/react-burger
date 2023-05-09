import { number } from 'prop-types'
import IconCheck from '../../icons/icon-check'
import styles from './order-details.module.css'
import cn from 'classnames'

const OrderDetails = ({ number }) => {
    return (
        <div className={cn(styles.body, 'pt-30 pb-30')}>
            <p className={cn(styles.number, 'text text_type_digits-large')}>{number}</p>
            <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
            <IconCheck extraClass="mt-15 mb-15"/>
            <p className={'text text_type_main-default'}>Ваш заказ начали готовить</p>
            <p className={'text text_type_main-default mt-2 text_color_inactive'}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    number: number
}

export default OrderDetails
