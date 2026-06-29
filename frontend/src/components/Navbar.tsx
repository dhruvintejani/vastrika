// // // import { useState, useEffect } from 'react';
// // // import { Link, NavLink, useLocation } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
// // // import { useStore } from '../store/useStore';

// // // const navLinks = [
// // //   { path: '/', label: 'Home' },
// // //   { path: '/shop', label: 'Shop' },
// // //   { path: '/collections', label: 'Collections' },
// // //   { path: '/new-arrivals', label: 'New Arrivals' },
// // //   { path: '/about', label: 'About' },
// // //   { path: '/contact', label: 'Contact' },
// // // ];

// // // export default function Navbar() {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const { wishlist, cartCount } = useStore();
// // //   const location = useLocation();
// // //   const count = cartCount();

// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     setIsOpen(false);
// // //   }, [location]);

// // //   return (
// // //     <motion.nav
// // //       initial={{ y: -80 }}
// // //       animate={{ y: 0 }}
// // //       transition={{ duration: 0.6, ease: 'easeOut' }}
// // //       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// // //         scrolled
// // //           ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-sm border-b border-[#E8DCCB]'
// // //           : 'bg-[#F8F5F0]/80 backdrop-blur-sm'
// // //       }`}
// // //     >
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="flex items-center justify-between h-18 py-4">
// // //           {/* Logo */}
// // //           <Link to="/" className="flex items-center gap-2 cursor-pointer group">
// // //             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
// // //               <span className="text-white text-xs font-bold font-heading">V</span>
// // //             </div>
// // //             <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide group-hover:text-[#7A4E48] transition-colors">
// // //               Vastrika
// // //             </span>
// // //           </Link>

// // //           {/* Desktop Nav Links */}
// // //           <div className="hidden lg:flex items-center gap-8">
// // //             {navLinks.map((link) => (
// // //               <NavLink
// // //                 key={link.path}
// // //                 to={link.path}
// // //                 className={({ isActive }) =>
// // //                   `relative text-sm font-body font-medium transition-colors cursor-pointer group ${
// // //                     isActive ? 'text-[#7A4E48]' : 'text-[#1F1F1F] hover:text-[#7A4E48]'
// // //                   }`
// // //                 }
// // //               >
// // //                 {({ isActive }) => (
// // //                   <>
// // //                     {link.label}
// // //                     <span
// // //                       className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A86A] transition-all duration-300 ${
// // //                         isActive ? 'w-full' : 'w-0 group-hover:w-full'
// // //                       }`}
// // //                     />
// // //                   </>
// // //                 )}
// // //               </NavLink>
// // //             ))}
// // //           </div>

// // //           {/* Icons */}
// // //           <div className="flex items-center gap-4">
// // //             <Link
// // //               to="/wishlist"
// // //               className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
// // //             >
// // //               <FiHeart
// // //                 className={`w-5 h-5 transition-colors ${
// // //                   wishlist.length > 0 ? 'text-[#C58C85] fill-[#C58C85]' : 'text-[#1F1F1F] group-hover:text-[#C58C85]'
// // //                 }`}
// // //               />
// // //               {wishlist.length > 0 && (
// // //                 <motion.span
// // //                   initial={{ scale: 0 }}
// // //                   animate={{ scale: 1 }}
// // //                   className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C58C85] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
// // //                 >
// // //                   {wishlist.length}
// // //                 </motion.span>
// // //               )}
// // //             </Link>

// // //             <Link
// // //               to="/cart"
// // //               className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
// // //             >
// // //               <FiShoppingBag className="w-5 h-5 text-[#1F1F1F] group-hover:text-[#7A4E48] transition-colors" />
// // //               {count > 0 && (
// // //                 <motion.span
// // //                   initial={{ scale: 0 }}
// // //                   animate={{ scale: 1 }}
// // //                   className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7A4E48] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
// // //                 >
// // //                   {count}
// // //                 </motion.span>
// // //               )}
// // //             </Link>

