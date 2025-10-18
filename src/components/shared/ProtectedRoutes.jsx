import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

// ProtectedRoutes is used to protect the sensitive routes like /dashboard, /order_page for Un-authenticated user..
const ProtectedRoutes = ({ children }) => {

    const { state } = useAuthContext();

    if (!state.isAuthenticated) {
        return <Navigate to='/signin' replace />
    }

    return children;
}

export default ProtectedRoutes;