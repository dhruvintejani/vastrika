// // // src/pages/OrderDetail.tsx
// // import { useState, useEffect } from 'react';
// // import { Link, useParams, useLocation } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { FiArrowLeft, FiPackage, FiCheck, FiX } from 'react-icons/fi';
// // import { format } from 'date-fns';
// // import toast from 'react-hot-toast';
// // import { ordersApi, Order } from '../api/orders';

// // const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'] as const;

// // const STATUS_COLORS: Record<string, string> = {
// //   pending:    'bg-yellow-100 text-yellow-700 border-yellow-200',
// //   confirmed:  'bg-blue-100 text-blue-700 border-blue-200',
// //   processing: 'bg-purple-100 text-purple-700 border-purple-200',
// //   shipped:    'bg-cyan-100 text-cyan-700 border-cyan-200',
// //   delivered:  'bg-green-100 text-green-700 border-green-200',
// //   cancelled:  'bg-red-100 text-red-700 border-red-200',
// // };

// // const TOAST_STYLE = { fontFamily: 'Outfit, sans-serif', background: '#F8F5F0', color: '#1F1F1F', border: '1px solid #C9A86A' };

// // export default function OrderDetail() {
// //   const { id } = useParams<{ id: string }>();
// //   const location = useLocation();
// //   const isNewOrder = (location.state as any)?.newOrder;

// //   const [order, setOrder] = useState<Order | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [cancelling, setCancelling] = useState(false);

// //   useEffect(() => {
// //     if (!id) return;
// //     const load = async () => {
// //       setLoading(true);
// //       setError('');
// //       try {
// //         const res = await ordersApi.getById(Number(id));
// //         setOrder(res.data.data);
// //       } catch (err: any) {
// //         setError(err.response?.status === 403 ? 'You do not have access to this order.' : 'Could not load order.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     load();
// //   }, [id]);

// //   const handleCancel = async () => {
// //     if (!order) return;
// //     if (!confirm('Are you sure you want to cancel this order?')) return;
// //     setCancelling(true);
// //     try {
// //       const res = await ordersApi.cancel(order.id);
// //       setOrder(res.data.data);
// //       toast.success('Order cancelled successfully', { style: TOAST_STYLE });
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Cannot cancel this order', { style: TOAST_STYLE });
// //     } finally {
// //       setCancelling(false);
// //     }
// //   };

// //   const canCancel = order && ['pending', 'confirmed'].includes(order.status);
// //   const isCancelled = order?.status === 'cancelled';
// //   const statusIndex = order ? STATUS_STEPS.indexOf(order.status as any) : -1;

// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// //       <div className="bg-[#EFE7DC] py-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
// //             <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
// //             <span>/</span>
// //             <Link to="/orders" className="hover:text-[#7A4E48] transition-colors">My Orders</Link>
// //             <span>/</span>
// //             <span className="text-[#555]">{order?.order_number || `#${id}`}</span>
// //           </div>
// //           <Link to="/orders" className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-4">
// //             <FiArrowLeft className="w-4 h-4" /> Back to Orders
// //           </Link>
// //           <h1 className="font-heading text-4xl font-semibold text-[#1F1F1F]">
// //             Order {order?.order_number || '—'}
// //           </h1>
// //           {order && (
// //             <p className="font-body text-sm text-[#777] mt-1">
// //               Placed on {format(new Date(order.created_at), 'EEEE, MMMM d, yyyy · h:mm a')}
// //             </p>
// //           )}
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// //         {loading ? (
// //           <div className="space-y-6">
// //             {[1, 2, 3].map((i) => (
// //               <div key={i} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 animate-pulse h-32" />
// //             ))}
// //           </div>
// //         ) : error ? (
// //           <div className="text-center py-20">
// //             <FiPackage className="w-12 h-12 text-[#CCC] mx-auto mb-4" />
// //             <p className="font-body text-base text-[#555]">{error}</p>
// //             <Link to="/orders" className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] mt-4 inline-block">← Back to Orders</Link>
// //           </div>
// //         ) : order && (
// //           <div className="grid lg:grid-cols-3 gap-8">
// //             <div className="lg:col-span-2 space-y-6">
// //               {/* Success banner for new orders */}
// //               {isNewOrder && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: -16 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3"
// //                 >
// //                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
// //                     <FiCheck className="w-4 h-4 text-green-600" />
// //                   </div>
// //                   <div>
// //                     <p className="font-heading text-base font-semibold text-green-800">Order placed successfully!</p>
// //                     <p className="font-body text-sm text-green-600 mt-0.5">You'll receive a confirmation soon. Thank you for shopping with Vastrika!</p>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               {/* Status tracker */}
// //               {!isCancelled && (
// //                 <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
// //                   <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-5">Order Status</h2>
// //                   <div className="flex items-center">
// //                     {STATUS_STEPS.map((s, i) => (
// //                       <div key={s} className="flex items-center flex-1">
// //                         <div className="flex flex-col items-center">
// //                           <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${i <= statusIndex ? 'bg-[#7A4E48] border-[#7A4E48] text-white' : 'border-[#E8DCCB] text-[#CCC]'}`}>
// //                             {i < statusIndex ? <FiCheck className="w-4 h-4" /> : <span className="text-xs font-body font-semibold">{i + 1}</span>}
// //                           </div>
// //                           <span className={`font-body text-[10px] mt-1 capitalize text-center ${i <= statusIndex ? 'text-[#7A4E48] font-semibold' : 'text-[#CCC]'}`}>{s}</span>
// //                         </div>
// //                         {i < STATUS_STEPS.length - 1 && (
// //                           <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${i < statusIndex ? 'bg-[#7A4E48]' : 'bg-[#E8DCCB]'}`} />
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {isCancelled && (
// //                 <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-3">
// //                   <FiX className="w-5 h-5 text-red-500 flex-shrink-0" />
// //                   <p className="font-body text-sm text-red-700 font-semibold">This order has been cancelled.</p>
// //                 </div>
// //               )}

// //               {/* Order items */}
// //               <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
// //                 <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">Items Ordered</h2>
// //                 <div className="space-y-4">
// //                   {order.items.map((item) => (
// //                     <div key={item.id} className="flex items-center gap-4">
// //                       <div className="w-16 h-18 rounded-xl overflow-hidden bg-[#EFE7DC] flex-shrink-0" style={{ height: '72px' }}>
// //                         <img src={item.product_image} alt={item.product_title} className="w-full h-full object-cover"
// //                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80'; }} />
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <Link to={`/product/${item.product_id}`} className="font-body text-sm font-semibold text-[#1F1F1F] hover:text-[#7A4E48] transition-colors line-clamp-1">
// //                           {item.product_title}
// //                         </Link>
// //                         <p className="font-body text-xs text-[#777] mt-0.5">
// //                           {item.selected_size} · {item.selected_color} · Qty: {item.quantity}
// //                         </p>
// //                         <p className="font-body text-xs text-[#999] mt-0.5">₹{Number(item.unit_price).toLocaleString('en-IN')} each</p>
// //                       </div>
// //                       <span className="font-body text-sm font-bold text-[#7A4E48] flex-shrink-0">
// //                         ₹{Number(item.total_price).toLocaleString('en-IN')}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Shipping */}
// //               <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
// //                 <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-3">Shipping Address</h2>
// //                 <p className="font-body text-sm font-semibold text-[#1F1F1F]">{order.shipping_name}</p>
// //                 <p className="font-body text-sm text-[#777] mt-1">{order.shipping_address}</p>
// //                 <p className="font-body text-sm text-[#777]">{order.shipping_phone}</p>
// //               </div>
// //             </div>

// //             {/* Right: summary + actions */}
// //             <div className="space-y-4">
// //               <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm sticky top-24">
// //                 <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">Payment Summary</h2>
// //                 <div className="space-y-2.5 mb-4">
// //                   <div className="flex justify-between font-body text-sm text-[#777]">
// //                     <span>Subtotal</span><span>₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
// //                   </div>
// //                   <div className="flex justify-between font-body text-sm text-[#777]">
// //                     <span>Shipping</span>
// //                     <span className={Number(order.shipping_charge) === 0 ? 'text-green-600' : ''}>{Number(order.shipping_charge) === 0 ? 'FREE' : `₹${Number(order.shipping_charge).toLocaleString('en-IN')}`}</span>
// //                   </div>
// //                   {Number(order.discount_amount) > 0 && (
// //                     <div className="flex justify-between font-body text-sm text-green-600">
// //                       <span>Discount</span><span>-₹{Number(order.discount_amount).toLocaleString('en-IN')}</span>
// //                     </div>
// //                   )}
// //                   <div className="border-t border-[#E8DCCB] pt-2.5 flex justify-between">
// //                     <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
// //                     <span className="font-heading text-xl font-bold text-[#7A4E48]">₹{Number(order.total_amount).toLocaleString('en-IN')}</span>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-2 text-xs font-body text-[#777] mb-5">
// //                   <div className="flex justify-between">
// //                     <span>Payment method</span><span className="uppercase font-semibold text-[#555]">{order.payment_method}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Payment status</span>
// //                     <span className={`uppercase font-semibold ${order.payment_status === 'paid' ? 'text-green-600' : 'text-[#555]'}`}>{order.payment_status}</span>
// //                   </div>
// //                 </div>

// //                 {canCancel && (
// //                   <button
// //                     onClick={handleCancel}
// //                     disabled={cancelling}
// //                     className="w-full py-3 border-2 border-red-200 text-red-500 font-body text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
// //                   >
// //                     {cancelling ? 'Cancelling...' : 'Cancel Order'}
// //                   </button>
// //                 )}

// //                 <Link
// //                   to="/shop"
// //                   className="mt-3 w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //                 >
// //                   Continue Shopping
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/OrderDetail.tsx
// import { useState, useEffect } from 'react';
// import { Link, useParams, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiArrowLeft, FiPackage, FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';
// import { format } from 'date-fns';
// import toast from 'react-hot-toast';
// import { ordersApi, Order } from '../api/orders';
// import ConfirmDialog from '../components/ConfirmDialog';

// const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'] as const;

// // Used for the status pill badge shown on mobile / in the cancelled banner
// const STATUS_COLORS: Record<string, string> = {
//   pending:    'bg-yellow-100 text-yellow-700 border-yellow-200',
//   confirmed:  'bg-blue-100 text-blue-700 border-blue-200',
//   processing: 'bg-purple-100 text-purple-700 border-purple-200',
//   shipped:    'bg-cyan-100 text-cyan-700 border-cyan-200',
//   delivered:  'bg-green-100 text-green-700 border-green-200',
//   cancelled:  'bg-red-100 text-red-700 border-red-200',
// };

// const TOAST_STYLE = {
//   fontFamily: 'Outfit, sans-serif',
//   background: '#F8F5F0',
//   color: '#1F1F1F',
//   border: '1px solid #C9A86A',
// };

// // ── Cancel-order confirmation dialog (with reason input) ─────────────────────
// interface CancelDialogProps {
//   open: boolean;
//   loading: boolean;
//   onClose: () => void;
//   onConfirm: (reason: string) => void;
// }

// const CANCEL_REASONS = [
//   'Changed my mind',
//   'Found a better price elsewhere',
//   'Ordered by mistake',
//   'Delivery time too long',
//   'Need to change size or colour',
//   'Other',
// ];

// function CancelOrderDialog({ open, loading, onClose, onConfirm }: CancelDialogProps) {
//   const [reason, setReason] = useState('');
//   const [customReason, setCustomReason] = useState('');

//   const handleConfirm = () => {
//     const finalReason = reason === 'Other' ? customReason.trim() : reason;
//     if (!finalReason) {
//       toast.error('Please select a reason for cancellation.', { style: TOAST_STYLE });
//       return;
//     }
//     onConfirm(finalReason);
//   };

//   // Reset on close
//   useEffect(() => {
//     if (!open) { setReason(''); setCustomReason(''); }
//   }, [open]);

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[100] flex items-center justify-center px-4"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => !loading && onClose()}
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 10 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 10 }}
//             transition={{ duration: 0.2 }}
//             className="relative bg-white rounded-2xl shadow-2xl border border-[#E8DCCB] w-full max-w-sm p-6"
//           >
//             <div className="w-12 h-12 rounded-full bg-[#FFF0F0] flex items-center justify-center mb-4">
//               <FiAlertTriangle className="w-5 h-5 text-[#C58C85]" />
//             </div>

