import { FC, memo } from 'react'
import styles from './constructor-item.module.css'
import cn from 'classnames'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { moveComponent, removeComponentFromConstructor } from '../../../services/slices/burger-constructor'
import { useDrag, useDrop } from 'react-dnd'
import { TConstructorIngredient } from '../../../utils/types'
import { useAppDispatch } from '../../../hooks'

type TBunType = 'top' | 'bottom'

type TProps = {
    item: TConstructorIngredient,
    isLocked?: boolean,
    originalIndex?: number,
    findIndex?: (uuid: string) => number
    type?: TBunType,
}

const textSuffixes: {[key in TBunType]: string} = {
    top: ' (верх)',
    bottom: ' (низ)'
}

const ConstructorItem: FC<TProps> = memo(({ type, isLocked, item, originalIndex, findIndex }) => {
    const dispatch = useAppDispatch()
    const handleRemove = () => {
        if (isLocked) return
        dispatch(removeComponentFromConstructor({ item }))
    }

    // Перетаскиваемый ингредиент
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'component',
        item: { uuid: item.uuid, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: ({ uuid: droppedUuid, originalIndex }, monitor) => {
            if (! monitor.didDrop()) {
                dispatch(moveComponent({ uuid: droppedUuid, index: originalIndex }))
            }
        }
    }), [item.uuid, originalIndex, dispatch])

    // Ингредиент, на который перетаскиваем
    const [, dropRef] = useDrop(() => ({
        accept: 'component',
        hover({ uuid: draggedUuid }: {uuid: string}) {
            if (draggedUuid !== item.uuid) {
                const overIndex = findIndex!(item.uuid)
                dispatch(moveComponent({ uuid: draggedUuid, index: overIndex }))
            }
        }
    }), [findIndex, dispatch])

    return (
        <div
            ref={node => ! isLocked && dragRef(dropRef(node))}
            className={cn(styles.item, { [styles.dragging]: isDragging })}
        >
            {! isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                text={item.name + (type ? textSuffixes[type] : '')}
                isLocked={isLocked}
                price={item.price}
                thumbnail={item.image}
                extraClass={cn(styles.dark, 'mr-4')}
                handleClose={handleRemove}
            />
        </div>
    )
})

export default ConstructorItem