// // //             {/* Mobile hamburger */}
// // //             <button
// // //               onClick={() => setIsOpen(!isOpen)}
// // //               className="lg:hidden p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// // //             >
// // //               {isOpen ? (
// // //                 <FiX className="w-5 h-5 text-[#1F1F1F]" />
// // //               ) : (
// // //                 <FiMenu className="w-5 h-5 text-[#1F1F1F]" />
// // //               )}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Mobile Menu */}
// // //       <AnimatePresence>
// // //         {isOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0, height: 0 }}
// // //             animate={{ opacity: 1, height: 'auto' }}
// // //             exit={{ opacity: 0, height: 0 }}
// // //             transition={{ duration: 0.3 }}
// // //             className="lg:hidden bg-[#F8F5F0] border-t border-[#E8DCCB] overflow-hidden"
// // //           >
// // //             <div className="px-4 py-4 flex flex-col gap-1">
// // //               {navLinks.map((link, i) => (
// // //                 <motion.div
// // //                   key={link.path}
// // //                   initial={{ opacity: 0, x: -20 }}
// // //                   animate={{ opacity: 1, x: 0 }}
// // //                   transition={{ delay: i * 0.05 }}
// // //                 >
// // //                   <NavLink
// // //                     to={link.path}
// // //                     className={({ isActive }) =>
// // //                       `block py-3 px-4 rounded-lg text-sm font-body font-medium transition-colors cursor-pointer ${
// // //                         isActive
// // //                           ? 'bg-[#EFE7DC] text-[#7A4E48]'
// // //                           : 'text-[#1F1F1F] hover:bg-[#EFE7DC] hover:text-[#7A4E48]'
// // //                       }`
// // //                     }
// // //                   >
// // //                     {link.label}
// // //                   </NavLink>
// // //                 </motion.div>
// // //               ))}
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </motion.nav>
// // //   );
// // // }

// // import { useState, useEffect, useRef } from 'react';
// // import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FiHeart, FiShoppingBag, FiMenu, FiX, FiUser, FiLogOut, FiPackage } from 'react-icons/fi';
// // import { useStore } from '../store/useStore';
// // import { useAuthStore } from '../store/useAuthStore';

// // const navLinks = [
// //   { path: '/', label: 'Home' },
// //   { path: '/shop', label: 'Shop' },
// //   { path: '/collections', label: 'Collections' },
// //   { path: '/new-arrivals', label: 'New Arrivals' },
// //   { path: '/about', label: 'About' },
// //   { path: '/contact', label: 'Contact' },
// // ];

// // export default function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);
// //   const [userMenuOpen, setUserMenuOpen] = useState(false);
// //   const userMenuRef = useRef<HTMLDivElement>(null);

// //   const { wishlist, cartCount } = useStore();
// //   const { isAuthenticated, user, logout } = useAuthStore();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const count = cartCount();

// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 20);
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     setIsOpen(false);
// //     setUserMenuOpen(false);
// //   }, [location]);

// //   // Close user menu on outside click
// //   useEffect(() => {
// //     const handler = (e: MouseEvent) => {
// //       if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
// //         setUserMenuOpen(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handler);
// //     return () => document.removeEventListener('mousedown', handler);
// //   }, []);

// //   const handleLogout = async () => {
// //     setUserMenuOpen(false);
// //     await logout();
// //     navigate('/');
// //   };

// //   return (
// //     <motion.nav
// //       initial={{ y: -80 }}
// //       animate={{ y: 0 }}
// //       transition={{ duration: 0.6, ease: 'easeOut' }}
// //       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// //         scrolled
// //           ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-sm border-b border-[#E8DCCB]'
// //           : 'bg-[#F8F5F0]/80 backdrop-blur-sm'
// //       }`}
// //     >
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-18 py-4">
// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-2 cursor-pointer group">
// //             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
// //               <span className="text-white text-xs font-bold font-heading">V</span>
// //             </div>
// //             <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide group-hover:text-[#7A4E48] transition-colors">
// //               Vastrika
// //             </span>
// //           </Link>

// //           {/* Desktop Nav Links */}
// //           <div className="hidden lg:flex items-center gap-8">
// //             {navLinks.map((link) => (
// //               <NavLink
// //                 key={link.path}
// //                 to={link.path}
// //                 end={link.path === '/'}
// //                 className={({ isActive }) =>
// //                   `relative text-sm font-body font-medium transition-colors cursor-pointer group ${
// //                     isActive ? 'text-[#7A4E48]' : 'text-[#1F1F1F] hover:text-[#7A4E48]'
// //                   }`
// //                 }
// //               >
// //                 {({ isActive }) => (
// //                   <>
// //                     {link.label}
// //                     <span
// //                       className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A86A] transition-all duration-300 ${
// //                         isActive ? 'w-full' : 'w-0 group-hover:w-full'
// //                       }`}
// //                     />
// //                   </>
// //                 )}
// //               </NavLink>
// //             ))}
// //           </div>