//             <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-1">Cancel Order?</h3>
//             <p className="font-body text-sm text-[#777] mb-5">
//               This cannot be undone. Please tell us why you're cancelling.
//             </p>

//             {/* Reason selector */}
//             <div className="space-y-2 mb-4">
//               {CANCEL_REASONS.map((r) => (
//                 <label key={r} className="flex items-center gap-3 cursor-pointer group">
//                   <div
//                     className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
//                       reason === r ? 'border-[#C58C85] bg-[#C58C85]' : 'border-[#CCC]'
//                     }`}
//                     onClick={() => setReason(r)}
//                   >
//                     {reason === r && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                   </div>
//                   <span
//                     onClick={() => setReason(r)}
//                     className={`font-body text-sm cursor-pointer ${reason === r ? 'text-[#1F1F1F] font-medium' : 'text-[#777]'}`}
//                   >
//                     {r}
//                   </span>
//                 </label>
//               ))}
//             </div>

//             {/* Custom reason input */}
//             {reason === 'Other' && (
//               <textarea
//                 value={customReason}
//                 onChange={(e) => setCustomReason(e.target.value)}
//                 placeholder="Please describe your reason..."
//                 rows={2}
//                 className="w-full px-3 py-2.5 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors resize-none mb-4"
//               />
//             )}

