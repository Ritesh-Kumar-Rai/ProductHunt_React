import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

let openedByStrictMode = 0; // This variable is used to prevent toast render 2 times, because of React StrictMode; This can be removed at the time of production.

// ProtectedRoutes is used to protect the sensitive routes like /dashboard, /order_page for Un-authenticated user..
const ProtectedRoutes = ({ msg_for_notify, children }) => {

    const { state } = useAuthContext();
    const location = useLocation();

    if (!state.isAuthenticated) {
        openedByStrictMode++;
        if (msg_for_notify && openedByStrictMode > 1) {
            toast.warning(msg_for_notify);
            openedByStrictMode = 0;
        }
        return <Navigate to='/signin' replace state={{ from: location }} />
    }

    return children;
}

export default ProtectedRoutes;