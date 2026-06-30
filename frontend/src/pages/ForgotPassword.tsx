// // // // // import { useMemo, useState } from 'react';
// // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // import { motion } from 'framer-motion';
// // // // // import toast from 'react-hot-toast';
// // // // // import {
// // // // //   FiArrowLeft,
// // // // //   FiCheck,
// // // // //   FiEye,
// // // // //   FiEyeOff,
// // // // //   FiLock,
// // // // //   FiMail,
// // // // //   FiShield,
// // // // // } from 'react-icons/fi';
// // // // // import { authApi } from '../api/auth';

// // // // // const TOAST_STYLE = {
// // // // //   fontFamily: 'Outfit, sans-serif',
// // // // //   background: '#F8F5F0',
// // // // //   color: '#1F1F1F',
// // // // //   border: '1px solid #C9A86A',
// // // // // };

// // // // // function getEmailError(email: string) {
// // // // //   const value = email.trim();

// // // // //   if (!value) return 'Email address is required';
// // // // //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';

// // // // //   return '';
// // // // // }

// // // // // function getOtpError(otp: string) {
// // // // //   if (!otp.trim()) return 'OTP is required';
// // // // //   if (!/^\d{6}$/.test(otp)) return 'Enter the 6-digit OTP';

// // // // //   return '';
// // // // // }

// // // // // function getPasswordError(password: string) {
// // // // //   if (!password) return 'New password is required';
// // // // //   if (password.length < 8) return 'Password must be at least 8 characters';
// // // // //   if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
// // // // //   if (!/[0-9]/.test(password)) return 'Password needs at least one number';

// // // // //   return '';
// // // // // }

// // // // // export default function ForgotPassword() {
// // // // //   const navigate = useNavigate();

// // // // //   const [email, setEmail] = useState('');
// // // // //   const [otp, setOtp] = useState('');
// // // // //   const [password, setPassword] = useState('');
// // // // //   const [confirmPassword, setConfirmPassword] = useState('');
// // // // //   const [step, setStep] = useState<'email' | 'reset'>('email');
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const [submitted, setSubmitted] = useState(false);
// // // // //   const [errors, setErrors] = useState<Record<string, string>>({});

// // // // //   const displayEmail = useMemo(() => email.trim().toLowerCase(), [email]);

// // // // //   const updateFieldError = (field: string, error: string) => {
// // // // //     setErrors((current) => {
// // // // //       const next = { ...current };
// // // // //       if (error) next[field] = error;
// // // // //       else delete next[field];
// // // // //       return next;
// // // // //     });
// // // // //   };

// // // // //   const updateEmail = (value: string) => {
// // // // //     setEmail(value);
// // // // //     if (submitted || errors.email) updateFieldError('email', getEmailError(value));
// // // // //   };

// // // // //   const updateOtp = (value: string) => {
// // // // //     const digits = value.replace(/\D/g, '').slice(0, 6);
// // // // //     setOtp(digits);
// // // // //     if (submitted || errors.otp) updateFieldError('otp', getOtpError(digits));
// // // // //   };

// // // // //   const updatePassword = (value: string) => {
// // // // //     setPassword(value);
// // // // //     if (submitted || errors.password) updateFieldError('password', getPasswordError(value));
// // // // //     if (confirmPassword && (submitted || errors.confirmPassword)) {
// // // // //       updateFieldError(
// // // // //         'confirmPassword',
// // // // //         value === confirmPassword ? '' : 'Passwords do not match'
// // // // //       );
// // // // //     }
// // // // //   };

// // // // //   const updateConfirmPassword = (value: string) => {
// // // // //     setConfirmPassword(value);
// // // // //     if (submitted || errors.confirmPassword) {
// // // // //       updateFieldError(
// // // // //         'confirmPassword',
// // // // //         value === password ? '' : 'Passwords do not match'
// // // // //       );
// // // // //     }
// // // // //   };

// // // // //   const requestOtp = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     setSubmitted(true);

// // // // //     const emailError = getEmailError(email);
// // // // //     setErrors(emailError ? { email: emailError } : {});
// // // // //     if (emailError) return;

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await authApi.forgotPassword(displayEmail);
// // // // //       toast.success(res.data.message || 'OTP sent to your email.', { style: TOAST_STYLE });
// // // // //       setStep('reset');
// // // // //       setSubmitted(false);
// // // // //       setErrors({});
// // // // //     } catch (err: any) {
// // // // //       toast.error(err.response?.data?.error || 'Could not send OTP. Please try again.', {
// // // // //         style: TOAST_STYLE,
// // // // //       });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const resetPassword = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     setSubmitted(true);

// // // // //     const nextErrors: Record<string, string> = {};
// // // // //     const otpError = getOtpError(otp);
// // // // //     const passwordError = getPasswordError(password);

// // // // //     if (otpError) nextErrors.otp = otpError;
// // // // //     if (passwordError) nextErrors.password = passwordError;
// // // // //     if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

// // // // //     setErrors(nextErrors);
// // // // //     if (Object.keys(nextErrors).length > 0) return;

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await authApi.resetPassword(displayEmail, otp, password);
// // // // //       toast.success(res.data.message || 'Password reset successfully.', { style: TOAST_STYLE });
// // // // //       navigate('/login', { replace: true, state: { email: displayEmail } });
// // // // //     } catch (err: any) {
// // // // //       toast.error(err.response?.data?.error || 'Could not reset password.', {
// // // // //         style: TOAST_STYLE,
// // // // //       });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 24 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 0.5 }}
// // // // //         className="w-full max-w-md"
// // // // //       >
// // // // //         <Link
// // // // //           to="/login"
// // // // //           className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
// // // // //         >
// // // // //           <FiArrowLeft className="w-4 h-4" />
// // // // //           Back to Login
// // // // //         </Link>

// // // // //         <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
// // // // //           <div className="text-center mb-8">
// // // // //             <Link to="/" className="inline-flex items-center gap-2 mb-6">
// // // // //               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
// // // // //                 <span className="text-white text-xs font-bold font-heading">V</span>
// // // // //               </div>
// // // // //               <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">
// // // // //                 Vastrika
// // // // //               </span>
// // // // //             </Link>
// // // // //             <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">
// // // // //               Reset password
// // // // //             </h1>
// // // // //             <p className="font-body text-sm text-[#777] mt-2">
// // // // //               {step === 'email'
// // // // //                 ? 'Enter your email and we will send a reset OTP.'
// // // // //                 : `Enter the OTP sent to ${displayEmail}.`}
// // // // //             </p>
// // // // //           </div>

