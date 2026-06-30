// // // // // import { Link } from 'react-router-dom';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
// // // // // import { useStore } from '../store/useStore';

// // // // // export default function Cart() {
// // // // //   const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();
// // // // //   const total = cartTotal();
// // // // //   const shipping = total >= 999 ? 0 : 99;
// // // // //   const savings = cart.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.quantity, 0);

// // // // //   return (
// // // // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// // // // //       <div className="bg-[#EFE7DC] py-12">
// // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // //           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">Your Cart</h1>
// // // // //           <p className="font-body text-sm text-[#777] mt-2">
// // // // //             {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// // // // //         {cart.length === 0 ? (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 30 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             className="text-center py-24"
// // // // //           >
// // // // //             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// // // // //               <FiShoppingBag className="w-10 h-10 text-[#C9A86A]" />
// // // // //             </div>
// // // // //             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your cart is empty</h2>
// // // // //             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
// // // // //               Looks like you haven't added anything to your cart yet. Explore our beautiful collection!
// // // // //             </p>
// // // // //             <Link
// // // // //               to="/shop"
// // // // //               className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// // // // //             >
// // // // //               Continue Shopping <FiArrowRight className="w-4 h-4" />
// // // // //             </Link>
// // // // //           </motion.div>
// // // // //         ) : (
// // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // //             {/* Cart Items */}
// // // // //             <div className="lg:col-span-2 space-y-4">
// // // // //               <AnimatePresence>
// // // // //                 {cart.map(item => (
// // // // //                   <motion.div
// // // // //                     key={`${item.id}-${item.selectedSize}`}
// // // // //                     initial={{ opacity: 0, x: -20 }}
// // // // //                     animate={{ opacity: 1, x: 0 }}
// // // // //                     exit={{ opacity: 0, x: -40, height: 0 }}
// // // // //                     transition={{ duration: 0.3 }}
// // // // //                     className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-[#F0EBE3]"
// // // // //                   >
// // // // //                     {/* Image */}
// // // // //                     <Link to={`/product/${item.id}`} className="cursor-pointer flex-shrink-0">
// // // // //                       <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#F8F5F0]">
// // // // //                         <img
// // // // //                           src={item.images[0]}
// // // // //                           alt={item.title}
// // // // //                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// // // // //                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80'; }}
// // // // //                         />
// // // // //                       </div>
// // // // //                     </Link>

// // // // //                     {/* Details */}
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <div className="flex items-start justify-between gap-2">
// // // // //                         <div>
// // // // //                           <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
// // // // //                             {item.category}
// // // // //                           </span>
// // // // //                           <Link to={`/product/${item.id}`} className="cursor-pointer block">
// // // // //                             <h3 className="font-heading text-base font-semibold text-[#1F1F1F] leading-tight hover:text-[#7A4E48] transition-colors line-clamp-2 mt-0.5">
// // // // //                               {item.title}
// // // // //                             </h3>
// // // // //                           </Link>
// // // // //                           <div className="flex items-center gap-3 mt-1.5">
// // // // //                             {item.selectedSize && item.selectedSize !== 'Free Size' && (
// // // // //                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
// // // // //                                 Size: {item.selectedSize}
// // // // //                               </span>
// // // // //                             )}
// // // // //                             <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
// // // // //                               {item.selectedColor}
// // // // //                             </span>
// // // // //                           </div>
// // // // //                         </div>

// // // // //                         <button
// // // // //                           onClick={() => removeFromCart(item.id)}
// // // // //                           className="p-2 rounded-lg hover:bg-[#FFF0F0] transition-colors cursor-pointer flex-shrink-0"
// // // // //                         >
// // // // //                           <FiTrash2 className="w-4 h-4 text-[#C58C85]" />
// // // // //                         </button>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between mt-4">
// // // // //                         {/* Quantity */}
// // // // //                         <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden bg-[#F8F5F0]">
// // // // //                           <button
// // // // //                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
// // // // //                             className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// // // // //                           >
// // // // //                             <FiMinus className="w-3 h-3 text-[#555]" />
// // // // //                           </button>
// // // // //                           <span className="w-10 text-center font-body text-sm font-medium text-[#1F1F1F]">
// // // // //                             {item.quantity}
// // // // //                           </span>
// // // // //                           <button
// // // // //                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
// // // // //                             className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// // // // //                           >
// // // // //                             <FiPlus className="w-3 h-3 text-[#555]" />
// // // // //                           </button>
// // // // //                         </div>

// // // // //                         {/* Price */}
// // // // //                         <div className="text-right">
// // // // //                           <div className="font-heading text-lg font-bold text-[#7A4E48]">
// // // // //                             ₹{(item.price * item.quantity).toLocaleString('en-IN')}
// // // // //                           </div>
// // // // //                           <div className="font-body text-xs text-[#999]">
// // // // //                             ₹{item.price.toLocaleString('en-IN')} each
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </motion.div>
// // // // //                 ))}
// // // // //               </AnimatePresence>

// // // // //               <Link
// // // // //                 to="/shop"
// // // // //                 className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer"
// // // // //               >
// // // // //                 ← Continue Shopping
// // // // //               </Link>
// // // // //             </div>

// // // // //             {/* Order Summary */}
// // // // //             <div className="lg:col-span-1">
// // // // //               <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0EBE3] sticky top-24">
// // // // //                 <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-6">Order Summary</h2>

// // // // //                 {/* Coupon */}
// // // // //                 <div className="flex gap-2 mb-6">
// // // // //                   <div className="flex-1 flex items-center gap-2 border border-[#E8DCCB] rounded-xl px-3 py-2.5 bg-[#F8F5F0]">
// // // // //                     <FiTag className="w-4 h-4 text-[#C9A86A]" />
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       placeholder="Coupon code"
// // // // //                       className="flex-1 bg-transparent font-body text-sm text-[#555] focus:outline-none"
// // // // //                     />
// // // // //                   </div>
// // // // //                   <button className="px-4 py-2.5 bg-[#EFE7DC] text-[#7A4E48] font-body text-xs font-semibold rounded-xl hover:bg-[#E8DCCB] transition-colors cursor-pointer whitespace-nowrap">
// // // // //                     Apply
// // // // //                   </button>
// // // // //                 </div>

// // // // //                 <div className="space-y-3 mb-6">
// // // // //                   <div className="flex justify-between">
// // // // //                     <span className="font-body text-sm text-[#777]">Subtotal ({cart.length} items)</span>
// // // // //                     <span className="font-body text-sm font-medium text-[#1F1F1F]">₹{total.toLocaleString('en-IN')}</span>
// // // // //                   </div>
// // // // //                   <div className="flex justify-between">
// // // // //                     <span className="font-body text-sm text-[#777]">Shipping</span>
// // // // //                     <span className={`font-body text-sm font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1F1F1F]'}`}>
// // // // //                       {shipping === 0 ? 'FREE' : `₹${shipping}`}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                   {savings > 0 && (
// // // // //                     <div className="flex justify-between">
// // // // //                       <span className="font-body text-sm text-green-600">Total Savings</span>
// // // // //                       <span className="font-body text-sm font-medium text-green-600">-₹{savings.toLocaleString('en-IN')}</span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                   <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
// // // // //                     <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
// // // // //                     <span className="font-heading text-xl font-bold text-[#7A4E48]">₹{(total + shipping).toLocaleString('en-IN')}</span>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {total < 999 && (
// // // // //                   <div className="text-xs font-body text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5 mb-4">
// // // // //                     Add ₹{(999 - total).toLocaleString('en-IN')} more for <span className="text-[#C9A86A] font-semibold">free shipping</span>!
// // // // //                   </div>
// // // // //                 )}

