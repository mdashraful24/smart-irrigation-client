import { Droplets } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'bn';

    // Handle scroll effect
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(window.scrollY > 20);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const navItems = [
        { path: "/", label: t('nav.home') },
        { path: "/about", label: t('nav.about') },
        { path: "/highlight", label: t('nav.highlight') },
        { path: "/auth/login", label: t('nav.login') }
    ];

    const NavItem = ({ item }) => (
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
                                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 
                                    rounded-xl flex items-center justify-center shadow-md 
                                    group-hover:shadow-lg transition-shadow duration-300">
                                    <Droplets className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-2xl lg:text-3xl font-bold text-green-600 tracking-tight">
                                    {t('brand')}
                                </span>
                            </NavLink>
                        </div>

                        {/* RIGHT SIDE: Desktop Navigation + Language Toggle */}
                        <div className="hidden md:flex items-center space-x-1">
                            {/* Navigation Links */}
                            <div className="flex items-center">
                                {navItems.map((item, index) => (
                                    <div key={item.path} className="group relative">
                                        <NavItem item={item} />
                                    </div>
                                ))}
                            </div>

                            {/* Language Toggle */}
                            <div className="ml-2">
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
                        </div>

                        {/* RIGHT SIDE: Mobile Menu Button */}
                        <div className="flex md:hidden items-center space-x-2">
                            {/* Mobile Language Toggle */}
                            <button
                                onClick={() => {
                                    const newLang = lang === 'bn' ? 'en' : 'bn';
                                    i18n.changeLanguage(newLang);
                                    localStorage.setItem('lang', newLang);
                                }}
                                className="px-2 py-1 border border-gray-400 rounded-md text-sm font-semibold"
                                aria-label="Toggle language mobile"
                            >
                                {lang === 'bn' ? 'EN' : 'বাংলা'}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white animate-fadeIn mt-3">
                        <div className="container mx-auto px-4 py-3">
                            <div className="grid gap-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `
                                            py-3 px-4 rounded-lg transition-all duration-200
                                            ${isActive
                                                ? 'bg-green-50 text-green-600 font-bold border-r-4 border-green-600'
                                                : 'font-semibold hover:bg-gray-50 hover:text-green-600 hover:pl-6'
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
