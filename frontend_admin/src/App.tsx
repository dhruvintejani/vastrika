// // // src/App.tsx
// // import { useEffect } from 'react';
// // import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { useAuthStore, toastStyle } from './store/authstore';
// // import AdminLayout from './components/layout/AdminLayout';
// // import Login from './pages/auth/Login';
// // import Dashboard from './pages/dashboard/Dashboard';
// // import Products from './pages/products/Products';
// // import Categories from './pages/categories/Categories';
// // import Orders from './pages/orders/Orders';
// // import Customers from './pages/customers/Customers';
// // import Inventory from './pages/inventory/Inventory';
// // import Coupons from './pages/coupons/Coupons';
// // import Banners from './pages/banners/Banners';
// // import Reviews from './pages/reviews/Reviews';
// // import Settings from './pages/settings/Settings';

// // function RequireAuth({ children }: { children: React.ReactNode }) {
// //   const { isAuthenticated } = useAuthStore();
// //   const location = useLocation();
// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" state={{ from: location }} replace />;
// //   }
// //   return <>{children}</>;
// // }

// // function RedirectIfAuthed({ children }: { children: React.ReactNode }) {
// //   const { isAuthenticated } = useAuthStore();
// //   if (isAuthenticated) return <Navigate to="/dashboard" replace />;
// //   return <>{children}</>;
// // }

// // // Listens for the admin:unauthorized event dispatched by the axios interceptor
// // // and performs a clean React-router redirect instead of window.location.href
// // function UnauthorizedHandler() {
// //   const { logout } = useAuthStore();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const handler = async () => {
// //       await logout();
// //       navigate('/login', { replace: true });
// //     };
// //     window.addEventListener('admin:unauthorized', handler);
// //     return () => window.removeEventListener('admin:unauthorized', handler);
// //   }, [logout, navigate]);

// //   return null;
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <UnauthorizedHandler />
// //       <Routes>
// //         {/* Public */}
// //         <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />

// //         {/* Protected admin routes */}
// //         <Route
// //           path="/"
// //           element={<RequireAuth><AdminLayout /></RequireAuth>}
// //         >
// //           <Route index element={<Navigate to="/dashboard" replace />} />
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="products" element={<Products />} />
// //           <Route path="categories" element={<Categories />} />
// //           <Route path="orders" element={<Orders />} />
// //           <Route path="customers" element={<Customers />} />
// //           <Route path="inventory" element={<Inventory />} />
// //           <Route path="coupons" element={<Coupons />} />
// //           <Route path="banners" element={<Banners />} />
// //           <Route path="reviews" element={<Reviews />} />
// //           <Route path="settings" element={<Settings />} />
// //         </Route>

// //         {/* Catch-all → dashboard (auth guard handles redirect to login if needed) */}
// //         <Route path="*" element={<Navigate to="/dashboard" replace />} />
// //       </Routes>

// //       <Toaster
// //         position="top-right"
// //         toastOptions={{
// //           duration: 3000,
// //           style: toastStyle,
// //         }}
// //       />
// //     </BrowserRouter>
// //   );
// // }


// // src/App.tsx
// import { useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { useAuthStore, toastStyle } from './store/authstore';
// import AdminLayout from './components/layout/AdminLayout';
// import Login from './pages/auth/Login';
// import Dashboard from './pages/dashboard/Dashboard';
// import Products from './pages/products/Products';
// import Categories from './pages/categories/Categories';
// import Orders from './pages/orders/Orders';
// import Customers from './pages/customers/Customers';
// import Inventory from './pages/inventory/Inventory';
// import Coupons from './pages/coupons/Coupons';
// import Banners from './pages/banners/Banners';
// import Reviews from './pages/reviews/Reviews';
// import Settings from './pages/settings/Settings';
// import LogoutConfirmDialog from './components/ui/LogoutConfirmDialog';

// function RequireAuth({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuthStore();
//   const location = useLocation();
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return <>{children}</>;
// }

// function RedirectIfAuthed({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuthStore();
//   if (isAuthenticated) return <Navigate to="/dashboard" replace />;
//   return <>{children}</>;
// }

// // Listens for the admin:unauthorized event dispatched by the axios interceptor
// // and performs a clean React-router redirect instead of window.location.href
// function UnauthorizedHandler() {
//   const { logout } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handler = async () => {
//       await logout();
//       navigate('/login', { replace: true });
//     };
//     window.addEventListener('admin:unauthorized', handler);
//     return () => window.removeEventListener('admin:unauthorized', handler);
//   }, [logout, navigate]);

//   return null;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <UnauthorizedHandler />
//       <Routes>
//         {/* Public */}
//         <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />

//         {/* Protected admin routes */}
//         <Route
//           path="/"
//           element={<RequireAuth><AdminLayout /></RequireAuth>}
//         >
//           <Route index element={<Navigate to="/dashboard" replace />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="products" element={<Products />} />
//           <Route path="categories" element={<Categories />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="customers" element={<Customers />} />
//           <Route path="inventory" element={<Inventory />} />
//           <Route path="coupons" element={<Coupons />} />
//           <Route path="banners" element={<Banners />} />
//           <Route path="reviews" element={<Reviews />} />
//           <Route path="settings" element={<Settings />} />
//           <LogoutConfirmDialog />
//         </Route>

//         {/* Catch-all → dashboard (auth guard handles redirect to login if needed) */}
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>

//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: toastStyle,
//         }}
//       />
//     </BrowserRouter>
//   );
// }


// src/App.tsx (admin panel)
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore, toastStyle } from './store/authstore';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/products/Products';
import Categories from './pages/categories/Categories';
import Orders from './pages/orders/Orders';
import Customers from './pages/customers/Customers';
import Inventory from './pages/inventory/Inventory';
import Coupons from './pages/coupons/Coupons';
import Banners from './pages/banners/Banners';
import Reviews from './pages/reviews/Reviews';
import Settings from './pages/settings/Settings';
import LogoutConfirmDialog from './components/ui/LogoutConfirmDialog';
// LogoutConfirmDialog imported but placed OUTSIDE <Routes> below

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function RedirectIfAuthed({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function UnauthorizedHandler() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = async () => {
      await logout();
      navigate('/login', { replace: true });
    };
    window.addEventListener('admin:unauthorized', handler);
    return () => window.removeEventListener('admin:unauthorized', handler);
  }, [logout, navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <UnauthorizedHandler />
      <Routes>
        <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
        <Route
          path="/"
          element={<RequireAuth><AdminLayout /></RequireAuth>}
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="banners" element={<Banners />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/*
        LogoutConfirmDialog is placed here — OUTSIDE <Routes> but INSIDE
        <BrowserRouter>. This is the correct pattern. Placing it inside
        <Routes> as a child of <Route> causes the React Router error:
        "[LogoutConfirmDialog] is not a <Route> component".
        It reads its open state from useAuthStore.showLogoutConfirm so any
        component triggers it via setShowLogoutConfirm(true).
      */}
      <LogoutConfirmDialog />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: toastStyle,
        }}
      />
    </BrowserRouter>
  );
}