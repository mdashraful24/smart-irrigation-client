import { Droplets } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const profileMenuRef = useRef(null);

    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'bn';

    // Handle click outside to close profile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("User signed out successfully");
                navigate("/");
                setIsProfileMenuOpen(false);
                setIsMobileMenuOpen(false);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (user?.displayName) {
            return user.displayName
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return user?.email?.charAt(0).toUpperCase() || 'U';
    };

    // Determine which nav items to show based on auth status
    const navItems = [
        { path: "/", label: t('nav.home') },
        { path: "/about", label: t('nav.about') },
        { path: "/highlight", label: t('nav.highlight') },
        ...(!user ? [{ path: "/auth/login", label: t('nav.login') }] : [])
    ];

    const NavItem = ({ item }) => {
        return (
            <NavLink
                to={item.path}
                className={({ isActive }) => `
                    relative px-4 py-2 transition-colors duration-300
                    ${isActive
                        ? 'text-green-600 font-bold'
                        : 'hover:text-green-600 font-semibold'
                    }
                `}
            >
                {item.label}
                <span className={`
                    absolute left-1/2 bottom-0 h-0.5 bg-green-600 
                    transition-all duration-300 ease-out
                    ${location.pathname === item.path
                        ? 'w-4/5 -translate-x-1/2 opacity-100'
                        : 'w-0 -translate-x-1/2 opacity-0 group-hover:w-4/5 group-hover:opacity-100'
                    }
                `} />
            </NavLink>
        );
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
                {/* <nav className={`
                fixed top-0 left-0 right-0 z-50 py-3 drop-shadow
                transition-all duration-300 shadow-md
                ${isScrolled
                    ? 'bg-white/80 backdrop-blur-md'
                    : 'bg-white/30 backdrop-blur-sm'
                }
            `}> */}
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* LEFT SIDE: Logo + Brand Name */}
                        <div className="flex items-center">
                            <NavLink to="/" className="flex items-center space-x-3 group">
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-linear-to-br from-green-500 to-green-600 
                                    rounded-xl flex items-center justify-center shadow-md 
                                    group-hover:shadow-lg transition-shadow duration-300">
                                    <Droplets className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                </div>
                                <span className="text-2xl lg:text-3xl font-bold text-green-600 tracking-tight">
                                    {t('brand')}
                                </span>
                            </NavLink>
                        </div>

                        {/* DESKTOP VIEW */}
                        <div className="hidden md:flex items-center">
                            {/* Navigation Links */}
                            <div className="flex items-center">
                                {navItems.map((item, index) => (
                                    <div key={item.path + index} className="group relative">
                                        <NavItem item={item} />
                                    </div>
                                ))}
                            </div>

                            {/* Language Toggle */}
                            <div className="pl-2 pr-4">
                                <button
                                    onClick={() => {
                                        const newLang = lang === 'bn' ? 'en' : 'bn';
                                        i18n.changeLanguage(newLang);
                                        localStorage.setItem('lang', newLang);
                                    }}
                                    className="px-2 py-1 border border-gray-400 rounded-md text-sm font-semibold hover:bg-linear-to-br from-green-500 to-green-600 hover:text-white"
                                    aria-label="Toggle language"
                                >
                                    {lang === 'bn' ? 'EN' : 'বাংলা'}
                                </button>
                            </div>

                            {/* User Profile - Only show when logged in */}
                            {user && (
                                <div className="flex items-center border-l border-gray-300 pl-4">
                                    {/* User Avatar with Dropdown */}
                                    <div className="relative" ref={profileMenuRef}>
                                        <button
                                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                            className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                                        >
                                            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
                                                <span className="text-white font-bold">
                                                    {getUserInitials()}
                                                </span>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Desktop Dropdown Menu */}
                                        <div className={`
                                            absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 
                                            transform transition-all duration-300 origin-top-right
                                            ${isProfileMenuOpen
                                                ? 'opacity-100 scale-100 translate-y-0'
                                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                            }
                                        `}>
                                            {/* User Info */}
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                                                        <span className="text-white text-lg font-bold">
                                                            {getUserInitials()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">
                                                            {user?.displayName || 'User'}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {user?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dropdown Menu Items */}
                                            <div className="p-2">
                                                {/* <NavLink
                                                    to="/profile"
                                                    onClick={() => setIsProfileMenuOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="text-gray-700">Your Profile</span>
                                                </NavLink>

                                                <NavLink
                                                    to="/dashboard"
                                                    onClick={() => setIsProfileMenuOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <span className="text-gray-700">Dashboard</span>
                                                </NavLink>

                                                <NavLink
                                                    to="/settings"
                                                    onClick={() => setIsProfileMenuOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-gray-700">Settings</span>
                                                </NavLink>

                                                <div className="border-t border-gray-100 my-2"></div> */}

                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-left font-semibold cursor-pointer"
                                                >
                                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span className="text-red-600">{t('nav.logout')}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MOBILE VIEW: Show User Avatar & Hamburger Menu Button */}
                        <div className="flex md:hidden items-center gap-x-2">
                            {user && (
                                <div className="w-9 h-9 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-white font-bold">
                                        {getUserInitials()}
                                    </span>
                                </div>
                            )}

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 pr-0 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`
                    md:hidden absolute top-full left-0 right-0 bg-white shadow-lg
                    transform transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }
                `}>
                    <div className="container mx-auto px-4 py-4">
                        {/* Mobile User Profile Section - Only when logged in */}
                        {user && (
                            <div className="mb-3 border-b border-gray-100 pb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                                        <span className="text-white text-lg font-bold">
                                            {getUserInitials()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {user?.displayName || 'User'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Mobile Profile Actions */}
                                {/* <div className="grid grid-cols-2 gap-2 mt-3">
                                    <NavLink
                                        to="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-sm text-green-600">Profile</span>
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span className="text-sm text-green-600">Dashboard</span>
                                    </NavLink>
                                </div> */}
                            </div>
                        )}

                        {/* Mobile Navigation Links */}
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `
                                        block py-3 px-4 rounded-lg transition-all duration-200
                                        ${isActive
                                            ? 'bg-green-50 text-green-600 font-bold border-l-4 border-green-600'
                                            : 'font-semibold hover:bg-gray-50 hover:text-green-600 hover:pl-6'
                                        }
                                    `}
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Mobile Language Toggle - Inside Menu */}
                            <div className="border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        const newLang = lang === 'bn' ? 'en' : 'bn';
                                        i18n.changeLanguage(newLang);
                                        localStorage.setItem('lang', newLang);
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold">{t('nav.language')}</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        {lang === 'bn' ? 'English' : 'বাংলা'}
                                    </span>
                                </button>
                            </div>

                            {/* Mobile Sign Out - Only when logged in */}
                            {user && (
                                <div className="">
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-left"
                                    >
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="text-red-600 font-medium">{t('nav.logout')}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
