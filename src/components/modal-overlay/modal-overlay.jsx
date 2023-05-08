import { func } from 'prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = ({ handleClick }) => {
    return (
        <div onClick={handleClick} className={styles.overlay}></div>
    )
}

ModalOverlay.propTypes = {
    handleClick: func.isRequired
}

export default ModalOverlay
