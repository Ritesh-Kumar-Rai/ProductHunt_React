// The Context Global State Data with Reducer Store for User Auth Indentification accross multiple pages..

import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext({
    state: {},
    dispatch: () => { }
}); // creating a context for auth with default/boilerplate values

// initial state for reducer store
const initialState = {
    isAuthenticated: false, // whether it was authenticated or not
    user_data: null, // user info
};


const init = (prev_state) => {
    const guestInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_SESSIONSTORAGE_KEYNAME) || '{}');

    if (guestInfo.isAuthenticated) {
        if (guestInfo.isGuest) {
            return { isAuthenticated: true, user_data: { ...guestInfo.userCredentials ?? null, isGuest: true } };
        } else {
            return { isAuthenticated: true, user_data: guestInfo.userCredentials ?? null };
        }
    }

    return prev_state;
};

// reducer function 
function authReducer(prev_state, action) {
    switch (action.type) {
        case "LOGIN":
            return { isAuthenticated: true, user_data: action.payload };
        case "LOGOUT":
            return { isAuthenticated: false, user_data: null };
        default:
            return prev_state;
    };
};

// Providing the Reducer store to all components with the help of Context.Provider
export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState, init);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// consumable AuthContext values which was set in .Provider component
export const useAuthContext = () => useContext(AuthContext);