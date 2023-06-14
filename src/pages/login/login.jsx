import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../services/slices/auth'

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { error, isPending } = useSelector(store => store.auth)

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(login({
            endpoint: '/auth/login',
            formData,
            onSuccess: () => {
                navigate(`${location.state?.from || '/'}`)
            }
        }))
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <p className="text text_type_main-medium">Вход</p>
            <EmailInput
                name={'email'}
                value={formData.email}
                isIcon={false}
                extraClass="mt-6"
                onChange={handleChange}
            />
            <PasswordInput
                name={'password'}
                value={formData.password}
                extraClass="mt-6"
                onChange={handleChange}
            />
            <Button disabled={isPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Войти
            </Button>
            {error && <p className="text_type_main-default error">{error}</p>}
            <p className="text text_type_main-default mb-4 mt-20 text_color_inactive">
                Вы - новый пользователь? <Link to='/register' className='text_color_accent'>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? <Link to='/forgot-password' className='text_color_accent'>Восстановить пароль</Link>
            </p>
        </form>
    )
}

export default LoginPage
