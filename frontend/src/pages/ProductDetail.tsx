// // import { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FiHeart, FiShoppingBag, FiMinus, FiPlus, FiStar, FiTruck, FiRefreshCw, FiShield, FiArrowLeft } from 'react-icons/fi';
// // import { useStore } from '../store/useStore';
// // import { getProductById, getRelatedProducts } from '../data/products';
// // import ProductCard from '../components/ProductCard';
// // import SectionHeader from '../components/SectionHeader';

// // export default function ProductDetail() {
// //   const { id } = useParams();
// //   const product = getProductById(Number(id));
// //   const { addToCart, addToWishlist, isInWishlist } = useStore();
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [selectedSize, setSelectedSize] = useState('');
// //   const [selectedColor, setSelectedColor] = useState('');
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeTab, setActiveTab] = useState('description');
// //   const [imgZoom, setImgZoom] = useState(false);

// //   useEffect(() => {
// //     if (product) {
// //       setSelectedSize(product.sizes[0]);
// //       setSelectedColor(product.colors[0]);
// //       setSelectedImage(0);
// //       setQuantity(1);
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     }
// //   }, [id, product]);

// //   if (!product) {
// //     return (
// //       <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-6xl mb-4">🔍</div>
// //           <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-4">Product Not Found</h2>
// //           <p className="font-body text-[#999] mb-6">The product you're looking for doesn't exist.</p>
// //           <Link
// //             to="/shop"
// //             className="bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //           >
// //             Back to Shop
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const inWishlist = isInWishlist(product.id);
// //   const relatedProducts = getRelatedProducts(product.id, product.category);
// //   const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

// //   const tabs = [
// //     { id: 'description', label: 'Description' },
// //     { id: 'specifications', label: 'Specifications' },
// //     { id: 'reviews', label: `Reviews (${product.reviews})` },
// //   ];

// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// //       {/* Breadcrumb */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //         <div className="flex items-center gap-2 text-xs font-body text-[#999]">
// //           <Link to="/" className="hover:text-[#7A4E48] transition-colors cursor-pointer">Home</Link>
// //           <span>/</span>
// //           <Link to="/shop" className="hover:text-[#7A4E48] transition-colors cursor-pointer">Shop</Link>
// //           <span>/</span>
// //           <Link to={`/shop?category=${product.category}`} className="hover:text-[#7A4E48] transition-colors cursor-pointer">{product.category}</Link>
// //           <span>/</span>
// //           <span className="text-[#555] truncate max-w-[200px]">{product.title}</span>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
// //         {/* Back Button */}
// //         <Link
// //           to="/shop"
// //           className="inline-flex items-center gap-2 font-body text-sm text-[#777] hover:text-[#7A4E48] transition-colors cursor-pointer mb-6"
// //         >
// //           <FiArrowLeft className="w-4 h-4" />
// //           Back to Shop
// //         </Link>

// //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
// //           {/* Image Gallery */}
// //           <div className="flex gap-4">
// //             {/* Thumbnails */}
// //             <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
// //               {product.images.map((img, i) => (
// //                 <button
// //                   key={i}
// //                   onClick={() => setSelectedImage(i)}
// //                   className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
// //                     selectedImage === i ? 'border-[#7A4E48]' : 'border-transparent hover:border-[#C9A86A]'
// //                   }`}
// //                 >
// //                   <img
// //                     src={img}
// //                     alt={`${product.title} ${i + 1}`}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80';
// //                     }}
// //                   />
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Main Image */}
// //             <div className="flex-1">
// //               <motion.div
// //                 className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#EFE7DC] cursor-zoom-in shadow-lg"
// //                 onHoverStart={() => setImgZoom(true)}
// //                 onHoverEnd={() => setImgZoom(false)}
// //               >
// //                 <AnimatePresence mode="wait">
// //                   <motion.img
// //                     key={selectedImage}
// //                     src={product.images[selectedImage]}
// //                     alt={product.title}
// //                     className="w-full h-full object-cover"
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                     transition={{ duration: 0.3 }}
// //                     style={{ transform: imgZoom ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease' }}
// //                     onError={(e) => {
// //                       (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80';
// //                     }}
// //                   />
// //                 </AnimatePresence>
// //                 {product.badge && (
// //                   <div className="absolute top-4 left-4">
// //                     <span className="bg-[#7A4E48] text-white text-[11px] font-body font-semibold px-3 py-1.5 rounded-full">
// //                       {product.badge}
// //                     </span>
// //                   </div>
// //                 )}
// //                 {discount > 0 && (
// //                   <div className="absolute top-4 right-4">
// //                     <span className="bg-[#C9A86A] text-white text-[11px] font-body font-semibold px-3 py-1.5 rounded-full">
// //                       -{discount}% OFF
// //                     </span>
// //                   </div>
// //                 )}
// //               </motion.div>

