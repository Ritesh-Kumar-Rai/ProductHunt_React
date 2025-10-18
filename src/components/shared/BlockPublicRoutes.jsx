import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

// The BlockPublicRoutes is used to block the routes like /login, /register like routes when user is authenticated;
const BlockPublicRoutes = ({ children }) => {

    const { state } = useAuthContext();

    if (state.isAuthenticated) {
        return <Navigate to='/' replace />
    }
    return children;
}

export default BlockPublicRoutes;