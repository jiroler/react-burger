import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { request } from '../../utils/api'

const ResetPasswordPage = () => {
    const [formData, setFormData] = useState({ password: '', token: '' })
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const fetchResetConfirm = useCallback(async formData => {
        try {
            setIsPending(true)

            await request('/password-reset/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            setIsPending(false)

        } catch (error) {
            setError(error?.message || 'Ошибка загрузки')
            setIsPending(false)
        }
    }, [])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        if (isPending) return
        event.preventDefault()
        fetchResetConfirm(formData)
    }

    return (
        <form className="auth-form" onChange={handleChange} onSubmit={handleSubmit}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <PasswordInput
                name={'password'}
                placeholder={'Введите новый пароль'}
                extraClass="mt-6"
                value={formData.password}
                required={true}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                name={'token'}
                extraClass="mt-6"
                value={formData.token}
                required={true}
            />
            <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Сохранить
            </Button>
            {error && <p class="text_type_main-default error">{error}</p>}
            <p className="text text_type_main-default mt-20 text_color_inactive">
                Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
            </p>
        </form>
    )
}

export default ResetPasswordPage