// // // // //           {step === 'email' ? (
// // // // //             <form onSubmit={requestOtp} noValidate className="space-y-5">
// // // // //               <div className="flex flex-col gap-1.5">
// // // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // // //                   Email Address
// // // // //                 </label>
// // // // //                 <div className="relative">
// // // // //                   <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     inputMode="email"
// // // // //                     value={email}
// // // // //                     onChange={(e) => updateEmail(e.target.value)}
// // // // //                     placeholder="you@example.com"
// // // // //                     autoComplete="email"
// // // // //                     className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // // //                       errors.email ? 'border-red-300' : 'border-[#E8DCCB]'
// // // // //                     }`}
// // // // //                   />
// // // // //                 </div>
// // // // //                 {errors.email && <p className="font-body text-xs text-red-500">{errors.email}</p>}
// // // // //               </div>

// // // // //               <motion.button
// // // // //                 type="submit"
// // // // //                 disabled={loading}
// // // // //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// // // // //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// // // // //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// // // // //               >
// // // // //                 {loading ? (
// // // // //                   <>
// // // // //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // // //                     Sending OTP...
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <FiShield className="w-4 h-4" />
// // // // //                     Send OTP
// // // // //                   </>
// // // // //                 )}
// // // // //               </motion.button>
// // // // //             </form>
// // // // //           ) : (
// // // // //             <form onSubmit={resetPassword} noValidate className="space-y-5">
// // // // //               <div className="flex flex-col gap-1.5">
// // // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // // //                   OTP
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   inputMode="numeric"
// // // // //                   value={otp}
// // // // //                   onChange={(e) => updateOtp(e.target.value)}
// // // // //                   placeholder="6-digit OTP"
// // // // //                   className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-center text-lg tracking-[0.35em] text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // // //                     errors.otp ? 'border-red-300' : 'border-[#E8DCCB]'
// // // // //                   }`}
// // // // //                 />
// // // // //                 {errors.otp && <p className="font-body text-xs text-red-500">{errors.otp}</p>}
// // // // //               </div>

// // // // //               <div className="flex flex-col gap-1.5">
// // // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // // //                   New Password
// // // // //                 </label>
// // // // //                 <div className="relative">
// // // // //                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// // // // //                   <input
// // // // //                     type={showPassword ? 'text' : 'password'}
// // // // //                     value={password}
// // // // //                     onChange={(e) => updatePassword(e.target.value)}
// // // // //                     placeholder="Min 8 chars, 1 uppercase, 1 number"
// // // // //                     autoComplete="new-password"
// // // // //                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // // //                       errors.password ? 'border-red-300' : 'border-[#E8DCCB]'
// // // // //                     }`}
// // // // //                   />
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // //                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
// // // // //                   >
// // // // //                     {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 {errors.password && <p className="font-body text-xs text-red-500">{errors.password}</p>}
// // // // //               </div>

// // // // //               <div className="flex flex-col gap-1.5">
// // // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // // //                   Confirm Password
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="password"
// // // // //                   value={confirmPassword}
// // // // //                   onChange={(e) => updateConfirmPassword(e.target.value)}
// // // // //                   placeholder="Confirm new password"
// // // // //                   autoComplete="new-password"
// // // // //                   className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // // //                     errors.confirmPassword ? 'border-red-300' : 'border-[#E8DCCB]'
// // // // //                   }`}
// // // // //                 />
// // // // //                 {errors.confirmPassword && (
// // // // //                   <p className="font-body text-xs text-red-500">{errors.confirmPassword}</p>
// // // // //                 )}
// // // // //               </div>

// // // // //               <motion.button
// // // // //                 type="submit"
// // // // //                 disabled={loading}
// // // // //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// // // // //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// // // // //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// // // // //               >
// // // // //                 {loading ? (
// // // // //                   <>
// // // // //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // // //                     Resetting...
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <FiCheck className="w-4 h-4" />
// // // // //                     Reset Password
// // // // //                   </>
// // // // //                 )}
// // // // //               </motion.button>

// // // // //               <button
// // // // //                 type="button"
// // // // //                 disabled={loading}
// // // // //                 onClick={() => {
// // // // //                   setStep('email');
// // // // //                   setSubmitted(false);
// // // // //                   setErrors({});
// // // // //                   setOtp('');
// // // // //                 }}
// // // // //                 className="w-full font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer disabled:opacity-60"
// // // // //               >
// // // // //                 Use another email or resend OTP
// // // // //               </button>
// // // // //             </form>
// // // // //           )}
// // // // //         </div>
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useMemo, useState } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { motion } from 'framer-motion';
// // // // import toast from 'react-hot-toast';
// // // // import {
// // // //   FiArrowLeft,
// // // //   FiCheck,
// // // //   FiEye,
// // // //   FiEyeOff,
// // // //   FiLock,
// // // //   FiMail,
// // // //   FiShield,
// // // // } from 'react-icons/fi';
// // // // import { authApi } from '../api/auth';

// // // // const TOAST_STYLE = {
// // // //   fontFamily: 'Outfit, sans-serif',
// // // //   background: '#F8F5F0',
// // // //   color: '#1F1F1F',
// // // //   border: '1px solid #C9A86A',
// // // // };

// // // // function getEmailError(email: string) {
// // // //   const value = email.trim();

// // // //   if (!value) return 'Email address is required';
// // // //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';

// // // //   return '';
// // // // }

// // // // function getOtpError(otp: string) {
// // // //   if (!otp.trim()) return 'OTP is required';
// // // //   if (!/^\d{6}$/.test(otp)) return 'Enter the 6-digit OTP';

// // // //   return '';
// // // // }

// // // // function getPasswordError(password: string) {
// // // //   if (!password) return 'New password is required';
// // // //   if (password.length < 8) return 'Password must be at least 8 characters';
// // // //   if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
// // // //   if (!/[0-9]/.test(password)) return 'Password needs at least one number';

// // // //   return '';
// // // // }

// // // // export default function ForgotPassword() {
// // // //   const navigate = useNavigate();

// // // //   const [email, setEmail] = useState('');
// // // //   const [otp, setOtp] = useState('');
// // // //   const [password, setPassword] = useState('');
// // // //   const [confirmPassword, setConfirmPassword] = useState('');
// // // //   const [step, setStep] = useState<'email' | 'reset'>('email');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [submitted, setSubmitted] = useState(false);
// // // //   const [errors, setErrors] = useState<Record<string, string>>({});

// // // //   const displayEmail = useMemo(() => email.trim().toLowerCase(), [email]);

// // // //   const updateFieldError = (field: string, error: string) => {
// // // //     setErrors((current) => {
// // // //       const next = { ...current };
// // // //       if (error) next[field] = error;
// // // //       else delete next[field];
// // // //       return next;
// // // //     });
// // // //   };

// // // //   const updateEmail = (value: string) => {
// // // //     setEmail(value);
// // // //     if (submitted || errors.email) updateFieldError('email', getEmailError(value));
// // // //   };

// // // //   const updateOtp = (value: string) => {
// // // //     const digits = value.replace(/\D/g, '').slice(0, 6);
// // // //     setOtp(digits);
// // // //     if (submitted || errors.otp) updateFieldError('otp', getOtpError(digits));
// // // //   };

