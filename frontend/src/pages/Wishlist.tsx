// // // // import { Link } from 'react-router-dom';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
// // // // import { useStore } from '../store/useStore';

// // // // export default function Wishlist() {
// // // //   const { wishlist, removeFromWishlist, addToCart } = useStore();

// // // //   return (
// // // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// // // //       <div className="bg-[#EFE7DC] py-12">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">My Wishlist</h1>
// // // //           <p className="font-body text-sm text-[#777] mt-2">
// // // //             {wishlist.length === 0 ? 'Your wishlist is empty' : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved`}
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// // // //         {wishlist.length === 0 ? (
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 30 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             className="text-center py-24"
// // // //           >
// // // //             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// // // //               <FiHeart className="w-10 h-10 text-[#C58C85]" />
// // // //             </div>
// // // //             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your wishlist is empty</h2>
// // // //             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
// // // //               Save your favourite pieces here and shop them whenever you're ready.
// // // //             </p>
// // // //             <Link
// // // //               to="/shop"
// // // //               className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// // // //             >
// // // //               Explore Collection <FiArrowRight className="w-4 h-4" />
// // // //             </Link>
// // // //           </motion.div>
// // // //         ) : (
// // // //           <>
// // // //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
// // // //               <AnimatePresence>
// // // //                 {wishlist.map((item, i) => (
// // // //                   <motion.div
// // // //                     key={item.id}
// // // //                     initial={{ opacity: 0, y: 20 }}
// // // //                     animate={{ opacity: 1, y: 0 }}
// // // //                     exit={{ opacity: 0, scale: 0.9 }}
// // // //                     transition={{ delay: i * 0.06, duration: 0.3 }}
// // // //                     className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 border border-[#F0EBE3]"
// // // //                   >
// // // //                     <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
// // // //                       <Link to={`/product/${item.id}`} className="cursor-pointer block w-full h-full">
// // // //                         <img
// // // //                           src={item.images[0]}
// // // //                           alt={item.title}
// // // //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// // // //                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'; }}
// // // //                         />
// // // //                       </Link>
// // // //                       <button
// // // //                         onClick={() => removeFromWishlist(item.id)}
// // // //                         className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
// // // //                       >
// // // //                         <FiTrash2 className="w-3.5 h-3.5 text-[#C58C85]" />
// // // //                       </button>
// // // //                       {item.badge && (
// // // //                         <span className="absolute top-3 left-3 bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
// // // //                           {item.badge}
// // // //                         </span>
// // // //                       )}
// // // //                     </div>

// // // //                     <div className="p-4">
// // // //                       <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">{item.category}</span>
// // // //                       <Link to={`/product/${item.id}`} className="cursor-pointer">
// // // //                         <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mt-1 mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
// // // //                           {item.title}
// // // //                         </h3>
// // // //                       </Link>
// // // //                       <div className="flex items-center gap-2 mb-3">
// // // //                         <span className="font-heading text-base font-bold text-[#7A4E48]">
// // // //                           ₹{item.price.toLocaleString('en-IN')}
// // // //                         </span>
// // // //                         <span className="font-body text-xs text-[#999] line-through">
// // // //                           ₹{item.oldPrice.toLocaleString('en-IN')}
// // // //                         </span>
// // // //                       </div>
// // // //                       <button
// // // //                         onClick={() => addToCart(item, item.sizes[0], item.colors[0])}
// // // //                         className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#7A4E48] text-white font-body text-xs font-semibold rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer"
// // // //                       >
// // // //                         <FiShoppingBag className="w-3.5 h-3.5" />
// // // //                         Add to Cart
// // // //                       </button>
// // // //                     </div>
// // // //                   </motion.div>
// // // //                 ))}
// // // //               </AnimatePresence>
// // // //             </div>

// // // //             <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#F0EBE3]">
// // // //               <div>
// // // //                 <p className="font-heading text-lg font-semibold text-[#1F1F1F]">
// // // //                   {wishlist.length} item{wishlist.length > 1 ? 's' : ''} in your wishlist
// // // //                 </p>
// // // //                 <p className="font-body text-sm text-[#999]">Don't wait too long — these styles are popular!</p>
// // // //               </div>
// // // //               <div className="flex gap-3">
// // // //                 <Link
// // // //                   to="/shop"
// // // //                   className="px-6 py-3 border border-[#7A4E48] text-[#7A4E48] font-body text-sm font-semibold rounded-full hover:bg-[#7A4E48] hover:text-white transition-colors cursor-pointer"
// // // //                 >
// // // //                   Continue Shopping
// // // //                 </Link>
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useEffect } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
// // // import { useStore } from '../store/useStore';
// // // import { useAuthStore } from '../store/useAuthStore';

