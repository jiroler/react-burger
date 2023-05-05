import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import cn from 'classnames'
import { func, string } from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

const Modal = ({ title, handleClose, children }) => {
    useEffect(() => {
        const listener = (event) => {
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
                <CloseIcon onClick={handleClose}/>
                {children}
            </div>
        </>,
        document.getElementById('modals')
    )
}

Modal.propTypes = {
    handleClose: func.isRequired,
    title: string
}

export default Modal
