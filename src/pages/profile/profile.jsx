import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import useFormData from '../../hooks/use-form-data'
import { update } from '../../services/slices/auth'
import ButtonWithPending from '../../components/button-with-pending/button-with-pending'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const { user, isUpdatePending, updateError } = useSelector(store => store.auth)

    const fetchUpdate = (formData) => {
        dispatch(update({ endpoint: '/auth/user', formData, onSuccess: cancelEdit }))
    }

    const { formData, setFormData, handleChange, handleSubmit } = useFormData({ name: user.name, email: user.email, password: '' }, fetchUpdate)

    const cancelEdit = () => {
        setFormData({ ...user, password: '' })
    }

    const buttonsEnabled = user?.name !== formData?.name || user?.email !== formData?.email || formData.password

    return (
        <>
            {formData && <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    value={formData.name}
                    required={true}
                    icon='EditIcon'
                    onChange={handleChange}
                />
                <EmailInput
                    placeholder={'Логин'}
                    name={'email'}
                    extraClass="mt-6"
                    value={formData.email}
                    required={true}
                    isIcon={true}
                    onChange={handleChange}
                />
                <PasswordInput
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                    extraClass="mt-6"
                    value={formData.password}
                    required={true}
                    icon='EditIcon'
                    onChange={handleChange}
                />
                {buttonsEnabled && (
                    <>
                        <ButtonWithPending isPending={isUpdatePending} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                    Сохранить
                        </ButtonWithPending>
                        <ButtonWithPending isPending={isUpdatePending} htmlType="button" type="primary" size="large" extraClass="mt-6 ml-6" onClick={cancelEdit}>
                    Отмена
                        </ButtonWithPending>
                    </>
                )}
                {updateError && <p className="text_type_main-default error">{updateError}</p>}
            </form>}
        </>
    )
}

export default ProfilePage
