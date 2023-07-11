import { FC } from 'react'
import cn from 'classnames'

enum EStatus {
    done = 'done',
    created = 'created',
    inprogress = 'inprogress',
    cancelled = 'cancelled'
}

type TProps = {
    status: string, //EStatus
    className?: string
}

const configs: {[key in EStatus] : {text: string, className?: string}} = {
    [EStatus.done]: { text: 'Выполнен' },
    [EStatus.created]: { text: 'Создан' },
    [EStatus.inprogress]: { text: 'Готовится', className: 'text_color_success' },
    [EStatus.cancelled]: { text: 'Отменен', className: 'text_color_error' }
}

export const OrderStatus: FC<TProps> = ({ status, className }) => {
    const config = configs[status as EStatus]
    if (! config) return null

    return (
        <p className={cn(config.className, 'text text_type_main-default', className)}>{config.text}</p>
    )
}