// // // //   const updatePassword = (value: string) => {
// // // //     setPassword(value);
// // // //     if (submitted || errors.password) updateFieldError('password', getPasswordError(value));
// // // //     if (confirmPassword && (submitted || errors.confirmPassword)) {
// // // //       updateFieldError(
// // // //         'confirmPassword',
// // // //         value === confirmPassword ? '' : 'Passwords do not match'
// // // //       );
// // // //     }
// // // //   };

// // // //   const updateConfirmPassword = (value: string) => {
// // // //     setConfirmPassword(value);
// // // //     if (submitted || errors.confirmPassword) {
// // // //       updateFieldError(
// // // //         'confirmPassword',
// // // //         value === password ? '' : 'Passwords do not match'
// // // //       );
// // // //     }
// // // //   };

// // // //   const requestOtp = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setSubmitted(true);

// // // //     const emailError = getEmailError(email);
// // // //     setErrors(emailError ? { email: emailError } : {});
// // // //     if (emailError) return;

// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await authApi.forgotPassword(displayEmail);
// // // //       toast.success(res.data.message || 'OTP sent to your email.', { style: TOAST_STYLE });
// // // //       setStep('reset');
// // // //       setSubmitted(false);
// // // //       setErrors({});
// // // //     } catch (err: any) {
// // // //       toast.error(err.response?.data?.error || 'Could not send OTP. Please try again.', {
// // // //         style: TOAST_STYLE,
// // // //       });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const resetPassword = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setSubmitted(true);

// // // //     const nextErrors: Record<string, string> = {};
// // // //     const otpError = getOtpError(otp);
// // // //     const passwordError = getPasswordError(password);

// // // //     if (otpError) nextErrors.otp = otpError;
// // // //     if (passwordError) nextErrors.password = passwordError;
// // // //     if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

// // // //     setErrors(nextErrors);
// // // //     if (Object.keys(nextErrors).length > 0) return;

// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await authApi.resetPassword(displayEmail, otp, password);
// // // //       toast.success(res.data.message || 'Password reset successfully.', { style: TOAST_STYLE });
// // // //       navigate('/login', { replace: true, state: { email: displayEmail } });
// // // //     } catch (err: any) {
// // // //       toast.error(err.response?.data?.error || 'Could not reset password.', {
// // // //         style: TOAST_STYLE,
// // // //       });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
// // // //       <motion.div
// // // //         initial={{ opacity: 0, y: 24 }}
// // // //         animate={{ opacity: 1, y: 0 }}
// // // //         transition={{ duration: 0.5 }}
// // // //         className="w-full max-w-md"
// // // //       >
// // // //         <Link
// // // //           to="/login"
// // // //           className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
// // // //         >
// // // //           <FiArrowLeft className="w-4 h-4" />
// // // //           Back to Login
// // // //         </Link>

// // // //         <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
// // // //           <div className="text-center mb-8">
// // // //             <Link to="/" className="inline-flex items-center gap-2 mb-6">
// // // //               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
// // // //                 <span className="text-white text-xs font-bold font-heading">V</span>
// // // //               </div>
// // // //               <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">
// // // //                 Vastrika
// // // //               </span>
// // // //             </Link>
// // // //             <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">
// // // //               Reset password
// // // //             </h1>
// // // //             <p className="font-body text-sm text-[#777] mt-2">
// // // //               {step === 'email'
// // // //                 ? 'Enter your email and we will send a reset OTP.'
// // // //                 : `Enter the OTP sent to ${displayEmail}.`}
// // // //             </p>
// // // //           </div>

// // // //           {step === 'email' ? (
// // // //             <form onSubmit={requestOtp} noValidate className="space-y-5">
// // // //               <div className="flex flex-col gap-1.5">
// // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // //                   Email Address
// // // //                 </label>
// // // //                 <div className="relative">
// // // //                   <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// // // //                   <input
// // // //                     type="text"
// // // //                     inputMode="email"
// // // //                     value={email}
// // // //                     onChange={(e) => updateEmail(e.target.value)}
// // // //                     placeholder="you@example.com"
// // // //                     autoComplete="email"
// // // //                     className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // //                       errors.email ? 'border-red-300' : 'border-[#E8DCCB]'
// // // //                     }`}
// // // //                   />
// // // //                 </div>
// // // //                 {errors.email && <p className="font-body text-xs text-red-500">{errors.email}</p>}
// // // //               </div>

// // // //               <motion.button
// // // //                 type="submit"
// // // //                 disabled={loading}
// // // //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// // // //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// // // //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// // // //               >
// // // //                 {loading ? (
// // // //                   <>
// // // //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // //                     Sending OTP...
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <FiShield className="w-4 h-4" />
// // // //                     Send OTP
// // // //                   </>
// // // //                 )}
// // // //               </motion.button>
// // // //             </form>
// // // //           ) : (
// // // //             <form onSubmit={resetPassword} noValidate className="space-y-5">
// // // //               <div className="flex flex-col gap-1.5">
// // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // //                   OTP
// // // //                 </label>
// // // //                 <input
// // // //                   type="text"
// // // //                   inputMode="numeric"
// // // //                   value={otp}
// // // //                   onChange={(e) => updateOtp(e.target.value)}
// // // //                   placeholder="6-digit OTP"
// // // //                   className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-center text-lg tracking-[0.35em] text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // //                     errors.otp ? 'border-red-300' : 'border-[#E8DCCB]'
// // // //                   }`}
// // // //                 />
// // // //                 {errors.otp && <p className="font-body text-xs text-red-500">{errors.otp}</p>}
// // // //               </div>

// // // //               <div className="flex flex-col gap-1.5">
// // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // //                   New Password
// // // //                 </label>
// // // //                 <div className="relative">
// // // //                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// // // //                   <input
// // // //                     type={showPassword ? 'text' : 'password'}
// // // //                     value={password}
// // // //                     onChange={(e) => updatePassword(e.target.value)}
// // // //                     placeholder="Min 8 chars, 1 uppercase, 1 number"
// // // //                     autoComplete="new-password"
// // // //                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // //                       errors.password ? 'border-red-300' : 'border-[#E8DCCB]'
// // // //                     }`}
// // // //                   />
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => setShowPassword(!showPassword)}
// // // //                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
// // // //                   >
// // // //                     {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
// // // //                   </button>
// // // //                 </div>
// // // //                 {errors.password && <p className="font-body text-xs text-red-500">{errors.password}</p>}
// // // //               </div>

// // // //               <div className="flex flex-col gap-1.5">
// // // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // // //                   Confirm Password
// // // //                 </label>
// // // //                 <input
// // // //                   type="password"
// // // //                   value={confirmPassword}
// // // //                   onChange={(e) => updateConfirmPassword(e.target.value)}
// // // //                   placeholder="Confirm new password"
// // // //                   autoComplete="new-password"
// // // //                   className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // // //                     errors.confirmPassword ? 'border-red-300' : 'border-[#E8DCCB]'
// // // //                   }`}
// // // //                 />
// // // //                 {errors.confirmPassword && (
// // // //                   <p className="font-body text-xs text-red-500">{errors.confirmPassword}</p>
// // // //                 )}
// // // //               </div>