// //           {/* Icons */}
// //           <div className="flex items-center gap-3">
// //             {/* Wishlist */}
// //             <Link
// //               to={isAuthenticated ? '/wishlist' : '/login'}
// //               state={!isAuthenticated ? { from: '/wishlist' } : undefined}
// //               className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
// //             >
// //               <FiHeart
// //                 className={`w-5 h-5 transition-colors ${
// //                   wishlist.length > 0 ? 'text-[#C58C85] fill-[#C58C85]' : 'text-[#1F1F1F] group-hover:text-[#C58C85]'
// //                 }`}
// //               />
// //               {wishlist.length > 0 && (
// //                 <motion.span
// //                   initial={{ scale: 0 }}
// //                   animate={{ scale: 1 }}
// //                   className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C58C85] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
// //                 >
// //                   {wishlist.length}
// //                 </motion.span>
// //               )}
// //             </Link>

// //             {/* Cart */}
// //             <Link
// //               to={isAuthenticated ? '/cart' : '/login'}
// //               state={!isAuthenticated ? { from: '/cart' } : undefined}
// //               className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
// //             >
// //               <FiShoppingBag className="w-5 h-5 text-[#1F1F1F] group-hover:text-[#7A4E48] transition-colors" />
// //               {count > 0 && (
// //                 <motion.span
// //                   initial={{ scale: 0 }}
// //                   animate={{ scale: 1 }}
// //                   className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7A4E48] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
// //                 >
// //                   {count}
// //                 </motion.span>
// //               )}
// //             </Link>

// //             {/* User menu */}
// //             {isAuthenticated ? (
// //               <div ref={userMenuRef} className="relative">
// //                 <button
// //                   onClick={() => setUserMenuOpen(!userMenuOpen)}
// //                   className="flex items-center gap-1.5 p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// //                 >
// //                   <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
// //                     <span className="text-white text-xs font-bold font-heading">
// //                       {user?.full_name?.[0]?.toUpperCase() || 'U'}
// //                     </span>
// //                   </div>
// //                 </button>
// //                 <AnimatePresence>
// //                   {userMenuOpen && (
// //                     <motion.div
// //                       initial={{ opacity: 0, scale: 0.95, y: 8 }}
// //                       animate={{ opacity: 1, scale: 1, y: 0 }}
// //                       exit={{ opacity: 0, scale: 0.95, y: 8 }}
// //                       transition={{ duration: 0.15 }}
// //                       className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-[#E8DCCB] shadow-xl overflow-hidden z-50"
// //                     >
// //                       <div className="px-4 py-3 border-b border-[#F0EBE3]">
// //                         <p className="font-body text-sm font-semibold text-[#1F1F1F] truncate">{user?.full_name}</p>
// //                         <p className="font-body text-xs text-[#999] truncate">{user?.email}</p>
// //                       </div>
// //                       <div className="py-1.5">
// //                         <Link
// //                           to="/orders"
// //                           className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#555] hover:bg-[#F8F5F0] hover:text-[#7A4E48] transition-colors cursor-pointer"
// //                         >
// //                           <FiPackage className="w-4 h-4" />
// //                           My Orders
// //                         </Link>
// //                         <Link
// //                           to="/wishlist"
// //                           className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#555] hover:bg-[#F8F5F0] hover:text-[#7A4E48] transition-colors cursor-pointer"
// //                         >
// //                           <FiHeart className="w-4 h-4" />
// //                           Wishlist
// //                         </Link>
// //                         <button
// //                           onClick={handleLogout}
// //                           className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#C58C85] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
// //                         >
// //                           <FiLogOut className="w-4 h-4" />
// //                           Sign Out
// //                         </button>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </div>
// //             ) : (
// //               <Link
// //                 to="/login"
// //                 className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#7A4E48] text-white font-body text-sm font-semibold rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //               >
// //                 <FiUser className="w-3.5 h-3.5" />
// //                 Sign In
// //               </Link>
// //             )}

