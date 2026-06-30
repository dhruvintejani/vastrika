// // src/pages/Register.tsx
// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
// import { useAuthStore } from '../store/useAuthStore';
// import { useStore } from '../store/useStore';

// export default function Register() {
//   const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' });
//   const [showPass, setShowPass] = useState(false);
//   const [validationError, setValidationError] = useState('');
//   const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
//   const { getGuestCartForSync, loadServerCart, loadServerWishlist } = useStore();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = (location.state as any)?.from || '/';

//   useEffect(() => {
//     if (isAuthenticated) navigate(from, { replace: true });
//   }, [isAuthenticated, navigate, from]);

//   useEffect(() => () => clearError(), [clearError]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setValidationError('');
//     if (form.password !== form.confirm) {
//       setValidationError('Passwords do not match');
//       return;
//     }
//     if (form.password.length < 8) {
//       setValidationError('Password must be at least 8 characters');
//       return;
//     }
//     if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
//       setValidationError('Password needs at least one uppercase letter and one number');
//       return;
//     }
//     const guestCart = getGuestCartForSync();
//     const ok = await register(form.email, form.password, form.fullName, form.phone || undefined);
//     if (ok) {
//       await Promise.all([loadServerCart(), loadServerWishlist()]);
//       navigate(from, { replace: true });
//     }
//   };

//   const displayError = validationError || error;

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <Link
//           to="/"
//           className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
//         >
//           <FiArrowLeft className="w-4 h-4" />
//           Back to Home
//         </Link>

//         <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
//           <div className="text-center mb-8">
//             <Link to="/" className="inline-flex items-center gap-2 mb-6">
//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
//                 <span className="text-white text-xs font-bold font-heading">V</span>
//               </div>
//               <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">Vastrika</span>
//             </Link>
//             <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">Create your account</h1>
//             <p className="font-body text-sm text-[#777] mt-2">Join the Vastrika family today</p>
//           </div>

//           {displayError && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-50 border border-red-200 text-red-600 font-body text-sm px-4 py-3 rounded-xl mb-5"
//             >
//               {displayError}
//             </motion.div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Full name */}
//             <div className="flex flex-col gap-1.5">
//               <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">Full Name *</label>
//               <div className="relative">
//                 <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                 <input
//                   type="text"
//                   value={form.fullName}
//                   onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//                   placeholder="Your full name"
//                   required
//                   autoComplete="name"
//                   className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-1.5">
//               <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">Email *</label>
//               <div className="relative">
//                 <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                 <input
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   placeholder="you@example.com"
//                   required
//                   autoComplete="email"
//                   className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
//                 />
//               </div>
//             </div>

//             {/* Phone (optional) */}
//             <div className="flex flex-col gap-1.5">
//               <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">Phone (optional)</label>
//               <div className="relative">
//                 <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                 <input
//                   type="tel"
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                   placeholder="+91 98765 43210"
//                   autoComplete="tel"
//                   className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-1.5">
//               <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">Password *</label>
//               <div className="relative">
//                 <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   placeholder="Min 8 chars, 1 uppercase, 1 number"
//                   required
//                   autoComplete="new-password"
//                   className="w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
//                 >
//                   {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm password */}
//             <div className="flex flex-col gap-1.5">
//               <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">Confirm Password *</label>
//               <div className="relative">
//                 <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                 <input
//                   type="password"
//                   value={form.confirm}
//                   onChange={(e) => setForm({ ...form, confirm: e.target.value })}
//                   placeholder="••••••••"
//                   required
//                   autoComplete="new-password"
//                   className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
//                 />
//               </div>
//             </div>

//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: isLoading ? 1 : 1.01 }}
//               whileTap={{ scale: isLoading ? 1 : 0.99 }}
//               className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   Creating account...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </motion.button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="font-body text-sm text-[#777]">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 state={{ from }}
//                 className="text-[#7A4E48] font-semibold hover:text-[#C9A86A] transition-colors"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from 'react-icons/fi';
import { authApi } from '../api/auth';
import {
  getConfirmPasswordError,
  getEmailError,
  getNameError,
  getPasswordError,
  getPhoneDigits,
  getPhoneError,
} from '../utils/formValidation';

const TOAST_STYLE = {
  fontFamily: 'Outfit, sans-serif',
  background: '#F8F5F0',
  color: '#1F1F1F',
  border: '1px solid #C9A86A',
};

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initialForm: RegisterForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateFieldError = (field: string, error: string) => {
    setErrors((current) => {
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const updateField = (field: keyof RegisterForm, rawValue: string) => {
    const value = field === 'phone' ? getPhoneDigits(rawValue) : rawValue;

    setForm((current) => {
      const next = { ...current, [field]: value };

      if (submitted || errors[field]) {
        if (field === 'fullName') updateFieldError(field, getNameError(value));
        if (field === 'email') updateFieldError(field, getEmailError(value));
        if (field === 'phone') updateFieldError(field, getPhoneError(value));
        if (field === 'password') updateFieldError(field, getPasswordError(value));
        if (field === 'confirmPassword') {
          updateFieldError(field, getConfirmPasswordError(next.password, value));
        }
      }

      if (field === 'password' && next.confirmPassword && (submitted || errors.confirmPassword)) {
        updateFieldError(
          'confirmPassword',
          getConfirmPasswordError(value, next.confirmPassword)
        );
      }

      return next;
    });
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const fullNameError = getNameError(form.fullName);
    const emailError = getEmailError(form.email);
    const phoneError = getPhoneError(form.phone);
    const passwordError = getPasswordError(form.password);
    const confirmPasswordError = getConfirmPasswordError(form.password, form.confirmPassword);

    if (fullNameError) nextErrors.fullName = fullNameError;
    if (emailError) nextErrors.email = emailError;
    if (phoneError) nextErrors.phone = phoneError;
    if (passwordError) nextErrors.password = passwordError;
    if (confirmPasswordError) nextErrors.confirmPassword = confirmPasswordError;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await authApi.register({
        full_name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone,
        password: form.password,
      });

      toast.success('Account created successfully. Please sign in.', { style: TOAST_STYLE });
      navigate('/login', {
        replace: true,
        state: { email: form.email.trim().toLowerCase(), from },
      });
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Could not create account.', {
        style: TOAST_STYLE,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
                <span className="text-white text-xs font-bold font-heading">V</span>
              </div>
              <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">
                Vastrika
              </span>
            </Link>
            <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">
              Create account
            </h1>
            <p className="font-body text-sm text-[#777] mt-2">
              Join Vastrika and save your cart, wishlist, and orders.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
                    errors.fullName ? 'border-red-300' : 'border-[#E8DCCB]'
                  }`}
                />
              </div>
              {errors.fullName && <p className="font-body text-xs text-red-500">{errors.fullName}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                <input
                  type="text"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
                    errors.email ? 'border-red-300' : 'border-[#E8DCCB]'
                  }`}
                />
              </div>
              {errors.email && <p className="font-body text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="10-digit phone number"
                  autoComplete="tel"
                  className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
                    errors.phone ? 'border-red-300' : 'border-[#E8DCCB]'
                  }`}
                />
              </div>
              {errors.phone && <p className="font-body text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
                    errors.password ? 'border-red-300' : 'border-[#E8DCCB]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="font-body text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
                    errors.confirmPassword ? 'border-red-300' : 'border-[#E8DCCB]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="font-body text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-[#777]">
              Already have an account?{' '}
              <Link
                to="/login"
                state={{ from }}
                className="text-[#7A4E48] font-semibold hover:text-[#C9A86A] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
