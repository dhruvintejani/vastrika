// // src/components/layout/AdminLayout.tsx
// import { useState } from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiGrid, FiPackage, FiShoppingCart, FiUsers, FiTag, FiImage,
//   FiStar, FiSettings, FiLogOut, FiMenu, FiX, FiTrendingUp,
//   FiLayers, FiAlertCircle, FiChevronRight, FiBell,
// } from 'react-icons/fi';
// import { useAuthStore } from '../../store/authstore';

// const NAV = [
//   { path: '/dashboard',   label: 'Dashboard',   icon: FiGrid },
//   { path: '/products',    label: 'Products',     icon: FiPackage },
//   { path: '/categories',  label: 'Categories',   icon: FiLayers },
//   { path: '/orders',      label: 'Orders',       icon: FiShoppingCart },
//   { path: '/customers',   label: 'Customers',    icon: FiUsers },
//   { path: '/inventory',   label: 'Inventory',    icon: FiAlertCircle },
//   { path: '/coupons',     label: 'Coupons',      icon: FiTag },
//   { path: '/banners',     label: 'Banners',      icon: FiImage },
//   { path: '/reviews',     label: 'Reviews',      icon: FiStar },
//   { path: '/settings',    label: 'Settings',     icon: FiSettings },
// ];

// export default function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { logout } = useAuthStore();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-admin-bg">
//       {/* Sidebar */}
//       <motion.aside
//         animate={{ width: sidebarOpen ? 240 : 68 }}
//         transition={{ duration: 0.25, ease: 'easeInOut' }}
//         className="flex-shrink-0 h-full bg-admin-surface border-r border-admin-border flex flex-col z-30"
//       >
//         {/* Logo */}
//         <div className="h-16 flex items-center px-4 border-b border-admin-border gap-3 flex-shrink-0">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center flex-shrink-0">
//             <span className="text-white text-xs font-bold font-heading">V</span>
//           </div>
//           <AnimatePresence>
//             {sidebarOpen && (
//               <motion.span
//                 initial={{ opacity: 0, width: 0 }}
//                 animate={{ opacity: 1, width: 'auto' }}
//                 exit={{ opacity: 0, width: 0 }}
//                 className="font-heading text-xl text-admin-text font-semibold overflow-hidden whitespace-nowrap"
//               >
//                 Vastrika
//               </motion.span>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Nav items */}
//         <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
//           {NAV.map(({ path, label, icon: Icon }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group
//                 ${isActive
//                   ? 'bg-brand-800/20 text-brand-400 border border-brand-700/30'
//                   : 'text-admin-muted hover:bg-admin-hover hover:text-admin-text border border-transparent'
//                 }`
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   <Icon className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${isActive ? 'text-brand-400' : ''}`} />
//                   <AnimatePresence>
//                     {sidebarOpen && (
//                       <motion.span
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="font-body text-sm font-medium whitespace-nowrap overflow-hidden"
//                       >
//                         {label}
//                       </motion.span>
//                     )}
//                   </AnimatePresence>
//                   {isActive && sidebarOpen && (
//                     <motion.div
//                       layoutId="nav-indicator"
//                       className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400"
//                     />
//                   )}
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="p-2 border-t border-admin-border">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-admin-muted hover:bg-red-900/20 hover:text-red-400 transition-all cursor-pointer"
//           >
//             <FiLogOut className="w-4.5 h-4.5 flex-shrink-0" />
//             {sidebarOpen && <span className="font-body text-sm font-medium">Logout</span>}
//           </button>
//         </div>
//       </motion.aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top bar */}
//         <header className="h-16 bg-admin-surface border-b border-admin-border flex items-center justify-between px-6 flex-shrink-0">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 rounded-lg hover:bg-admin-hover transition-colors cursor-pointer text-admin-muted hover:text-admin-text"
//           >
//             {sidebarOpen ? <FiX className="w-4 h-4" /> : <FiMenu className="w-4 h-4" />}
//           </button>

//           <div className="flex items-center gap-3">
//             <a
//               href={import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-body text-xs text-admin-muted hover:text-brand-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-admin-hover"
//             >
//               <FiTrendingUp className="w-3.5 h-3.5" />
//               View Store
//               <FiChevronRight className="w-3 h-3" />
//             </a>
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center">
//               <span className="text-white text-xs font-bold font-heading">A</span>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="flex-1 overflow-y-auto">
//           <motion.div
//             key={window.location.pathname}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="p-6 min-h-full"
//           >
//             <Outlet />
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// }

// src/components/layout/AdminLayout.tsx
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiPackage, FiShoppingCart, FiUsers, FiTag, FiImage,
  FiStar, FiSettings, FiLogOut, FiMenu, FiX, FiTrendingUp,
  FiLayers, FiAlertCircle, FiChevronRight,
} from 'react-icons/fi';
import { useAuthStore } from '../../store/authstore';

const NAV = [
  { path: '/dashboard',   label: 'Dashboard',   icon: FiGrid },
  { path: '/products',    label: 'Products',     icon: FiPackage },
  { path: '/categories',  label: 'Categories',   icon: FiLayers },
  { path: '/orders',      label: 'Orders',       icon: FiShoppingCart },
  { path: '/customers',   label: 'Customers',    icon: FiUsers },
  { path: '/inventory',   label: 'Inventory',    icon: FiAlertCircle },
  { path: '/coupons',     label: 'Coupons',      icon: FiTag },
  { path: '/banners',     label: 'Banners',      icon: FiImage },
  { path: '/reviews',     label: 'Reviews',      icon: FiStar },
  { path: '/settings',    label: 'Settings',     icon: FiSettings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { setShowLogoutConfirm } = useAuthStore();

  return (
    <div className="flex h-screen overflow-hidden bg-admin-bg">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-shrink-0 h-full bg-admin-surface border-r border-admin-border flex flex-col z-30"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-admin-border gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold font-heading">V</span>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-heading text-xl text-admin-text font-semibold overflow-hidden whitespace-nowrap"
              >
                Vastrika
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {NAV.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group
                ${isActive
                  ? 'bg-brand-800/20 text-brand-400 border border-brand-700/30'
                  : 'text-admin-muted hover:bg-admin-hover hover:text-admin-text border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${isActive ? 'text-brand-400' : ''}`} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-body text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && sidebarOpen && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout — opens confirm dialog instead of logging out immediately */}
        <div className="p-2 border-t border-admin-border">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-admin-muted hover:bg-red-900/20 hover:text-red-400 transition-all cursor-pointer"
          >
            <FiLogOut className="w-4.5 h-4.5 flex-shrink-0" />
            {sidebarOpen && <span className="font-body text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-admin-surface border-b border-admin-border flex items-center justify-between px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-admin-hover transition-colors cursor-pointer text-admin-muted hover:text-admin-text"
          >
            {sidebarOpen ? <FiX className="w-4 h-4" /> : <FiMenu className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3">
            <a
              href={import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-admin-muted hover:text-brand-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-admin-hover"
            >
              <FiTrendingUp className="w-3.5 h-3.5" />
              View Store
              <FiChevronRight className="w-3 h-3" />
            </a>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center">
              <span className="text-white text-xs font-bold font-heading">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 min-h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}