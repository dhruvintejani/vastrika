// // src/pages/Checkout.tsx
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiArrowLeft, FiArrowRight, FiCheck, FiTag } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import { useStore } from '../store/useStore';
// import { useAuthStore } from '../store/useAuthStore';
// import { ordersApi } from '../api/orders';
// import { apiClient } from '../api/client';

// const PAYMENT_METHODS = [
//   { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
//   { value: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm & more' },
//   { value: 'card', label: 'Credit / Debit Card', desc: 'All major cards accepted' },
//   { value: 'netbanking', label: 'Net Banking', desc: 'All major banks supported' },
// ] as const;

// const INDIAN_STATES = [
//   'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
//   'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
//   'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
//   'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
//   'West Bengal', 'Delhi',
// ];

// const FREE_SHIPPING_THRESHOLD = 999;
// const SHIPPING_CHARGE = 99;

// export default function Checkout() {
//   const { cart, cartTotal, clearServerState } = useStore();
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
//   const [placing, setPlacing] = useState(false);
//   const [couponCode, setCouponCode] = useState('');
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState('');

//   const [address, setAddress] = useState({
//     full_name: user?.full_name || '',
//     phone: user?.phone || '',
//     address_line1: user?.address_line1 || '',
//     address_line2: user?.address_line2 || '',
//     city: user?.city || '',
//     state: user?.state || '',
//     pincode: user?.pincode || '',
//   });
//   const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('cod');
//   const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

//   const subtotal = cartTotal();
//   const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
//   const total = subtotal + shipping - couponDiscount;

//   useEffect(() => {
//     if (cart.length === 0) navigate('/cart', { replace: true });
//   }, [cart.length, navigate]);

//   const validateAddress = () => {
//     const errors: Record<string, string> = {};
//     if (!address.full_name.trim()) errors.full_name = 'Required';
//     if (!address.phone.trim() || address.phone.length < 10) errors.phone = 'Enter a valid phone number';
//     if (!address.address_line1.trim()) errors.address_line1 = 'Required';
//     if (!address.city.trim()) errors.city = 'Required';
//     if (!address.state) errors.state = 'Required';
//     if (!address.pincode.trim() || address.pincode.length < 6) errors.pincode = 'Enter a valid 6-digit pincode';
//     setAddressErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleApplyCoupon = async () => {
//     if (!couponCode.trim()) return;
//     setCouponLoading(true);
//     setCouponMessage('');
//     try {
//       const res = await apiClient.post('/coupons/validate', {
//         code: couponCode.trim().toUpperCase(),
//         order_total: subtotal,
//       });
//       const data = res.data.data;
//       if (data.valid) {
//         setCouponDiscount(Number(data.discount_amount));
//         setCouponMessage(data.message);
//         toast.success(data.message, { style: { fontFamily: 'Outfit, sans-serif', background: '#F8F5F0', color: '#1F1F1F', border: '1px solid #C9A86A' } });
//       } else {
//         setCouponDiscount(0);
//         setCouponMessage(data.message);
//         toast.error(data.message, { style: { fontFamily: 'Outfit, sans-serif' } });
//       }
//     } catch {
//       setCouponMessage('Could not validate coupon');
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     setPlacing(true);
//     try {
//       const res = await ordersApi.create({
//         shipping_address: address,
//         payment_method: paymentMethod,
//       });
//       const order = res.data.data;
//       // Clear cart after successful order
//       clearServerState();
//       toast.success(res.data.message || 'Order placed!', { style: { fontFamily: 'Outfit, sans-serif', background: '#F8F5F0', color: '#1F1F1F', border: '1px solid #C9A86A' } });
//       navigate(`/orders/${order.id}`, { state: { newOrder: true } });
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Failed to place order. Please try again.', { style: { fontFamily: 'Outfit, sans-serif' } });
//     } finally {
//       setPlacing(false);
//     }
//   };

