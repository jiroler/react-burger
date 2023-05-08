import { memo } from 'react'
import styles from './order-summary.module.css'
import cn from 'classnames'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { func } from 'prop-types'

const OrderSummary = memo(({ handleOrder }) => {
    return (
        <div className={cn(styles.summary, 'mt-10 pr-4')}>
            <p className="text text_type_digits-medium">
                610 <CurrencyIcon type="primary"/>
            </p>
            <Button htmlType="button" type="primary" size="medium" onClick={handleOrder}>
                Оформить заказ
            </Button>
        </div>
    )
})

OrderSummary.propTypes = {
    handleOrder: func.isRequired
}

export default OrderSummary
