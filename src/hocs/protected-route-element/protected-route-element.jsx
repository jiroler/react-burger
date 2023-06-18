import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../services/slices/auth'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Preloader from '../../components/preloader/preloader'
import { bool, element } from 'prop-types'

const ProtectedRouteElement = ({ element, reverse }) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { user, isAuthChecked } = useSelector(store => store.auth)

    useEffect(() => {
        dispatch(auth())
    }, [dispatch])

    if (! isAuthChecked) return <Preloader/>

    if (! reverse) {
        return user
            ? element
            : <Navigate to="/login" replace state={{ from: location.pathname }}/>
    } else {
        return user
            ? <Navigate to="/" replace/>
            : element
    }
}

ProtectedRouteElement.propTypes = {
    element: element,
    reverse: bool
}

export default ProtectedRouteElement
