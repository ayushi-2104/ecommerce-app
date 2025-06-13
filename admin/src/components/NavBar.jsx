import React from 'react'
import { assets } from '../assets/assets'

const NavBar = ({ setToken }) => {
    return (
        <div className="flex items-center justify-between py-2 px-[4%] bg-white shadow-md">
            <img
                className="max-w-[80px] w-full cursor-pointer"
                src={assets.logo}
                alt="Logo"
            />
            <button onClick={() => setToken('')}
                className="bg-gray-600 text-white px-5 py-2 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-gray-700 transition"
            >
                Logout
            </button>
        </div>
    )
}

export default NavBar