// // // export default function Wishlist() {
// // //   const { wishlist, removeFromWishlist, addToCart } = useStore();
// // //   const { isAuthenticated } = useAuthStore();

// // //   return (
// // //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// // //       <div className="bg-[#EFE7DC] py-12">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
// // //             <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
// // //             <span>/</span>
// // //             <span className="text-[#555]">My Wishlist</span>
// // //           </div>
// // //           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">My Wishlist</h1>
// // //           <p className="font-body text-sm text-[#777] mt-2">
// // //             {wishlist.length === 0
// // //               ? 'Your wishlist is empty'
// // //               : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved`}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// // //         {wishlist.length === 0 ? (
// // //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
// // //             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// // //               <FiHeart className="w-10 h-10 text-[#C58C85]" />
// // //             </div>
// // //             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your wishlist is empty</h2>
// // //             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
// // //               Save your favourite pieces here and shop them whenever you're ready.
// // //             </p>
// // //             <Link
// // //               to="/shop"
// // //               className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// // //             >
// // //               Explore Collection <FiArrowRight className="w-4 h-4" />
// // //             </Link>
// // //           </motion.div>
// // //         ) : (
// // //           <>
// // //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
// // //               <AnimatePresence>
// // //                 {wishlist.map((item, i) => (
// // //                   <motion.div
// // //                     key={item.id}
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     exit={{ opacity: 0, scale: 0.9 }}
// // //                     transition={{ delay: i * 0.06, duration: 0.3 }}
// // //                     className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 border border-[#F0EBE3]"
// // //                   >
// // //                     <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
// // //                       <Link to={`/product/${item.id}`} className="cursor-pointer block w-full h-full">
// // //                         <img
// // //                           src={item.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'}
// // //                           alt={item.title}
// // //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// // //                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'; }}
// // //                         />
// // //                       </Link>
// // //                       <button
// // //                         onClick={() => removeFromWishlist(item.id)}
// // //                         className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
// // //                       >
// // //                         <FiTrash2 className="w-3.5 h-3.5 text-[#C58C85]" />
// // //                       </button>
// // //                       {item.badge && (
// // //                         <span className="absolute top-3 left-3 bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
// // //                           {item.badge}
// // //                         </span>
// // //                       )}
// // //                     </div>

// // //                     <div className="p-4">
// // //                       <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
// // //                         {item.category}
// // //                       </span>
// // //                       <Link to={`/product/${item.id}`} className="cursor-pointer">
// // //                         <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mt-1 mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
// // //                           {item.title}
// // //                         </h3>
// // //                       </Link>
// // //                       <div className="flex items-center gap-2 mb-3">
// // //                         <span className="font-heading text-base font-bold text-[#7A4E48]">
// // //                           ₹{Number(item.price).toLocaleString('en-IN')}
// // //                         </span>
// // //                         {item.oldPrice > item.price && (
// // //                           <span className="font-body text-xs text-[#999] line-through">
// // //                             ₹{Number(item.oldPrice).toLocaleString('en-IN')}
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <button
// // //                         onClick={() => addToCart(item as any, item.sizes?.[0] || 'Free Size', item.colors?.[0] || '')}
// // //                         className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#7A4E48] text-white font-body text-xs font-semibold rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer"
// // //                       >
// // //                         <FiShoppingBag className="w-3.5 h-3.5" />
// // //                         Add to Cart
// // //                       </button>
// // //                     </div>
// // //                   </motion.div>
// // //                 ))}
// // //               </AnimatePresence>
// // //             </div>

// // //             <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#F0EBE3]">
// // //               <div>
// // //                 <p className="font-heading text-lg font-semibold text-[#1F1F1F]">
// // //                   {wishlist.length} item{wishlist.length > 1 ? 's' : ''} in your wishlist
// // //                 </p>
// // //                 <p className="font-body text-sm text-[#999]">Don't wait too long — these styles are popular!</p>
// // //               </div>
// // //               <Link
// // //                 to="/shop"
// // //                 className="px-6 py-3 border border-[#7A4E48] text-[#7A4E48] font-body text-sm font-semibold rounded-full hover:bg-[#7A4E48] hover:text-white transition-colors cursor-pointer"
// // //               >
// // //                 Continue Shopping
// // //               </Link>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import { useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
// // import { useStore } from '../store/useStore';
// // // import { useAuthStore } from '../store/useAuthStore';
// // import ConfirmDialog from '../components/ConfirmDialog';
// // import { useState } from 'react';

