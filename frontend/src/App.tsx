// // import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// // import { useEffect } from 'react';
// // import { Toaster } from 'react-hot-toast';
// // import { AnimatePresence, motion } from 'framer-motion';

// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';

// // import Home from './pages/Home';
// // import Shop from './pages/Shop';
// // import ProductDetail from './pages/ProductDetail';
// // import Cart from './pages/Cart';
// // import Wishlist from './pages/Wishlist';
// // import Collections from './pages/Collections';
// // import NewArrivals from './pages/NewArrivals';
// // import About from './pages/About';
// // import Contact from './pages/Contact';
// // import FAQ from './pages/FAQ';
// // import PrivacyPolicy from './pages/PrivacyPolicy';
// // import Terms from './pages/Terms';

// // const pageVariants = {
// //   initial: { opacity: 0, y: 12 },
// //   animate: { opacity: 1, y: 0 },
// //   exit: { opacity: 0, y: -8 },
// // };

// // const pageTransition = {
// //   duration: 0.35,
// // };

// // function ScrollToTop() {
// //   const { pathname } = useLocation();
// //   useEffect(() => {
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   }, [pathname]);
// //   return null;
// // }

// // function AnimatedRoutes() {
// //   const location = useLocation();

// //   return (
// //     <AnimatePresence mode="wait">
// //       <motion.div
// //         key={location.pathname}
// //         variants={pageVariants}
// //         initial="initial"
// //         animate="animate"
// //         exit="exit"
// //         transition={pageTransition}
// //       >
// //         <Routes location={location}>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/shop" element={<Shop />} />
// //           <Route path="/product/:id" element={<ProductDetail />} />
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/wishlist" element={<Wishlist />} />
// //           <Route path="/collections" element={<Collections />} />
// //           <Route path="/new-arrivals" element={<NewArrivals />} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/contact" element={<Contact />} />
// //           <Route path="/faq" element={<FAQ />} />
// //           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
// //           <Route path="/terms" element={<Terms />} />
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </motion.div>
// //     </AnimatePresence>
// //   );
// // }

// // function NotFound() {
// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center">
// //       <div className="text-center px-4">
// //         <div className="text-8xl mb-6">🪷</div>
// //         <h1 className="font-heading text-6xl font-semibold text-[#7A4E48] mb-4">404</h1>
// //         <p className="font-heading text-2xl text-[#1F1F1F] mb-3">Page Not Found</p>
// //         <p className="font-body text-base text-[#999] mb-8 max-w-sm mx-auto">
// //           The page you're looking for doesn't exist or has been moved.
// //         </p>
// //         <a
// //           href="/"
// //           className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //         >
// //           Back to Home
// //         </a>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <ScrollToTop />
// //       <div className="flex flex-col min-h-screen bg-[#F8F5F0]">
// //         <Navbar />
// //         <main className="flex-1">
// //           <AnimatedRoutes />
// //         </main>
// //         <Footer />
// //       </div>
// //       <Toaster
// //         position="top-right"
// //         toastOptions={{
// //           duration: 3000,
// //           style: {
// //             fontFamily: 'Outfit, sans-serif',
// //             fontSize: '14px',
// //             borderRadius: '12px',
// //             padding: '12px 16px',
// //           },
// //         }}
// //       />
// //     </BrowserRouter>
// //   );
// // }


// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import { Toaster } from 'react-hot-toast';
// import { AnimatePresence, motion } from 'framer-motion';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import ProtectedRoute from './components/ProtectedRoute';

// // Existing pages — unchanged
// import Home from './pages/Home';
// import Shop from './pages/Shop';
// import ProductDetail from './pages/ProductDetail';
// import Cart from './pages/Cart';
// import Wishlist from './pages/Wishlist';
// import Collections from './pages/Collections';
// import NewArrivals from './pages/NewArrivals';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import FAQ from './pages/FAQ';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import Terms from './pages/Terms';

// // New pages
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Checkout from './pages/Checkout';
// import Orders from './pages/Orders';
// import OrderDetail from './pages/OrderDetail';

// import { useAuthStore } from './store/useAuthStore';
// import { useStore } from './store/useStore';
// import LogoutConfirmDialog from './components/LogoutConfirmDialog';

// const pageVariants = {
//   initial: { opacity: 0, y: 12 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -8 },
// };