//   const STEPS = ['address', 'payment', 'review'] as const;
//   const stepIndex = STEPS.indexOf(step);

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       {/* Header */}
//       <div className="bg-[#EFE7DC] py-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Link to="/cart" className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-4">
//             <FiArrowLeft className="w-4 h-4" /> Back to Cart
//           </Link>
//           <h1 className="font-heading text-4xl font-semibold text-[#1F1F1F]">Checkout</h1>
//           {/* Step indicators */}
//           <div className="flex items-center gap-2 mt-4">
//             {[{ key: 'address', label: 'Address' }, { key: 'payment', label: 'Payment' }, { key: 'review', label: 'Review' }].map((s, i) => (
//               <div key={s.key} className="flex items-center gap-2">
//                 <div className={`w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-semibold transition-colors ${i < stepIndex ? 'bg-[#7A4E48] text-white' : i === stepIndex ? 'bg-[#7A4E48] text-white' : 'bg-[#E8DCCB] text-[#999]'}`}>
//                   {i < stepIndex ? <FiCheck className="w-3.5 h-3.5" /> : i + 1}
//                 </div>
//                 <span className={`font-body text-sm ${i === stepIndex ? 'text-[#7A4E48] font-semibold' : 'text-[#999]'}`}>{s.label}</span>
//                 {i < 2 && <div className={`w-8 h-px ${i < stepIndex ? 'bg-[#7A4E48]' : 'bg-[#E8DCCB]'}`} />}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left: steps */}
//           <div className="lg:col-span-2">
//             <AnimatePresence mode="wait">
//               {/* Step 1: Address */}
//               {step === 'address' && (
//                 <motion.div key="address" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
//                   <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Shipping Address</h2>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {[
//                       { key: 'full_name', label: 'Full Name *', placeholder: 'Your name', type: 'text', col: 'full' },
//                       { key: 'phone', label: 'Phone *', placeholder: '+91 98765 43210', type: 'tel', col: 'full' },
//                       { key: 'address_line1', label: 'Address Line 1 *', placeholder: 'House / Flat / Block no.', type: 'text', col: 'full' },
//                       { key: 'address_line2', label: 'Address Line 2', placeholder: 'Area, Colony (optional)', type: 'text', col: 'full' },
//                       { key: 'city', label: 'City *', placeholder: 'Mumbai', type: 'text', col: 'half' },
//                       { key: 'pincode', label: 'Pincode *', placeholder: '400001', type: 'text', col: 'half' },
//                     ].map((field) => (
//                       <div key={field.key} className={field.col === 'full' ? 'md:col-span-2' : ''}>
//                         <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">{field.label}</label>
//                         <input
//                           type={field.type}
//                           value={(address as any)[field.key]}
//                           onChange={(e) => setAddress({ ...address, [field.key]: e.target.value })}
//                           placeholder={field.placeholder}
//                           className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${addressErrors[field.key] ? 'border-red-300' : 'border-[#E8DCCB]'}`}
//                         />
//                         {addressErrors[field.key] && <p className="font-body text-xs text-red-500 mt-1">{addressErrors[field.key]}</p>}
//                       </div>
//                     ))}
//                     <div>
//                       <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">State *</label>
//                       <select
//                         value={address.state}
//                         onChange={(e) => setAddress({ ...address, state: e.target.value })}
//                         className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A] transition-colors cursor-pointer ${addressErrors.state ? 'border-red-300' : 'border-[#E8DCCB]'}`}
//                       >
//                         <option value="">Select state</option>
//                         {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
//                       </select>
//                       {addressErrors.state && <p className="font-body text-xs text-red-500 mt-1">{addressErrors.state}</p>}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => { if (validateAddress()) setStep('payment'); }}
//                     className="mt-6 w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
//                   >
//                     Continue to Payment <FiArrowRight className="w-4 h-4" />
//                   </button>
//                 </motion.div>
//               )}

