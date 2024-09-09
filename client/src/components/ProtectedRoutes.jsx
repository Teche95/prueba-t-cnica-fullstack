
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const miCookie = Cookies.get('access_token');
    return miCookie ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;