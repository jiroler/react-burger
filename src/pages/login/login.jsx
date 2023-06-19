import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../services/slices/auth'
import ButtonWithPending from '../../components/button-with-pending/button-with-pending'
import useFormData from '../../hooks/use-form-data'

const LoginPage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { loginError, isLoginPending } = useSelector(store => store.auth)

    const fetchLogin = (formData) => {
        dispatch(login({
            formData,
            onSuccess: () => {
                navigate(location.state?.from || '/', { replace: true })
            }
        }))
    }

    const { formData, handleChange, handleSubmit } = useFormData({ email: '', password: '' }, fetchLogin)

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
            <ButtonWithPending isPending={isLoginPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Войти
            </ButtonWithPending>
            {loginError && <p className="text_type_main-default error">{loginError}</p>}
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
