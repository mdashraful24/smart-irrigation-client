import { useState } from "react";
import { NavLink, useLocation } from "react-router";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/highlight", label: "Highlight" },
        { path: "/auth/login", label: "Login" }
    ];

    const NavItem = ({ item }) => (
        <NavLink
            to={item.path}
            className={({ isActive }) => `
                relative px-4 py-2 font-medium transition-colors duration-300
                ${isActive
                    ? 'text-orange-600'
                    : 'hover:text-orange-600'
                }
            `}
        >
            {item.label}
            <span className={`
                absolute left-1/2 bottom-0 h-0.5 bg-orange-600 
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
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo - Left */}
                        <div className="flex items-center">
                            <NavLink to="/" className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 
                                    rounded-xl flex items-center justify-center shadow-md 
                                    group-hover:shadow-lg transition-shadow duration-300">
                                    <span className="text-white font-bold text-xl">M</span>
                                </div>
                                <span className="text-2xl font-bold tracking-tight">
                                    Malta
                                </span>
                            </NavLink>
                        </div>

                        {/* Desktop Nav Items - Right */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item, index) => (
                                <div key={item.path} className="group relative">
                                    <NavItem item={item} />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
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
                                            py-3 px-4 rounded-lg text-base font-medium transition-all duration-200
                                            ${isActive
                                                ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-600'
                                                : 'hover:bg-gray-50 hover:text-orange-600 hover:pl-6'
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









// import { NavLink } from "react-router";
// import { useState, useEffect } from "react";

// const Navbar = () => {
//     const [isVisible, setIsVisible] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);
//     const [isScrolling, setIsScrolling] = useState(false);

//     const links = (
//         <>
//             <li>
//                 <NavLink
//                     to="/"
//                     className={({ isActive }) =>
//                         `block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
//                     }
//                 >
//                     Home
//                 </NavLink>
//             </li>
//             <li>
//                 <NavLink
//                     to="/about"
//                     className={({ isActive }) =>
//                         `block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
//                     }
//                 >
//                     About
//                 </NavLink>
//             </li>
//             <li>
//                 <NavLink
//                     to="/highlight"
//                     className={({ isActive }) =>
//                         `block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
//                     }
//                 >
//                     Highlight
//                 </NavLink>
//             </li>
//             <li>
//                 <NavLink
//                     to="/auth/login"
//                     className={({ isActive }) =>
//                         `hidden lg:block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
//                     }
//                 >
//                     Login
//                 </NavLink>
//             </li>
//         </>
//     );

//     useEffect(() => {
//         let scrollTimer;

//         const controlNavbar = () => {
//             const currentScrollY = window.scrollY;

//             // Clear previous timer
//             clearTimeout(scrollTimer);

//             // User is scrolling
//             setIsScrolling(true);

//             // If scrolling down and not at top, hide navbar
//             if (currentScrollY > lastScrollY && currentScrollY > 100) {
//                 setIsVisible(false);
//             }
//             // If scrolling up, show navbar
//             else if (currentScrollY < lastScrollY) {
//                 setIsVisible(true);
//             }

//             // Update last scroll position
//             setLastScrollY(currentScrollY);

//             // Set a timer to show navbar when scrolling stops
//             scrollTimer = setTimeout(() => {
//                 setIsVisible(true);
//                 setIsScrolling(false);
//             }, 150); // 150ms delay after scrolling stops
//         };

//         // Throttle the scroll event for better performance
//         let ticking = false;
//         const handleScroll = () => {
//             if (!ticking) {
//                 window.requestAnimationFrame(() => {
//                     controlNavbar();
//                     ticking = false;
//                 });
//                 ticking = true;
//             }
//         };

//         window.addEventListener('scroll', handleScroll, { passive: true });

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//             clearTimeout(scrollTimer);
//         };
//     }, [lastScrollY]);

//     return (
//         <div
//             className={`bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible
//                 ? 'translate-y-0'
//                 : '-translate-y-full'
//                 } ${isScrolling ? 'shadow-sm' : 'shadow-md'
//                 }`}
//         >
//             <div className="navbar container mx-auto px-4">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h8m-8 6h16"
//                                 />
//                             </svg>
//                         </div>
//                         <ul
//                             tabIndex={-1}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
//                         >
//                             {links}
//                         </ul>
//                     </div>
//                     <a href="/" className="text-xl font-semibold">
//                         Malta
//                     </a>
//                 </div>

//                 <div className="navbar-end hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1">{links}</ul>
//                 </div>

//                 <div className="navbar-end lg:hidden">
//                     <NavLink
//                         to="/auth/login"
//                         className={({ isActive }) =>
//                             `btn ${isActive ? "text-orange-700 font-medium" : ""}`
//                         }
//                     >
//                         Login
//                     </NavLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;