// //             {/* Mobile hamburger */}
// //             <button
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="lg:hidden p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// //             >
// //               {isOpen ? (
// //                 <FiX className="w-5 h-5 text-[#1F1F1F]" />
// //               ) : (
// //                 <FiMenu className="w-5 h-5 text-[#1F1F1F]" />
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, height: 0 }}
// //             animate={{ opacity: 1, height: 'auto' }}
// //             exit={{ opacity: 0, height: 0 }}
// //             transition={{ duration: 0.3 }}
// //             className="lg:hidden bg-[#F8F5F0] border-t border-[#E8DCCB] overflow-hidden"
// //           >
// //             <div className="px-4 py-4 flex flex-col gap-1">
// //               {navLinks.map((link, i) => (
// //                 <motion.div
// //                   key={link.path}
// //                   initial={{ opacity: 0, x: -20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: i * 0.05 }}
// //                 >
// //                   <NavLink
// //                     to={link.path}
// //                     end={link.path === '/'}
// //                     className={({ isActive }) =>
// //                       `block py-3 px-4 rounded-lg text-sm font-body font-medium transition-colors cursor-pointer ${
// //                         isActive
// //                           ? 'bg-[#EFE7DC] text-[#7A4E48]'
// //                           : 'text-[#1F1F1F] hover:bg-[#EFE7DC] hover:text-[#7A4E48]'
// //                       }`
// //                     }
// //                   >
// //                     {link.label}
// //                   </NavLink>
// //                 </motion.div>
// //               ))}
// //               {/* Mobile auth */}
// //               <div className="border-t border-[#E8DCCB] mt-2 pt-2">
// //                 {isAuthenticated ? (
// //                   <>
// //                     <Link to="/orders" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#1F1F1F] hover:bg-[#EFE7DC] hover:text-[#7A4E48] transition-colors">
// //                       My Orders
// //                     </Link>
// //                     <button onClick={handleLogout} className="w-full text-left py-3 px-4 rounded-lg text-sm font-body font-medium text-[#C58C85] hover:bg-[#FFF0F0] transition-colors cursor-pointer">
// //                       Sign Out
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Link to="/login" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#7A4E48] hover:bg-[#EFE7DC] transition-colors">Sign In</Link>
// //                     <Link to="/register" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#555] hover:bg-[#EFE7DC] transition-colors">Create Account</Link>
// //                   </>
// //                 )}
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </motion.nav>
// //   );
// // }

// import { useState, useEffect, useRef } from 'react';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiHeart, FiShoppingBag, FiMenu, FiX, FiUser, FiLogOut, FiPackage } from 'react-icons/fi';
// import { useStore } from '../store/useStore';
// import { useAuthStore } from '../store/useAuthStore';

// const navLinks = [
//   { path: '/', label: 'Home' },
//   { path: '/shop', label: 'Shop' },
//   { path: '/collections', label: 'Collections' },
//   { path: '/new-arrivals', label: 'New Arrivals' },
//   { path: '/about', label: 'About' },
//   { path: '/contact', label: 'Contact' },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const userMenuRef = useRef<HTMLDivElement>(null);

//   const { wishlist, cartCount } = useStore();
//   const { isAuthenticated, user, setShowLogoutConfirm } = useAuthStore();
//   const location = useLocation();
//   const count = cartCount();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsOpen(false);
//     setUserMenuOpen(false);
//   }, [location]);

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
//         setUserMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   // Opens ConfirmDialog instead of logging out immediately
//   const handleLogoutClick = () => {
//     setUserMenuOpen(false);
//     setIsOpen(false);
//     setShowLogoutConfirm(true);
//   };

//   return (
//     <motion.nav
//       initial={{ y: -80 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-sm border-b border-[#E8DCCB]'
//           : 'bg-[#F8F5F0]/80 backdrop-blur-sm'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-18 py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 cursor-pointer group">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
//               <span className="text-white text-xs font-bold font-heading">V</span>
//             </div>
//             <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide group-hover:text-[#7A4E48] transition-colors">
//               Vastrika
//             </span>
//           </Link>

//           {/* Desktop Nav Links */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 end={link.path === '/'}
//                 className={({ isActive }) =>
//                   `relative text-sm font-body font-medium transition-colors cursor-pointer group ${
//                     isActive ? 'text-[#7A4E48]' : 'text-[#1F1F1F] hover:text-[#7A4E48]'
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     {link.label}
//                     <span
//                       className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A86A] transition-all duration-300 ${
//                         isActive ? 'w-full' : 'w-0 group-hover:w-full'
//                       }`}
//                     />
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </div>