// // export default function Wishlist() {
// //   const { wishlist, removeFromWishlist, addToCart } = useStore();
// //   // const { isAuthenticated } = useAuthStore();

// //   // ── Confirm dialog state ──────────────────────────────────────────────────
// //   const [confirmId, setConfirmId] = useState<number | null>(null);
// //   const [removing, setRemoving] = useState(false);

// //   const handleRemoveConfirmed = async () => {
// //     if (confirmId === null) return;
// //     setRemoving(true);
// //     await removeFromWishlist(confirmId);
// //     setRemoving(false);
// //     setConfirmId(null);
// //   };

// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// //       <div className="bg-[#EFE7DC] py-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
// //             <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
// //             <span>/</span>
// //             <span className="text-[#555]">My Wishlist</span>
// //           </div>
// //           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">My Wishlist</h1>
// //           <p className="font-body text-sm text-[#777] mt-2">
// //             {wishlist.length === 0
// //               ? 'Your wishlist is empty'
// //               : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved`}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// //         {wishlist.length === 0 ? (
// //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
// //             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// //               <FiHeart className="w-10 h-10 text-[#C58C85]" />
// //             </div>
// //             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your wishlist is empty</h2>
// //             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
// //               Save your favourite pieces here and shop them whenever you're ready.
// //             </p>
// //             <Link
// //               to="/shop"
// //               className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //             >
// //               Explore Collection <FiArrowRight className="w-4 h-4" />
// //             </Link>
// //           </motion.div>
// //         ) : (
// //           <>
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
// //               <AnimatePresence>
// //                 {wishlist.map((item, i) => (
// //                   <motion.div
// //                     key={item.id}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, scale: 0.9 }}
// //                     transition={{ delay: i * 0.06, duration: 0.3 }}
// //                     className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 border border-[#F0EBE3]"
// //                   >
// //                     <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
// //                       <Link to={`/product/${item.id}`} className="cursor-pointer block w-full h-full">
// //                         <img
// //                           src={item.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'}
// //                           alt={item.title}
// //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// //                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'; }}
// //                         />
// //                       </Link>
// //                       {/* Remove button — triggers confirm dialog instead of removing immediately */}
// //                       <button
// //                         onClick={() => setConfirmId(item.id)}
// //                         className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
// //                       >
// //                         <FiTrash2 className="w-3.5 h-3.5 text-[#C58C85]" />
// //                       </button>
// //                       {item.badge && (
// //                         <span className="absolute top-3 left-3 bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
// //                           {item.badge}
// //                         </span>
// //                       )}
// //                     </div>

// //                     <div className="p-4">
// //                       <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
// //                         {item.category}
// //                       </span>
// //                       <Link to={`/product/${item.id}`} className="cursor-pointer">
// //                         <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mt-1 mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
// //                           {item.title}
// //                         </h3>
// //                       </Link>
// //                       <div className="flex items-center gap-2 mb-3">
// //                         <span className="font-heading text-base font-bold text-[#7A4E48]">
// //                           ₹{Number(item.price).toLocaleString('en-IN')}
// //                         </span>
// //                         {item.oldPrice > item.price && (
// //                           <span className="font-body text-xs text-[#999] line-through">
// //                             ₹{Number(item.oldPrice).toLocaleString('en-IN')}
// //                           </span>
// //                         )}
// //                       </div>
// //                       <button
// //                         onClick={() => addToCart(item as any, item.sizes?.[0] || 'Free Size', item.colors?.[0] || 'Default')}
// //                         className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#7A4E48] text-white font-body text-xs font-semibold rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //                       >
// //                         <FiShoppingBag className="w-3.5 h-3.5" />
// //                         Add to Cart
// //                       </button>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </AnimatePresence>
// //             </div>

// //             <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#F0EBE3]">
// //               <div>
// //                 <p className="font-heading text-lg font-semibold text-[#1F1F1F]">
// //                   {wishlist.length} item{wishlist.length > 1 ? 's' : ''} in your wishlist
// //                 </p>
// //                 <p className="font-body text-sm text-[#999]">Don't wait too long — these styles are popular!</p>
// //               </div>
// //               <Link
// //                 to="/shop"
// //                 className="px-6 py-3 border border-[#7A4E48] text-[#7A4E48] font-body text-sm font-semibold rounded-full hover:bg-[#7A4E48] hover:text-white transition-colors cursor-pointer"
// //               >
// //                 Continue Shopping
// //               </Link>
// //             </div>
// //           </>
// //         )}
// //       </div>