//               {/* Step 2: Payment */}
//               {step === 'payment' && (
//                 <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
//                   <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Payment Method</h2>
//                   <div className="space-y-3">
//                     {PAYMENT_METHODS.map((method) => (
//                       <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.value ? 'border-[#7A4E48] bg-[#F8F5F0]' : 'border-[#E8DCCB] hover:border-[#C9A86A]'}`}>
//                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${paymentMethod === method.value ? 'border-[#7A4E48]' : 'border-[#CCC]'}`}>
//                           {paymentMethod === method.value && <div className="w-2.5 h-2.5 rounded-full bg-[#7A4E48]" />}
//                         </div>
//                         <input type="radio" value={method.value} checked={paymentMethod === method.value} onChange={() => setPaymentMethod(method.value)} className="sr-only" />
//                         <div>
//                           <p className="font-body text-sm font-semibold text-[#1F1F1F]">{method.label}</p>
//                           <p className="font-body text-xs text-[#999]">{method.desc}</p>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                   <div className="flex gap-3 mt-6">
//                     <button onClick={() => setStep('address')} className="flex-1 py-3.5 border border-[#E8DCCB] text-[#777] font-body font-medium text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer">
//                       ← Back
//                     </button>
//                     <button onClick={() => setStep('review')} className="flex-[2] flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md">
//                       Review Order <FiArrowRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 3: Review */}
//               {step === 'review' && (
//                 <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
//                   <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
//                     <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-4">Review Your Order</h2>
//                     <div className="space-y-3">
//                       {cart.map((item) => (
//                         <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-3">
//                           <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#EFE7DC] flex-shrink-0">
//                             {item.images[0] && <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="font-body text-sm font-semibold text-[#1F1F1F] line-clamp-1">{item.title}</p>
//                             <p className="font-body text-xs text-[#777]">{item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}</p>
//                           </div>
//                           <span className="font-body text-sm font-semibold text-[#7A4E48]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Confirm info */}
//                   <div className="grid sm:grid-cols-2 gap-4">
//                     <div className="bg-white rounded-2xl border border-[#E8DCCB] p-5">
//                       <p className="font-body text-xs text-[#999] uppercase tracking-wider mb-2">Delivering to</p>
//                       <p className="font-body text-sm font-semibold text-[#1F1F1F]">{address.full_name}</p>
//                       <p className="font-body text-xs text-[#777] mt-1">{address.address_line1}{address.address_line2 ? `, ${address.address_line2}` : ''}</p>
//                       <p className="font-body text-xs text-[#777]">{address.city}, {address.state} — {address.pincode}</p>
//                       <p className="font-body text-xs text-[#777]">{address.phone}</p>
//                       <button onClick={() => setStep('address')} className="font-body text-xs text-[#C9A86A] hover:text-[#7A4E48] mt-2 cursor-pointer">Change</button>
//                     </div>
//                     <div className="bg-white rounded-2xl border border-[#E8DCCB] p-5">
//                       <p className="font-body text-xs text-[#999] uppercase tracking-wider mb-2">Payment</p>
//                       <p className="font-body text-sm font-semibold text-[#1F1F1F]">{PAYMENT_METHODS.find(m => m.value === paymentMethod)?.label}</p>
//                       <button onClick={() => setStep('payment')} className="font-body text-xs text-[#C9A86A] hover:text-[#7A4E48] mt-2 cursor-pointer">Change</button>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <button onClick={() => setStep('payment')} className="flex-1 py-3.5 border border-[#E8DCCB] text-[#777] font-body font-medium text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer">
//                       ← Back
//                     </button>
//                     <motion.button
//                       onClick={handlePlaceOrder}
//                       disabled={placing}
//                       whileHover={{ scale: placing ? 1 : 1.01 }}
//                       whileTap={{ scale: placing ? 1 : 0.99 }}
//                       className="flex-[2] flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70"
//                     >
//                       {placing ? (
//                         <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
//                       ) : (
//                         <>Place Order · ₹{total.toLocaleString('en-IN')}</>
//                       )}
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Right: Order summary */}
//           <div>
//             <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm sticky top-24">
//               <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-5">Order Summary</h2>

//               {/* Coupon */}
//               <div className="flex gap-2 mb-5">
//                 <div className="flex-1 flex items-center gap-2 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl px-3 py-2.5">
//                   <FiTag className="w-4 h-4 text-[#C9A86A] flex-shrink-0" />
//                   <input
//                     type="text"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                     placeholder="Coupon code"
//                     className="flex-1 bg-transparent font-body text-sm text-[#555] focus:outline-none"
//                     onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
//                   />
//                 </div>
//                 <button
//                   onClick={handleApplyCoupon}
//                   disabled={couponLoading}
//                   className="px-4 py-2.5 bg-[#EFE7DC] text-[#7A4E48] font-body text-xs font-semibold rounded-xl hover:bg-[#E8DCCB] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
//                 >
//                   {couponLoading ? '...' : 'Apply'}
//                 </button>
//               </div>
//               {couponMessage && (
//                 <p className={`font-body text-xs mb-4 ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>{couponMessage}</p>
//               )}

