
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main/main'
import AppHeader from '../app-header/app-header'
import LoginPage from '../../pages/login/login'
import RegisterPage from '../../pages/register/register'
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password'
import ResetPasswordPage from '../../pages/reset-password/reset-password'

const App = () => {

    return (
        <>
            <AppHeader/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                    <Route path="/reset-password" element={<ResetPasswordPage />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
