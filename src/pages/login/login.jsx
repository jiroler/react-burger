import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <form className="auth-form">
            <p className="text text_type_main-medium">Вход</p>
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
                Войти
            </Button>
            <p className="text text_type_main-default mb-4 text_color_inactive">
                Вы - новый пользователь? <Link to='/register' className='text_color_accent'>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? <Link to='/forgot-password' className='text_color_accent'>Восстановить пароль</Link>
            </p>
        </form>
    )
}

export default LoginPage