// //               {/* Mobile Thumbnails */}
// //               <div className="flex gap-2 mt-3 md:hidden">
// //                 {product.images.map((img, i) => (
// //                   <button
// //                     key={i}
// //                     onClick={() => setSelectedImage(i)}
// //                     className={`aspect-square w-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
// //                       selectedImage === i ? 'border-[#7A4E48]' : 'border-transparent'
// //                     }`}
// //                   >
// //                     <img src={img} alt="" className="w-full h-full object-cover"
// //                       onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&q=80'; }}
// //                     />
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Product Info */}
// //           <div className="flex flex-col">
// //             <div className="mb-2">
// //               <Link
// //                 to={`/shop?category=${product.category}`}
// //                 className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-wider hover:text-[#7A4E48] transition-colors cursor-pointer"
// //               >
// //                 {product.category}
// //               </Link>
// //             </div>

// //             <h1 className="font-heading text-3xl md:text-4xl font-semibold text-[#1F1F1F] leading-tight mb-4">
// //               {product.title}
// //             </h1>

// //             {/* Rating */}
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="flex items-center gap-1">
// //                 {Array.from({ length: 5 }).map((_, i) => (
// //                   <FiStar
// //                     key={i}
// //                     className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#C9A86A] fill-[#C9A86A]' : 'text-[#DDD]'}`}
// //                   />
// //                 ))}
// //               </div>
// //               <span className="font-heading text-base font-semibold text-[#1F1F1F]">{product.rating}</span>
// //               <span className="font-body text-sm text-[#999]">({product.reviews} reviews)</span>
// //             </div>

// //             {/* Price */}
// //             <div className="flex items-baseline gap-4 mb-6">
// //               <span className="font-heading text-4xl font-bold text-[#7A4E48]">
// //                 ₹{product.price.toLocaleString('en-IN')}
// //               </span>
// //               <span className="font-body text-lg text-[#999] line-through">
// //                 ₹{product.oldPrice.toLocaleString('en-IN')}
// //               </span>
// //               {discount > 0 && (
// //                 <span className="font-body text-sm text-green-600 font-semibold">
// //                   Save ₹{(product.oldPrice - product.price).toLocaleString('en-IN')}
// //                 </span>
// //               )}
// //             </div>

// //             {/* Fabric */}
// //             <div className="bg-[#EFE7DC] rounded-xl px-4 py-3 mb-6">
// //               <span className="font-body text-xs text-[#777] uppercase tracking-wider">Fabric</span>
// //               <p className="font-heading text-base font-semibold text-[#1F1F1F] mt-0.5">{product.fabric}</p>
// //             </div>

