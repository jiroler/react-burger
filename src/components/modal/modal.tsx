import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import cn from 'classnames'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { createPortal } from 'react-dom'
import { FC, PropsWithChildren, useEffect } from 'react'

type TProps = PropsWithChildren<{
    handleClose: () => void,
    title?: string
}>

const Modal: FC<TProps> = ({ title, handleClose, children }) => {
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            event.key === 'Escape' && handleClose()
        }

        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [handleClose])

    return createPortal(
        <>
            <ModalOverlay handleClick={handleClose}/>
            <div className={cn(styles.modal, 'pl-10 pr-10')}>
                {title && <p className={cn(styles.title, 'text text_type_main-large mt-10')}>{title}</p>}
                <CloseIcon type="primary" onClick={handleClose}/>
                {children}
            </div>
        </>,
        document.getElementById('modals')!
    )
}

export default Modal