//           {/* Icons */}
//           <div className="flex items-center gap-3">
//             {/* Wishlist */}
//             <Link
//               to={isAuthenticated ? '/wishlist' : '/login'}
//               state={!isAuthenticated ? { from: '/wishlist' } : undefined}
//               className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
//             >
//               <FiHeart
//                 className={`w-5 h-5 transition-colors ${
//                   wishlist.length > 0 ? 'text-[#C58C85] fill-[#C58C85]' : 'text-[#1F1F1F] group-hover:text-[#C58C85]'
//                 }`}
//               />
//               {wishlist.length > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C58C85] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
//                 >
//                   {wishlist.length}
//                 </motion.span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link
//               to={isAuthenticated ? '/cart' : '/login'}
//               state={!isAuthenticated ? { from: '/cart' } : undefined}
//               className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
//             >
//               <FiShoppingBag className="w-5 h-5 text-[#1F1F1F] group-hover:text-[#7A4E48] transition-colors" />
//               {count > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7A4E48] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
//                 >
//                   {count}
//                 </motion.span>
//               )}
//             </Link>

//             {/* User menu */}
//             {isAuthenticated ? (
//               <div ref={userMenuRef} className="relative">
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-1.5 p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer"
//                 >
//                   <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
//                     <span className="text-white text-xs font-bold font-heading">
//                       {user?.full_name?.[0]?.toUpperCase() || 'U'}
//                     </span>
//                   </div>
//                 </button>
//                 <AnimatePresence>
//                   {userMenuOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95, y: 8 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.95, y: 8 }}
//                       transition={{ duration: 0.15 }}
//                       className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-[#E8DCCB] shadow-xl overflow-hidden z-50"
//                     >
//                       <div className="px-4 py-3 border-b border-[#F0EBE3]">
//                         <p className="font-body text-sm font-semibold text-[#1F1F1F] truncate">{user?.full_name}</p>
//                         <p className="font-body text-xs text-[#999] truncate">{user?.email}</p>
//                       </div>
//                       <div className="py-1.5">
//                         <Link
//                           to="/orders"
//                           className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#555] hover:bg-[#F8F5F0] hover:text-[#7A4E48] transition-colors cursor-pointer"
//                         >
//                           <FiPackage className="w-4 h-4" /> My Orders
//                         </Link>
//                         <Link
//                           to="/wishlist"
//                           className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#555] hover:bg-[#F8F5F0] hover:text-[#7A4E48] transition-colors cursor-pointer"
//                         >
//                           <FiHeart className="w-4 h-4" /> Wishlist
//                         </Link>
//                         {/* Triggers confirm dialog — does NOT logout immediately */}
//                         <button
//                           onClick={handleLogoutClick}
//                           className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#C58C85] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
//                         >
//                           <FiLogOut className="w-4 h-4" /> Sign Out
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#7A4E48] text-white font-body text-sm font-semibold rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
//               >
//                 <FiUser className="w-3.5 h-3.5" /> Sign In
//               </Link>
//             )}