// const pageTransition = { duration: 0.35 };

// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [pathname]);
//   return null;
// }

// function AnimatedRoutes() {
//   const location = useLocation();

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={location.pathname}
//         variants={pageVariants}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         transition={pageTransition}
//       >
//         <Routes location={location}>
//           {/* ── Public routes (unchanged) ── */}
//           <Route path="/" element={<Home />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/collections" element={<Collections />} />
//           <Route path="/new-arrivals" element={<NewArrivals />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/faq" element={<FAQ />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms" element={<Terms />} />

//           {/* ── Auth pages ── */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* ── Protected customer routes ── */}
//           <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
//           <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
//           <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
//           <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
//           <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
//           <Route path="/logoutconfirm" element={<ProtectedRoute><LogoutConfirmDialog /></ProtectedRoute>} />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// function NotFound() {
//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center">
//       <div className="text-center px-4">
//         <div className="text-8xl mb-6">🪷</div>
//         <h1 className="font-heading text-6xl font-semibold text-[#7A4E48] mb-4">404</h1>
//         <p className="font-heading text-2xl text-[#1F1F1F] mb-3">Page Not Found</p>
//         <p className="font-body text-base text-[#999] mb-8 max-w-sm mx-auto">
//           The page you're looking for doesn't exist or has been moved.
//         </p>
//         <a
//           href="/"
//           className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
//         >
//           Back to Home
//         </a>
//       </div>
//     </div>
//   );
// }

// // Bootstrap: restore auth state + load server cart/wishlist on app start
// function AppBootstrap() {
//   const { isAuthenticated, loadUser } = useAuthStore();
//   const { loadServerCart, loadServerWishlist } = useStore();

//   useEffect(() => {
//     // Re-validate token on page load. If token is expired or invalid,
//     // loadUser clears it. If valid, it refreshes the user object.
//     loadUser();
//   }, []);

//   useEffect(() => {
//     // Once authenticated (either from persist or after loadUser), pull server state
//     if (isAuthenticated) {
//       loadServerCart();
//       loadServerWishlist();
//     }
//   }, [isAuthenticated]);

//   // Listen for auth:expired event from the axios interceptor
//   useEffect(() => {
//     const handler = () => {
//       useAuthStore.getState().logout();
//     };
//     window.addEventListener('auth:expired', handler);
//     return () => window.removeEventListener('auth:expired', handler);
//   }, []);

//   return null;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppBootstrap />
//       <ScrollToTop />
//       <div className="flex flex-col min-h-screen bg-[#F8F5F0]">
//         <Navbar />
//         <main className="flex-1">
//           <AnimatedRoutes />
//         </main>
//         <Footer />
//       </div>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             fontFamily: 'Outfit, sans-serif',
//             fontSize: '14px',
//             borderRadius: '12px',
//             padding: '12px 16px',
//           },
//         }}
//       />
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutConfirmDialog from './components/LogoutConfirmDialog';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Collections from './pages/Collections';
import NewArrivals from './pages/NewArrivals';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

import { useAuthStore } from './store/useAuthStore';
import { useStore } from './store/useStore';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = { duration: 0.35 };

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected customer routes */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🪷</div>
        <h1 className="font-heading text-6xl font-semibold text-[#7A4E48] mb-4">404</h1>
        <p className="font-heading text-2xl text-[#1F1F1F] mb-3">Page Not Found</p>
        <p className="font-body text-base text-[#999] mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

function AppBootstrap() {
  const { isAuthenticated, loadUser } = useAuthStore();
  const { loadServerCart, loadServerWishlist } = useStore();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadServerCart();
      loadServerWishlist();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handler = () => {
      useAuthStore.getState().logout();
    };
    window.addEventListener('auth:expired', handler);
    return () => window.removeEventListener('auth:expired', handler);
  }, []);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppBootstrap />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F8F5F0]">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      {/*
        LogoutConfirmDialog lives OUTSIDE <Routes> so React Router never
        mistakes it for a <Route> child. It reads its open state from
        useAuthStore so any component can trigger it via setShowLogoutConfirm(true).
      */}
      <LogoutConfirmDialog />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
            padding: '12px 16px',
          },
        }}
      />
    </BrowserRouter>
  );
}