//             <div className="flex gap-3 mt-2">
//               <button
//                 onClick={onClose}
//                 disabled={loading}
//                 className="flex-1 py-2.5 border border-[#E8DCCB] text-[#777] font-body text-sm font-medium rounded-xl hover:bg-[#F8F5F0] transition-colors cursor-pointer disabled:opacity-50"
//               >
//                 Keep Order
//               </button>
//               <button
//                 onClick={handleConfirm}
//                 disabled={loading || !reason}
//                 className="flex-1 py-2.5 bg-[#C58C85] text-white font-body text-sm font-semibold rounded-xl hover:bg-[#B07A73] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
//                 Cancel Order
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // ── Main component ────────────────────────────────────────────────────────────

// export default function OrderDetail() {
//   const { id } = useParams<{ id: string }>();
//   const location = useLocation();
//   const isNewOrder = (location.state as any)?.newOrder;

//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showCancelDialog, setShowCancelDialog] = useState(false);
//   const [cancelling, setCancelling] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     const load = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const res = await ordersApi.getById(Number(id));
//         setOrder(res.data.data);
//       } catch (err: any) {
//         setError(
//           err.response?.status === 403
//             ? 'You do not have access to this order.'
//             : 'Could not load order.'
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [id]);

//   const handleCancel = async (reason: string) => {
//     if (!order) return;
//     setCancelling(true);
//     try {
//       const res = await ordersApi.cancel(order.id, reason);
//       setOrder(res.data.data);
//       setShowCancelDialog(false);
//       toast.success('Order cancelled successfully.', { style: TOAST_STYLE });
//     } catch (err: any) {
//       toast.error(
//         err.response?.data?.error || 'Cannot cancel this order.',
//         { style: TOAST_STYLE }
//       );
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const canCancel = order && ['pending', 'confirmed'].includes(order.status);
//   const isCancelled = order?.status === 'cancelled';
//   const statusIndex = order ? STATUS_STEPS.indexOf(order.status as any) : -1;

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       <div className="bg-[#EFE7DC] py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
//             <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
//             <span>/</span>
//             <Link to="/orders" className="hover:text-[#7A4E48] transition-colors">My Orders</Link>
//             <span>/</span>
//             <span className="text-[#555]">{order?.order_number || `#${id}`}</span>
//           </div>
//           <Link
//             to="/orders"
//             className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-4"
//           >
//             <FiArrowLeft className="w-4 h-4" /> Back to Orders
//           </Link>
//           <div className="flex items-center gap-4 flex-wrap">
//             <h1 className="font-heading text-4xl font-semibold text-[#1F1F1F]">
//               Order {order?.order_number || '—'}
//             </h1>
//             {/* Status pill using STATUS_COLORS */}
//             {order && (
//               <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[order.status] || ''}`}>
//                 {order.status}
//               </span>
//             )}
//           </div>
//           {order && (
//             <p className="font-body text-sm text-[#777] mt-1">
//               Placed on {format(new Date(order.created_at), 'EEEE, MMMM d, yyyy · h:mm a')}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {loading ? (
//           <div className="space-y-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 animate-pulse h-32" />
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-center py-20">
//             <FiPackage className="w-12 h-12 text-[#CCC] mx-auto mb-4" />
//             <p className="font-body text-base text-[#555]">{error}</p>
//             <Link to="/orders" className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] mt-4 inline-block">
//               ← Back to Orders
//             </Link>
//           </div>
//         ) : order && (
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               {/* Success banner for new orders */}
//               {isNewOrder && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
//                     <FiCheck className="w-4 h-4 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-heading text-base font-semibold text-green-800">
//                       Order placed successfully!
//                     </p>
//                     <p className="font-body text-sm text-green-600 mt-0.5">
//                       You'll receive a confirmation soon. Thank you for shopping with Vastrika!
//                     </p>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Status tracker — uses STATUS_COLORS for the step labels */}
//               {!isCancelled ? (
//                 <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
//                   <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-5">Order Status</h2>
//                   <div className="flex items-center">
//                     {STATUS_STEPS.map((s, i) => (
//                       <div key={s} className="flex items-center flex-1">
//                         <div className="flex flex-col items-center">
//                           <div
//                             className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
//                               i <= statusIndex
//                                 ? 'bg-[#7A4E48] border-[#7A4E48] text-white'
//                                 : 'border-[#E8DCCB] text-[#CCC]'
//                             }`}
//                           >
//                             {i < statusIndex
//                               ? <FiCheck className="w-4 h-4" />
//                               : <span className="text-xs font-body font-semibold">{i + 1}</span>
//                             }
//                           </div>
//                           {/* Step label uses the status colour from STATUS_COLORS */}
//                           <span
//                             className={`font-body text-[10px] mt-1 capitalize text-center px-1.5 py-0.5 rounded-full ${
//                               i === statusIndex
//                                 ? STATUS_COLORS[s] || 'text-[#7A4E48] font-semibold'
//                                 : i < statusIndex
//                                   ? 'text-[#7A4E48] font-semibold'
//                                   : 'text-[#CCC]'
//                             }`}
//                           >
//                             {s}
//                           </span>
//                         </div>
//                         {i < STATUS_STEPS.length - 1 && (
//                           <div
//                             className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${
//                               i < statusIndex ? 'bg-[#7A4E48]' : 'bg-[#E8DCCB]'
//                             }`}
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className={`rounded-2xl p-5 flex items-center gap-3 border ${STATUS_COLORS.cancelled}`}>
//                   <FiX className="w-5 h-5 flex-shrink-0" />
//                   <div>
//                     <p className="font-body text-sm font-semibold">This order has been cancelled.</p>
//                     {(order as any).cancellation_reason && (
//                       <p className="font-body text-xs mt-0.5 opacity-80">
//                         Reason: {(order as any).cancellation_reason}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Order items */}
//               <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
//                 <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">Items Ordered</h2>
//                 <div className="space-y-4">
//                   {order.items.map((item) => (
//                     <div key={item.id} className="flex items-center gap-4">
//                       <div
//                         className="w-16 rounded-xl overflow-hidden bg-[#EFE7DC] flex-shrink-0"
//                         style={{ height: '72px' }}
//                       >
//                         <img
//                           src={item.product_image}
//                           alt={item.product_title}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).src =
//                               'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80';
//                           }}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <Link
//                           to={`/product/${item.product_id}`}
//                           className="font-body text-sm font-semibold text-[#1F1F1F] hover:text-[#7A4E48] transition-colors line-clamp-1"
//                         >
//                           {item.product_title}
//                         </Link>
//                         <p className="font-body text-xs text-[#777] mt-0.5">
//                           {item.selected_size} · {item.selected_color} · Qty: {item.quantity}
//                         </p>
//                         <p className="font-body text-xs text-[#999] mt-0.5">
//                           ₹{Number(item.unit_price).toLocaleString('en-IN')} each
//                         </p>
//                       </div>
//                       <span className="font-body text-sm font-bold text-[#7A4E48] flex-shrink-0">
//                         ₹{Number(item.total_price).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Shipping */}
//               <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
//                 <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-3">Shipping Address</h2>
//                 <p className="font-body text-sm font-semibold text-[#1F1F1F]">{order.shipping_name}</p>
//                 <p className="font-body text-sm text-[#777] mt-1">{order.shipping_address}</p>
//                 <p className="font-body text-sm text-[#777]">{order.shipping_phone}</p>
//               </div>
//             </div>

