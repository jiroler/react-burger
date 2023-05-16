import { memo } from 'react'
import styles from './constructor-item.module.css'
import cn from 'classnames'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { bool, func, number, string } from 'prop-types'
import { useDispatch } from 'react-redux'
import { moveComponent, removeComponent } from '../../../services/slices/burger-constructor'
import { useDrag, useDrop } from 'react-dnd'
import { constructorItemType } from '../../../utils/types'

const textSuffixes = {
    top: ' (верх)',
    bottom: ' (низ)'
}

const ConstructorItem = memo(({ type, isLocked, item, originalIndex, findIndex }) => {
    const dispatch = useDispatch()
    const handleRemove = () => {
        if (isLocked) return
        dispatch(removeComponent({ item }))
    }

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

    const [, dropRef] = useDrop(() => ({
        accept: 'component',
        hover({ uuid: draggedUuid }) {
            if (draggedUuid !== item.uuid) {
                const overIndex = findIndex(item.uuid)
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
                text={item.name + (textSuffixes[type] ?? '')}
                isLocked={isLocked}
                price={item.price}
                thumbnail={item.image}
                extraClass={cn(styles.dark, 'mr-4')}
                handleClose={handleRemove}
            />
        </div>
    )
})

ConstructorItem.propTypes = {
    type: string,
    isLocked: bool,
    item: constructorItemType.isRequired,
    originalIndex: number,
    findIndex: func
}

export default ConstructorItem
