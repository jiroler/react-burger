import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { request } from '../../utils/api'
import cookies from 'js-cookie'
import { ECookie } from '../../utils/types'

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const fetchResetRequest = useCallback(async email => {
        try {
            setIsPending(true)

            await request('/password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            cookies.set(ECookie.isResetRequested, true)

            setIsPending(false)

        } catch (error) {
            setError(error?.message || 'Ошибка загрузки')
            setIsPending(false)
        }
    }, [])

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchResetRequest(email)
    }

    return (
        <form className="auth-form" onChange={handleChange} onSubmit={handleSubmit}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <EmailInput
                name={'email'}
                value={email}
                placeholder={'Укажите e-mail'}
                isIcon={false}
                extraClass="mt-6"
                required={true}
            />
            <Button disabled={isPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Восстановить
            </Button>
            {error && <p className="text_type_main-default error">{error}</p>}
            <p className="text text_type_main-default mt-20 text_color_inactive">
                Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
            </p>
        </form>
    )
}

export default ForgotPasswordPage