// //       {/* Confirm remove from wishlist */}
// //       <ConfirmDialog
// //         open={confirmId !== null}
// //         title="Remove from Wishlist?"
// //         message="This item will be removed from your wishlist. You can always add it back later."
// //         confirmLabel="Remove"
// //         cancelLabel="Keep"
// //         loading={removing}
// //         onConfirm={handleRemoveConfirmed}
// //         onClose={() => setConfirmId(null)}
// //       />
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
// import { useStore } from '../store/useStore';
// // import { useAuthStore } from '../store/useAuthStore';
// import ConfirmDialog from '../components/ConfirmDialog';

// export default function Wishlist() {
//   const { wishlist, removeFromWishlist, addToCart } = useStore();
//   // const { isAuthenticated } = useAuthStore();

//   const [confirmId, setConfirmId] = useState<number | null>(null);
//   const [removing, setRemoving] = useState(false);
//   const [addingToCart, setAddingToCart] = useState<number | null>(null);

//   const handleRemoveConfirmed = async () => {
//     if (confirmId === null) return;
//     setRemoving(true);
//     await removeFromWishlist(confirmId);
//     setRemoving(false);
//     setConfirmId(null);
//   };

//   // Add to cart AND remove from wishlist in one action
//   const handleAddToCartFromWishlist = async (item: typeof wishlist[0]) => {
//     setAddingToCart(item.id);
//     // Use first real size; color defaults to 'Default' sentinel if product
//     // has no colors (prevents backend min_length=1 validation error)
//     await addToCart(
//       item as any,
//       item.sizes?.[0] || 'Free Size',
//       item.colors?.[0] || 'Default',
//     );
//     // Remove from wishlist after cart add succeeds
//     await removeFromWishlist(item.id);
//     setAddingToCart(null);
//   };

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       <div className="bg-[#EFE7DC] py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
//             <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
//             <span>/</span>
//             <span className="text-[#555]">My Wishlist</span>
//           </div>
//           <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">My Wishlist</h1>
//           <p className="font-body text-sm text-[#777] mt-2">
//             {wishlist.length === 0
//               ? 'Your wishlist is empty'
//               : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved`}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {wishlist.length === 0 ? (
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
//             <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
//               <FiHeart className="w-10 h-10 text-[#C58C85]" />
//             </div>
//             <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your wishlist is empty</h2>
//             <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
//               Save your favourite pieces here and shop them whenever you're ready.
//             </p>
//             <Link
//               to="/shop"
//               className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
//             >
//               Explore Collection <FiArrowRight className="w-4 h-4" />
//             </Link>
//           </motion.div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//               <AnimatePresence>
//                 {wishlist.map((item, i) => (
//                   <motion.div
//                     key={item.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     transition={{ delay: i * 0.06, duration: 0.3 }}
//                     className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#F0EBE3]"
//                   >
//                     <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
//                       <Link to={`/product/${item.id}`} className="cursor-pointer block w-full h-full">
//                         <img
//                           src={item.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'}
//                           alt={item.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'; }}
//                         />
//                       </Link>
//                       {/* Remove button — confirm before removing */}
//                       <button
//                         onClick={() => setConfirmId(item.id)}
//                         className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
//                         title="Remove from wishlist"
//                       >
//                         <FiTrash2 className="w-3.5 h-3.5 text-[#C58C85]" />
//                       </button>
//                       {item.badge && (
//                         <span className="absolute top-3 left-3 bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
//                           {item.badge}
//                         </span>
//                       )}
//                     </div>

//                     <div className="p-4">
//                       <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
//                         {item.category}
//                       </span>
//                       <Link to={`/product/${item.id}`} className="cursor-pointer">
//                         <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mt-1 mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
//                           {item.title}
//                         </h3>
//                       </Link>
//                       <div className="flex items-center gap-2 mb-3">
//                         <span className="font-heading text-base font-bold text-[#7A4E48]">
//                           ₹{Number(item.price).toLocaleString('en-IN')}
//                         </span>
//                         {item.oldPrice > item.price && (
//                           <span className="font-body text-xs text-[#999] line-through">
//                             ₹{Number(item.oldPrice).toLocaleString('en-IN')}
//                           </span>
//                         )}
//                       </div>
//                       {/* Add to cart + remove from wishlist in one tap */}
//                       <button
//                         onClick={() => handleAddToCartFromWishlist(item)}
//                         disabled={addingToCart === item.id}
//                         className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#7A4E48] text-white font-body text-xs font-semibold rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer disabled:opacity-60"
//                       >
//                         {addingToCart === item.id ? (
//                           <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         ) : (
//                           <FiShoppingBag className="w-3.5 h-3.5" />
//                         )}
//                         {addingToCart === item.id ? 'Adding...' : 'Move to Cart'}
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>

