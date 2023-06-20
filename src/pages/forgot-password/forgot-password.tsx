import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ButtonWithPending from '../../components/button-with-pending/button-with-pending'
import useFormData from '../../hooks/use-form-data'
import { forgot } from '../../services/slices/auth'
import { useAppDispatch, useAppSelector } from '../../hooks'

type TFormData = {
    email: string
}

const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()

    const { forgotError, isForgotPending } = useAppSelector(store => store.auth)

    const fetchForgot = (formData: TFormData) => {
        dispatch(forgot({
            formData,
            onSuccess: () => {
                navigate('/reset-password', { state: { ...location.state, isResetRequested: true } })
            }
        }))
    }

    const { formData, handleChange, handleSubmit } = useFormData<TFormData>({ email: '' }, fetchForgot)

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <EmailInput
                name={'email'}
                value={formData.email}
                placeholder={'Укажите e-mail'}
                isIcon={false}
                extraClass="mt-6"
                onChange={handleChange}
            />
            <ButtonWithPending isPending={isForgotPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Восстановить
            </ButtonWithPending>
            {forgotError && <p className="text_type_main-default error">{forgotError}</p>}
            <p className="text text_type_main-default mt-20 text_color_inactive">
                Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
            </p>
        </form>
    )
}

export default ForgotPasswordPage
