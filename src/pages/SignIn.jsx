import { useRef, useState } from 'react';
import { Box, Button, Checkbox, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
//import SEOHelmetInjector from '../components/shared/SEOHelmetInjector';
import Utility from '../Utils/Utility';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuthManager from '../hooks/useAuthManager';

const guestCredentials = {
    username: process.env.REACT_APP_GUEST_LOGIN_USERNAME,
    email: process.env.REACT_APP_GUEST_LOGIN_EMAIL,
    password: process.env.REACT_APP_GUEST_LOGIN_PASSWORD,
};

const showLoadingToast = (message = "All is good.") => {
    const id = toast.loading(message);
    return {
        pending: (msg) => toast.update(id, { render: msg, isLoading: true }),
        success: (msg) => toast.update(id, { render: msg, type: 'success', isLoading: false, autoClose: 3000 }),
        error: (msg) => toast.update(id, { render: msg, type: 'error', isLoading: false, autoClose: 3000 }),
    };
};

// custom error
class LoginError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "LoginError";
    };
};

class RegisterError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "RegisterError";
    };
};

const fakePromise = (timer = 2000) => new Promise((resolve) => setTimeout(resolve, timer));

const verifyUserCredentials = async (email, password, loginUserFn) => {
    const toastHandler = showLoadingToast("Please wait... while we are checking credentials");
    try {
        await fakePromise(3000);
        toastHandler.pending("logging in...");
        await fakePromise(5000);
        if (!email || !password) {
            throw new LoginError("Email and Password required!");
        }
        if (!loginUserFn) throw new ReferenceError('Unknown Server missing... please contact admin!');
        await fakePromise(2000);
        const result = loginUserFn(email, password);
        if (result.success) {
            if (result?.isGuest) {
                toastHandler.success("Logged in as guest😉");
            } else {
                toastHandler.success("Logged in successfully🤩");
            }
        } else {
            // login failed
            throw new LoginError(result.error || 'Unknown Error While Login!');
        }

    } catch (error) {
        toastHandler.error(`${error.name} -> ${error.message}`);
        console.error(error.name, error.message);
    }
};

