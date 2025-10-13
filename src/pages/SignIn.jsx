import React from 'react';
import { Box, Button, Checkbox, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import SEOHelmetInjector from '../components/shared/SEOHelmetInjector';

// The User Authentication Page
const SignIn = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const fm = new FormData(e.target);

        alert('form submitted!')
    }

    return (
        // <section className='w-full m-auto flex items-center justify-center'>
        <section id='sign-container' className='min-h-[500px] bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-lg p-2 flex items-center justify-center'>

            <SEOHelmetInjector title='SignIn | ProductHunt' description='Login to our ProductHunt to Buy for favourite products today' />

            <div className='w-96 m-auto rounded-lg shadow-lg bg-white dark:bg-zinc-950 py-1 px-2'>
                <Tabs.Root defaultValue="login" mt='2'>
                    <Tabs.List>
                        <Tabs.Trigger value="login">Login</Tabs.Trigger>
                        <Tabs.Trigger value="create-account">Create Account</Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="login">
                            <form action="#" method="post" onSubmit={handleSubmit}>
                                <Heading as='h2'>Sign in to your account</Heading>

                                <div className="form-control my-4">
                                    <label htmlFor="email" className='block my-2'>Your Email</label>
                                    <input type="email" name="email" id="email"
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder='name@company.com' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>Email is required.</span>
                                </div>

                                <div className="form-control my-4">
                                    <label htmlFor="pass" className='block my-2'>Password</label>
                                    <input type="password" name="pass" id="pass"
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder='••••••••' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>Password is required.</span>
                                </div>

                                <div className='my-5'>
                                    <Text as="label" size="2" style={{ cursor: 'pointer' }}>
                                        <Flex gap="2">
                                            <Checkbox color='indigo' defaultChecked />
                                            Remember Me
                                        </Flex>
                                    </Text>

                                </div>

                                <div className='flex items-center justify-center my-2'>
                                    <Button size='3'>Log in to your account</Button>
                                </div>
                            </form>
                        </Tabs.Content>

                        <Tabs.Content value="create-account">
                            <form action="#" method="post" onSubmit={handleSubmit}>
                                <Heading as='h2'>Create a new Account</Heading>

                                <div className="form-control my-4">
                                    <label htmlFor="name" className='block my-2'>Your Name</label>
                                    <input type="text" name="username" id="name"
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder='Ritesh Kumar Rai' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>Username is required.</span>
                                </div>

                                <div className="form-control my-4">
                                    <label htmlFor="email" className='block my-2'>Your Email</label>
                                    <input type="email" name="" id="email"
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder='name@company.com' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>Email is required.</span>
                                </div>

                                <div className="form-control my-4">
                                    <label htmlFor="pass" className='block my-2'>Password</label>
                                    <input type="password" name="" id="pass"
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder='••••••••' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>Password must be number,special character,word and 8 digit long.</span>
                                </div>
                                <div className="form-control my-4">
                                    <label htmlFor="cpass" className='block my-2'>Confirm Password</label>
                                    <input type="password" name="" id="cpass"
                                        className="block w-full rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder='••••••••' />
                                    <span style={{ color: 'crimson', fontSize: 'small' }}>Password is not same.</span>
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