//               <div className="space-y-3 mb-5">
//                 <div className="flex justify-between font-body text-sm text-[#777]">
//                   <span>Subtotal ({cart.length} items)</span>
//                   <span>₹{subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between font-body text-sm text-[#777]">
//                   <span>Shipping</span>
//                   <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
//                 </div>
//                 {couponDiscount > 0 && (
//                   <div className="flex justify-between font-body text-sm text-green-600">
//                     <span>Coupon discount</span>
//                     <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
//                   </div>
//                 )}
//                 <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
//                   <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
//                   <span className="font-heading text-xl font-bold text-[#7A4E48]">₹{total.toLocaleString('en-IN')}</span>
//                 </div>
//               </div>

//               {subtotal < FREE_SHIPPING_THRESHOLD && (
//                 <div className="font-body text-xs text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5">
//                   Add ₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for <span className="text-[#C9A86A] font-semibold">free shipping</span>
//                 </div>
//               )}

//               <div className="mt-4 flex items-center justify-center gap-3 text-xs font-body text-[#BBB]">
//                 <span>🔒 Secure Checkout</span>
//                 <span>·</span>
//                 <span>UPI / Cards / COD</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/Checkout.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCheck, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { ordersApi } from '../api/orders';
import { apiClient } from '../api/client';

const PAYMENT_METHODS = [
  { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
  { value: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm & more' },
  { value: 'card', label: 'Credit / Debit Card', desc: 'All major cards accepted' },
  { value: 'netbanking', label: 'Net Banking', desc: 'All major banks supported' },
] as const;

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi',
];

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_CHARGE = 99;

const TOAST_STYLE = {
  fontFamily: 'Outfit, sans-serif',
  background: '#F8F5F0',
  color: '#1F1F1F',
  border: '1px solid #C9A86A',
};

// Friendly, field-specific messages for backend validation errors.
// FastAPI/Pydantic 422 responses look like:
//   { detail: [{ type: "string_too_short", loc: ["body","shipping_address","address_line1"], msg: "..." }] }
// Raw `msg` text ("String should have at least 5 characters") is not
// something a non-technical shopper should ever see. This maps the
// last segment of `loc` to a clear, human label.
const FIELD_LABELS: Record<string, string> = {
  full_name: 'Full name',
  phone: 'Phone number',
  address_line1: 'Address',
  address_line2: 'Address (line 2)',
  city: 'City',
  state: 'State',
  pincode: 'Pincode',
  selected_color: 'Color',
  selected_size: 'Size',
};

function getFriendlyErrorMessage(err: any): string {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    const fieldKey = first?.loc?.[first.loc.length - 1];
    const label = FIELD_LABELS[fieldKey] || 'This field';
    if (first?.type === 'string_too_short') {
      return `${label} is too short. Please check and try again.`;
    }
    if (first?.type === 'string_too_long') {
      return `${label} is too long. Please check and try again.`;
    }
    if (first?.type === 'missing') {
      return `${label} is required.`;
    }
    return `${label} doesn't look right. Please check and try again.`;
  }
  // Backend's own BusinessRuleError / generic error message
  if (typeof err?.response?.data?.error === 'string') {
    return err.response.data.error;
  }
  return 'Something went wrong. Please try again.';
}

