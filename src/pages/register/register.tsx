import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../../services/slices/auth/auth'
import ButtonWithPending from '../../components/button-with-pending/button-with-pending'
import useFormData from '../../hooks/use-form-data'
import { useAppDispatch, useAppSelector } from '../../hooks'

type TFormData = {
    name: string,
    email: string,
    password: string
}

const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { registerError, isRegisterPending } = useAppSelector(store => store.auth)

    const fetchRegister = (formData: TFormData) => {
        dispatch(register({
            formData,
            onSuccess: () => {
                navigate(location.state?.from || '/', { replace: true })
            }
        }))
    }

    const { formData, handleChange, handleSubmit } = useFormData<TFormData>({ name: '', email: '', password: '' }, fetchRegister)

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <p className="text text_type_main-medium">Регистрация</p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                name={'name'}
                extraClass="mt-6"
                value={formData.name}
                onChange={handleChange}
            />
            <EmailInput
                name={'email'}
                isIcon={false}
                extraClass="mt-6"
                value={formData.email}
                onChange={handleChange}
            />
            <PasswordInput
                name={'password'}
                autoComplete="on"
                extraClass="mt-6"
                value={formData.password}
                onChange={handleChange}
            />
            <ButtonWithPending isPending={isRegisterPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Зарегистрироваться
            </ButtonWithPending>
            {registerError && <p className="text_type_main-default error">{registerError}</p>}
            <p className="text text_type_main-default mt-20 text_color_inactive">
                Уже зарегистрированы? <Link to='/login' className='text_color_accent'>Войти</Link>
            </p>
        </form>
    )
}

export default RegisterPage