// // // // //                 <motion.button
// // // // //                   whileHover={{ scale: 1.02 }}
// // // // //                   whileTap={{ scale: 0.98 }}
// // // // //                   className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
// // // // //                 >
// // // // //                   Proceed to Checkout <FiArrowRight className="w-4 h-4" />
// // // // //                 </motion.button>

// // // // //                 <div className="mt-4 flex items-center justify-center gap-4">
// // // // //                   <span className="font-body text-xs text-[#999]">Secure Checkout</span>
// // // // //                   <span className="font-body text-xs text-[#999]">•</span>
// // // // //                   <span className="font-body text-xs text-[#999]">UPI / Cards / COD</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
// // // // import { useState } from 'react';
// // // // import toast from 'react-hot-toast';
// // // // import { useStore } from '../store/useStore';
// // // // import { useAuthStore } from '../store/useAuthStore';
// // // // import { apiClient } from '../api/client';

// // // // const TOAST_STYLE = {
// // // //   fontFamily: 'Outfit, sans-serif',
// // // //   background: '#F8F5F0',
// // // //   color: '#1F1F1F',
// // // //   border: '1px solid #C9A86A',
// // // // };

// // // // export default function Cart() {
// // // //   const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();
// // // //   const { isAuthenticated } = useAuthStore();
// // // //   const navigate = useNavigate();
// // // //   const total = cartTotal();
// // // //   const shipping = total >= 999 ? 0 : 99;
// // // //   const savings = cart.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.quantity, 0);

// // // //   const [couponCode, setCouponCode] = useState('');
// // // //   const [couponLoading, setCouponLoading] = useState(false);
// // // //   const [couponDiscount, setCouponDiscount] = useState(0);
// // // //   const [couponMsg, setCouponMsg] = useState('');

// // // //   const handleApplyCoupon = async () => {
// // // //     if (!couponCode.trim()) return;
// // // //     if (!isAuthenticated) { toast.error('Sign in to use coupon codes', { style: TOAST_STYLE }); return; }
// // // //     setCouponLoading(true);
// // // //     setCouponMsg('');
// // // //     try {
// // // //       const res = await apiClient.post('/coupons/validate', { code: couponCode.trim().toUpperCase(), order_total: total });
// // // //       const d = res.data.data;
// // // //       if (d.valid) { setCouponDiscount(Number(d.discount_amount)); setCouponMsg(d.message); toast.success(d.message, { style: TOAST_STYLE }); }
// // // //       else { setCouponDiscount(0); setCouponMsg(d.message); toast.error(d.message, { style: TOAST_STYLE }); }
// // // //     } catch { setCouponMsg('Could not validate coupon'); }
// // // //     finally { setCouponLoading(false); }
// // // //   };

// // // //   const handleCheckout = () => {
// // // //     if (!isAuthenticated) {
// // // //       navigate('/login', { state: { from: '/checkout' } });
// // // //       return;
// // // //     }
// // // //     navigate('/checkout');
// // // //   };

// // // //   return (
// // // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// // // //       <div className="bg-[#EFE7DC] py-12">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">Your Cart</h1>
// // // //           <p className="font-body text-sm text-[#777] mt-2">
// // // //             {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// // // //         {cart.length === 0 ? (
// // // //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
// // // //             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// // // //               <FiShoppingBag className="w-10 h-10 text-[#C9A86A]" />
// // // //             </div>
// // // //             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your cart is empty</h2>
// // // //             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
// // // //               Looks like you haven't added anything to your cart yet. Explore our beautiful collection!
// // // //             </p>
// // // //             <Link to="/shop" className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer">
// // // //               Continue Shopping <FiArrowRight className="w-4 h-4" />
// // // //             </Link>
// // // //           </motion.div>
// // // //         ) : (
// // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // //             {/* Cart Items */}
// // // //             <div className="lg:col-span-2 space-y-4">
// // // //               <AnimatePresence>
// // // //                 {cart.map((item) => (
// // // //                   <motion.div
// // // //                     key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
// // // //                     initial={{ opacity: 0, x: -20 }}
// // // //                     animate={{ opacity: 1, x: 0 }}
// // // //                     exit={{ opacity: 0, x: -40, height: 0 }}
// // // //                     transition={{ duration: 0.3 }}
// // // //                     className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-[#F0EBE3]"
// // // //                   >
// // // //                     <Link to={`/product/${item.id}`} className="cursor-pointer flex-shrink-0">
// // // //                       <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#F8F5F0]">
// // // //                         <img
// // // //                           src={item.images[0]}
// // // //                           alt={item.title}
// // // //                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// // // //                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80'; }}
// // // //                         />
// // // //                       </div>
// // // //                     </Link>

// // // //                     <div className="flex-1 min-w-0">
// // // //                       <div className="flex items-start justify-between gap-2">
// // // //                         <div>
// // // //                           <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">{item.category}</span>
// // // //                           <Link to={`/product/${item.id}`} className="cursor-pointer block">
// // // //                             <h3 className="font-heading text-base font-semibold text-[#1F1F1F] leading-tight hover:text-[#7A4E48] transition-colors line-clamp-2 mt-0.5">{item.title}</h3>
// // // //                           </Link>
// // // //                           <div className="flex items-center gap-3 mt-1.5">
// // // //                             {item.selectedSize && item.selectedSize !== 'Free Size' && (
// // // //                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">Size: {item.selectedSize}</span>
// // // //                             )}
// // // //                             {item.selectedColor && (
// // // //                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">{item.selectedColor}</span>
// // // //                             )}
// // // //                           </div>
// // // //                         </div>
// // // //                         <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-lg hover:bg-[#FFF0F0] transition-colors cursor-pointer flex-shrink-0">
// // // //                           <FiTrash2 className="w-4 h-4 text-[#C58C85]" />
// // // //                         </button>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between mt-4">
// // // //                         <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden bg-[#F8F5F0]">
// // // //                           <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer">
// // // //                             <FiMinus className="w-3 h-3 text-[#555]" />
// // // //                           </button>
// // // //                           <span className="w-10 text-center font-body text-sm font-medium text-[#1F1F1F]">{item.quantity}</span>
// // // //                           <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer">
// // // //                             <FiPlus className="w-3 h-3 text-[#555]" />
// // // //                           </button>
// // // //                         </div>
// // // //                         <div className="text-right">
// // // //                           <div className="font-heading text-lg font-bold text-[#7A4E48]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
// // // //                           <div className="font-body text-xs text-[#999]">₹{item.price.toLocaleString('en-IN')} each</div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </motion.div>
// // // //                 ))}
// // // //               </AnimatePresence>

// // // //               <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer">
// // // //                 ← Continue Shopping
// // // //               </Link>
// // // //             </div>

// // // //             {/* Order Summary */}
// // // //             <div className="lg:col-span-1">
// // // //               <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0EBE3] sticky top-24">
// // // //                 <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-6">Order Summary</h2>

