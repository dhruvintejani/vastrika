// src/pages/Login.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';
import { useStore } from '../store/useStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { getGuestCartForSync, loadServerCart, loadServerWishlist } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after login (default: home)
  const from = (location.state as any)?.from || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const guestCart = getGuestCartForSync();
    const ok = await login(email, password, guestCart);
    if (ok) {
      await Promise.all([loadServerCart(), loadServerWishlist()]);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
                <span className="text-white text-xs font-bold font-heading">V</span>
              </div>
              <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">
                Vastrika
              </span>
            </Link>
            <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">Welcome back</h1>
            <p className="font-body text-sm text-[#777] mt-2">Sign in to your account to continue</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 font-body text-sm px-4 py-3 rounded-xl mb-5"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
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
              className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-[#777]">
              Don't have an account?{' '}
              <Link
                to="/register"
                state={{ from }}
                className="text-[#7A4E48] font-semibold hover:text-[#C9A86A] transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="font-body text-xs text-[#BBB] text-center mt-6">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-[#C9A86A] hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy-policy" className="text-[#C9A86A] hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}