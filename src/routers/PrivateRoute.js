import { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../auth/authContext'

export const PrivateRoute = ({ children }) => {
    const { pathname, search } = useLocation();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!pathname) return;
        localStorage.setItem('lastPath', `${pathname}${search}`);
    }, [pathname, search])

    return user.logged
        ? children
        : <Navigate to='/login' />
}
