import { auth } from '../../services/slices/auth/auth'
import { FC, ReactElement, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Preloader from '../../components/preloader/preloader'
import { useAppDispatch, useAppSelector } from '../../hooks'

type TProps = {
    element: ReactElement,
    reverse?: boolean
}

const ProtectedRouteElement: FC<TProps> = ({ element, reverse }) => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { user, isAuthChecked } = useAppSelector(store => store.auth)

    useEffect(() => {
        ! isAuthChecked && dispatch(auth())
    }, [isAuthChecked, dispatch])

    if (! isAuthChecked) return <Preloader/>

    if (! reverse) {
        return user
            ? element
            : <Navigate to="/login" replace state={{ from: location.pathname }}/>
    } else {
        return user
            ? <Navigate to={location.state?.from || '/'} replace/>
            : element
    }
}

export default ProtectedRouteElement
