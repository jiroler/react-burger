import { FC } from 'react'
import cn from 'classnames'
import { EOrderStatus } from '../../utils/types'

type TProps = {
    status: EOrderStatus,
    className?: string
}

const configs: {[key in EOrderStatus] : {text: string, className?: string}} = {
    [EOrderStatus.done]: { text: 'Выполнен', className: 'text_color_success' },
    [EOrderStatus.created]: { text: 'Создан' },
    [EOrderStatus.pending]: { text: 'Готовится' },
    [EOrderStatus.cancelled]: { text: 'Отменен', className: 'text_color_error' }
}

export const OrderStatus: FC<TProps> = ({ status, className }) => {
    const config = configs[status]
    if (! config) return null

    return (
        <p className={cn(config.className, 'text text_type_main-default', className)}>{config.text}</p>
    )
}
