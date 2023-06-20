import styles from './modal-overlay.module.css'
import { FC } from 'react'

type TProps = {
    handleClick: () => void
}

const ModalOverlay: FC<TProps> = ({ handleClick }) => {
    return (
        <div onClick={handleClick} className={styles.overlay}></div>
    )
}

export default ModalOverlay