// // // //                 {/* Coupon */}
// // // //                 <div className="flex gap-2 mb-2">
// // // //                   <div className="flex-1 flex items-center gap-2 border border-[#E8DCCB] rounded-xl px-3 py-2.5 bg-[#F8F5F0]">
// // // //                     <FiTag className="w-4 h-4 text-[#C9A86A]" />
// // // //                     <input
// // // //                       type="text"
// // // //                       value={couponCode}
// // // //                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
// // // //                       placeholder="Coupon code"
// // // //                       className="flex-1 bg-transparent font-body text-sm text-[#555] focus:outline-none"
// // // //                       onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
// // // //                     />
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={handleApplyCoupon}
// // // //                     disabled={couponLoading}
// // // //                     className="px-4 py-2.5 bg-[#EFE7DC] text-[#7A4E48] font-body text-xs font-semibold rounded-xl hover:bg-[#E8DCCB] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
// // // //                   >
// // // //                     {couponLoading ? '...' : 'Apply'}
// // // //                   </button>
// // // //                 </div>
// // // //                 {couponMsg && (
// // // //                   <p className={`font-body text-xs mb-4 ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>{couponMsg}</p>
// // // //                 )}
// // // //                 {!couponMsg && <div className="mb-6" />}

// // // //                 <div className="space-y-3 mb-6">
// // // //                   <div className="flex justify-between">
// // // //                     <span className="font-body text-sm text-[#777]">Subtotal ({cart.length} items)</span>
// // // //                     <span className="font-body text-sm font-medium text-[#1F1F1F]">₹{total.toLocaleString('en-IN')}</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span className="font-body text-sm text-[#777]">Shipping</span>
// // // //                     <span className={`font-body text-sm font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1F1F1F]'}`}>
// // // //                       {shipping === 0 ? 'FREE' : `₹${shipping}`}
// // // //                     </span>
// // // //                   </div>
// // // //                   {couponDiscount > 0 && (
// // // //                     <div className="flex justify-between">
// // // //                       <span className="font-body text-sm text-green-600">Coupon discount</span>
// // // //                       <span className="font-body text-sm font-medium text-green-600">-₹{couponDiscount.toLocaleString('en-IN')}</span>
// // // //                     </div>
// // // //                   )}
// // // //                   {savings > 0 && (
// // // //                     <div className="flex justify-between">
// // // //                       <span className="font-body text-sm text-green-600">You save</span>
// // // //                       <span className="font-body text-sm font-medium text-green-600">-₹{savings.toLocaleString('en-IN')}</span>
// // // //                     </div>
// // // //                   )}
// // // //                   <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
// // // //                     <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
// // // //                     <span className="font-heading text-xl font-bold text-[#7A4E48]">
// // // //                       ₹{(total + shipping - couponDiscount).toLocaleString('en-IN')}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>

// // // //                 {total < 999 && (
// // // //                   <div className="text-xs font-body text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5 mb-4">
// // // //                     Add ₹{(999 - total).toLocaleString('en-IN')} more for <span className="text-[#C9A86A] font-semibold">free shipping</span>!
// // // //                   </div>
// // // //                 )}

// // // //                 <motion.button
// // // //                   whileHover={{ scale: 1.02 }}
// // // //                   whileTap={{ scale: 0.98 }}
// // // //                   onClick={handleCheckout}
// // // //                   className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
// // // //                 >
// // // //                   Proceed to Checkout <FiArrowRight className="w-4 h-4" />
// // // //                 </motion.button>

// // // //                 <div className="mt-4 flex items-center justify-center gap-4">
// // // //                   <span className="font-body text-xs text-[#999]">Secure Checkout</span>
// // // //                   <span className="font-body text-xs text-[#999]">•</span>
// // // //                   <span className="font-body text-xs text-[#999]">UPI / Cards / COD</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
// // // import { useState } from 'react';
// // // import toast from 'react-hot-toast';
// // // import { useStore } from '../store/useStore';
// // // import { useAuthStore } from '../store/useAuthStore';
// // // import { apiClient } from '../api/client';
// // // import ConfirmDialog from '../components/ConfirmDialog';

// // // const TOAST_STYLE = {
// // //   fontFamily: 'Outfit, sans-serif',
// // //   background: '#F8F5F0',
// // //   color: '#1F1F1F',
// // //   border: '1px solid #C9A86A',
// // // };

// // // export default function Cart() {
// // //   const { cart, updateQuantity, removeFromCart, removeFromCartByServerId, cartTotal } = useStore();
// // //   const { isAuthenticated } = useAuthStore();
// // //   const navigate = useNavigate();
// // //   const total = cartTotal();
// // //   const shipping = total >= 999 ? 0 : 99;
// // //   const savings = cart.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.quantity, 0);

// // //   const [couponCode, setCouponCode] = useState('');
// // //   const [couponLoading, setCouponLoading] = useState(false);
// // //   const [couponDiscount, setCouponDiscount] = useState(0);
// // //   const [couponMsg, setCouponMsg] = useState('');

// // //   // Confirm delete state — stores the item to delete
// // //   const [deleteItem, setDeleteItem] = useState<{ productId: number; serverId?: number } | null>(null);
// // //   const [deleting, setDeleting] = useState(false);

// // //   const handleApplyCoupon = async () => {
// // //     if (!couponCode.trim()) return;
// // //     if (!isAuthenticated) { toast.error('Sign in to use coupon codes', { style: TOAST_STYLE }); return; }
// // //     setCouponLoading(true);
// // //     setCouponMsg('');
// // //     try {
// // //       const res = await apiClient.post('/coupons/validate', { code: couponCode.trim().toUpperCase(), order_total: total });
// // //       const d = res.data.data;
// // //       if (d.valid) { setCouponDiscount(Number(d.discount_amount)); setCouponMsg(d.message); toast.success(d.message, { style: TOAST_STYLE }); }
// // //       else { setCouponDiscount(0); setCouponMsg(d.message); toast.error(d.message, { style: TOAST_STYLE }); }
// // //     } catch { setCouponMsg('Could not validate coupon'); }
// // //     finally { setCouponLoading(false); }
// // //   };

// // //   const handleConfirmDelete = async () => {
// // //     if (!deleteItem) return;
// // //     setDeleting(true);
// // //     // Use _serverId directly if available — avoids wrong-item bug when
// // //     // same product appears twice with different sizes
// // //     if (deleteItem.serverId) {
// // //       await removeFromCartByServerId(deleteItem.serverId);
// // //     } else {
// // //       await removeFromCart(deleteItem.productId);
// // //     }
// // //     setDeleting(false);
// // //     setDeleteItem(null);
// // //   };

// // //   const handleCheckout = () => {
// // //     if (!isAuthenticated) {
// // //       navigate('/login', { state: { from: '/checkout' } });
// // //       return;
// // //     }
// // //     navigate('/checkout');
// // //   };

// // //   return (
// // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// // //       <div className="bg-[#EFE7DC] py-12">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">Your Cart</h1>
// // //           <p className="font-body text-sm text-[#777] mt-2">
// // //             {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// // //         {cart.length === 0 ? (
// // //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
// // //             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// // //               <FiShoppingBag className="w-10 h-10 text-[#C9A86A]" />
// // //             </div>
// // //             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your cart is empty</h2>
// // //             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
// // //               Looks like you haven't added anything yet. Explore our beautiful collection!
// // //             </p>
// // //             <Link to="/shop" className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer">
// // //               Continue Shopping <FiArrowRight className="w-4 h-4" />
// // //             </Link>
// // //           </motion.div>
// // //         ) : (
// // //           <div className="grid lg:grid-cols-3 gap-8">
// // //             {/* Cart Items */}
// // //             <div className="lg:col-span-2 space-y-4">
// // //               <AnimatePresence>
// // //                 {cart.map((item) => (
// // //                   <motion.div
// // //                     key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
// // //                     initial={{ opacity: 0, x: -20 }}
// // //                     animate={{ opacity: 1, x: 0 }}
// // //                     exit={{ opacity: 0, x: -40, height: 0 }}
// // //                     transition={{ duration: 0.3 }}
// // //                     className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-[#F0EBE3]"
// // //                   >
// // //                     <Link to={`/product/${item.id}`} className="cursor-pointer flex-shrink-0">
// // //                       <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#F8F5F0]">
// // //                         <img
// // //                           src={item.images[0]}
// // //                           alt={item.title}
// // //                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// // //                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80'; }}
// // //                         />
// // //                       </div>
// // //                     </Link>