//             {/* Right: summary + actions */}
//             <div className="space-y-4">
//               <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm sticky top-24">
//                 <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">Payment Summary</h2>
//                 <div className="space-y-2.5 mb-4">
//                   <div className="flex justify-between font-body text-sm text-[#777]">
//                     <span>Subtotal</span>
//                     <span>₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
//                   </div>
//                   <div className="flex justify-between font-body text-sm text-[#777]">
//                     <span>Shipping</span>
//                     <span className={Number(order.shipping_charge) === 0 ? 'text-green-600' : ''}>
//                       {Number(order.shipping_charge) === 0
//                         ? 'FREE'
//                         : `₹${Number(order.shipping_charge).toLocaleString('en-IN')}`}
//                     </span>
//                   </div>
//                   {Number(order.discount_amount) > 0 && (
//                     <div className="flex justify-between font-body text-sm text-green-600">
//                       <span>Discount</span>
//                       <span>-₹{Number(order.discount_amount).toLocaleString('en-IN')}</span>
//                     </div>
//                   )}
//                   <div className="border-t border-[#E8DCCB] pt-2.5 flex justify-between">
//                     <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
//                     <span className="font-heading text-xl font-bold text-[#7A4E48]">
//                       ₹{Number(order.total_amount).toLocaleString('en-IN')}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2 text-xs font-body text-[#777] mb-5">
//                   <div className="flex justify-between">
//                     <span>Payment method</span>
//                     <span className="uppercase font-semibold text-[#555]">{order.payment_method}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Payment status</span>
//                     <span className={`uppercase font-semibold ${order.payment_status === 'paid' ? 'text-green-600' : 'text-[#555]'}`}>
//                       {order.payment_status}
//                     </span>
//                   </div>
//                 </div>

