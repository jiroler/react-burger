import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    return (
        <form className="auth-form">
            <p className="text text_type_main-medium">Регистрация</p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                name={'name'}
                extraClass="mt-6"
            />
            <EmailInput
                name={'email'}
                isIcon={false}
                extraClass="mt-6"
            />
            <PasswordInput
                name={'password'}
                extraClass="mt-6"
            />
            <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default mb-4 text_color_inactive">
                Уже зарегистрированы? <Link to='/login'>Войти</Link>
            </p>
        </form>
    )
}

export default RegisterPage