// //             {/* Color Selection */}
// //             <div className="mb-6">
// //               <div className="flex items-center gap-2 mb-3">
// //                 <span className="font-body text-sm font-medium text-[#1F1F1F]">Color:</span>
// //                 <span className="font-body text-sm text-[#7A4E48] font-semibold">{selectedColor}</span>
// //               </div>
// //               <div className="flex flex-wrap gap-2">
// //                 {product.colors.map(color => (
// //                   <button
// //                     key={color}
// //                     onClick={() => setSelectedColor(color)}
// //                     className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer border ${
// //                       selectedColor === color
// //                         ? 'border-[#7A4E48] bg-[#7A4E48] text-white'
// //                         : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A]'
// //                     }`}
// //                   >
// //                     {color}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Size Selection */}
// //             {product.sizes[0] !== 'Free Size' && (
// //               <div className="mb-6">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <span className="font-body text-sm font-medium text-[#1F1F1F]">Size: <span className="text-[#7A4E48] font-semibold">{selectedSize}</span></span>
// //                   <button className="font-body text-xs text-[#C9A86A] hover:text-[#7A4E48] transition-colors cursor-pointer underline">Size Guide</button>
// //                 </div>
// //                 <div className="flex flex-wrap gap-2">
// //                   {product.sizes.map(size => (
// //                     <button
// //                       key={size}
// //                       onClick={() => setSelectedSize(size)}
// //                       className={`w-12 h-12 rounded-xl text-xs font-body font-semibold transition-all cursor-pointer border ${
// //                         selectedSize === size
// //                           ? 'border-[#7A4E48] bg-[#7A4E48] text-white'
// //                           : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A] bg-white'
// //                       }`}
// //                     >
// //                       {size}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Quantity */}
// //             <div className="flex items-center gap-4 mb-8">
// //               <span className="font-body text-sm font-medium text-[#1F1F1F]">Quantity:</span>
// //               <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden bg-white">
// //                 <button
// //                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
// //                   className="w-10 h-10 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// //                 >
// //                   <FiMinus className="w-3.5 h-3.5 text-[#555]" />
// //                 </button>
// //                 <span className="w-12 text-center font-body text-sm font-medium text-[#1F1F1F]">{quantity}</span>
// //                 <button
// //                   onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
// //                   className="w-10 h-10 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer"
// //                 >
// //                   <FiPlus className="w-3.5 h-3.5 text-[#555]" />
// //                 </button>
// //               </div>
// //               <span className="font-body text-xs text-[#999]">
// //                 {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
// //               </span>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="flex gap-3 mb-8">
// //               <motion.button
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => addToCart(product, selectedSize || product.sizes[0], selectedColor, quantity)}
// //                 className="flex-1 flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md hover:shadow-lg"
// //               >
// //                 <FiShoppingBag className="w-4 h-4" />
// //                 Add to Cart
// //               </motion.button>

// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => addToWishlist(product)}
// //                 className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all cursor-pointer ${
// //                   inWishlist
// //                     ? 'bg-[#C58C85] border-[#C58C85] text-white'
// //                     : 'border-[#E8DCCB] text-[#555] hover:border-[#C58C85] hover:text-[#C58C85] bg-white'
// //                 }`}
// //               >
// //                 <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
// //               </motion.button>
// //             </div>

// //             {/* Trust Badges */}
// //             <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-[#EFE7DC] rounded-2xl">
// //               {[
// //                 { icon: FiTruck, text: 'Free Shipping' },
// //                 { icon: FiRefreshCw, text: '7-Day Returns' },
// //                 { icon: FiShield, text: 'Secure Payment' },
// //               ].map(({ icon: Icon, text }) => (
// //                 <div key={text} className="text-center">
// //                   <Icon className="w-5 h-5 text-[#7A4E48] mx-auto mb-1" />
// //                   <span className="font-body text-[11px] text-[#666]">{text}</span>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Tabs */}
// //             <div className="border-t border-[#E8DCCB]">
// //               <div className="flex gap-0 border-b border-[#E8DCCB]">
// //                 {tabs.map(tab => (
// //                   <button
// //                     key={tab.id}
// //                     onClick={() => setActiveTab(tab.id)}
// //                     className={`px-5 py-3.5 font-body text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-px ${
// //                       activeTab === tab.id
// //                         ? 'border-[#7A4E48] text-[#7A4E48]'
// //                         : 'border-transparent text-[#999] hover:text-[#555]'
// //                     }`}
// //                   >
// //                     {tab.label}
// //                   </button>
// //                 ))}
// //               </div>

