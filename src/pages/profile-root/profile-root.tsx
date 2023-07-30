import styles from './profile-root.module.css'
import cn from 'classnames'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../services/slices/auth/auth'
import Preloader from '../../components/preloader/preloader'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { SyntheticEvent } from 'react'
import { useProfileHint } from '../../hooks/use-profile-hint'

// eslint-disable-next-line camelcase
const setActiveLink = ({ isActive }: { isActive: boolean }) => cn('text', { text_color_inactive: ! isActive })

const ProfileRootPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { isLogoutPending, logoutError } = useAppSelector(store => store.auth)

    const { hint, contextValue } = useProfileHint()

    const handleLogout = (event: SyntheticEvent) => {
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
                <Link to="/logout" onClick={handleLogout} className="text text_color_inactive">Выход</Link>

                {logoutError && <p className="text_type_main-default error">{logoutError}</p>}

                <p className="text text_type_main-default mt-20 mb-20 text_color_inactive">
                    {hint}
                </p>
            </section>
            <section>
                <Outlet context={contextValue}/>
            </section>
        </main>
    )
}

export default ProfileRootPage
