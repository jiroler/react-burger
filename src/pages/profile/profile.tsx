import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import useFormData from '../../hooks/use-form-data'
import { update } from '../../services/slices/auth/auth'
import ButtonWithPending from '../../components/button-with-pending/button-with-pending'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useEffect } from 'react'
import { useProfileHint } from '../../hooks/use-profile-hint'

type TFormData = {
    name: string,
    email: string,
    password: string
}

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const { user, isUpdatePending, updateError } = useAppSelector(store => store.auth)

    const { setHint } = useProfileHint()

    useEffect(() => {
        setHint('В этом разделе вы можете изменить свои персональные данные')
    }, [setHint])

    const fetchUpdate = (formData: TFormData) => {
        dispatch(update({
            formData,
            onSuccess: () => {
                setFormData({
                    ...formData,
                    password: ''
                })
            } }))
    }

    const { formData, setFormData, handleChange, handleSubmit } = useFormData<TFormData>({ name: user!.name, email: user!.email, password: '' }, fetchUpdate)

    const handleCancel = () => {
        setFormData({ ...user!, password: '' })
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
                        <ButtonWithPending isPending={isUpdatePending} htmlType="button" type="primary" size="large" extraClass="mt-6 ml-6" onClick={handleCancel}>
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