// // //                     <div className="flex-1 min-w-0">
// // //                       <div className="flex items-start justify-between gap-2">
// // //                         <div>
// // //                           <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">{item.category}</span>
// // //                           <Link to={`/product/${item.id}`} className="cursor-pointer block">
// // //                             <h3 className="font-heading text-base font-semibold text-[#1F1F1F] leading-tight hover:text-[#7A4E48] transition-colors line-clamp-2 mt-0.5">{item.title}</h3>
// // //                           </Link>
// // //                           <div className="flex items-center gap-2 mt-1.5 flex-wrap">
// // //                             {/* Always show size */}
// // //                             {item.selectedSize && (
// // //                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
// // //                                 Size: {item.selectedSize}
// // //                               </span>
// // //                             )}
// // //                             {/* Only show color if it's a real color (not the 'Default' sentinel) */}
// // //                             {item.selectedColor && item.selectedColor !== 'Default' && (
// // //                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
// // //                                 {item.selectedColor}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         {/* Delete triggers confirm dialog with item identity */}
// // //                         <button
// // //                           onClick={() => setDeleteItem({ productId: item.id, serverId: item._serverId })}
// // //                           className="p-2 rounded-lg hover:bg-[#FFF0F0] transition-colors cursor-pointer flex-shrink-0"
// // //                         >
// // //                           <FiTrash2 className="w-4 h-4 text-[#C58C85]" />
// // //                         </button>
// // //                       </div>

// // //                       <div className="flex items-center justify-between mt-4">
// // //                         <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden bg-[#F8F5F0]">
// // //                           <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer">
// // //                             <FiMinus className="w-3 h-3 text-[#555]" />
// // //                           </button>
// // //                           <span className="w-10 text-center font-body text-sm font-medium text-[#1F1F1F]">{item.quantity}</span>
// // //                           <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer">
// // //                             <FiPlus className="w-3 h-3 text-[#555]" />
// // //                           </button>
// // //                         </div>
// // //                         <div className="text-right">
// // //                           <div className="font-heading text-lg font-bold text-[#7A4E48]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
// // //                           <div className="font-body text-xs text-[#999]">₹{item.price.toLocaleString('en-IN')} each</div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </motion.div>
// // //                 ))}
// // //               </AnimatePresence>

// // //               <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer">
// // //                 ← Continue Shopping
// // //               </Link>
// // //             </div>

// // //             {/* Order Summary */}
// // //             <div className="lg:col-span-1">
// // //               <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0EBE3] sticky top-24">
// // //                 <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-6">Order Summary</h2>

// // //                 {/* Coupon */}
// // //                 <div className="flex gap-2 mb-2">
// // //                   <div className="flex-1 flex items-center gap-2 border border-[#E8DCCB] rounded-xl px-3 py-2.5 bg-[#F8F5F0]">
// // //                     <FiTag className="w-4 h-4 text-[#C9A86A]" />
// // //                     <input
// // //                       type="text"
// // //                       value={couponCode}
// // //                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
// // //                       placeholder="Coupon code"
// // //                       className="flex-1 bg-transparent font-body text-sm text-[#555] focus:outline-none"
// // //                       onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
// // //                     />
// // //                   </div>
// // //                   <button
// // //                     onClick={handleApplyCoupon}
// // //                     disabled={couponLoading}
// // //                     className="px-4 py-2.5 bg-[#EFE7DC] text-[#7A4E48] font-body text-xs font-semibold rounded-xl hover:bg-[#E8DCCB] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
// // //                   >
// // //                     {couponLoading ? '...' : 'Apply'}
// // //                   </button>
// // //                 </div>
// // //                 {couponMsg && (
// // //                   <p className={`font-body text-xs mb-4 ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>{couponMsg}</p>
// // //                 )}
// // //                 {!couponMsg && <div className="mb-6" />}

// // //                 <div className="space-y-3 mb-6">
// // //                   <div className="flex justify-between">
// // //                     <span className="font-body text-sm text-[#777]">Subtotal ({cart.length} items)</span>
// // //                     <span className="font-body text-sm font-medium text-[#1F1F1F]">₹{total.toLocaleString('en-IN')}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="font-body text-sm text-[#777]">Shipping</span>
// // //                     <span className={`font-body text-sm font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1F1F1F]'}`}>
// // //                       {shipping === 0 ? 'FREE' : `₹${shipping}`}
// // //                     </span>
// // //                   </div>
// // //                   {couponDiscount > 0 && (
// // //                     <div className="flex justify-between">
// // //                       <span className="font-body text-sm text-green-600">Coupon discount</span>
// // //                       <span className="font-body text-sm font-medium text-green-600">-₹{couponDiscount.toLocaleString('en-IN')}</span>
// // //                     </div>
// // //                   )}
// // //                   {savings > 0 && (
// // //                     <div className="flex justify-between">
// // //                       <span className="font-body text-sm text-green-600">You save</span>
// // //                       <span className="font-body text-sm font-medium text-green-600">-₹{savings.toLocaleString('en-IN')}</span>
// // //                     </div>
// // //                   )}
// // //                   <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
// // //                     <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
// // //                     <span className="font-heading text-xl font-bold text-[#7A4E48]">
// // //                       ₹{(total + shipping - couponDiscount).toLocaleString('en-IN')}
// // //                     </span>
// // //                   </div>
// // //                 </div>

// // //                 {total < 999 && (
// // //                   <div className="text-xs font-body text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5 mb-4">
// // //                     Add ₹{(999 - total).toLocaleString('en-IN')} more for <span className="text-[#C9A86A] font-semibold">free shipping</span>!
// // //                   </div>
// // //                 )}

// // //                 <motion.button
// // //                   whileHover={{ scale: 1.02 }}
// // //                   whileTap={{ scale: 0.98 }}
// // //                   onClick={handleCheckout}
// // //                   className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
// // //                 >
// // //                   Proceed to Checkout <FiArrowRight className="w-4 h-4" />
// // //                 </motion.button>

// // //                 <div className="mt-4 flex items-center justify-center gap-4">
// // //                   <span className="font-body text-xs text-[#999]">Secure Checkout</span>
// // //                   <span className="font-body text-xs text-[#999]">•</span>
// // //                   <span className="font-body text-xs text-[#999]">UPI / Cards / COD</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Confirm delete dialog */}
// // //       <ConfirmDialog
// // //         open={deleteItem !== null}
// // //         title="Remove from Cart?"
// // //         message="This item will be removed from your cart."
// // //         confirmLabel="Remove"
// // //         cancelLabel="Keep"
// // //         loading={deleting}
// // //         onConfirm={handleConfirmDelete}
// // //         onClose={() => setDeleteItem(null)}
// // //       />
// // //     </div>
// // //   );
// // // }

