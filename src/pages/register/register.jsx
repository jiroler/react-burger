import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../services/slices/auth'

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const dispatch = useDispatch()
    const { error, isPending } = useSelector(store => store.auth)

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(register({
            endpoint: '/auth/register',
            formData,
            onSuccess: () => {
                alert('success!')
            }
        }))
    }

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
                extraClass="mt-6"
                value={formData.password}
                onChange={handleChange}
            />
            <Button disabled={isPending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                Зарегистрироваться
            </Button>
            {error && <p className="text_type_main-default error">{error}</p>}
            <p className="text text_type_main-default mt-20 text_color_inactive">
                Уже зарегистрированы? <Link to='/login' className='text_color_accent'>Войти</Link>
            </p>
        </form>
    )
}

export default RegisterPage
