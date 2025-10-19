# 🔐 React Auth System — Context + Reducer + Custom Hook

This module implements a **frontend-only authentication system** using React Context API, Reducer, and Custom Hooks.  
It supports both **registered users and guest login**, persisting data via **LocalStorage** and **SessionStorage**, and integrates seamlessly with protected and public route components.

---

## 📁 Folder Structure

```
src/
│
├── contexts/
│   └── AuthContext.jsx           # Global auth state using Context + Reducer
│
├── hooks/
│   └── useAuthManager.js         # Custom hook for registering and logging in users
│
├── components/
│   ├── Header.jsx                # Displays Sign In / Avatar menu based on auth state
│   ├── AvatarDropDownMenu.jsx    # Profile dropdown with logout action
│   └── shared/
│       ├── ConfirmDialog.jsx     # Reusable alert dialog for logout confirmation
│       ├── ProtectedRoutes.jsx   # Protects sensitive routes from unauthenticated users
│       └── BlockPublicRoutes.jsx # Blocks login/register routes for authenticated users
│
├── pages/
│   └── SignIn.jsx                # Login & registration UI logic
│
└── Utils/
    └── Utility.js                # Form validation helper
```

---

## 🚀 Features

- ✅ Global authentication state via **React Context + Reducer**
- ✅ Persistent login using **SessionStorage**
- ✅ **Guest login** feature for demo access
- ✅ Form validation via reusable `Utility.validateForm()`
- ✅ Toast-based user feedback (success/error/loading)
- ✅ Route guards for **Protected** and **Public-only** pages
- ✅ Clean UI using **Radix UI**, **TailwindCSS**, and **React Router**

---

## 🧭 Data Flow Diagram (Simplified)

```
               ┌─────────────────────────┐
               │        SignIn.jsx       │
               │  (Login / Register UI)  │
               └────────────┬────────────┘
                            │
                            ▼
               ┌─────────────────────────┐
               │    useAuthManager.js    │
               │  (Handles Logic for     │
               │   register/login users) │
               └────────────┬────────────┘
                            │
               ┌────────────▼────────────┐
               │   AuthContext.jsx       │
               │  (Reducer + State Mgmt) │
               └────────────┬────────────┘
                            │
               ┌────────────▼────────────┐
               │  sessionStorage/local   │
               │  (Data persistence)     │
               └────────────┬────────────┘
                            │
               ┌────────────▼────────────┐
               │  Components (Header,    │
               │  AvatarMenu, Routes...) │
               │  Consumes AuthContext   │
               └─────────────────────────┘
```

**Flow Explanation:**

1. User triggers login/register in **SignIn.jsx**.
2. The request calls the `useAuthManager` hook to validate credentials.
3. On success, data is stored in **SessionStorage** and propagated through **AuthContext**.
4. Components like `Header` and route guards consume the auth state via `useAuthContext`.

---

## 🧩 Architecture Overview

| Layer                | File                                                 | Purpose                                                                |
| -------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| **State Management** | `AuthContext.jsx`                                    | Creates global auth store with reducer (`LOGIN`, `LOGOUT`) actions     |
| **Logic Layer**      | `useAuthManager.js`                                  | Encapsulates logic for login/register (local/session storage handling) |
| **Validation**       | `Utility.js`                                         | Validates input fields for both login and registration                 |
| **UI Layer**         | `SignIn.jsx`, `Header.jsx`, `AvatarDropDownMenu.jsx` | React components consuming context and hooks                           |
| **Routing Guards**   | `ProtectedRoutes.jsx`, `BlockPublicRoutes.jsx`       | Protects private routes and blocks redundant pages                     |

---

## 💡 Key Code Snippets

### 1. Reducer Actions (`AuthContext.jsx`)

```js
function authReducer(prev_state, action) {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user_data: action.payload };
    case "LOGOUT":
      return { isAuthenticated: false, user_data: null };
    default:
      return prev_state;
  }
}
```

### 2. Login Logic (`useAuthManager.js`)

```js
const loginUser = useCallback((email, password) => {
  const users = JSON.parse(localStorage.getItem(local_storage_keyname) || "[]");
  const match = users.find((u) => u.email === email && u.password === password);

  if (match) {
    const userObj = { username: match.username, email: match.email };
    sessionStorage.setItem(
      session_storage_keyname,
      JSON.stringify({
        isAuthenticated: true,
        userCredentials: userObj,
        isGuest: false,
      })
    );
    return { success: true, user: userObj, isGuest: false };
  }
  return { success: false, error: "Invalid credentials" };
}, []); // rest of codes are not mentioned here, for more detailed code follow the link below
```

See the complete implementation here: [useAuthContext.jsx](../src/context/AuthContext.jsx)

### 3. Protected Route Wrapper

```js
const ProtectedRoutes = ({ children }) => {
  const { state } = useAuthContext();
  if (!state.isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};
```

---

## ⚙️ Integration & Usage

1. Wrap your entire app inside the provider:

```jsx
<AuthContextProvider>
  <App />
</AuthContextProvider>
```

2. Use `useAuthContext()` in any component to access:

```js
const { state, dispatch } = useAuthContext();
```

3. Login example:

```js
dispatch({ type: "LOGIN", payload: userData });
```

4. Logout example:

```js
dispatch({ type: "LOGOUT" });
sessionStorage.removeItem(process.env.REACT_APP_SESSIONSTORAGE_KEYNAME);
```

---

## 🔍 Known Limitations / TODOs

- ❌ No real backend API (all handled via local/session storage)
- ⚠️ No password encryption (plain text)
- 🚀 Future Scope:
  - Integrate with Firebase or Node.js backend
  - Add JWT-based session management
  - Add “Forgot Password” workflow

---

## 🧑‍💻 Tech Stack

| Category      | Tools                         |
| ------------- | ----------------------------- |
| Frontend      | React (CRA), React Router     |
| UI            | TailwindCSS, Radix UI         |
| Notifications | React-Toastify                |
| State Mgmt    | React Context + Reducer       |
| Storage       | LocalStorage + SessionStorage |

---

**Author:** Ritesh Kumar Rai  
**Project:** React E-Commerce (Frontend Only)  
**Feature:** Authentication System  
**Last Updated:** 19 October 2025