// //               <AnimatePresence mode="wait">
// //                 <motion.div
// //                   key={activeTab}
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   transition={{ duration: 0.2 }}
// //                   className="py-5"
// //                 >
// //                   {activeTab === 'description' && (
// //                     <p className="font-body text-sm text-[#555] leading-relaxed">{product.description}</p>
// //                   )}
// //                   {activeTab === 'specifications' && (
// //                     <div className="space-y-2">
// //                       {product.specifications.split('|').map((spec, i) => {
// //                         const [key, value] = spec.trim().split(':');
// //                         return (
// //                           <div key={i} className="flex gap-3 text-sm font-body">
// //                             <span className="font-semibold text-[#1F1F1F] min-w-[120px]">{key?.trim()}</span>
// //                             <span className="text-[#666]">{value?.trim()}</span>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   )}
// //                   {activeTab === 'reviews' && (
// //                     <div className="space-y-4">
// //                       <div className="flex items-center gap-4 p-4 bg-[#F8F5F0] rounded-xl">
// //                         <div className="text-center">
// //                           <div className="font-heading text-5xl font-bold text-[#7A4E48]">{product.rating}</div>
// //                           <div className="flex items-center justify-center gap-0.5 mt-1">
// //                             {Array.from({ length: 5 }).map((_, i) => (
// //                               <FiStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-[#C9A86A] fill-[#C9A86A]' : 'text-[#DDD]'}`} />
// //                             ))}
// //                           </div>
// //                           <div className="font-body text-xs text-[#999] mt-1">{product.reviews} reviews</div>
// //                         </div>
// //                         <div className="flex-1 space-y-1.5">
// //                           {[5, 4, 3, 2, 1].map(star => (
// //                             <div key={star} className="flex items-center gap-2">
// //                               <span className="font-body text-xs text-[#999] w-3">{star}</span>
// //                               <div className="flex-1 h-1.5 bg-[#E8DCCB] rounded-full overflow-hidden">
// //                                 <div
// //                                   className="h-full bg-[#C9A86A] rounded-full"
// //                                   style={{ width: star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : '1%' }}
// //                                 />
// //                               </div>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                       <p className="font-body text-sm text-[#999] text-center py-4">Detailed reviews coming soon. Be the first to review this product!</p>
// //                     </div>
// //                   )}
// //                 </motion.div>
// //               </AnimatePresence>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Related Products */}
// //         {relatedProducts.length > 0 && (
// //           <div className="mt-20">
// //             <SectionHeader
// //               badge="You May Also Like"
// //               title="Related Products"
// //             />
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
// //               {relatedProducts.map((product, i) => (
// //                 <ProductCard key={product.id} product={product} index={i} />
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiHeart, FiShoppingBag, FiArrowLeft, FiStar, FiTruck, FiRotateCcw, FiShield, FiChevronDown,
// } from 'react-icons/fi';
// import { useStore } from '../store/useStore';
// import { useAuthStore } from '../store/useAuthStore';
// import { productsApi, AdaptedProduct } from '../api/products';
// import ProductCard from '../components/ProductCard';

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { addToCart, addToWishlist, isInWishlist } = useStore();
//   const { isAuthenticated } = useAuthStore();

//   const [product, setProduct] = useState<AdaptedProduct | null>(null);
//   const [related, setRelated] = useState<AdaptedProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [activeTab, setActiveTab] = useState<'description' | 'fabric' | 'care'>('description');
//   const [adding, setAdding] = useState(false);

//   const inWishlist = product ? isInWishlist(product.id) : false;

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     setError('');
//     setSelectedImage(0);
//     setQuantity(1);
//     productsApi.getById(Number(id))
//       .then((p) => {
//         setProduct(p);
//         setSelectedSize(p.sizes[0] || 'Free Size');
//         setSelectedColor(p.colors[0] || '');
//         setLoading(false);
//         // Load related products from same category
//         return productsApi.list({ category: p.category.toLowerCase().replace(/\s+/g, '-'), page: 1, page_size: 5 });
//       })
//       .then((r) => {
//         setRelated(r.products.filter((rp) => rp.id !== Number(id)).slice(0, 4));
//       })
//       .catch(() => {
//         setError('Product not found or no longer available.');
//         setLoading(false);
//       });
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/product/${id}` } });
//       return;
//     }
//     if (!product) return;
//     setAdding(true);
//     await addToCart(product as any, selectedSize, selectedColor, quantity);
//     setAdding(false);
//   };

//   const handleBuyNow = async () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/product/${id}` } });
//       return;
//     }
//     if (!product) return;
//     setAdding(true);
//     await addToCart(product as any, selectedSize, selectedColor, quantity);
//     setAdding(false);
//     navigate('/checkout');
//   };