// // import { Link, useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
// // import { useState } from 'react';
// // import toast from 'react-hot-toast';
// // import { useStore } from '../store/useStore';
// // import { useAuthStore } from '../store/useAuthStore';
// // import { apiClient } from '../api/client';
// // import ConfirmDialog from '../components/ConfirmDialog';

// // const TOAST_STYLE = {
// //   fontFamily: 'Outfit, sans-serif',
// //   background: '#F8F5F0',
// //   color: '#1F1F1F',
// //   border: '1px solid #C9A86A',
// // };

// // export default function Cart() {
// //   const {
// //     cart,
// //     updateQuantity,
// //     updateQuantityByServerId,
// //     removeFromCart,
// //     removeFromCartByServerId,
// //     cartTotal,
// //   } = useStore();
// //   const { isAuthenticated } = useAuthStore();
// //   const navigate = useNavigate();

// //   const total = cartTotal();
// //   const shipping = total >= 999 ? 0 : 99;
// //   const savings = cart.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.quantity, 0);

// //   const [couponCode, setCouponCode] = useState('');
// //   const [couponLoading, setCouponLoading] = useState(false);
// //   const [couponDiscount, setCouponDiscount] = useState(0);
// //   const [couponMsg, setCouponMsg] = useState('');

// //   // Confirm delete — stores the exact item identity to avoid wrong-item removal
// //   const [deleteItem, setDeleteItem] = useState<{ productId: number; serverId?: number } | null>(null);
// //   const [deleting, setDeleting] = useState(false);

// //   // ── Quantity handler ──────────────────────────────────────────────────────
// //   // Uses _serverId directly when authenticated so the correct cart row is
// //   // updated even when the same product appears twice with different sizes.
// //   // Clamps minimum to 1 — the minus button never removes an item, only the
// //   // trash button does (after a confirm dialog).
// //   const handleQuantityChange = (item: typeof cart[0], delta: number) => {
// //     const newQty = Math.max(1, item.quantity + delta); // never go below 1
// //     if (isAuthenticated && item._serverId) {
// //       updateQuantityByServerId(item._serverId, newQty);
// //     } else {
// //       updateQuantity(item.id, newQty);
// //     }
// //   };

// //   // ── Remove handler ────────────────────────────────────────────────────────
// //   const handleConfirmDelete = async () => {
// //     if (!deleteItem) return;
// //     setDeleting(true);
// //     if (deleteItem.serverId) {
// //       await removeFromCartByServerId(deleteItem.serverId);
// //     } else {
// //       await removeFromCart(deleteItem.productId);
// //     }
// //     setDeleting(false);
// //     setDeleteItem(null);
// //   };

// //   const handleApplyCoupon = async () => {
// //     if (!couponCode.trim()) return;
// //     if (!isAuthenticated) {
// //       toast.error('Sign in to use coupon codes', { style: TOAST_STYLE });
// //       return;
// //     }
// //     setCouponLoading(true);
// //     setCouponMsg('');
// //     try {
// //       const res = await apiClient.post('/coupons/validate', {
// //         code: couponCode.trim().toUpperCase(),
// //         order_total: total,
// //       });
// //       const d = res.data.data;
// //       if (d.valid) {
// //         setCouponDiscount(Number(d.discount_amount));
// //         setCouponMsg(d.message);
// //         toast.success(d.message, { style: TOAST_STYLE });
// //       } else {
// //         setCouponDiscount(0);
// //         setCouponMsg(d.message);
// //         toast.error(d.message, { style: TOAST_STYLE });
// //       }
// //     } catch {
// //       setCouponMsg('Could not validate coupon');
// //     } finally {
// //       setCouponLoading(false);
// //     }
// //   };

// //   const handleCheckout = () => {
// //     if (!isAuthenticated) {
// //       navigate('/login', { state: { from: '/checkout' } });
// //       return;
// //     }
// //     navigate('/checkout');
// //   };

// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// //       <div className="bg-[#EFE7DC] py-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">Your Cart</h1>
// //           <p className="font-body text-sm text-[#777] mt-2">
// //             {cart.length === 0
// //               ? 'Your cart is empty'
// //               : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// //         {cart.length === 0 ? (
// //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
// //             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// //               <FiShoppingBag className="w-10 h-10 text-[#C9A86A]" />
// //             </div>
// //             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your cart is empty</h2>
// //             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
// //               Looks like you haven't added anything yet. Explore our beautiful collection!
// //             </p>
// //             <Link
// //               to="/shop"
// //               className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //             >
// //               Continue Shopping <FiArrowRight className="w-4 h-4" />
// //             </Link>
// //           </motion.div>
// //         ) : (
// //           <div className="grid lg:grid-cols-3 gap-8">
// //             {/* Cart Items */}
// //             <div className="lg:col-span-2 space-y-4">
// //               <AnimatePresence initial={false}>
// //                 {cart.map((item) => (
// //                   <motion.div
// //                     // Key uses serverId when available so React correctly
// //                     // identifies the same logical item after server sync
// //                     key={item._serverId ?? `${item.id}-${item.selectedSize}-${item.selectedColor}`}
// //                     initial={{ opacity: 0, x: -20 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     exit={{ opacity: 0, x: -40 }}
// //                     transition={{ duration: 0.25 }}
// //                     layout
// //                     className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-[#F0EBE3]"
// //                   >
// //                     <Link to={`/product/${item.id}`} className="cursor-pointer flex-shrink-0">
// //                       <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#F8F5F0]">
// //                         <img
// //                           src={item.images[0]}
// //                           alt={item.title}
// //                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// //                           onError={(e) => {
// //                             (e.target as HTMLImageElement).src =
// //                               'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80';
// //                           }}
// //                         />
// //                       </div>
// //                     </Link>

// //                     <div className="flex-1 min-w-0">
// //                       <div className="flex items-start justify-between gap-2">
// //                         <div>
// //                           <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
// //                             {item.category}
// //                           </span>
// //                           <Link to={`/product/${item.id}`} className="cursor-pointer block">
// //                             <h3 className="font-heading text-base font-semibold text-[#1F1F1F] leading-tight hover:text-[#7A4E48] transition-colors line-clamp-2 mt-0.5">
// //                               {item.title}
// //                             </h3>
// //                           </Link>
// //                           <div className="flex items-center gap-2 mt-1.5 flex-wrap">
// //                             {/* Always show size */}
// //                             {item.selectedSize && (
// //                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
// //                                 Size: {item.selectedSize}
// //                               </span>
// //                             )}
// //                             {/* Only show color if it's a real color, not the sentinel */}
// //                             {item.selectedColor && item.selectedColor !== 'Default' && (
// //                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
// //                                 {item.selectedColor}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </div>
// //                         <button
// //                           onClick={() => setDeleteItem({ productId: item.id, serverId: item._serverId })}
// //                           className="p-2 rounded-lg hover:bg-[#FFF0F0] transition-colors cursor-pointer flex-shrink-0"
// //                         >
// //                           <FiTrash2 className="w-4 h-4 text-[#C58C85]" />
// //                         </button>
// //                       </div>

