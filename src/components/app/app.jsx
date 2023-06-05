
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main/main'
import AppHeader from '../app-header/app-header'
import LoginPage from '../../pages/login/login'
import RegisterPage from '../../pages/register/register'

const App = () => {

    return (
        <>
            <AppHeader/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
