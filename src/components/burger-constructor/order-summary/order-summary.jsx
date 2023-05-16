import { memo } from 'react'
import styles from './order-summary.module.css'
import cn from 'classnames'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { func } from 'prop-types'
import { useSelector } from 'react-redux'

const OrderSummary = memo(({ handleOrder }) => {
    const { bun, components } = useSelector(store => store.burgerConstructor)

    let totalPrice = components.reduce((acc, component) => acc += component.price, 0)
    if (bun !== null) {
        totalPrice += bun.price * 2
    }

    return (
        <div className={cn(styles.summary, 'mt-10 pr-4')}>
            <p className="text text_type_digits-medium">
                {totalPrice} <CurrencyIcon type="primary"/>
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