// //                       <div className="flex items-center justify-between mt-4">
// //                         {/* Quantity controls — minus clamps to 1, never removes */}
// //                         <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden bg-[#F8F5F0]">
// //                           <button
// //                             onClick={() => handleQuantityChange(item, -1)}
// //                             disabled={item.quantity <= 1}
// //                             className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
// //                           >
// //                             <FiMinus className="w-3 h-3 text-[#555]" />
// //                           </button>
// //                           <span className="w-10 text-center font-body text-sm font-medium text-[#1F1F1F]">
// //                             {item.quantity}
// //                           </span>
// //                           <button
// //                             onClick={() => handleQuantityChange(item, +1)}
// //                             className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// //                           >
// //                             <FiPlus className="w-3 h-3 text-[#555]" />
// //                           </button>
// //                         </div>
// //                         <div className="text-right">
// //                           <div className="font-heading text-lg font-bold text-[#7A4E48]">
// //                             ₹{(item.price * item.quantity).toLocaleString('en-IN')}
// //                           </div>
// //                           <div className="font-body text-xs text-[#999]">
// //                             ₹{item.price.toLocaleString('en-IN')} each
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </AnimatePresence>

// //               <Link
// //                 to="/shop"
// //                 className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer"
// //               >
// //                 ← Continue Shopping
// //               </Link>
// //             </div>

// //             {/* Order Summary */}
// //             <div className="lg:col-span-1">
// //               <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0EBE3] sticky top-24">
// //                 <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-6">Order Summary</h2>

// //                 {/* Coupon */}
// //                 <div className="flex gap-2 mb-2">
// //                   <div className="flex-1 flex items-center gap-2 border border-[#E8DCCB] rounded-xl px-3 py-2.5 bg-[#F8F5F0]">
// //                     <FiTag className="w-4 h-4 text-[#C9A86A]" />
// //                     <input
// //                       type="text"
// //                       value={couponCode}
// //                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
// //                       placeholder="Coupon code"
// //                       className="flex-1 bg-transparent font-body text-sm text-[#555] focus:outline-none"
// //                       onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
// //                     />
// //                   </div>
// //                   <button
// //                     onClick={handleApplyCoupon}
// //                     disabled={couponLoading}
// //                     className="px-4 py-2.5 bg-[#EFE7DC] text-[#7A4E48] font-body text-xs font-semibold rounded-xl hover:bg-[#E8DCCB] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
// //                   >
// //                     {couponLoading ? '...' : 'Apply'}
// //                   </button>
// //                 </div>
// //                 {couponMsg && (
// //                   <p className={`font-body text-xs mb-4 ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>
// //                     {couponMsg}
// //                   </p>
// //                 )}
// //                 {!couponMsg && <div className="mb-6" />}

// //                 <div className="space-y-3 mb-6">
// //                   <div className="flex justify-between">
// //                     <span className="font-body text-sm text-[#777]">Subtotal ({cart.length} items)</span>
// //                     <span className="font-body text-sm font-medium text-[#1F1F1F]">₹{total.toLocaleString('en-IN')}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="font-body text-sm text-[#777]">Shipping</span>
// //                     <span className={`font-body text-sm font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1F1F1F]'}`}>
// //                       {shipping === 0 ? 'FREE' : `₹${shipping}`}
// //                     </span>
// //                   </div>
// //                   {couponDiscount > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="font-body text-sm text-green-600">Coupon discount</span>
// //                       <span className="font-body text-sm font-medium text-green-600">
// //                         -₹{couponDiscount.toLocaleString('en-IN')}
// //                       </span>
// //                     </div>
// //                   )}
// //                   {savings > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="font-body text-sm text-green-600">You save</span>
// //                       <span className="font-body text-sm font-medium text-green-600">
// //                         -₹{savings.toLocaleString('en-IN')}
// //                       </span>
// //                     </div>
// //                   )}
// //                   <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
// //                     <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
// //                     <span className="font-heading text-xl font-bold text-[#7A4E48]">
// //                       ₹{(total + shipping - couponDiscount).toLocaleString('en-IN')}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {total < 999 && (
// //                   <div className="text-xs font-body text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5 mb-4">
// //                     Add ₹{(999 - total).toLocaleString('en-IN')} more for{' '}
// //                     <span className="text-[#C9A86A] font-semibold">free shipping</span>!
// //                   </div>
// //                 )}

// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   onClick={handleCheckout}
// //                   className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
// //                 >
// //                   Proceed to Checkout <FiArrowRight className="w-4 h-4" />
// //                 </motion.button>

// //                 <div className="mt-4 flex items-center justify-center gap-4">
// //                   <span className="font-body text-xs text-[#999]">Secure Checkout</span>
// //                   <span className="font-body text-xs text-[#999]">•</span>
// //                   <span className="font-body text-xs text-[#999]">UPI / Cards / COD</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Confirm delete dialog */}
// //       <ConfirmDialog
// //         open={deleteItem !== null}
// //         title="Remove from Cart?"
// //         message="This item will be removed from your cart."
// //         confirmLabel="Remove"
// //         cancelLabel="Keep"
// //         loading={deleting}
// //         onConfirm={handleConfirmDelete}
// //         onClose={() => setDeleteItem(null)}
// //       />
// //     </div>
// //   );
// // }

// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import { useStore } from '../store/useStore';
// import { useAuthStore } from '../store/useAuthStore';
// import { apiClient } from '../api/client';
// import ConfirmDialog from '../components/ConfirmDialog';

// const TOAST_STYLE = {
//   fontFamily: 'Outfit, sans-serif',
//   background: '#F8F5F0',
//   color: '#1F1F1F',
//   border: '1px solid #C9A86A',
// };

// export default function Cart() {
//   const {
//     cart,
//     updateQuantity,
//     updateQuantityByServerId,
//     removeFromCart,
//     removeFromCartByServerId,
//     loadServerCart,
//     cartTotal,
//   } = useStore();

//   const { isAuthenticated } = useAuthStore();
//   const navigate = useNavigate();

//   const total = cartTotal();
//   const shipping = total >= 999 ? 0 : 99;
//   const savings = cart.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.quantity, 0);

//   const [couponCode, setCouponCode] = useState('');
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [couponMsg, setCouponMsg] = useState('');

//   const [deleteItem, setDeleteItem] = useState<{ productId: number; serverId?: number } | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated) {
//       loadServerCart();
//     }
//   }, [isAuthenticated, loadServerCart]);

//   const handleQuantityChange = (item: typeof cart[0], delta: number) => {
//     const newQty = Math.max(1, item.quantity + delta);

//     if (isAuthenticated && item._serverId) {
//       updateQuantityByServerId(item._serverId, newQty);
//     } else {
//       updateQuantity(item.id, newQty);
//     }
//   };

//   const handleConfirmDelete = async () => {
//     if (!deleteItem) return;

//     setDeleting(true);

//     try {
//       if (deleteItem.serverId) {
//         await removeFromCartByServerId(deleteItem.serverId);
//       } else {
//         await removeFromCart(deleteItem.productId);
//       }
//       setDeleteItem(null);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleApplyCoupon = async () => {
//     if (!couponCode.trim()) return;

//     if (!isAuthenticated) {
//       toast.error('Sign in to use coupon codes', { style: TOAST_STYLE });
//       return;
//     }

//     setCouponLoading(true);
//     setCouponMsg('');

//     try {
//       const res = await apiClient.post('/coupons/validate', {
//         code: couponCode.trim().toUpperCase(),
//         order_total: total,
//       });

//       const d = res.data.data;