//             <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#F0EBE3]">
//               <div>
//                 <p className="font-heading text-lg font-semibold text-[#1F1F1F]">
//                   {wishlist.length} item{wishlist.length > 1 ? 's' : ''} in your wishlist
//                 </p>
//                 <p className="font-body text-sm text-[#999]">Don't wait too long — these styles are popular!</p>
//               </div>
//               <Link
//                 to="/shop"
//                 className="px-6 py-3 border border-[#7A4E48] text-[#7A4E48] font-body text-sm font-semibold rounded-full hover:bg-[#7A4E48] hover:text-white transition-colors cursor-pointer"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Confirm remove from wishlist */}
//       <ConfirmDialog
//         open={confirmId !== null}
//         title="Remove from Wishlist?"
//         message="This item will be removed from your wishlist. You can always add it back later."
//         confirmLabel="Remove"
//         cancelLabel="Keep"
//         loading={removing}
//         onConfirm={handleRemoveConfirmed}
//         onClose={() => setConfirmId(null)}
//       />
//     </div>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    loadServerCart,
  } = useStore();

  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [removing, setRemoving] = useState(false);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const handleRemoveConfirmed = async () => {
    if (confirmId === null) return;

    setRemoving(true);

    try {
      await removeFromWishlist(confirmId);
      setConfirmId(null);
    } finally {
      setRemoving(false);
    }
  };

  const handleAddToCartFromWishlist = async (item: typeof wishlist[0]) => {
    setAddingToCart(item.id);

    try {
      await addToCart(
        item as any,
        item.sizes?.[0] || 'Free Size',
        item.colors?.[0] || 'Default'
      );

      await loadServerCart();
      await removeFromWishlist(item.id);
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="bg-[#EFE7DC] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
            <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#555]">My Wishlist</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">My Wishlist</h1>

          <p className="font-body text-sm text-[#777] mt-2">
            {wishlist.length === 0
              ? 'Your wishlist is empty'
              : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-10 h-10 text-[#C58C85]" />
            </div>

            <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">Your wishlist is empty</h2>

            <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
              Save your favourite pieces here and shop them whenever you're ready.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
            >
              Explore Collection <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence initial={false}>
                {wishlist.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ delay: Math.min(i * 0.025, 0.15), duration: 0.24 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#F0EBE3]"
                  >
                    <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
                      <Link to={`/product/${item.id}`} className="cursor-pointer block w-full h-full">
                        <img
                          src={item.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80';
                          }}
                        />
                      </Link>

                      <button
                        onClick={() => setConfirmId(item.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 className="w-3.5 h-3.5 text-[#C58C85]" />
                      </button>

                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <span className="font-body text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wider">
                        {item.category}
                      </span>

                      <Link to={`/product/${item.id}`} className="cursor-pointer">
                        <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mt-1 mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-heading text-base font-bold text-[#7A4E48]">
                          ₹{Number(item.price).toLocaleString('en-IN')}
                        </span>

                        {item.oldPrice > item.price && (
                          <span className="font-body text-xs text-[#999] line-through">
                            ₹{Number(item.oldPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCartFromWishlist(item)}
                        disabled={addingToCart === item.id}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#7A4E48] text-white font-body text-xs font-semibold rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer disabled:opacity-60"
                      >
                        {addingToCart === item.id ? (
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <FiShoppingBag className="w-3.5 h-3.5" />
                        )}
                        {addingToCart === item.id ? 'Moving...' : 'Move to Cart'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#F0EBE3]">
              <div>
                <p className="font-heading text-lg font-semibold text-[#1F1F1F]">
                  {wishlist.length} item{wishlist.length > 1 ? 's' : ''} in your wishlist
                </p>
                <p className="font-body text-sm text-[#999]">Don't wait too long — these styles are popular!</p>
              </div>

              <Link
                to="/shop"
                className="px-6 py-3 border border-[#7A4E48] text-[#7A4E48] font-body text-sm font-semibold rounded-full hover:bg-[#7A4E48] hover:text-white transition-colors cursor-pointer"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        title="Remove from Wishlist?"
        message="This item will be removed from your wishlist. You can always add it back later."
        confirmLabel="Remove"
        cancelLabel="Keep"
        loading={removing}
        onConfirm={handleRemoveConfirmed}
        onClose={() => !removing && setConfirmId(null)}
      />
    </div>
  );
}