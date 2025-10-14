import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiMenu3Fill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';

import company_logo from "../assets/producthunt_logo.svg";
import { useProductContext } from '../context/ProductContext';
import Utility from '../Utils/Utility';
import { BiMoon, BiSun } from 'react-icons/bi';

const ThemeToggleButton = () => {

    const [theme, setTheme] = React.useState(false);

    React.useEffect(() => {
        document.documentElement.setAttribute('class', theme ? 'dark' : 'light');
    }, [theme]);

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value={theme} className="sr-only peer" onChange={(e) => setTheme(prev => !prev)} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{!theme ? <BiSun size={20} /> : <BiMoon size={20} />}</span>
        </label>);
}

const Header = () => {

    const [navOpened, setNavOpened] = React.useState(false);

    const { state } = useProductContext(); // from ProductContext.jsx


    return (
        <header className='h-15 w-full sticky top-0 p-2 z-50 flex gap-2 md:gap-4 justify-between items-center'>
            <div className="logo font-extrabold text-amber-500 w-fit">
                <Link to='/'>
                    <img width="150px" className='product-hunt-icon' src={company_logo} alt="company logo" title='product hunt logo' />
                </Link>
            </div>
            <nav className={`absolute top-full bg-gray-100 h-screen ${navOpened ? 'left-0' : 'left-[-110%]'} lg:static lg:h-auto flex items-center min-w-fit w-auto gap-10 md:gap-20 lg:gap-56 lg:justify-between flex-col lg:flex-row transition-all duration-300`}>
                <div className='py-4 lg:py-0'>
                    <ul className='flex items-center gap-5 flex-col lg:flex-row'>
                        <li className='font-medium cursor-pointer '><NavLink to='/' className={({ isActive }) => (isActive ? 'text-red-600' : 'hover:text-amber-500')}>Home</NavLink></li>
                        <li className='font-medium cursor-pointer hover:text-amber-500'><NavLink to='/explore' className={({ isActive }) => (isActive ? 'text-red-600' : 'hover:text-amber-500')}>Explore</NavLink></li>
                        <li className='font-medium cursor-pointer hover:text-amber-500'><NavLink to='/about' className={({ isActive }) => (isActive ? 'text-red-600' : 'hover:text-amber-500')}>About</NavLink></li>
                        <li className='font-medium cursor-pointer hover:text-amber-500'><NavLink to='/contact' className={({ isActive }) => (isActive ? 'text-red-600' : 'hover:text-amber-500')}>Contact</NavLink></li>
                        <li className='font-medium cursor-pointer hover:text-amber-500'><NavLink to='/product' className={({ isActive }) => (isActive ? 'text-red-600' : 'hover:text-amber-500')}>Product</NavLink></li>
                    </ul>
                </div>

                <div className='flex items-center gap-5 flex-wrap p-2 lg:p-0'>
                    <Link type='button' to='/signin' className='px-4 py-1 bg-white dark:bg-gray-600 rounded-md border-2 border-transparent hover:border-gray-400'>Sign In</Link>
                    <Link type='button' to='/wishlist' className='w-fit h-fit py-1 px-2 bg-white dark:bg-gray-600 rounded-md border-2 border-transparent hover:border-gray-400'><FaRegHeart /></Link>
                    <Link type='button' to='/shoppingcart' className='w-fit py-1 pl-4 pr-1 bg-white dark:bg-gray-600 rounded-md flex items-center gap-2  border-2 border-transparent hover:border-gray-400'><FaCartShopping /> Cart <span className='min-w-5 h-5 px-1 bg-black text-xs text-orange-600 rounded-md flex items-center justify-center'>{Utility.findLengthOfCart(state.cart)}</span></Link>
                </div>
            </nav>
            <div className='flex gap-3 md:gap-5 items-center'>
                <ThemeToggleButton />
                <button type='button' className='block lg:hidden' onClick={() => setNavOpened(p => !p)} >{navOpened ? <IoClose size={20} /> : <RiMenu3Fill size={20} />}</button>
            </div>
        </header>
    )
}

export default Header