import { useDispatch, useSelector } from 'react-redux'
import { auth, isAuthSelector } from '../../services/slices/auth'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRouteElement = ({ element, reverse }) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)
    const [isUserLoaded, setUserLoaded] = useState(false)

    useEffect(() => {
        dispatch(auth({
            endpoint: '/auth/user',
            onSuccess: () => {
                setUserLoaded(true)
            },
            onError: () => {
                setUserLoaded(true)
            }
        }))
    }, [dispatch])

    if (! isUserLoaded) {
        return null
    }

    return reverse
        ? isAuth
            ? <Navigate to="/" replace/>
            : element
        : isAuth
            ? element
            : <Navigate to="/login" replace state={{ from: location.pathname }}/>
}

export default ProtectedRouteElement
