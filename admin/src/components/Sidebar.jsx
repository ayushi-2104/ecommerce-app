import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen border-r border-gray-200 bg-[#f9fbf9] p-6">

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors 
                        ${isActive ? 'bg-[#fdf2f8] border border-[#fbcfe8] font-medium' : 'hover:bg-gray-100'}
                        text-gray-700`
                    }
                >
                    <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
                    <p className="text-base">Add Items</p>
                </NavLink>

                <NavLink
                    to="/list"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors 
                        ${isActive ? 'bg-[#fdf2f8] border border-[#fbcfe8] font-medium' : 'hover:bg-gray-100'}
                        text-gray-700`
                    }
                >
                    <img className="w-5 h-5" src={assets.list_icon || assets.order_icon} alt="List Icon" />
                    <p className="text-base">List Items</p>
                </NavLink>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors 
                        ${isActive ? 'bg-[#fdf2f8] border border-[#fbcfe8] font-medium' : 'hover:bg-gray-100'}
                        text-gray-700`
                    }
                >
                    <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
                    <p className="text-base">Orders</p>
                </NavLink>


            </div>
        </div>
    )
}

export default Sidebar