export default function Checkout() {
  const { cart, cartTotal, clearServerState } = useStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [placing, setPlacing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const [address, setAddress] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    address_line1: user?.address_line1 || '',
    address_line2: user?.address_line2 || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('cod');
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const total = subtotal + shipping - couponDiscount;

  useEffect(() => {
    if (cart.length === 0) navigate('/cart', { replace: true });
  }, [cart.length, navigate]);

  // Frontend validation matches backend's min_length rules so the user sees
  // the same friendly message before ever hitting the API, not after.
  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!address.full_name.trim() || address.full_name.trim().length < 2) {
      errors.full_name = 'Please enter your full name';
    }
    if (!address.phone.trim() || address.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!address.address_line1.trim() || address.address_line1.trim().length < 5) {
      errors.address_line1 = 'Please enter your complete address (at least 5 characters)';
    }
    if (!address.city.trim() || address.city.trim().length < 2) {
      errors.city = 'Please enter your city';
    }
    if (!address.state) errors.state = 'Please select your state';
    if (!address.pincode.trim() || address.pincode.trim().length < 6) {
      errors.pincode = 'Enter a valid 6-digit pincode';
    }
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponMessage('');
    try {
      const res = await apiClient.post('/coupons/validate', {
        code: couponCode.trim().toUpperCase(),
        order_total: subtotal,
      });
      const data = res.data.data;
      if (data.valid) {
        setCouponDiscount(Number(data.discount_amount));
        setCouponMessage(data.message);
        toast.success(data.message, { style: TOAST_STYLE });
      } else {
        setCouponDiscount(0);
        setCouponMessage(data.message);
        toast.error(data.message, { style: TOAST_STYLE });
      }
    } catch (err: any) {
      const msg = getFriendlyErrorMessage(err);
      setCouponMessage(msg);
      toast.error(msg, { style: TOAST_STYLE });
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const res = await ordersApi.create({
        shipping_address: address,
        payment_method: paymentMethod,
      });
      const order = res.data.data;
      // Clear cart after successful order
      clearServerState();
      // Show a clean, simple confirmation — never expose the raw order
      // number or any backend-generated message text in the toast.
      toast.success('Order placed successfully!', { style: TOAST_STYLE });
      navigate(`/orders/${order.id}`, { state: { newOrder: true } });
    } catch (err: any) {
      toast.error(getFriendlyErrorMessage(err), { style: TOAST_STYLE });
    } finally {
      setPlacing(false);
    }
  };

  const STEPS = ['address', 'payment', 'review'] as const;
  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      {/* Header */}
      <div className="bg-[#EFE7DC] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/cart" className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-4">
            <FiArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="font-heading text-4xl font-semibold text-[#1F1F1F]">Checkout</h1>
          {/* Step indicators */}
          <div className="flex items-center gap-2 mt-4">
            {[{ key: 'address', label: 'Address' }, { key: 'payment', label: 'Payment' }, { key: 'review', label: 'Review' }].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-semibold transition-colors ${i < stepIndex ? 'bg-[#7A4E48] text-white' : i === stepIndex ? 'bg-[#7A4E48] text-white' : 'bg-[#E8DCCB] text-[#999]'}`}>
                  {i < stepIndex ? <FiCheck className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`font-body text-sm ${i === stepIndex ? 'text-[#7A4E48] font-semibold' : 'text-[#999]'}`}>{s.label}</span>
                {i < 2 && <div className={`w-8 h-px ${i < stepIndex ? 'bg-[#7A4E48]' : 'bg-[#E8DCCB]'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: steps */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Address */}
              {step === 'address' && (
                <motion.div key="address" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
                  <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Shipping Address</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'full_name', label: 'Full Name *', placeholder: 'Your name', type: 'text', col: 'full' },
                      { key: 'phone', label: 'Phone *', placeholder: '+91 98765 43210', type: 'tel', col: 'full' },
                      { key: 'address_line1', label: 'Address Line 1 *', placeholder: 'House / Flat / Block no.', type: 'text', col: 'full' },
                      { key: 'address_line2', label: 'Address Line 2', placeholder: 'Area, Colony (optional)', type: 'text', col: 'full' },
                      { key: 'city', label: 'City *', placeholder: 'Mumbai', type: 'text', col: 'half' },
                      { key: 'pincode', label: 'Pincode *', placeholder: '400001', type: 'text', col: 'half' },
                    ].map((field) => (
                      <div key={field.key} className={field.col === 'full' ? 'md:col-span-2' : ''}>
                        <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">{field.label}</label>
                        <input
                          type={field.type}
                          value={(address as any)[field.key]}
                          onChange={(e) => setAddress({ ...address, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors ${addressErrors[field.key] ? 'border-red-300' : 'border-[#E8DCCB]'}`}
                        />
                        {addressErrors[field.key] && <p className="font-body text-xs text-red-500 mt-1">{addressErrors[field.key]}</p>}
                      </div>
                    ))}
                    <div>
                      <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">State *</label>
                      <select
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className={`w-full px-4 py-3 bg-[#F8F5F0] border rounded-xl font-body text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A] transition-colors cursor-pointer ${addressErrors.state ? 'border-red-300' : 'border-[#E8DCCB]'}`}
                      >
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {addressErrors.state && <p className="font-body text-xs text-red-500 mt-1">{addressErrors.state}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => { if (validateAddress()) setStep('payment'); else toast.error('Please fix the highlighted fields', { style: TOAST_STYLE }); }}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md"
                  >
                    Continue to Payment <FiArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
                  <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.value ? 'border-[#7A4E48] bg-[#F8F5F0]' : 'border-[#E8DCCB] hover:border-[#C9A86A]'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${paymentMethod === method.value ? 'border-[#7A4E48]' : 'border-[#CCC]'}`}>
                          {paymentMethod === method.value && <div className="w-2.5 h-2.5 rounded-full bg-[#7A4E48]" />}
                        </div>
                        <input type="radio" value={method.value} checked={paymentMethod === method.value} onChange={() => setPaymentMethod(method.value)} className="sr-only" />
                        <div>
                          <p className="font-body text-sm font-semibold text-[#1F1F1F]">{method.label}</p>
                          <p className="font-body text-xs text-[#999]">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep('address')} className="flex-1 py-3.5 border border-[#E8DCCB] text-[#777] font-body font-medium text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer">
                      ← Back
                    </button>
                    <button onClick={() => setStep('review')} className="flex-[2] flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md">
                      Review Order <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 'review' && (
                <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
                    <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-4">Review Your Order</h2>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-3">
                          <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#EFE7DC] flex-shrink-0">
                            {item.images[0] && <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm font-semibold text-[#1F1F1F] line-clamp-1">{item.title}</p>
                            <p className="font-body text-xs text-[#777]">{item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}</p>
                          </div>
                          <span className="font-body text-sm font-semibold text-[#7A4E48]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confirm info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border border-[#E8DCCB] p-5">
                      <p className="font-body text-xs text-[#999] uppercase tracking-wider mb-2">Delivering to</p>
                      <p className="font-body text-sm font-semibold text-[#1F1F1F]">{address.full_name}</p>
                      <p className="font-body text-xs text-[#777] mt-1">{address.address_line1}{address.address_line2 ? `, ${address.address_line2}` : ''}</p>
                      <p className="font-body text-xs text-[#777]">{address.city}, {address.state} — {address.pincode}</p>
                      <p className="font-body text-xs text-[#777]">{address.phone}</p>
                      <button onClick={() => setStep('address')} className="font-body text-xs text-[#C9A86A] hover:text-[#7A4E48] mt-2 cursor-pointer">Change</button>
                    </div>
                    <div className="bg-white rounded-2xl border border-[#E8DCCB] p-5">
                      <p className="font-body text-xs text-[#999] uppercase tracking-wider mb-2">Payment</p>
                      <p className="font-body text-sm font-semibold text-[#1F1F1F]">{PAYMENT_METHODS.find(m => m.value === paymentMethod)?.label}</p>
                      <button onClick={() => setStep('payment')} className="font-body text-xs text-[#C9A86A] hover:text-[#7A4E48] mt-2 cursor-pointer">Change</button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep('payment')} className="flex-1 py-3.5 border border-[#E8DCCB] text-[#777] font-body font-medium text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer">
                      ← Back
                    </button>
                    <motion.button
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      whileHover={{ scale: placing ? 1 : 1.01 }}
                      whileTap={{ scale: placing ? 1 : 0.99 }}
                      className="flex-[2] flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-70"
                    >
                      {placing ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
                      ) : (
                        <>Place Order · ₹{total.toLocaleString('en-IN')}</>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order summary */}
          <div>
            <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-5">Order Summary</h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <div className="flex-1 flex items-center gap-2 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl px-3 py-2.5">
                  <FiTag className="w-4 h-4 text-[#C9A86A] flex-shrink-0" />
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
              {couponMessage && (
                <p className={`font-body text-xs mb-4 ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>{couponMessage}</p>
              )}

              <div className="space-y-3 mb-5">
                <div className="flex justify-between font-body text-sm text-[#777]">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-[#777]">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between font-body text-sm text-green-600">
                    <span>Coupon discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="border-t border-[#E8DCCB] pt-3 flex justify-between">
                  <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
                  <span className="font-heading text-xl font-bold text-[#7A4E48]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="font-body text-xs text-[#999] bg-[#FFF8EE] border border-[#F5E6C0] rounded-xl px-3 py-2.5">
                  Add ₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for <span className="text-[#C9A86A] font-semibold">free shipping</span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-center gap-3 text-xs font-body text-[#BBB]">
                <span>🔒 Secure Checkout</span>
                <span>·</span>
                <span>UPI / Cards / COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}