//             {/* Mobile hamburger */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="lg:hidden p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer"
//             >
//               {isOpen ? <FiX className="w-5 h-5 text-[#1F1F1F]" /> : <FiMenu className="w-5 h-5 text-[#1F1F1F]" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="lg:hidden bg-[#F8F5F0] border-t border-[#E8DCCB] overflow-hidden"
//           >
//             <div className="px-4 py-4 flex flex-col gap-1">
//               {navLinks.map((link, i) => (
//                 <motion.div
//                   key={link.path}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                 >
//                   <NavLink
//                     to={link.path}
//                     end={link.path === '/'}
//                     className={({ isActive }) =>
//                       `block py-3 px-4 rounded-lg text-sm font-body font-medium transition-colors cursor-pointer ${
//                         isActive ? 'bg-[#EFE7DC] text-[#7A4E48]' : 'text-[#1F1F1F] hover:bg-[#EFE7DC] hover:text-[#7A4E48]'
//                       }`
//                     }
//                   >
//                     {link.label}
//                   </NavLink>
//                 </motion.div>
//               ))}
//               <div className="border-t border-[#E8DCCB] mt-2 pt-2">
//                 {isAuthenticated ? (
//                   <>
//                     <Link to="/orders" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#1F1F1F] hover:bg-[#EFE7DC] hover:text-[#7A4E48] transition-colors">
//                       My Orders
//                     </Link>
//                     <button
//                       onClick={handleLogoutClick}
//                       className="w-full text-left py-3 px-4 rounded-lg text-sm font-body font-medium text-[#C58C85] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
//                     >
//                       Sign Out
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/login" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#7A4E48] hover:bg-[#EFE7DC] transition-colors">Sign In</Link>
//                     <Link to="/register" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#555] hover:bg-[#EFE7DC] transition-colors">Create Account</Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiMenu, FiX, FiUser, FiLogOut, FiPackage } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/collections', label: 'Collections' },
  { path: '/new-arrivals', label: 'New Arrivals' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const wishlist = useStore((state) => state.wishlist);
  const cart = useStore((state) => state.cart);
  const { isAuthenticated, user, setShowLogoutConfirm } = useAuthStore();
  const location = useLocation();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Opens ConfirmDialog instead of logging out immediately
  const handleLogoutClick = () => {
    setUserMenuOpen(false);
    setIsOpen(false);
    setShowLogoutConfirm(true);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-sm border-b border-[#E8DCCB]'
          : 'bg-[#F8F5F0]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
              <span className="text-white text-xs font-bold font-heading">V</span>
            </div>
            <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide group-hover:text-[#7A4E48] transition-colors">
              Vastrika
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-body font-medium transition-colors cursor-pointer group ${
                    isActive ? 'text-[#7A4E48]' : 'text-[#1F1F1F] hover:text-[#7A4E48]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A86A] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              to={isAuthenticated ? '/wishlist' : '/login'}
              state={!isAuthenticated ? { from: '/wishlist' } : undefined}
              className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
            >
              <FiHeart
                className={`w-5 h-5 transition-colors ${
                  wishlist.length > 0 ? 'text-[#C58C85] fill-[#C58C85]' : 'text-[#1F1F1F] group-hover:text-[#C58C85]'
                }`}
              />
              {wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C58C85] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to={isAuthenticated ? '/cart' : '/login'}
              state={!isAuthenticated ? { from: '/cart' } : undefined}
              className="relative p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer group"
            >
              <FiShoppingBag className="w-5 h-5 text-[#1F1F1F] group-hover:text-[#7A4E48] transition-colors" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7A4E48] text-white text-[10px] rounded-full flex items-center justify-center font-body font-medium"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-heading">
                      {user?.full_name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-[#E8DCCB] shadow-xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-[#F0EBE3]">
                        <p className="font-body text-sm font-semibold text-[#1F1F1F] truncate">{user?.full_name}</p>
                        <p className="font-body text-xs text-[#999] truncate">{user?.email}</p>
                      </div>
                      <div className="py-1.5">
                        <Link
                          to="/orders"
                          className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#555] hover:bg-[#F8F5F0] hover:text-[#7A4E48] transition-colors cursor-pointer"
                        >
                          <FiPackage className="w-4 h-4" /> My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#555] hover:bg-[#F8F5F0] hover:text-[#7A4E48] transition-colors cursor-pointer"
                        >
                          <FiHeart className="w-4 h-4" /> Wishlist
                        </Link>
                        {/* Triggers confirm dialog — does NOT logout immediately */}
                        <button
                          onClick={handleLogoutClick}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#C58C85] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
                        >
                          <FiLogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#7A4E48] text-white font-body text-sm font-semibold rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
              >
                <FiUser className="w-3.5 h-3.5" /> Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[#EFE7DC] transition-colors cursor-pointer"
            >
              {isOpen ? <FiX className="w-5 h-5 text-[#1F1F1F]" /> : <FiMenu className="w-5 h-5 text-[#1F1F1F]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#F8F5F0] border-t border-[#E8DCCB] overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-lg text-sm font-body font-medium transition-colors cursor-pointer ${
                        isActive ? 'bg-[#EFE7DC] text-[#7A4E48]' : 'text-[#1F1F1F] hover:bg-[#EFE7DC] hover:text-[#7A4E48]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="border-t border-[#E8DCCB] mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/orders" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#1F1F1F] hover:bg-[#EFE7DC] hover:text-[#7A4E48] transition-colors">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left py-3 px-4 rounded-lg text-sm font-body font-medium text-[#C58C85] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#7A4E48] hover:bg-[#EFE7DC] transition-colors">Sign In</Link>
                    <Link to="/register" className="block py-3 px-4 rounded-lg text-sm font-body font-medium text-[#555] hover:bg-[#EFE7DC] transition-colors">Create Account</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
