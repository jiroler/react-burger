
import { Route, Routes, useLocation } from 'react-router-dom'
import MainPage from '../../pages/main/main'
import AppHeader from '../app-header/app-header'
import LoginPage from '../../pages/login/login'
import RegisterPage from '../../pages/register/register'
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password'
import ResetPasswordPage from '../../pages/reset-password/reset-password'
import ProfileRootPage from '../../pages/profile-root/profile-root'
import ProtectedRouteElement from '../../hocs/protected-route-element/protected-route-element'
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details-page'
import ModalRoutes from '../modal-routes/modal-routes'
import ProfilePage from '../../pages/profile/profile'
import OrdersPage from '../../pages/orders/orders'
import ErrorPage from '../../pages/error/error'
import { FeedPage } from '../../pages/feed/feed'
import { OrderDetailsPage } from '../../pages/order-details/order-details'

const App = () => {

    const location = useLocation()
    const previousLocation = location.state?.previousLocation

    return (
        <>
            <AppHeader/>
            <Routes location={previousLocation || location}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfileRootPage/>}/>}>
                    <Route path="" element={<ProfilePage/>}/>
                    <Route path="orders" element={<OrdersPage/>}/>
                </Route>
                <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<OrderDetailsPage/>}/>}/>

                <Route path="/login" element={<ProtectedRouteElement element={<LoginPage/>} reverse/>}/>
                <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage/>} reverse/>}/>
                <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage/>} reverse/>}/>
                <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage/>} reverse/>}/>

                <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />

                <Route path="/feed" element={<FeedPage/>}/>
                <Route path="/feed/:id" element={<OrderDetailsPage/>}/>

                <Route path="*" element={<ErrorPage code={404} message='Not Found'/>}/>
            </Routes>

            {previousLocation && <ModalRoutes/>}
        </>
    )
}

export default App