// // // //               <motion.button
// // // //                 type="submit"
// // // //                 disabled={loading}
// // // //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// // // //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// // // //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// // // //               >
// // // //                 {loading ? (
// // // //                   <>
// // // //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // //                     Resetting...
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <FiCheck className="w-4 h-4" />
// // // //                     Reset Password
// // // //                   </>
// // // //                 )}
// // // //               </motion.button>

// // // //               <button
// // // //                 type="button"
// // // //                 disabled={loading}
// // // //                 onClick={() => {
// // // //                   setStep('email');
// // // //                   setSubmitted(false);
// // // //                   setErrors({});
// // // //                   setOtp('');
// // // //                 }}
// // // //                 className="w-full font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer disabled:opacity-60"
// // // //               >
// // // //                 Use another email or resend OTP
// // // //               </button>
// // // //             </form>
// // // //           )}
// // // //         </div>
// // // //       </motion.div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useMemo, useState } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { motion } from 'framer-motion';
// // // import toast from 'react-hot-toast';
// // // import {
// // //   FiArrowLeft,
// // //   FiCheck,
// // //   FiEye,
// // //   FiEyeOff,
// // //   FiLock,
// // //   FiMail,
// // //   FiShield,
// // // } from 'react-icons/fi';
// // // import { authApi } from '../api/auth';

// // // const TOAST_STYLE = {
// // //   fontFamily: 'Outfit, sans-serif',
// // //   background: '#F8F5F0',
// // //   color: '#1F1F1F',
// // //   border: '1px solid #C9A86A',
// // // };

// // // function getEmailError(email: string) {
// // //   const value = email.trim();

// // //   if (!value) return 'Email address is required';
// // //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';

// // //   return '';
// // // }

// // // function getOtpError(otp: string) {
// // //   if (!otp.trim()) return 'OTP is required';
// // //   if (!/^\d{6}$/.test(otp)) return 'Enter the 6-digit OTP';

// // //   return '';
// // // }

// // // function getPasswordError(password: string) {
// // //   if (!password) return 'New password is required';
// // //   if (password.length < 8) return 'Password must be at least 8 characters';
// // //   if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
// // //   if (!/[0-9]/.test(password)) return 'Password needs at least one number';

// // //   return '';
// // // }

// // // export default function ForgotPassword() {
// // //   const navigate = useNavigate();

// // //   const [email, setEmail] = useState('');
// // //   const [otp, setOtp] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [confirmPassword, setConfirmPassword] = useState('');
// // //   const [step, setStep] = useState<'email' | 'reset'>('email');
// // //   const [loading, setLoading] = useState(false);
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // //   const [submitted, setSubmitted] = useState(false);
// // //   const [errors, setErrors] = useState<Record<string, string>>({});

// // //   const displayEmail = useMemo(() => email.trim().toLowerCase(), [email]);

// // //   const updateFieldError = (field: string, error: string) => {
// // //     setErrors((current) => {
// // //       const next = { ...current };
// // //       if (error) next[field] = error;
// // //       else delete next[field];
// // //       return next;
// // //     });
// // //   };

// // //   const updateEmail = (value: string) => {
// // //     setEmail(value);
// // //     if (submitted || errors.email) updateFieldError('email', getEmailError(value));
// // //   };

// // //   const updateOtp = (value: string) => {
// // //     const digits = value.replace(/\D/g, '').slice(0, 6);
// // //     setOtp(digits);
// // //     if (submitted || errors.otp) updateFieldError('otp', getOtpError(digits));
// // //   };

// // //   const updatePassword = (value: string) => {
// // //     setPassword(value);
// // //     if (submitted || errors.password) updateFieldError('password', getPasswordError(value));
// // //     if (confirmPassword && (submitted || errors.confirmPassword)) {
// // //       updateFieldError(
// // //         'confirmPassword',
// // //         value === confirmPassword ? '' : 'Passwords do not match'
// // //       );
// // //     }
// // //   };

// // //   const updateConfirmPassword = (value: string) => {
// // //     setConfirmPassword(value);
// // //     if (submitted || errors.confirmPassword) {
// // //       updateFieldError(
// // //         'confirmPassword',
// // //         value === password ? '' : 'Passwords do not match'
// // //       );
// // //     }
// // //   };

// // //   const requestOtp = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setSubmitted(true);

// // //     const emailError = getEmailError(email);
// // //     setErrors(emailError ? { email: emailError } : {});
// // //     if (emailError) return;

// // //     setLoading(true);
// // //     try {
// // //       const res = await authApi.forgotPassword(displayEmail);
// // //       toast.success(res.data.message || 'OTP sent to your email.', { style: TOAST_STYLE });
// // //       setStep('reset');
// // //       setSubmitted(false);
// // //       setErrors({});
// // //     } catch (err: any) {
// // //       toast.error(err.response?.data?.error || 'Could not send OTP. Please try again.', {
// // //         style: TOAST_STYLE,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const resetPassword = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setSubmitted(true);

// // //     const nextErrors: Record<string, string> = {};
// // //     const otpError = getOtpError(otp);
// // //     const passwordError = getPasswordError(password);

// // //     if (otpError) nextErrors.otp = otpError;
// // //     if (passwordError) nextErrors.password = passwordError;
// // //     if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

// // //     setErrors(nextErrors);
// // //     if (Object.keys(nextErrors).length > 0) return;

// // //     setLoading(true);
// // //     try {
// // //       const res = await authApi.resetPassword(displayEmail, otp, password);
// // //       toast.success(res.data.message || 'Password reset successfully.', { style: TOAST_STYLE });
// // //       navigate('/login', { replace: true, state: { email: displayEmail } });
// // //     } catch (err: any) {
// // //       toast.error(err.response?.data?.error || 'Could not reset password.', {
// // //         style: TOAST_STYLE,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 24 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5 }}
// // //         className="w-full max-w-md"
// // //       >
// // //         <Link
// // //           to="/login"
// // //           className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
// // //         >
// // //           <FiArrowLeft className="w-4 h-4" />
// // //           Back to Login
// // //         </Link>

// // //         <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
// // //           <div className="text-center mb-8">
// // //             <Link to="/" className="inline-flex items-center gap-2 mb-6">
// // //               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
// // //                 <span className="text-white text-xs font-bold font-heading">V</span>
// // //               </div>
// // //               <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">
// // //                 Vastrika
// // //               </span>
// // //             </Link>
// // //             <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">
// // //               Reset password
// // //             </h1>
// // //             <p className="font-body text-sm text-[#777] mt-2">
// // //               {step === 'email'
// // //                 ? 'Enter your email and we will send a reset OTP.'
// // //                 : `Enter the OTP sent to ${displayEmail}.`}
// // //             </p>
// // //           </div>