//   const handleWishlist = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/product/${id}` } });
//       return;
//     }
//     if (product) addToWishlist(product as any);
//   };

//   if (loading) {
//     return (
//       <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid lg:grid-cols-2 gap-12">
//             <div className="space-y-4">
//               <div className="aspect-[3/4] bg-[#EFE7DC] rounded-2xl animate-pulse" />
//               <div className="flex gap-3">
//                 {[1, 2, 3].map((i) => <div key={i} className="w-20 h-20 rounded-xl bg-[#EFE7DC] animate-pulse" />)}
//               </div>
//             </div>
//             <div className="space-y-4">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <div key={i} className={`h-${i === 1 ? 8 : i === 2 ? 6 : 4} bg-[#EFE7DC] rounded-full animate-pulse w-${i % 2 === 0 ? 'full' : '3/4'}`} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center">
//         <div className="text-center px-4">
//           <div className="text-6xl mb-4">🪷</div>
//           <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-2">Product not found</h2>
//           <p className="font-body text-sm text-[#999] mb-6">{error}</p>
//           <Link to="/shop" className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#5A3A36] transition-colors">
//             ← Back to Shop
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const discount = product.oldPrice > product.price
//     ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//     : 0;

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-8">
//           <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
//           <span>/</span>
//           <Link to="/shop" className="hover:text-[#7A4E48] transition-colors">Shop</Link>
//           <span>/</span>
//           <Link to={`/shop?category=${product.category}`} className="hover:text-[#7A4E48] transition-colors">{product.category}</Link>
//           <span>/</span>
//           <span className="text-[#555] line-clamp-1">{product.title}</span>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 mb-16">
//           {/* Images */}
//           <div className="space-y-4">
//             <motion.div
//               key={selectedImage}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#F0EBE3] shadow-md"
//             >
//               <img
//                 src={product.images[selectedImage] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80'}
//                 alt={product.title}
//                 className="w-full h-full object-cover"
//                 onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80'; }}
//               />
//             </motion.div>
//             {product.images.length > 1 && (
//               <div className="flex gap-3 overflow-x-auto pb-1">
//                 {product.images.map((img, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedImage(i)}
//                     className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${selectedImage === i ? 'border-[#7A4E48]' : 'border-transparent hover:border-[#C9A86A]'}`}
//                   >
//                     <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover"
//                       onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80'; }} />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <span className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-[0.2em]">{product.category}</span>
//               <h1 className="font-heading text-3xl md:text-4xl font-semibold text-[#1F1F1F] mt-2 leading-tight">{product.title}</h1>

//               <div className="flex items-center gap-4 mt-3">
//                 <div className="flex items-center gap-1">
//                   {[1,2,3,4,5].map((s) => (
//                     <FiStar key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-[#C9A86A] fill-[#C9A86A]' : 'text-[#DDD]'}`} />
//                   ))}
//                   <span className="font-body text-sm text-[#666] ml-1">{Number(product.rating).toFixed(1)}</span>
//                 </div>
//                 <span className="font-body text-sm text-[#999]">{product.reviews} reviews</span>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="flex items-center gap-4">
//               <span className="font-heading text-4xl font-bold text-[#7A4E48]">₹{Number(product.price).toLocaleString('en-IN')}</span>
//               {product.oldPrice > product.price && (
//                 <>
//                   <span className="font-body text-lg text-[#999] line-through">₹{Number(product.oldPrice).toLocaleString('en-IN')}</span>
//                   <span className="bg-[#EFE7DC] text-[#7A4E48] font-body text-sm font-semibold px-3 py-1 rounded-full">{discount}% off</span>
//                 </>
//               )}
//             </div>

