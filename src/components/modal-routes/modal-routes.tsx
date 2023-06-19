import { Route, Routes, useNavigate } from 'react-router-dom'
import Modal from '../modal/modal'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'

const ModalRoutes = () => {
    const navigate = useNavigate()

    const closeIngredientModal = () => {
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