//                 {canCancel && (
//                   <button
//                     onClick={() => setShowCancelDialog(true)}
//                     disabled={cancelling}
//                     className="w-full py-3 border-2 border-red-200 text-red-500 font-body text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
//                   >
//                     Cancel Order
//                   </button>
//                 )}

//                 <Link
//                   to="/shop"
//                   className="mt-3 w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Cancel order dialog with reason selector */}
//       <CancelOrderDialog
//         open={showCancelDialog}
//         loading={cancelling}
//         onClose={() => setShowCancelDialog(false)}
//         onConfirm={handleCancel}
//       />
//     </div>
//   );
// }


// src/pages/OrderDetail.tsx
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiPackage, FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { ordersApi, Order } from '../api/orders';

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'] as const;

// Used for the status pill badge shown on mobile / in the cancelled banner
const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed:  'bg-blue-100 text-blue-700 border-blue-200',
  processing: 'bg-purple-100 text-purple-700 border-purple-200',
  shipped:    'bg-cyan-100 text-cyan-700 border-cyan-200',
  delivered:  'bg-green-100 text-green-700 border-green-200',
  cancelled:  'bg-red-100 text-red-700 border-red-200',
};

const TOAST_STYLE = {
  fontFamily: 'Outfit, sans-serif',
  background: '#F8F5F0',
  color: '#1F1F1F',
  border: '1px solid #C9A86A',
};

// ── Cancel-order confirmation dialog (with reason input) ─────────────────────
interface CancelDialogProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const CANCEL_REASONS = [
  'Changed my mind',
  'Found a better price elsewhere',
  'Ordered by mistake',
  'Delivery time too long',
  'Need to change size or colour',
  'Other',
];