//             {/* Size selector */}
//             {product.sizes.length > 0 && (
//               <div>
//                 <p className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">
//                   Size: <span className="text-[#1F1F1F] normal-case font-normal tracking-normal">{selectedSize}</span>
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {product.sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-4 py-2 rounded-xl font-body text-sm border-2 transition-all cursor-pointer ${
//                         selectedSize === size
//                           ? 'border-[#7A4E48] bg-[#7A4E48] text-white'
//                           : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A]'
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Color selector */}
//             {product.colors.length > 0 && (
//               <div>
//                 <p className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">
//                   Color: <span className="text-[#1F1F1F] normal-case font-normal tracking-normal">{selectedColor}</span>
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {product.colors.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => setSelectedColor(color)}
//                       className={`px-4 py-2 rounded-xl font-body text-sm border-2 transition-all cursor-pointer ${
//                         selectedColor === color
//                           ? 'border-[#7A4E48] bg-[#EFE7DC] text-[#7A4E48] font-semibold'
//                           : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A]'
//                       }`}
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity */}
//             <div>
//               <p className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">Quantity</p>
//               <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden w-fit bg-[#F8F5F0]">
//                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer font-body text-lg text-[#555]">−</button>
//                 <span className="w-12 text-center font-body text-sm font-medium text-[#1F1F1F]">{quantity}</span>
//                 <button onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer font-body text-lg text-[#555]">+</button>
//               </div>
//             </div>

//             {/* Stock */}
//             <p className={`font-body text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
//               {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `⚠ Only ${product.stock} left` : '✗ Out of Stock'}
//             </p>

//             {/* Action buttons */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <motion.button
//                 onClick={handleAddToCart}
//                 disabled={adding || product.stock === 0}
//                 whileHover={{ scale: adding || product.stock === 0 ? 1 : 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex-1 flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {adding ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiShoppingBag className="w-4 h-4" />}
//                 {isAuthenticated ? (adding ? 'Adding...' : 'Add to Cart') : 'Sign In to Add'}
//               </motion.button>
//               <motion.button
//                 onClick={handleBuyNow}
//                 disabled={adding || product.stock === 0}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex-1 flex items-center justify-center gap-2 bg-[#1F1F1F] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#333] transition-colors cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isAuthenticated ? 'Buy Now' : 'Sign In to Buy'}
//               </motion.button>
//               <motion.button
//                 onClick={handleWishlist}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all cursor-pointer ${inWishlist ? 'border-[#C58C85] bg-[#FFF0F0]' : 'border-[#E8DCCB] hover:border-[#C58C85]'}`}
//               >
//                 <FiHeart className={`w-5 h-5 ${inWishlist ? 'text-[#C58C85] fill-[#C58C85]' : 'text-[#555]'}`} />
//               </motion.button>
//             </div>

