import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { request } from '../../utils/api'
import cookies from 'js-cookie'
import { ECookie } from '../../utils/types'

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

            cookies.remove(ECookie.isResetRequested)
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
        event.preventDefault()
        fetchResetConfirm(formData)
    }

    if (! cookies.get(ECookie.isResetRequested)) {
        return <Navigate to='/forgot-password' replace />
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
            <Button disabled={isPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Сохранить
            </Button>
            {error && <p className="text_type_main-default error">{error}</p>}
            <p className="text text_type_main-default mt-20 text_color_inactive">
                Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
            </p>
        </form>
    )
}

export default ResetPasswordPage