// // //           {step === 'email' ? (
// // //             <form onSubmit={requestOtp} noValidate className="space-y-5">
// // //               <div className="flex flex-col gap-1.5">
// // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // //                   Email Address
// // //                 </label>
// // //                 <div className="relative">
// // //                   <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// // //                   <input
// // //                     type="text"
// // //                     inputMode="email"
// // //                     value={email}
// // //                     onChange={(e) => updateEmail(e.target.value)}
// // //                     placeholder="you@example.com"
// // //                     autoComplete="email"
// // //                     className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // //                       errors.email ? 'border-red-300' : 'border-[#E8DCCB]'
// // //                     }`}
// // //                   />
// // //                 </div>
// // //                 {errors.email && <p className="font-body text-xs text-red-500">{errors.email}</p>}
// // //               </div>

// // //               <motion.button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// // //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// // //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// // //               >
// // //                 {loading ? (
// // //                   <>
// // //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // //                     Sending OTP...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <FiShield className="w-4 h-4" />
// // //                     Send OTP
// // //                   </>
// // //                 )}
// // //               </motion.button>
// // //             </form>
// // //           ) : (
// // //             <form onSubmit={resetPassword} noValidate className="space-y-5">
// // //               <div className="flex flex-col gap-1.5">
// // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // //                   OTP
// // //                 </label>
// // //                 <input
// // //                   type="text"
// // //                   inputMode="numeric"
// // //                   value={otp}
// // //                   onChange={(e) => updateOtp(e.target.value)}
// // //                   placeholder="6-digit OTP"
// // //                   className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-center text-lg tracking-[0.35em] text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // //                     errors.otp ? 'border-red-300' : 'border-[#E8DCCB]'
// // //                   }`}
// // //                 />
// // //                 {errors.otp && <p className="font-body text-xs text-red-500">{errors.otp}</p>}
// // //               </div>

// // //               <div className="flex flex-col gap-1.5">
// // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // //                   New Password
// // //                 </label>
// // //                 <div className="relative">
// // //                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// // //                   <input
// // //                     type={showPassword ? 'text' : 'password'}
// // //                     value={password}
// // //                     onChange={(e) => updatePassword(e.target.value)}
// // //                     placeholder="Min 8 chars, 1 uppercase, 1 number"
// // //                     autoComplete="new-password"
// // //                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // //                       errors.password ? 'border-red-300' : 'border-[#E8DCCB]'
// // //                     }`}
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
// // //                   >
// // //                     {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
// // //                   </button>
// // //                 </div>
// // //                 {errors.password && <p className="font-body text-xs text-red-500">{errors.password}</p>}
// // //               </div>

// // //               <div className="flex flex-col gap-1.5">
// // //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// // //                   Confirm Password
// // //                 </label>
// // //                 <div className="relative">
// // //                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// // //                   <input
// // //                     type={showConfirmPassword ? 'text' : 'password'}
// // //                     value={confirmPassword}
// // //                     onChange={(e) => updateConfirmPassword(e.target.value)}
// // //                     placeholder="Confirm new password"
// // //                     autoComplete="new-password"
// // //                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// // //                       errors.confirmPassword ? 'border-red-300' : 'border-[#E8DCCB]'
// // //                     }`}
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
// // //                     aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
// // //                   >
// // //                     {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
// // //                   </button>
// // //                 </div>
// // //                 {errors.confirmPassword && (
// // //                   <p className="font-body text-xs text-red-500">{errors.confirmPassword}</p>
// // //                 )}
// // //               </div>

// // //               <motion.button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// // //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// // //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// // //               >
// // //                 {loading ? (
// // //                   <>
// // //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // //                     Resetting...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <FiCheck className="w-4 h-4" />
// // //                     Reset Password
// // //                   </>
// // //                 )}
// // //               </motion.button>

// // //               <button
// // //                 type="button"
// // //                 disabled={loading}
// // //                 onClick={() => {
// // //                   setStep('email');
// // //                   setSubmitted(false);
// // //                   setErrors({});
// // //                   setOtp('');
// // //                 }}
// // //                 className="w-full font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer disabled:opacity-60"
// // //               >
// // //                 Use another email or resend OTP
// // //               </button>
// // //             </form>
// // //           )}
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }


// // import { useMemo, useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import toast from 'react-hot-toast';
// // import {
// //   FiArrowLeft,
// //   FiCheck,
// //   FiEye,
// //   FiEyeOff,
// //   FiLock,
// //   FiMail,
// //   FiShield,
// // } from 'react-icons/fi';
// // import { authApi } from '../api/auth';

// // const TOAST_STYLE = {
// //   fontFamily: 'Outfit, sans-serif',
// //   background: '#F8F5F0',
// //   color: '#1F1F1F',
// //   border: '1px solid #C9A86A',
// // };

// // function getEmailError(email: string) {
// //   const value = email.trim();

// //   if (!value) return 'Email address is required';
// //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';

// //   return '';
// // }

// // function getOtpError(otp: string) {
// //   if (!otp.trim()) return 'OTP is required';
// //   if (!/^\d{6}$/.test(otp)) return 'Enter the 6-digit OTP';

// //   return '';
// // }

// // function getPasswordError(password: string) {
// //   if (!password) return 'New password is required';
// //   if (password.length < 8) return 'Password must be at least 8 characters';
// //   if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
// //   if (!/[0-9]/.test(password)) return 'Password needs at least one number';

// //   return '';
// // }

// // export default function ForgotPassword() {
// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [step, setStep] = useState<'email' | 'reset'>('email');
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [submitted, setSubmitted] = useState(false);
// //   const [errors, setErrors] = useState<Record<string, string>>({});

// //   const displayEmail = useMemo(() => email.trim().toLowerCase(), [email]);

// //   const updateFieldError = (field: string, error: string) => {
// //     setErrors((current) => {
// //       const next = { ...current };
// //       if (error) next[field] = error;
// //       else delete next[field];
// //       return next;
// //     });
// //   };

// //   const updateEmail = (value: string) => {
// //     setEmail(value);
// //     if (submitted || errors.email) updateFieldError('email', getEmailError(value));
// //   };

// //   const updateOtp = (value: string) => {
// //     const digits = value.replace(/\D/g, '').slice(0, 6);
// //     setOtp(digits);
// //     if (submitted || errors.otp) updateFieldError('otp', getOtpError(digits));
// //   };

// //   const updatePassword = (value: string) => {
// //     setPassword(value);
// //     if (submitted || errors.password) updateFieldError('password', getPasswordError(value));
// //     if (confirmPassword && (submitted || errors.confirmPassword)) {
// //       updateFieldError(
// //         'confirmPassword',
// //         value === confirmPassword ? '' : 'Passwords do not match'
// //       );
// //     }
// //   };