//       if (d.valid) {
//         setCouponDiscount(Number(d.discount_amount));
//         setCouponMsg(d.message);
//         toast.success(d.message, { style: TOAST_STYLE });
//       } else {
//         setCouponDiscount(0);
//         setCouponMsg(d.message);
//         toast.error(d.message, { style: TOAST_STYLE });
//       }
//     } catch {
//       setCouponDiscount(0);
//       setCouponMsg('Could not validate coupon');
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const handleCheckout = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: '/checkout' } });
//       return;
//     }

//     navigate('/checkout');
//   };

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       {deleting && (
//         <div className="fixed inset-0 z-[120] bg-black/30 backdrop-blur-sm flex items-center justify-center">
//           <div className="bg-white border border-[#E8DCCB] rounded-2xl px-6 py-5 shadow-2xl flex items-center gap-3">
//             <div className="w-5 h-5 border-2 border-[#E8DCCB] border-t-[#7A4E48] rounded-full animate-spin" />
//             <span className="font-body text-sm font-semibold text-[#1F1F1F]">Removing item...</span>
//           </div>
//         </div>
//       )}

//       <div className="bg-[#EFE7DC] py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">Your Cart</h1>
//           <p className="font-body text-sm text-[#777] mt-2">
//             {cart.length === 0
//               ? 'Your cart is empty'
//               : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {cart.length === 0 ? (
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
//             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
//               <FiShoppingBag className="w-10 h-10 text-[#C9A86A]" />
//             </div>
//             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your cart is empty</h2>
//             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
//               Looks like you haven't added anything yet. Explore our beautiful collection!
//             </p>
//             <Link
//               to="/shop"
//               className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
//             >
//               Continue Shopping <FiArrowRight className="w-4 h-4" />
//             </Link>
//           </motion.div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-4">
//               <AnimatePresence initial={false}>
//                 {cart.map((item) => (
//                   <motion.div
//                     key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
//                     initial={{ opacity: 0, x: -16 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -32 }}
//                     transition={{ duration: 0.22 }}
//                     className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-[#F0EBE3]"
//                   >
//                     <Link to={`/product/${item.id}`} className="cursor-pointer flex-shrink-0">
//                       <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#F8F5F0]">
//                         <img
//                           src={item.images[0]}
//                           alt={item.title}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).src =
//                               'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80';
//                           }}
//                         />
//                       </div>
//                     </Link>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-2">
//                         <div>
//                           <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
//                             {item.category}
//                           </span>

//                           <Link to={`/product/${item.id}`} className="cursor-pointer block">
//                             <h3 className="font-heading text-base font-semibold text-[#1F1F1F] leading-tight hover:text-[#7A4E48] transition-colors line-clamp-2 mt-0.5">
//                               {item.title}
//                             </h3>
//                           </Link>

//                           <div className="flex items-center gap-2 mt-1.5 flex-wrap">
//                             {item.selectedSize && (
//                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
//                                 Size: {item.selectedSize}
//                               </span>
//                             )}

//                             {item.selectedColor && item.selectedColor !== 'Default' && (
//                               <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
//                                 {item.selectedColor}
//                               </span>
//                             )}
//                           </div>
//                         </div>

//                         <button
//                           onClick={() => setDeleteItem({ productId: item.id, serverId: item._serverId })}
//                           className="p-2 rounded-lg hover:bg-[#FFF0F0] transition-colors cursor-pointer flex-shrink-0"
//                         >
//                           <FiTrash2 className="w-4 h-4 text-[#C58C85]" />
//                         </button>
//                       </div>

//                       <div className="flex items-center justify-between mt-4">
//                         <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden bg-[#F8F5F0]">
//                           <button
//                             onClick={() => handleQuantityChange(item, -1)}
//                             disabled={item.quantity <= 1}
//                             className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
//                           >
//                             <FiMinus className="w-3 h-3 text-[#555]" />
//                           </button>

//                           <span className="w-10 text-center font-body text-sm font-medium text-[#1F1F1F]">
//                             {item.quantity}
//                           </span>

//                           <button
//                             onClick={() => handleQuantityChange(item, 1)}
//                             className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer"
//                           >
//                             <FiPlus className="w-3 h-3 text-[#555]" />
//                           </button>
//                         </div>

//                         <div className="text-right">
//                           <div className="font-heading text-lg font-bold text-[#7A4E48]">
//                             ₹{(item.price * item.quantity).toLocaleString('en-IN')}
//                           </div>
//                           <div className="font-body text-xs text-[#999]">
//                             ₹{item.price.toLocaleString('en-IN')} each
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               <Link
//                 to="/shop"
//                 className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer"
//               >
//                 ← Continue Shopping
//               </Link>
//             </div>

//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0EBE3] sticky top-24">
//                 <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-6">Order Summary</h2>

//                 <div className="flex gap-2 mb-2">
//                   <div className="flex-1 flex items-center gap-2 border border-[#E8DCCB] rounded-xl px-3 py-2.5 bg-[#F8F5F0]">
//                     <FiTag className="w-4 h-4 text-[#C9A86A]" />
//                     <input
//                       type="text"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                       placeholder="Coupon code"
//                       className="flex-1 bg-transparent font-body text-sm text-[#555] focus:outline-none"
//                       onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
//                     />
//                   </div>

//                   <button
//                     onClick={handleApplyCoupon}
//                     disabled={couponLoading}
//                     className="px-4 py-2.5 bg-[#EFE7DC] text-[#7A4E48] font-body text-xs font-semibold rounded-xl hover:bg-[#E8DCCB] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
//                   >
//                     {couponLoading ? '...' : 'Apply'}
//                   </button>
//                 </div>

//                 {couponMsg && (
//                   <p className={`font-body text-xs mb-4 ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>
//                     {couponMsg}
//                   </p>
//                 )}

//                 {!couponMsg && <div className="mb-6" />}

//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="font-body text-sm text-[#777]">Subtotal ({cart.length} items)</span>
//                     <span className="font-body text-sm font-medium text-[#1F1F1F]">
//                       ₹{total.toLocaleString('en-IN')}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="font-body text-sm text-[#777]">Shipping</span>
//                     <span className={`font-body text-sm font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1F1F1F]'}`}>
//                       {shipping === 0 ? 'FREE' : `₹${shipping}`}
//                     </span>
//                   </div>

//                   {couponDiscount > 0 && (
//                     <div className="flex justify-between">
//                       <span className="font-body text-sm text-green-600">Coupon discount</span>
//                       <span className="font-body text-sm font-medium text-green-600">
//                         -₹{couponDiscount.toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                   )}

//                   {savings > 0 && (
//                     <div className="flex justify-between">
//                       <span className="font-body text-sm text-green-600">You save</span>
//                       <span className="font-body text-sm font-medium text-green-600">
//                         -₹{savings.toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                   )}

//                   <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
//                     <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
//                     <span className="font-heading text-xl font-bold text-[#7A4E48]">
//                       ₹{(total + shipping - couponDiscount).toLocaleString('en-IN')}
//                     </span>
//                   </div>
//                 </div>

//                 {total < 999 && (
//                   <div className="text-xs font-body text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5 mb-4">
//                     Add ₹{(999 - total).toLocaleString('en-IN')} more for{' '}
//                     <span className="text-[#C9A86A] font-semibold">free shipping</span>!
//                   </div>
//                 )}

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleCheckout}
//                   className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
//                 >
//                   Proceed to Checkout <FiArrowRight className="w-4 h-4" />
//                 </motion.button>

//                 <div className="mt-4 flex items-center justify-center gap-4">
//                   <span className="font-body text-xs text-[#999]">Secure Checkout</span>
//                   <span className="font-body text-xs text-[#999]">•</span>
//                   <span className="font-body text-xs text-[#999]">UPI / Cards / COD</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <ConfirmDialog
//         open={deleteItem !== null}
//         title="Remove from Cart?"
//         message="This item will be removed from your cart."
//         confirmLabel="Remove"
//         cancelLabel="Keep"
//         loading={deleting}
//         onConfirm={handleConfirmDelete}
//         onClose={() => !deleting && setDeleteItem(null)}
//       />
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { apiClient } from '../api/client';
import ConfirmDialog from '../components/ConfirmDialog';

const TOAST_STYLE = {
  fontFamily: 'Outfit, sans-serif',
  background: '#F8F5F0',
  color: '#1F1F1F',
  border: '1px solid #C9A86A',
};

export default function Cart() {
  const {
    cart,
    updateQuantity,
    updateQuantityByServerId,
    removeFromCartLine,
    loadServerCart,
    cartTotal,
  } = useStore();

  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const total = cartTotal();
  const shipping = total >= 999 ? 0 : 99;
  const savings = cart.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.quantity, 0);

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const [deleteItem, setDeleteItem] = useState<{
    productId: number;
    selectedSize: string;
    selectedColor: string;
    serverId?: number;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadServerCart();
    }
  }, [isAuthenticated, loadServerCart]);

  const handleQuantityChange = (item: typeof cart[0], delta: number) => {
    const newQty = Math.max(1, item.quantity + delta);

    if (isAuthenticated && item._serverId) {
      updateQuantityByServerId(item._serverId, newQty);
    } else {
      updateQuantity(item.id, newQty);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    setDeleting(true);

    try {
      await removeFromCartLine(
        deleteItem.productId,
        deleteItem.selectedSize,
        deleteItem.selectedColor,
        deleteItem.serverId
      );
      await loadServerCart();
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    if (!isAuthenticated) {
      toast.error('Sign in to use coupon codes', { style: TOAST_STYLE });
      return;
    }

    setCouponLoading(true);
    setCouponMsg('');

    try {
      const res = await apiClient.post('/coupons/validate', {
        code: couponCode.trim().toUpperCase(),
        order_total: total,
      });

      const d = res.data.data;

      if (d.valid) {
        setCouponDiscount(Number(d.discount_amount));
        setCouponMsg(d.message);
        toast.success(d.message, { style: TOAST_STYLE });
      } else {
        setCouponDiscount(0);
        setCouponMsg(d.message);
        toast.error(d.message, { style: TOAST_STYLE });
      }
    } catch {
      setCouponDiscount(0);
      setCouponMsg('Could not validate coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      {deleting && (
        <div className="fixed inset-0 z-[120] bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white border border-[#E8DCCB] rounded-2xl px-6 py-5 shadow-2xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#E8DCCB] border-t-[#7A4E48] rounded-full animate-spin" />
            <span className="font-body text-sm font-semibold text-[#1F1F1F]">Loading...</span>
          </div>
        </div>
      )}

      <div className="bg-[#EFE7DC] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">Your Cart</h1>
          <p className="font-body text-sm text-[#777] mt-2">
            {cart.length === 0
              ? 'Your cart is empty'
              : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cart.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="w-10 h-10 text-[#C9A86A]" />
            </div>
            <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your cart is empty</h2>
            <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
              Looks like you haven't added anything yet. Explore our beautiful collection!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
            >
              Continue Shopping <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -32 }}
                    transition={{ duration: 0.22 }}
                    className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-[#F0EBE3]"
                  >
                    <Link to={`/product/${item.id}`} className="cursor-pointer flex-shrink-0">
                      <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#F8F5F0]">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80';
                          }}
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
                            {item.category}
                          </span>

                          <Link to={`/product/${item.id}`} className="cursor-pointer block">
                            <h3 className="font-heading text-base font-semibold text-[#1F1F1F] leading-tight hover:text-[#7A4E48] transition-colors line-clamp-2 mt-0.5">
                              {item.title}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            {item.selectedSize && (
                              <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
                                Size: {item.selectedSize}
                              </span>
                            )}

                            {item.selectedColor && item.selectedColor !== 'Default' && (
                              <span className="font-body text-xs text-[#777] bg-[#F8F5F0] px-2 py-0.5 rounded-md">
                                {item.selectedColor}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setDeleteItem({
                              productId: item.id,
                              selectedSize: item.selectedSize,
                              selectedColor: item.selectedColor,
                              serverId: item._serverId,
                            })
                          }
                          className="p-2 rounded-lg hover:bg-[#FFF0F0] transition-colors cursor-pointer flex-shrink-0"
                        >
                          <FiTrash2 className="w-4 h-4 text-[#C58C85]" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden bg-[#F8F5F0]">
                          <button
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <FiMinus className="w-3 h-3 text-[#555]" />
                          </button>

                          <span className="w-10 text-center font-body text-sm font-medium text-[#1F1F1F]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer"
                          >
                            <FiPlus className="w-3 h-3 text-[#555]" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-heading text-lg font-bold text-[#7A4E48]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                          <div className="font-body text-xs text-[#999]">
                            ₹{item.price.toLocaleString('en-IN')} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer"
              >
                ← Continue Shopping
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0EBE3] sticky top-24">
                <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-6">Order Summary</h2>

                <div className="flex gap-2 mb-2">
                  <div className="flex-1 flex items-center gap-2 border border-[#E8DCCB] rounded-xl px-3 py-2.5 bg-[#F8F5F0]">
                    <FiTag className="w-4 h-4 text-[#C9A86A]" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="flex-1 bg-transparent font-body text-sm text-[#555] focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                  </div>

                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="px-4 py-2.5 bg-[#EFE7DC] text-[#7A4E48] font-body text-xs font-semibold rounded-xl hover:bg-[#E8DCCB] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </div>

                {couponMsg && (
                  <p className={`font-body text-xs mb-4 ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {couponMsg}
                  </p>
                )}

                {!couponMsg && <div className="mb-6" />}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#777]">Subtotal ({cart.length} items)</span>
                    <span className="font-body text-sm font-medium text-[#1F1F1F]">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#777]">Shipping</span>
                    <span className={`font-body text-sm font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1F1F1F]'}`}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-green-600">Coupon discount</span>
                      <span className="font-body text-sm font-medium text-green-600">
                        -₹{couponDiscount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-green-600">You save</span>
                      <span className="font-body text-sm font-medium text-green-600">
                        -₹{savings.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
                    <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
                    <span className="font-heading text-xl font-bold text-[#7A4E48]">
                      ₹{(total + shipping - couponDiscount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {total < 999 && (
                  <div className="text-xs font-body text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5 mb-4">
                    Add ₹{(999 - total).toLocaleString('en-IN')} more for{' '}
                    <span className="text-[#C9A86A] font-semibold">free shipping</span>!
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
                >
                  Proceed to Checkout <FiArrowRight className="w-4 h-4" />
                </motion.button>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <span className="font-body text-xs text-[#999]">Secure Checkout</span>
                  <span className="font-body text-xs text-[#999]">•</span>
                  <span className="font-body text-xs text-[#999]">UPI / Cards / COD</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteItem !== null}
        title="Remove from Cart?"
        message="This item will be removed from your cart."
        confirmLabel="Remove"
        cancelLabel="Keep"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => !deleting && setDeleteItem(null)}
      />
    </div>
  );
}
