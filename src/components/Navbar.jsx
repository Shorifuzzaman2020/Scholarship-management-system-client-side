

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useUser } from '../contexts/AuthProvider';


const Navbar = () => {
    const { user, logOut, isLoggedIn } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            logOut();
            navigate('/login');
        } catch (err) {
            console.log('Error signing out: ', err.message);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActive = (path) => window.location.pathname === path;

    const handleRedirect = (path) => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    const getDashboardPath = () => {
        if (user?.role === 'admin') return '/dashboard/admin';
        if (user?.role === 'moderator') return '/dashboard/moderator';
        return '/dashboard/user';
    };

    const getDashboardLabel = () => {
        if (user?.role === 'admin') return 'Admin Dashboard';
        if (user?.role === 'moderator') return 'Moderator Dashboard';
        return 'User Dashboard';
    };

    return (
        <nav className="sticky top-0 z-50 bg-green-700 text-white p-4 flex items-center justify-between relative">
            <div className="text-xl font-bold flex gap-2">
                <div>
                    <img className='h-6 w-6' src="https://i.ibb.co.com/mCZkjH8W/Untitled-1.jpg" alt="" />
                </div>
                <div>
                    <Link to="/">GlobalScholarHub</Link>
                </div>
            </div>

            <div className="lg:hidden flex items-center">
                <button onClick={toggleMobileMenu} className="text-white">
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-4">
                <Link to="/" className={`${isActive('/') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}>Home</Link>
                <Link to="/scholarships" className={`${isActive('/scholarships') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}>
                    All Scholarship
                </Link>
                <Link to="/loan" className={`${isActive('/loan') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}>
                    Student Loan Center
                </Link>

            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
                {user && isLoggedIn ? (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleRedirect(getDashboardPath())}
                            className="bg-white text-green-700 p-2 rounded"
                        >
                            {getDashboardLabel()}
                        </button>
                        <img
                            src={user.photoURL || 'https://www.gravatar.com/avatar/'}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full"
                            title={user.displayName}
                        />
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="bg-white text-black p-2 rounded hover:bg-yellow-400">Login</Link>
                        <Link to="/register" className="bg-white text-black p-2 rounded hover:bg-yellow-400">Register</Link>
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-green-200 text-white p-4 z-50 shadow-lg">
                    <div className="space-y-4 text-left">
                        <Link
                            to="/"
                            className={`block text-black ${isActive('/') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}
                        >
                            Home
                        </Link>

                        <Link to="/scholarships" className={`block text-black ${isActive('/scholarships') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}>
                            All Scholarship
                        </Link>
                        <Link to="/loan" className={`block text-black ${isActive('/loan') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}>
                            Student Loan Center
                        </Link>
                        {user && isLoggedIn ? (
                            <div className='flex flex-col gap-3'>
                                <button
                                    onClick={() => handleRedirect(getDashboardPath())}
                                    className="bg-white text-green-700 p-2 rounded"
                                >
                                    {getDashboardLabel()}
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full text-center"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 text-center"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

        </nav >
    );
};

export default Navbar;