// //   const updateConfirmPassword = (value: string) => {
// //     setConfirmPassword(value);
// //     if (submitted || errors.confirmPassword) {
// //       updateFieldError(
// //         'confirmPassword',
// //         value === password ? '' : 'Passwords do not match'
// //       );
// //     }
// //   };

// //   const requestOtp = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setSubmitted(true);

// //     const emailError = getEmailError(email);
// //     setErrors(emailError ? { email: emailError } : {});
// //     if (emailError) return;

// //     setLoading(true);
// //     try {
// //       const res = await authApi.forgotPassword(displayEmail);
// //       toast.success(res.data.message || 'OTP sent to your email.', { style: TOAST_STYLE });
// //       setStep('reset');
// //       setSubmitted(false);
// //       setErrors({});
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Could not send OTP. Please try again.', {
// //         style: TOAST_STYLE,
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const resetPassword = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setSubmitted(true);

// //     const nextErrors: Record<string, string> = {};
// //     const otpError = getOtpError(otp);
// //     const passwordError = getPasswordError(password);

// //     if (otpError) nextErrors.otp = otpError;
// //     if (passwordError) nextErrors.password = passwordError;
// //     if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

// //     setErrors(nextErrors);
// //     if (Object.keys(nextErrors).length > 0) return;

// //     setLoading(true);
// //     try {
// //       const res = await authApi.resetPassword(displayEmail, otp, password);
// //       toast.success(res.data.message || 'Password reset successfully.', { style: TOAST_STYLE });
// //       navigate('/login', { replace: true, state: { email: displayEmail } });
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Could not reset password.', {
// //         style: TOAST_STYLE,
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
// //       <motion.div
// //         initial={{ opacity: 0, y: 24 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="w-full max-w-md"
// //       >
// //         <Link
// //           to="/login"
// //           className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
// //         >
// //           <FiArrowLeft className="w-4 h-4" />
// //           Back to Login
// //         </Link>

// //         <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
// //           <div className="text-center mb-8">
// //             <Link to="/" className="inline-flex items-center gap-2 mb-6">
// //               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
// //                 <span className="text-white text-xs font-bold font-heading">V</span>
// //               </div>
// //               <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">
// //                 Vastrika
// //               </span>
// //             </Link>
// //             <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">
// //               Reset password
// //             </h1>
// //             <p className="font-body text-sm text-[#777] mt-2">
// //               {step === 'email'
// //                 ? 'Enter your email and we will send a reset OTP.'
// //                 : `Enter the OTP sent to ${displayEmail}.`}
// //             </p>
// //           </div>

// //           {step === 'email' ? (
// //             <form onSubmit={requestOtp} noValidate className="space-y-5">
// //               <div className="flex flex-col gap-1.5">
// //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// //                   Email Address
// //                 </label>
// //                 <div className="relative">
// //                   <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// //                   <input
// //                     type="text"
// //                     inputMode="email"
// //                     value={email}
// //                     onChange={(e) => updateEmail(e.target.value)}
// //                     placeholder="you@example.com"
// //                     autoComplete="email"
// //                     className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// //                       errors.email ? 'border-red-300' : 'border-[#E8DCCB]'
// //                     }`}
// //                   />
// //                 </div>
// //                 {errors.email && <p className="font-body text-xs text-red-500">{errors.email}</p>}
// //               </div>

// //               <motion.button
// //                 type="submit"
// //                 disabled={loading}
// //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                     Sending OTP...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <FiShield className="w-4 h-4" />
// //                     Send OTP
// //                   </>
// //                 )}
// //               </motion.button>
// //             </form>
// //           ) : (
// //             <form onSubmit={resetPassword} noValidate className="space-y-5">
// //               <div className="flex flex-col gap-1.5">
// //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// //                   OTP
// //                 </label>
// //                 <input
// //                   type="text"
// //                   inputMode="numeric"
// //                   value={otp}
// //                   onChange={(e) => updateOtp(e.target.value)}
// //                   placeholder="6-digit OTP"
// //                   className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-center text-lg tracking-[0.35em] text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// //                     errors.otp ? 'border-red-300' : 'border-[#E8DCCB]'
// //                   }`}
// //                 />
// //                 {errors.otp && <p className="font-body text-xs text-red-500">{errors.otp}</p>}
// //               </div>

// //               <div className="flex flex-col gap-1.5">
// //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// //                   New Password
// //                 </label>
// //                 <div className="relative">
// //                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// //                   <input
// //                     type={showPassword ? 'text' : 'password'}
// //                     value={password}
// //                     onChange={(e) => updatePassword(e.target.value)}
// //                     placeholder="Min 8 chars, 1 uppercase, 1 number"
// //                     autoComplete="new-password"
// //                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// //                       errors.password ? 'border-red-300' : 'border-[#E8DCCB]'
// //                     }`}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
// //                   >
// //                     {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
// //                   </button>
// //                 </div>
// //                 {errors.password && <p className="font-body text-xs text-red-500">{errors.password}</p>}
// //               </div>

// //               <div className="flex flex-col gap-1.5">
// //                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
// //                   Confirm Password
// //                 </label>
// //                 <div className="relative">
// //                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
// //                   <input
// //                     type={showConfirmPassword ? 'text' : 'password'}
// //                     value={confirmPassword}
// //                     onChange={(e) => updateConfirmPassword(e.target.value)}
// //                     placeholder="Confirm new password"
// //                     autoComplete="new-password"
// //                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
// //                       errors.confirmPassword ? 'border-red-300' : 'border-[#E8DCCB]'
// //                     }`}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
// //                     aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
// //                   >
// //                     {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
// //                   </button>
// //                 </div>
// //                 {errors.confirmPassword && (
// //                   <p className="font-body text-xs text-red-500">{errors.confirmPassword}</p>
// //                 )}
// //               </div>

// //               <motion.button
// //                 type="submit"
// //                 disabled={loading}
// //                 whileHover={{ scale: loading ? 1 : 1.01 }}
// //                 whileTap={{ scale: loading ? 1 : 0.99 }}
// //                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                     Resetting...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <FiCheck className="w-4 h-4" />
// //                     Reset Password
// //                   </>
// //                 )}
// //               </motion.button>

// //               <button
// //                 type="button"
// //                 disabled={loading}
// //                 onClick={() => {
// //                   setStep('email');
// //                   setSubmitted(false);
// //                   setErrors({});
// //                   setOtp('');
// //                 }}
// //                 className="w-full font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer disabled:opacity-60"
// //               >
// //                 Use another email or resend OTP
// //               </button>
// //             </form>
// //           )}
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }


// import { useMemo, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import {
//   FiArrowLeft,
//   FiCheck,
//   FiEye,
//   FiEyeOff,
//   FiLock,
//   FiMail,
//   FiShield,
// } from 'react-icons/fi';
// import { authApi } from '../api/auth';

