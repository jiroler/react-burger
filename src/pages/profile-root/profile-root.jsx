import styles from './profile-root.module.css'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../services/slices/auth'

// eslint-disable-next-line camelcase
const setActiveLink = ({ isActive }) => cn('text', { text_color_inactive: ! isActive })

const ProfileRootPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        event.preventDefault()

        dispatch(logout({
            endpoint: '/auth/logout',
            onSuccess: () => {
                navigate('/login', { replace: true })
            }
        }))
    }

    return (
        <main className={cn(styles.profile, 'mt-30')}>
            <section className={cn(styles.nav, 'text text_type_main-medium mr-15')}>
                <NavLink to="/profile" className={setActiveLink} end>Профиль</NavLink>
                <NavLink to="/profile/orders" className={setActiveLink}>История заказов</NavLink>
                <Link onClick={handleLogout} className="text text_color_inactive">Выход</Link>

                <p className="text text_type_main-default mt-20 mb-20 text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </section>
            <section>
                <Outlet/>
            </section>
        </main>
    )
}

export default ProfileRootPage
