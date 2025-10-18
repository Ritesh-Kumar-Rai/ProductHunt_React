// useAuthManager Hook which returns 2 functions for login and registering user

import { useCallback } from "react";

const local_storage_keyname = process.env.REACT_APP_LOCALSTORAGE_KEYNAME;
const session_storage_keyname = process.env.REACT_APP_SESSIONSTORAGE_KEYNAME;

const guestCredentials = {
  username: process.env.REACT_APP_GUEST_LOGIN_USERNAME,
  email: process.env.REACT_APP_GUEST_LOGIN_EMAIL,
  password: process.env.REACT_APP_GUEST_LOGIN_PASSWORD,
};

const useAuthManager = () => {
  // 1. method which is for registering user
  const registerUser = useCallback((newUser) => {
    const users = JSON.parse(
      localStorage.getItem(local_storage_keyname) || "[]"
    );

    const isExist = users.some(
      (each_user) => each_user.email === newUser.email
    );

    if (isExist)
      return { success: false, error: "Email is already registered!" };

    users.push(newUser);

    localStorage.setItem(local_storage_keyname, JSON.stringify(users));

    return { success: true };
  }, []);

  // 2. method for login
  const loginUser = useCallback((email, password) => {
    const users = JSON.parse(
      localStorage.getItem(local_storage_keyname) || "[]"
    );

    const match = users.find(
      (each_user) =>
        each_user.email === email && each_user.password === password
    );

    if (match) {
      // checking inside registered users arrays

      const modified_user_obj_for_context_and_session = {
        username: match?.username ?? "",
        email: match?.email ?? "",
      };

      sessionStorage.setItem(
        session_storage_keyname,
        JSON.stringify({
          isAuthenticated: true,
          userCredentials: modified_user_obj_for_context_and_session,
          isGuest: false,
        })
      );

      return {
        success: true,
        user: modified_user_obj_for_context_and_session,
        isGuest: false,
      };
    } else if (
      guestCredentials.email === email &&
      guestCredentials.password === password
    ) {
      // if not then check is this user is guest or not -> if yes then login as guest else check for other constraints
      sessionStorage.setItem(
        session_storage_keyname,
        JSON.stringify({
          isAuthenticated: true,
          userCredentials: guestCredentials,
          isGuest: true,
        })
      );
      return {
        success: true,
        user: {
          username: guestCredentials.username,
          email: guestCredentials.email,
        },
        isGuest: true,
      };
    } else if (guestCredentials.email !== email) {
      return { success: false, error: "Email is invalid!" };
    } else if (guestCredentials.password !== password) {
      return { success: false, error: "Password is invalid!" };
    } else {
      return { success: false, error: "Invalid credentials... try again!" };
    }
  }, []);

  return { registerUser, loginUser };
};

export default useAuthManager;