// const TOAST_STYLE = {
//   fontFamily: 'Outfit, sans-serif',
//   background: '#F8F5F0',
//   color: '#1F1F1F',
//   border: '1px solid #C9A86A',
// };

// function getEmailError(email: string) {
//   const value = email.trim();

//   if (!value) return 'Email address is required';
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';

//   return '';
// }

// function getOtpError(otp: string) {
//   if (!otp.trim()) return 'OTP is required';
//   if (!/^\d{6}$/.test(otp)) return 'Enter the 6-digit OTP';

//   return '';
// }

// function getPasswordError(password: string) {
//   if (!password) return 'New password is required';
//   if (password.length < 8) return 'Password must be at least 8 characters';
//   if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
//   if (!/[0-9]/.test(password)) return 'Password needs at least one number';

//   return '';
// }

// export default function ForgotPassword() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [step, setStep] = useState<'email' | 'reset'>('email');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const displayEmail = useMemo(() => email.trim().toLowerCase(), [email]);

//   const updateFieldError = (field: string, error: string) => {
//     setErrors((current) => {
//       const next = { ...current };
//       if (error) next[field] = error;
//       else delete next[field];
//       return next;
//     });
//   };

//   const updateEmail = (value: string) => {
//     setEmail(value);
//     if (submitted || errors.email) updateFieldError('email', getEmailError(value));
//   };

//   const updateOtp = (value: string) => {
//     const digits = value.replace(/\D/g, '').slice(0, 6);
//     setOtp(digits);
//     if (submitted || errors.otp) updateFieldError('otp', getOtpError(digits));
//   };

//   const updatePassword = (value: string) => {
//     setPassword(value);
//     if (submitted || errors.password) updateFieldError('password', getPasswordError(value));
//     if (confirmPassword && (submitted || errors.confirmPassword)) {
//       updateFieldError(
//         'confirmPassword',
//         value === confirmPassword ? '' : 'Passwords do not match'
//       );
//     }
//   };

//   const updateConfirmPassword = (value: string) => {
//     setConfirmPassword(value);
//     if (submitted || errors.confirmPassword) {
//       updateFieldError(
//         'confirmPassword',
//         value === password ? '' : 'Passwords do not match'
//       );
//     }
//   };

//   const requestOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);

//     const emailError = getEmailError(email);
//     setErrors(emailError ? { email: emailError } : {});
//     if (emailError) return;

//     setLoading(true);
//     try {
//       const res = await authApi.forgotPassword(displayEmail);
//       toast.success(res.data.message || 'OTP sent to your email.', { style: TOAST_STYLE });
//       setStep('reset');
//       setSubmitted(false);
//       setErrors({});
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Could not send OTP. Please try again.', {
//         style: TOAST_STYLE,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);

//     const nextErrors: Record<string, string> = {};
//     const otpError = getOtpError(otp);
//     const passwordError = getPasswordError(password);

//     if (otpError) nextErrors.otp = otpError;
//     if (passwordError) nextErrors.password = passwordError;
//     if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

//     setErrors(nextErrors);
//     if (Object.keys(nextErrors).length > 0) return;

//     setLoading(true);
//     try {
//       const res = await authApi.resetPassword(displayEmail, otp, password);
//       toast.success(res.data.message || 'Password reset successfully.', { style: TOAST_STYLE });
//       navigate('/login', { replace: true, state: { email: displayEmail } });
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Could not reset password.', {
//         style: TOAST_STYLE,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <Link
//           to="/login"
//           className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
//         >
//           <FiArrowLeft className="w-4 h-4" />
//           Back to Login
//         </Link>

//         <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm p-8 md:p-10">
//           <div className="text-center mb-8">
//             <Link to="/" className="inline-flex items-center gap-2 mb-6">
//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
//                 <span className="text-white text-xs font-bold font-heading">V</span>
//               </div>
//               <span className="font-heading text-2xl font-semibold text-[#1F1F1F] tracking-wide">
//                 Vastrika
//               </span>
//             </Link>
//             <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">
//               Reset password
//             </h1>
//             <p className="font-body text-sm text-[#777] mt-2">
//               {step === 'email'
//                 ? 'Enter your email and we will send a reset OTP.'
//                 : `Enter the OTP sent to ${displayEmail}.`}
//             </p>
//           </div>

//           {step === 'email' ? (
//             <form onSubmit={requestOtp} noValidate className="space-y-5">
//               <div className="flex flex-col gap-1.5">
//                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                   <input
//                     type="text"
//                     inputMode="email"
//                     value={email}
//                     onChange={(e) => updateEmail(e.target.value)}
//                     placeholder="you@example.com"
//                     autoComplete="email"
//                     className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
//                       errors.email ? 'border-red-300' : 'border-[#E8DCCB]'
//                     }`}
//                   />
//                 </div>
//                 {errors.email && <p className="font-body text-xs text-red-500">{errors.email}</p>}
//               </div>

//               <motion.button
//                 type="submit"
//                 disabled={loading}
//                 whileHover={{ scale: loading ? 1 : 1.01 }}
//                 whileTap={{ scale: loading ? 1 : 0.99 }}
//                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Sending OTP...
//                   </>
//                 ) : (
//                   <>
//                     <FiShield className="w-4 h-4" />
//                     Send OTP
//                   </>
//                 )}
//               </motion.button>
//             </form>
//           ) : (
//             <form onSubmit={resetPassword} noValidate className="space-y-5">
//               <div className="flex flex-col gap-1.5">
//                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
//                   OTP
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   value={otp}
//                   onChange={(e) => updateOtp(e.target.value)}
//                   placeholder="6-digit OTP"
//                   className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-center text-lg tracking-[0.35em] text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
//                     errors.otp ? 'border-red-300' : 'border-[#E8DCCB]'
//                   }`}
//                 />
//                 {errors.otp && <p className="font-body text-xs text-red-500">{errors.otp}</p>}
//               </div>

//               <div className="flex flex-col gap-1.5">
//                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => updatePassword(e.target.value)}
//                     placeholder="Min 8 chars, 1 uppercase, 1 number"
//                     autoComplete="new-password"
//                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
//                       errors.password ? 'border-red-300' : 'border-[#E8DCCB]'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
//                   >
//                     {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="font-body text-xs text-red-500">{errors.password}</p>}
//               </div>

//               <div className="flex flex-col gap-1.5">
//                 <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={confirmPassword}
//                     onChange={(e) => updateConfirmPassword(e.target.value)}
//                     placeholder="Confirm new password"
//                     autoComplete="new-password"
//                     className={`w-full pl-10 pr-10 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
//                       errors.confirmPassword ? 'border-red-300' : 'border-[#E8DCCB]'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555] transition-colors cursor-pointer"
//                     aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
//                   >
//                     {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="font-body text-xs text-red-500">{errors.confirmPassword}</p>
//                 )}
//               </div>

