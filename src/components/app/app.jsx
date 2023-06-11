
import { Route, Routes, useLocation } from 'react-router-dom'
import MainPage from '../../pages/main/main'
import AppHeader from '../app-header/app-header'
import LoginPage from '../../pages/login/login'
import RegisterPage from '../../pages/register/register'
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password'
import ResetPasswordPage from '../../pages/reset-password/reset-password'
import ProfilePage from '../../pages/profile/profile'
import ProtectedRouteElement from '../../hocs/protected-route-element/protected-route-element'
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details-page'
import ModalRoutes from '../modal-routes/modal-routes'

const App = () => {

    const location = useLocation()
    const previousLocation = location.state?.previousLocation

    return (
        <>
            <AppHeader/>
            <Routes location={previousLocation || location}>
                <Route path="/" element={<ProtectedRouteElement element={<MainPage/>}/>}/>
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage/>}/>}/>

                <Route path="/login" element={<ProtectedRouteElement element={<LoginPage/> } reverse/>}/>
                <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage/>} reverse/>}/>
                <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage/>} reverse/>}/>
                <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage/>} reverse/>}/>

                <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
            </Routes>

            {previousLocation && <ModalRoutes/>}
        </>
    )
}

export default App
