import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { auth, updateUser } from '../../services/slices/auth'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const { user, isPending, error } = useSelector(store => store.auth)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        dispatch(auth({ endpoint: '/auth/user' }))
    }, [dispatch])

    // sync local state with store
    useEffect(() => {
        setFormData(user)
    }, [user])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(updateUser({ endpoint: '/auth/user', formData }))
    }

    const handleCancel = () => {
        setFormData(user)
    }

    const cancelButtonDisabled = user?.name === formData?.name && user?.email === formData?.email
    const saveButtonDisabled = isPending || cancelButtonDisabled

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
                    value={'******'}
                    required={true}
                    icon='EditIcon'
                />
                <Button disabled={saveButtonDisabled} htmlType="submit" type="primary" size="large" extraClass="mt-6">
                    Сохранить
                </Button>
                <Button disabled={cancelButtonDisabled} htmlType="button" type="primary" size="large" extraClass="mt-6 ml-6" onClick={handleCancel}>
                    Отмена
                </Button>
                {error && <p className="text_type_main-default error">{error}</p>}
            </form>}
        </>
    )
}

export default ProfilePage
