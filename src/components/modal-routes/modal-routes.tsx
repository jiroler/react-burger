import { Route, Routes, useNavigate } from 'react-router-dom'
import Modal from '../modal/modal'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import ProtectedRouteElement from '../../hocs/protected-route-element/protected-route-element'
import { OrderDetails } from '../order-details/order-details'

const ModalRoutes = () => {
    const navigate = useNavigate()

    const closeModal = () => {
        navigate(-1)
    }

    return (
        <Routes>
            <Route path="/ingredients/:id" element={
                <Modal title="Детали ингредиента" handleClose={closeModal}>
                    <IngredientDetails/>
                </Modal>
            } />
            <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={
                <Modal handleClose={closeModal}>
                    <OrderDetails/>
                </Modal>
            }/>}/>
            <Route path="/feed/:id" element={
                <Modal handleClose={closeModal}>
                    <OrderDetails/>
                </Modal>
            } />
        </Routes>
    )
}

export default ModalRoutes
