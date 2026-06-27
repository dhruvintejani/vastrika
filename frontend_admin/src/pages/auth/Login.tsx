// // src/pages/auth/Login.tsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuthStore } from '../../store/authstore';
// import { Spinner } from '../../components/ui';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const { login, isLoading } = useAuthStore();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const ok = await login(email, password);
//     if (ok) navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen bg-admin-bg flex items-center justify-center p-4">
//       {/* Background texture */}
//       <div className="fixed inset-0 opacity-[0.03]"
//         style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a86a 1px, transparent 0)', backgroundSize: '32px 32px' }}
//       />

//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative w-full max-w-md"
//       >
//         {/* Card */}
//         <div className="admin-card p-10 shadow-2xl shadow-black/40">
//           {/* Logo */}
//           <div className="flex items-center gap-3 mb-10">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center shadow-lg">
//               <span className="text-white text-sm font-bold font-heading">V</span>
//             </div>
//             <div>
//               <h1 className="font-heading text-2xl text-admin-text font-semibold">Vastrika</h1>
//               <p className="font-body text-xs text-admin-muted">Admin Panel</p>
//             </div>
//           </div>

//           <h2 className="font-heading text-3xl text-admin-text mb-2">Welcome back</h2>
//           <p className="font-body text-sm text-admin-muted mb-8">Sign in to manage your store</p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div className="flex flex-col gap-1.5">
//               <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="admin@vastrika.in"
//                   required
//                   className="admin-input pl-10"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-1.5">
//               <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
//                 Password
//               </label>
//               <div className="relative">
//                 <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                   className="admin-input pl-10 pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors cursor-pointer"
//                 >
//                   {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: isLoading ? 1 : 1.01 }}
//               whileTap={{ scale: isLoading ? 1 : 0.99 }}
//               className="w-full admin-btn-primary justify-center py-3 mt-2"
//             >
//               {isLoading ? (
//                 <><Spinner size="sm" /> Signing in...</>
//               ) : (
//                 'Sign In'
//               )}
//             </motion.button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-admin-border">
//             <p className="font-body text-xs text-admin-muted text-center">
//               Max 2 concurrent sessions allowed
//             </p>
//           </div>
//         </div>

//         {/* Decorative glow */}
//         <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none" />
//       </motion.div>
//     </div>
//   );
// }

// src/pages/auth/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuthStore } from '../../store/authstore';
import { Spinner } from '../../components/ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-admin-bg flex items-center justify-center p-4">
      {/* Background texture */}
      <div className="fixed inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a86a 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="admin-card p-10 shadow-2xl shadow-black/40">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold font-heading">V</span>
            </div>
            <div>
              <h1 className="font-heading text-2xl text-admin-text font-semibold">Vastrika</h1>
              <p className="font-body text-xs text-admin-muted">Admin Panel</p>
            </div>
          </div>

          <h2 className="font-heading text-3xl text-admin-text mb-2">Welcome back</h2>
          <p className="font-body text-sm text-admin-muted mb-8">Sign in to manage your store</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vastrika.in"
                  required
                  className="admin-input pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="admin-input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors cursor-pointer"
                >
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              className="w-full admin-btn-primary justify-center py-3 mt-2"
            >
              {isLoading ? (
                <><Spinner size="sm" /> Signing in...</>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-admin-border">
            <p className="font-body text-xs text-admin-muted text-center">
              Up to 4 concurrent sessions supported
            </p>
          </div>
        </div>

        {/* Decorative glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}