// The User Authentication Page
const SignIn = () => {

    const login_email = useRef(null);
    const login_password = useRef(null);

    const register_username = useRef(null);
    const register_email = useRef(null);
    const register_password = useRef(null);
    const register_cpassword = useRef(null);

    const [loginError, setLoginError] = useState({});
    const [registerError, setRegisterError] = useState({});

    const [showPassword, setShowPassword] = useState({ login_p: false, register_p: false, register_cp: false });

    const [loadingState, setLoadingState] = useState({ guest_loading: false, login_loading: false });

    const navigate = useNavigate();

    // using custom hook for login and registrying users
    const { registerUser, loginUser } = useAuthManager();


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoadingState(prev => ({ ...prev, login_loading: true }));
        const email = login_email?.current?.value || '';
        const password = login_password?.current?.value || '';

        const loginErrorObj = Utility.validateForm(null, { email, password });
        setLoginError(loginErrorObj);

        if (Object.keys(loginErrorObj).length === 0) {
            await verifyUserCredentials(email, password, loginUser);
        } else {
            toast.warning('Oops! Something went wrong, Check your Credentials');
        }
        setLoadingState(prev => ({ ...prev, login_loading: false }));
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const username = register_username?.current?.value || '';
        const email = register_email?.current?.value || '';
        const password = register_password?.current?.value || '';
        const confirmPassword = register_cpassword?.current?.value || '';

        const registerErrorObj = Utility.validateForm('register', { username, email, password, confirmPassword });

        if (Object.keys(registerErrorObj)?.length === 0) {
            setRegisterError({});
            const toastHandler = showLoadingToast("Creating Account... please wait");
            try {
                await fakePromise(3000);
                const result = registerUser({ username, email, password });
                if (result.success) {
                    toastHandler.success("Hurray! Registration is completed😍");
                } else {
                    throw new RegisterError(result.error || 'Failed to create account! try again 🤔');
                }
            } catch (error) {
                toastHandler.error(`${error.name} -> ${error.message}`);
                console.error(error.name, error.message);
            }
        } else if (Object.keys(registerErrorObj)?.length > 0) {
            setRegisterError(registerErrorObj);
            toast.warning("Oops! Somewhere in Credentials is wrong check it now😅");
        }
    };

    const handleGuestLogin = async (event) => {
        event.preventDefault();
        if (login_email.current && login_password.current) {
            setLoadingState(prev => ({ ...prev, guest_loading: true }));
            await fakePromise(2000);

            login_email.current.value = guestCredentials.email;
            login_password.current.value = guestCredentials.password;

            // Optional: visually highlight the fields
            login_email.current.classList.add("ring-2", "ring-indigo-400");
            login_password.current.classList.add("ring-2", "ring-indigo-400");

            setLoadingState(prev => ({ ...prev, guest_loading: false }));
        }
    };


    return (
        // <section className='w-full m-auto flex items-center justify-center'>
        <section id='sign-container' className='min-h-[500px] bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-lg p-2 flex items-center justify-center'>

            {/* <SEOHelmetInjector title='SignIn | ProductHunt' description='Login to our ProductHunt to Buy for favourite products today' /> */}

            <div className='w-96 m-auto rounded-lg shadow-lg bg-white dark:bg-zinc-950 py-1 px-2'>
                <Tabs.Root defaultValue="login" mt='2'>
                    <Tabs.List>
                        <Tabs.Trigger value="login">Login</Tabs.Trigger>
                        <Tabs.Trigger value="create-account">Create Account</Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="login">
                            <form action="#" method="post" onSubmit={handleLoginSubmit}>
                                <Heading as='h2'>Sign in to your account</Heading>

                                <div className="form-control my-4">
                                    <label htmlFor="email" className='block my-2'>Your Email</label>
                                    <input type="email" name="email" id="email"
                                        ref={login_email}
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder='name@company.com' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>{loginError?.email}</span>
                                </div>

                                <div className="form-control my-4">
                                    <label htmlFor="pass" className='block my-2'>Password</label>
                                    <input type={showPassword?.login_p ? "text" : "password"} name="pass" id="pass"
                                        ref={login_password}
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base dark:text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder='••••••••' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>{loginError?.password}</span>
                                </div>

                                <div className='my-5'>
                                    <Text as="label" size="2" mb='2' style={{ cursor: 'pointer', display: 'block', userSelect: 'none' }}>
                                        <Flex gap="2">
                                            <Checkbox color='indigo' checked={showPassword?.login_p || false} onCheckedChange={(checked) => setShowPassword((prev) => ({ ...prev, login_p: checked }))} />
                                            Show Password
                                        </Flex>
                                    </Text>

                                    <Text as="label" size="2" style={{ cursor: 'pointer', userSelect: 'none' }}>
                                        <Flex gap="2">
                                            <Checkbox color='indigo' defaultChecked />
                                            Remember Me
                                        </Flex>
                                    </Text>

                                </div>

                                <div className='flex items-center justify-center my-2'>
                                    <Button size='3' loading={loadingState?.login_loading ?? false}>Log in to your account</Button>
                                </div>
                                <div className='flex items-center justify-center my-2'>
                                    <Button size="3" type='button' color="gray" variant="soft" onClick={handleGuestLogin} loading={loadingState?.guest_loading ?? false}>
                                        Login as Guest
                                    </Button>
                                </div>
                            </form>
                        </Tabs.Content>

                        <Tabs.Content value="create-account">
                            <form action="#" method="post" onSubmit={handleRegisterSubmit}>
                                <Heading as='h2'>Create a new Account</Heading>

                                <div className="form-control my-4">
                                    <label htmlFor="name" className='block my-2'>Your Name</label>
                                    <input type="text" name="username" id="name"
                                        ref={register_username}
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder='Ritesh Kumar Rai' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>{registerError?.username}</span>
                                </div>

                                <div className="form-control my-4">
                                    <label htmlFor="email" className='block my-2'>Your Email</label>
                                    <input type="email" name="" id="email"
                                        ref={register_email}
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder='name@company.com' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>{registerError?.email}</span>
                                </div>

                                <div className="form-control my-4">
                                    <label htmlFor="pass" className='block my-2'>Password</label>
                                    <input type={showPassword.register_p ? "text" : "password"} name="" id="pass"
                                        ref={register_password}
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base dark:text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder='••••••••' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>{registerError?.password}</span>
                                    <Text as="label" size="2" my='2' style={{ cursor: 'pointer', display: 'block', userSelect: 'none' }}>
                                        <Flex gap="2">
                                            <Checkbox color='indigo' checked={showPassword?.register_p || false} onCheckedChange={(checked) => setShowPassword((prev) => ({ ...prev, register_p: checked }))} />
                                            Show Password
                                        </Flex>
                                    </Text>
                                </div>
                                <div className="form-control my-4">
                                    <label htmlFor="cpass" className='block my-2'>Confirm Password</label>
                                    <input type={showPassword?.register_cp ? "text" : "password"} name="" id="cpass"
                                        ref={register_cpassword}
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base dark:text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder='••••••••' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>{registerError?.confirmPassword}</span>
                                    <Text as="label" size="2" my='2' style={{ cursor: 'pointer', display: 'block', userSelect: 'none' }}>
                                        <Flex gap="2">
                                            <Checkbox color='indigo' checked={showPassword?.register_cp || false} onCheckedChange={(checked) => setShowPassword((prev) => ({ ...prev, register_cp: checked }))} />
                                            Show Password
                                        </Flex>
                                    </Text>
                                </div>

                                <div className='flex items-center justify-center my-2'>
                                    <Button size='3' color='grass'>Create new account</Button>
                                </div>
                            </form>
                        </Tabs.Content>


                    </Box>
                </Tabs.Root>
            </div>
        </section>
        // </section>
    )
}

export default SignIn;