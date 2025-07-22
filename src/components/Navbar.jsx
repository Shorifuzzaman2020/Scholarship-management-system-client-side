

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useUser } from '../contexts/AuthProvider';
import { auth } from '../firebase/firebase.init';

const Navbar = () => {
    const { user, setUser, isLoggedIn } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
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
        <nav className="bg-green-700 text-white p-4 flex items-center justify-between relative">
            <div className="text-xl font-bold flex gap-4">
                <div>
                    <img className='h-8 w-8' src="https://i.ibb.co/0ykxLfXd/student-graduation-cap-with-gold-tassel-ribbon-107791-16542.jpg" alt="" />
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
                <div className="lg:hidden absolute top-16 left-0 w-full bg-blue-600 text-white p-4 z-50 shadow-lg">
                    <div className="space-y-4 text-left">
                        {user && isLoggedIn ? (
                            <>
                                <Link
                                    to="/"
                                    className={`block ${isActive('/') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}
                                >
                                    Home
                                </Link>

                                <button
                                    onClick={() => handleRedirect('/scholarships')}
                                    className={`block ${isActive('/scholarships') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}
                                >
                                    All Scholarship
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className={`block ${isActive('/') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}
                                >
                                    Home
                                </Link>

                                <button
                                    onClick={() => handleRedirect('/scholarships')}
                                    className={`block ${isActive('/scholarships') ? 'text-yellow-300 font-semibold' : 'hover:underline'}`}
                                >
                                    All Scholarship
                                </button>
                                <Link
                                    to="/login"
                                    className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 text-center"
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