//               <motion.button
//                 type="submit"
//                 disabled={loading}
//                 whileHover={{ scale: loading ? 1 : 1.01 }}
//                 whileTap={{ scale: loading ? 1 : 0.99 }}
//                 className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Resetting...
//                   </>
//                 ) : (
//                   <>
//                     <FiCheck className="w-4 h-4" />
//                     Reset Password
//                   </>
//                 )}
//               </motion.button>

//               <button
//                 type="button"
//                 disabled={loading}
//                 onClick={() => {
//                   setStep('email');
//                   setSubmitted(false);
//                   setErrors({});
//                   setOtp('');
//                 }}
//                 className="w-full font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer disabled:opacity-60"
//               >
//                 Use another email or resend OTP
//               </button>
//             </form>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }


import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiArrowLeft,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from 'react-icons/fi';
import { authApi } from '../api/auth';

const TOAST_STYLE = {
  fontFamily: 'Outfit, sans-serif',
  background: '#F8F5F0',
  color: '#1F1F1F',
  border: '1px solid #C9A86A',
};

type Step = 'email' | 'otp' | 'password';

function getEmailError(email: string) {
  const value = email.trim();

  if (!value) return 'Email address is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';

  return '';
}

function getOtpError(otp: string) {
  if (!otp.trim()) return 'OTP is required';
  if (!/^\d{6}$/.test(otp)) return 'Enter the 6-digit OTP';

  return '';
}

function getPasswordError(password: string) {
  if (!password) return 'New password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password needs at least one number';

  return '';
}

function getConfirmPasswordError(password: string, confirmPassword: string) {
  if (!confirmPassword) return 'Confirm password is required';
  if (password !== confirmPassword) return 'Passwords do not match';

  return '';
}

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<Step>('email');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittedStep, setSubmittedStep] = useState<Step | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const displayEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  const updateFieldError = (field: string, error: string) => {
    setErrors((current) => {
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const updateEmail = (value: string) => {
    setEmail(value);
    if (submittedStep === 'email' || errors.email) {
      updateFieldError('email', getEmailError(value));
    }
  };

  const updateOtp = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    setOtp(digits);
    if (submittedStep === 'otp' || errors.otp) {
      updateFieldError('otp', getOtpError(digits));
    }
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    if (submittedStep === 'password' || errors.password) {
      updateFieldError('password', getPasswordError(value));
    }
    if (confirmPassword && (submittedStep === 'password' || errors.confirmPassword)) {
      updateFieldError(
        'confirmPassword',
        getConfirmPasswordError(value, confirmPassword)
      );
    }
  };

  const updateConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    if (submittedStep === 'password' || errors.confirmPassword) {
      updateFieldError(
        'confirmPassword',
        getConfirmPasswordError(password, value)
      );
    }
  };

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedStep('email');

    const emailError = getEmailError(email);
    setErrors(emailError ? { email: emailError } : {});
    if (emailError) return;

    setLoading(true);
    try {
      const res = await authApi.forgotPassword(displayEmail);
      toast.success(res.data.message || 'OTP sent to your email.', { style: TOAST_STYLE });
      setStep('otp');
      setSubmittedStep(null);
      setErrors({});
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Could not send OTP. Please try again.', {
        style: TOAST_STYLE,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedStep('otp');

    const otpError = getOtpError(otp);
    setErrors(otpError ? { otp: otpError } : {});
    if (otpError) return;

    setLoading(true);
    try {
      const res = await authApi.verifyResetOtp(displayEmail, otp);
      toast.success(res.data.message || 'OTP verified successfully.', { style: TOAST_STYLE });
      setStep('password');
      setSubmittedStep(null);
      setErrors({});
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Invalid or expired OTP.', {
        style: TOAST_STYLE,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedStep('password');

    const nextErrors: Record<string, string> = {};
    const passwordError = getPasswordError(password);
    const confirmPasswordError = getConfirmPasswordError(password, confirmPassword);

    if (passwordError) nextErrors.password = passwordError;
    if (confirmPasswordError) nextErrors.confirmPassword = confirmPasswordError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await authApi.resetPassword(displayEmail, otp, password);
      toast.success(res.data.message || 'Password reset successfully.', { style: TOAST_STYLE });
      navigate('/login', { replace: true, state: { email: displayEmail } });
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Could not reset password.', {
        style: TOAST_STYLE,
      });
    } finally {
      setLoading(false);
    }
  };

  const goBackToEmail = () => {
    if (loading) return;
    setStep('email');
    setSubmittedStep(null);
    setErrors({});
    setOtp('');
    setPassword('');
    setConfirmPassword('');
  };

  const stepTitle =
    step === 'email' ? 'Reset password' : step === 'otp' ? 'Verify OTP' : 'Create new password';
  const stepDescription =
    step === 'email'
      ? 'Enter your email and we will send a reset OTP.'
      : step === 'otp'
        ? `Enter the OTP sent to ${displayEmail}.`
        : 'Your OTP is verified. Choose a new password.';

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Login
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

            <div className="flex justify-center gap-2 mb-5">
              {(['email', 'otp', 'password'] as Step[]).map((item, index) => {
                const currentIndex = ['email', 'otp', 'password'].indexOf(step);
                const active = index <= currentIndex;
                return (
                  <span
                    key={item}
                    className={`h-1.5 rounded-full transition-all ${
                      active ? 'w-8 bg-[#7A4E48]' : 'w-4 bg-[#E8DCCB]'
                    }`}
                  />
                );
              })}
            </div>

            <h1 className="font-heading text-3xl font-semibold text-[#1F1F1F]">
              {stepTitle}
            </h1>
            <p className="font-body text-sm text-[#777] mt-2">{stepDescription}</p>
          </div>

          {step === 'email' && (
            <form onSubmit={requestOtp} noValidate className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                  <input
                    type="text"
                    inputMode="email"
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
                      errors.email ? 'border-red-300' : 'border-[#E8DCCB]'
                    }`}
                  />
                </div>
                {errors.email && <p className="font-body text-xs text-red-500">{errors.email}</p>}
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
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <FiShield className="w-4 h-4" />
                    Send OTP
                  </>
                )}
              </motion.button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={verifyOtp} noValidate className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                  OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => updateOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  autoComplete="one-time-code"
                  className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-center text-lg tracking-[0.35em] text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${
                    errors.otp ? 'border-red-300' : 'border-[#E8DCCB]'
                  }`}
                />
                {errors.otp && <p className="font-body text-xs text-red-500">{errors.otp}</p>}
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
                    Verifying...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-4 h-4" />
                    Verify OTP
                  </>
                )}
              </motion.button>

              <button
                type="button"
                disabled={loading}
                onClick={goBackToEmail}
                className="w-full font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer disabled:opacity-60"
              >
                Use another email or resend OTP
              </button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={resetPassword} noValidate className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => updatePassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => updateConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
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
                    Resetting...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-4 h-4" />
                    Reset Password
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