//             {/* Trust badges */}
//             <div className="grid grid-cols-3 gap-3 pt-2">
//               {[
//                 { icon: FiTruck, label: 'Free shipping ₹999+' },
//                 { icon: FiRotateCcw, label: '7-day returns' },
//                 { icon: FiShield, label: 'Secure checkout' },
//               ].map(({ icon: Icon, label }) => (
//                 <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-[#F8F5F0] rounded-xl">
//                   <Icon className="w-4 h-4 text-[#7A4E48]" />
//                   <span className="font-body text-[10px] text-[#777] text-center leading-tight">{label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm mb-16">
//           <div className="flex border-b border-[#E8DCCB]">
//             {[
//               { key: 'description', label: 'Description' },
//               { key: 'fabric', label: 'Fabric & Care' },
//               { key: 'care', label: 'Specifications' },
//             ].map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key as any)}
//                 className={`flex-1 py-4 font-body text-sm font-medium transition-colors cursor-pointer ${
//                   activeTab === tab.key
//                     ? 'text-[#7A4E48] border-b-2 border-[#7A4E48] -mb-px'
//                     : 'text-[#999] hover:text-[#555]'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//           <div className="p-6">
//             {activeTab === 'description' && (
//               <p className="font-body text-sm text-[#555] leading-relaxed">
//                 {product.description || 'No description available for this product.'}
//               </p>
//             )}
//             {activeTab === 'fabric' && (
//               <div className="space-y-3">
//                 {product.fabric ? (
//                   <p className="font-body text-sm text-[#555] leading-relaxed">{product.fabric}</p>
//                 ) : (
//                   <p className="font-body text-sm text-[#999]">Fabric details not specified. Please contact us for more information.</p>
//                 )}
//                 <div className="border-t border-[#F0EBE3] pt-3">
//                   <p className="font-body text-sm font-semibold text-[#555] mb-2">Care Instructions</p>
//                   <ul className="font-body text-sm text-[#777] space-y-1 list-disc list-inside">
//                     <li>Dry clean recommended for silk and heavy embroidery</li>
//                     <li>Hand wash cold for cotton and lighter fabrics</li>
//                     <li>Do not bleach or tumble dry</li>
//                     <li>Iron on low heat with a cloth between iron and garment</li>
//                   </ul>
//                 </div>
//               </div>
//             )}
//             {activeTab === 'care' && (
//               <p className="font-body text-sm text-[#555] leading-relaxed">
//                 {product.specifications || 'Detailed specifications not available for this product.'}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Related products */}
//         {related.length > 0 && (
//           <section>
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F]">You May Also Like</h2>
//               <Link to={`/shop?category=${product.category}`} className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors">
//                 View all {product.category} →
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {related.map((rp, i) => <ProductCard key={rp.id} product={rp as any} index={i} />)}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHeart, FiShoppingBag, FiStar, FiTruck, FiRotateCcw, FiShield,
} from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { productsApi, AdaptedProduct } from '../api/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const { isAuthenticated } = useAuthStore();

  const [product, setProduct] = useState<AdaptedProduct | null>(null);
  const [related, setRelated] = useState<AdaptedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'fabric' | 'care'>('description');
  const [adding, setAdding] = useState(false);

  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    setSelectedImage(0);
    setQuantity(1);
    productsApi.getById(Number(id))
      .then((p) => {
        setProduct(p);
        setSelectedSize(p.sizes[0] || 'Free Size');
        // Backend requires selected_color to be a non-empty string (min_length=1).
        // Default to 'Default' instead of '' when the product has no color variants,
        // so Add to Cart never sends an empty string and triggers a 422.
        setSelectedColor(p.colors[0] || 'Default');
        setLoading(false);
        // Load related products from same category
        return productsApi.list({ category: p.category.toLowerCase().replace(/\s+/g, '-'), page: 1, page_size: 5 });
      })
      .then((r) => {
        setRelated(r.products.filter((rp) => rp.id !== Number(id)).slice(0, 4));
      })
      .catch(() => {
        setError('Product not found or no longer available.');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    if (!product) return;
    setAdding(true);
    await addToCart(product as any, selectedSize, selectedColor, quantity);
    setAdding(false);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    if (!product) return;
    setAdding(true);
    await addToCart(product as any, selectedSize, selectedColor, quantity);
    setAdding(false);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    if (product) addToWishlist(product as any);
  };

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-[#EFE7DC] rounded-2xl animate-pulse" />
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => <div key={i} className="w-20 h-20 rounded-xl bg-[#EFE7DC] animate-pulse" />)}
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-${i === 1 ? 8 : i === 2 ? 6 : 4} bg-[#EFE7DC] rounded-full animate-pulse w-${i % 2 === 0 ? 'full' : '3/4'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🪷</div>
          <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-2">Product not found</h2>
          <p className="font-body text-sm text-[#999] mb-6">{error}</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#5A3A36] transition-colors">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-8">
          <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#7A4E48] transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#7A4E48] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-[#555] line-clamp-1">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#F0EBE3] shadow-md"
            >
              <img
                src={product.images[selectedImage] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80'}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80'; }}
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${selectedImage === i ? 'border-[#7A4E48]' : 'border-transparent hover:border-[#C9A86A]'}`}
                  >
                    <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80'; }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-[0.2em]">{product.category}</span>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-[#1F1F1F] mt-2 leading-tight">{product.title}</h1>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <FiStar key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-[#C9A86A] fill-[#C9A86A]' : 'text-[#DDD]'}`} />
                  ))}
                  <span className="font-body text-sm text-[#666] ml-1">{Number(product.rating).toFixed(1)}</span>
                </div>
                <span className="font-body text-sm text-[#999]">{product.reviews} reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-heading text-4xl font-bold text-[#7A4E48]">₹{Number(product.price).toLocaleString('en-IN')}</span>
              {product.oldPrice > product.price && (
                <>
                  <span className="font-body text-lg text-[#999] line-through">₹{Number(product.oldPrice).toLocaleString('en-IN')}</span>
                  <span className="bg-[#EFE7DC] text-[#7A4E48] font-body text-sm font-semibold px-3 py-1 rounded-full">{discount}% off</span>
                </>
              )}
            </div>

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div>
                <p className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">
                  Size: <span className="text-[#1F1F1F] normal-case font-normal tracking-normal">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl font-body text-sm border-2 transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#7A4E48] bg-[#7A4E48] text-white'
                          : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div>
                <p className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">
                  Color: <span className="text-[#1F1F1F] normal-case font-normal tracking-normal">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl font-body text-sm border-2 transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'border-[#7A4E48] bg-[#EFE7DC] text-[#7A4E48] font-semibold'
                          : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">Quantity</p>
              <div className="flex items-center border border-[#E8DCCB] rounded-xl overflow-hidden w-fit bg-[#F8F5F0]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer font-body text-lg text-[#555]">−</button>
                <span className="w-12 text-center font-body text-sm font-medium text-[#1F1F1F]">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#EFE7DC] transition-colors cursor-pointer font-body text-lg text-[#555]">+</button>
              </div>
            </div>

            {/* Stock */}
            <p className={`font-body text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
              {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `⚠ Only ${product.stock} left` : '✗ Out of Stock'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={handleAddToCart}
                disabled={adding || product.stock === 0}
                whileHover={{ scale: adding || product.stock === 0 ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {adding ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiShoppingBag className="w-4 h-4" />}
                {isAuthenticated ? (adding ? 'Adding...' : 'Add to Cart') : 'Sign In to Add'}
              </motion.button>
              <motion.button
                onClick={handleBuyNow}
                disabled={adding || product.stock === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1F1F1F] text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-[#333] transition-colors cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAuthenticated ? 'Buy Now' : 'Sign In to Buy'}
              </motion.button>
              <motion.button
                onClick={handleWishlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all cursor-pointer ${inWishlist ? 'border-[#C58C85] bg-[#FFF0F0]' : 'border-[#E8DCCB] hover:border-[#C58C85]'}`}
              >
                <FiHeart className={`w-5 h-5 ${inWishlist ? 'text-[#C58C85] fill-[#C58C85]' : 'text-[#555]'}`} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: FiTruck, label: 'Free shipping ₹999+' },
                { icon: FiRotateCcw, label: '7-day returns' },
                { icon: FiShield, label: 'Secure checkout' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-[#F8F5F0] rounded-xl">
                  <Icon className="w-4 h-4 text-[#7A4E48]" />
                  <span className="font-body text-[10px] text-[#777] text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-[#E8DCCB] shadow-sm mb-16">
          <div className="flex border-b border-[#E8DCCB]">
            {[
              { key: 'description', label: 'Description' },
              { key: 'fabric', label: 'Fabric & Care' },
              { key: 'care', label: 'Specifications' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-4 font-body text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-[#7A4E48] border-b-2 border-[#7A4E48] -mb-px'
                    : 'text-[#999] hover:text-[#555]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'description' && (
              <p className="font-body text-sm text-[#555] leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>
            )}
            {activeTab === 'fabric' && (
              <div className="space-y-3">
                {product.fabric ? (
                  <p className="font-body text-sm text-[#555] leading-relaxed">{product.fabric}</p>
                ) : (
                  <p className="font-body text-sm text-[#999]">Fabric details not specified. Please contact us for more information.</p>
                )}
                <div className="border-t border-[#F0EBE3] pt-3">
                  <p className="font-body text-sm font-semibold text-[#555] mb-2">Care Instructions</p>
                  <ul className="font-body text-sm text-[#777] space-y-1 list-disc list-inside">
                    <li>Dry clean recommended for silk and heavy embroidery</li>
                    <li>Hand wash cold for cotton and lighter fabrics</li>
                    <li>Do not bleach or tumble dry</li>
                    <li>Iron on low heat with a cloth between iron and garment</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'care' && (
              <p className="font-body text-sm text-[#555] leading-relaxed">
                {product.specifications || 'Detailed specifications not available for this product.'}
              </p>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F]">You May Also Like</h2>
              <Link to={`/shop?category=${product.category}`} className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] transition-colors">
                View all {product.category} →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((rp, i) => <ProductCard key={rp.id} product={rp as any} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}