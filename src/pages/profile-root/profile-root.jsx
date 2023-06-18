import styles from './profile-root.module.css'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../services/slices/auth'
import Preloader from '../../components/preloader/preloader'

// eslint-disable-next-line camelcase
const setActiveLink = ({ isActive }) => cn('text', { text_color_inactive: ! isActive })

const ProfileRootPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLogoutPending, logoutError } = useSelector(store => store.auth)

    const handleLogout = (event) => {
        event.preventDefault()

        dispatch(logout({
            onSuccess: () => {
                navigate('/login', { replace: true })
            }
        }))
    }

    if (isLogoutPending) return <Preloader/>

    return (
        <main className={cn(styles.profile, 'mt-30')}>
            <section className={cn(styles.nav, 'text text_type_main-medium mr-15')}>
                <NavLink to="/profile" className={setActiveLink} end>Профиль</NavLink>
                <NavLink to="/profile/orders" className={setActiveLink}>История заказов</NavLink>
                <Link onClick={handleLogout} className="text text_color_inactive">Выход</Link>

                {logoutError && <p className="text_type_main-default error">{logoutError}</p>}

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
