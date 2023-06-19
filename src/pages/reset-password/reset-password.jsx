import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ButtonWithPending from '../../components/button-with-pending/button-with-pending'
import useFormData from '../../hooks/use-form-data'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../services/slices/auth'

const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { resetError, isResetPending } = useSelector(store => store.auth)

    const fetchReset = (formData) => {
        dispatch(reset({
            formData,
            onSuccess: () => {
                navigate('/login', { replace: true, state: { ...location.state, isResetRequested: false } })
            }
        }))
    }

    const { formData, handleChange, handleSubmit } = useFormData({ password: '', token: '' }, fetchReset)

    if (! location.state?.isResetRequested) {
        return <Navigate to='/forgot-password' replace />
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <PasswordInput
                name={'password'}
                placeholder={'Введите новый пароль'}
                extraClass="mt-6"
                value={formData.password}
                required={true}
                onChange={handleChange}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                name={'token'}
                extraClass="mt-6"
                value={formData.token}
                required={true}
                onChange={handleChange}
            />
            <ButtonWithPending isPending={isResetPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Сохранить
            </ButtonWithPending>
            {resetError && <p className="text_type_main-default error">{resetError}</p>}
            <p className="text text_type_main-default mt-20 text_color_inactive">
                Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
            </p>
        </form>
    )
}

export default ResetPasswordPage
