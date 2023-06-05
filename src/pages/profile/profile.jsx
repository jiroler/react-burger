import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import cn from 'classnames'
import { Link } from 'react-router-dom'

const ProfilePage = () => {

    return (
        <main className={cn(styles.profile, 'mt-30')}>
            <section className={cn(styles.nav, 'text text_type_main-medium mr-15')}>
                <Link to="/profile">Профиль</Link>
                <Link to="/profile/orders" className='text text_color_inactive'>История заказов</Link>
                <Link to="/" className='text text_color_inactive'>Выход</Link>

                <p className="text text_type_main-default mt-20 mb-20 text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </section>
            <section className={styles.form}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    value={'Марк'}
                    required={true}
                    icon='EditIcon'
                    isIcon={true}
                />
                <EmailInput
                    placeholder={'Логин'}
                    name={'login'}
                    extraClass="mt-6"
                    value={'mail@stellar.burgers'}
                    required={true}
                    isIcon={true}
                />
                <PasswordInput
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                    extraClass="mt-6"
                    value={'******'}
                    required={true}
                    icon='EditIcon'
                />
            </section>
        </main>
    )
}

export default ProfilePage
