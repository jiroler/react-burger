import { Route, Routes, useNavigate } from 'react-router-dom'
import Modal from '../modal/modal'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import { useDispatch } from 'react-redux'
import { clearIngredientDetails } from '../../services/slices/ingredient-details'

const ModalRoutes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeIngredientModal = () => {
        dispatch(clearIngredientDetails())
        navigate(-1)
    }

    return (
        <Routes>
            <Route path="/ingredients/:id" element={
                <Modal title="Детали ингредиента" handleClose={closeIngredientModal}>
                    <IngredientDetails/>
                </Modal>
            } />
        </Routes>
    )
}

export default ModalRoutes