function CancelOrderDialog({ open, loading, onClose, onConfirm }: CancelDialogProps) {
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleConfirm = () => {
    const finalReason = reason === 'Other' ? customReason.trim() : reason;
    if (!finalReason) {
      toast.error('Please select a reason for cancellation.', { style: TOAST_STYLE });
      return;
    }
    onConfirm(finalReason);
  };

  // Reset on close
  useEffect(() => {
    if (!open) { setReason(''); setCustomReason(''); }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && onClose()}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E8DCCB] w-full max-w-sm p-6"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFF0F0] flex items-center justify-center mb-4">
              <FiAlertTriangle className="w-5 h-5 text-[#C58C85]" />
            </div>

            <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-1">Cancel Order?</h3>
            <p className="font-body text-sm text-[#777] mb-5">
              This cannot be undone. Please tell us why you're cancelling.
            </p>

            {/* Reason selector */}
            <div className="space-y-2 mb-4">
              {CANCEL_REASONS.map((r) => (
                <label key={r} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      reason === r ? 'border-[#C58C85] bg-[#C58C85]' : 'border-[#CCC]'
                    }`}
                    onClick={() => setReason(r)}
                  >
                    {reason === r && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span
                    onClick={() => setReason(r)}
                    className={`font-body text-sm cursor-pointer ${reason === r ? 'text-[#1F1F1F] font-medium' : 'text-[#777]'}`}
                  >
                    {r}
                  </span>
                </label>
              ))}
            </div>

            {/* Custom reason input */}
            {reason === 'Other' && (
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Please describe your reason..."
                rows={2}
                className="w-full px-3 py-2.5 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors resize-none mb-4"
              />
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-2.5 border border-[#E8DCCB] text-[#777] font-body text-sm font-medium rounded-xl hover:bg-[#F8F5F0] transition-colors cursor-pointer disabled:opacity-50"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading || !reason}
                className="flex-1 py-2.5 bg-[#C58C85] text-white font-body text-sm font-semibold rounded-xl hover:bg-[#B07A73] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                Cancel Order
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isNewOrder = (location.state as any)?.newOrder;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await ordersApi.getById(Number(id));
        setOrder(res.data.data);
      } catch (err: any) {
        setError(
          err.response?.status === 403
            ? 'You do not have access to this order.'
            : 'Could not load order.'
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleCancel = async (reason: string) => {
    if (!order) return;
    setCancelling(true);
    try {
      const res = await ordersApi.cancel(order.id, reason);
      setOrder(res.data.data);
      setShowCancelDialog(false);
      toast.success('Order cancelled successfully.', { style: TOAST_STYLE });
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || 'Cannot cancel this order.',
        { style: TOAST_STYLE }
      );
    } finally {
      setCancelling(false);
    }
  };

  const canCancel = order && ['pending', 'confirmed'].includes(order.status);
  const isCancelled = order?.status === 'cancelled';
  const statusIndex = order ? STATUS_STEPS.indexOf(order.status as any) : -1;

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="bg-[#EFE7DC] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
            <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/orders" className="hover:text-[#7A4E48] transition-colors">My Orders</Link>
            <span>/</span>
            <span className="text-[#555]">{order?.order_number || `#${id}`}</span>
          </div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors mb-4"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="font-heading text-4xl font-semibold text-[#1F1F1F]">
              Order {order?.order_number || '—'}
            </h1>
            {/* Status pill using STATUS_COLORS */}
            {order && (
              <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[order.status] || ''}`}>
                {order.status}
              </span>
            )}
          </div>
          {order && (
            <p className="font-body text-sm text-[#777] mt-1">
              Placed on {format(new Date(order.created_at), 'EEEE, MMMM d, yyyy · h:mm a')}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 animate-pulse h-32" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <FiPackage className="w-12 h-12 text-[#CCC] mx-auto mb-4" />
            <p className="font-body text-base text-[#555]">{error}</p>
            <Link to="/orders" className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] mt-4 inline-block">
              ← Back to Orders
            </Link>
          </div>
        ) : order && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Success banner for new orders */}
              {isNewOrder && (
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-heading text-base font-semibold text-green-800">
                      Order placed successfully!
                    </p>
                    <p className="font-body text-sm text-green-600 mt-0.5">
                      You'll receive a confirmation soon. Thank you for shopping with Vastrika!
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Status tracker — uses STATUS_COLORS for the step labels */}
              {!isCancelled ? (
                <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
                  <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-5">Order Status</h2>
                  <div className="flex items-center">
                    {STATUS_STEPS.map((s, i) => (
                      <div key={s} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                              i <= statusIndex
                                ? 'bg-[#7A4E48] border-[#7A4E48] text-white'
                                : 'border-[#E8DCCB] text-[#CCC]'
                            }`}
                          >
                            {i < statusIndex
                              ? <FiCheck className="w-4 h-4" />
                              : <span className="text-xs font-body font-semibold">{i + 1}</span>
                            }
                          </div>
                          {/* Step label uses the status colour from STATUS_COLORS */}
                          <span
                            className={`font-body text-[10px] mt-1 capitalize text-center px-1.5 py-0.5 rounded-full ${
                              i === statusIndex
                                ? STATUS_COLORS[s] || 'text-[#7A4E48] font-semibold'
                                : i < statusIndex
                                  ? 'text-[#7A4E48] font-semibold'
                                  : 'text-[#CCC]'
                            }`}
                          >
                            {s}
                          </span>
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${
                              i < statusIndex ? 'bg-[#7A4E48]' : 'bg-[#E8DCCB]'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`rounded-2xl p-5 flex items-center gap-3 border ${STATUS_COLORS.cancelled}`}>
                  <FiX className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold">This order has been cancelled.</p>
                    {(order as any).cancellation_reason && (
                      <p className="font-body text-xs mt-0.5 opacity-80">
                        Reason: {(order as any).cancellation_reason}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Order items */}
              <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
                <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">Items Ordered</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div
                        className="w-16 rounded-xl overflow-hidden bg-[#EFE7DC] flex-shrink-0"
                        style={{ height: '72px' }}
                      >
                        <img
                          src={item.product_image}
                          alt={item.product_title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product_id}`}
                          className="font-body text-sm font-semibold text-[#1F1F1F] hover:text-[#7A4E48] transition-colors line-clamp-1"
                        >
                          {item.product_title}
                        </Link>
                        <p className="font-body text-xs text-[#777] mt-0.5">
                          {item.selected_size} · {item.selected_color} · Qty: {item.quantity}
                        </p>
                        <p className="font-body text-xs text-[#999] mt-0.5">
                          ₹{Number(item.unit_price).toLocaleString('en-IN')} each
                        </p>
                      </div>
                      <span className="font-body text-sm font-bold text-[#7A4E48] flex-shrink-0">
                        ₹{Number(item.total_price).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm">
                <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-3">Shipping Address</h2>
                <p className="font-body text-sm font-semibold text-[#1F1F1F]">{order.shipping_name}</p>
                <p className="font-body text-sm text-[#777] mt-1">{order.shipping_address}</p>
                <p className="font-body text-sm text-[#777]">{order.shipping_phone}</p>
              </div>
            </div>

            {/* Right: summary + actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E8DCCB] p-6 shadow-sm sticky top-24">
                <h2 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-4">Payment Summary</h2>
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between font-body text-sm text-[#777]">
                    <span>Subtotal</span>
                    <span>₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-[#777]">
                    <span>Shipping</span>
                    <span className={Number(order.shipping_charge) === 0 ? 'text-green-600' : ''}>
                      {Number(order.shipping_charge) === 0
                        ? 'FREE'
                        : `₹${Number(order.shipping_charge).toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  {Number(order.discount_amount) > 0 && (
                    <div className="flex justify-between font-body text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{Number(order.discount_amount).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="border-t border-[#E8DCCB] pt-2.5 flex justify-between">
                    <span className="font-heading text-base font-semibold text-[#1F1F1F]">Total</span>
                    <span className="font-heading text-xl font-bold text-[#7A4E48]">
                      ₹{Number(order.total_amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-body text-[#777] mb-5">
                  <div className="flex justify-between">
                    <span>Payment method</span>
                    <span className="uppercase font-semibold text-[#555]">{order.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment status</span>
                    <span className={`uppercase font-semibold ${order.payment_status === 'paid' ? 'text-green-600' : 'text-[#555]'}`}>
                      {order.payment_status}
                    </span>
                  </div>
                </div>

                {canCancel && (
                  <button
                    onClick={() => setShowCancelDialog(true)}
                    disabled={cancelling}
                    className="w-full py-3 border-2 border-red-200 text-red-500 font-body text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel Order
                  </button>
                )}

                <Link
                  to="/shop"
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-3 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cancel order dialog with reason selector */}
      <CancelOrderDialog
        open={showCancelDialog}
        loading={cancelling}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancel}
      />
    </div>
  );
}