import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

// The BlockPublicRoutes is used to block the routes like /login, /register like routes when user is authenticated;
const BlockPublicRoutes = ({ children }) => {

    const { state } = useAuthContext();
    const location = useLocation();

    const redirect_to_path = location.state?.from?.pathname || '/'; // goes to past location [only works which are wrapped by this component]

    if (state.isAuthenticated) {
        return <Navigate to={redirect_to_path} replace />
    }
    return children;
}

export default BlockPublicRoutes;