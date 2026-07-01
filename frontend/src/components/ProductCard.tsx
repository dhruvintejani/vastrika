// // // // import { useState } from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { motion } from 'framer-motion';
// // // // import { FiHeart, FiEye, FiShoppingBag, FiStar } from 'react-icons/fi';
// // // // import { useStore } from '../store/useStore';
// // // // import { Product } from '../data/products';

// // // // interface ProductCardProps {
// // // //   product: Product;
// // // //   index?: number;
// // // // }

// // // // export default function ProductCard({ product, index = 0 }: ProductCardProps) {
// // // //   const [imgError, setImgError] = useState(false);
// // // //   const [isHovered, setIsHovered] = useState(false);
// // // //   const { addToCart, addToWishlist, isInWishlist } = useStore();
// // // //   const inWishlist = isInWishlist(product.id);

// // // //   const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

// // // //   const fallbackImage = `https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80`;

// // // //   return (
// // // //     <motion.div
// // // //       initial={{ opacity: 0, y: 30 }}
// // // //       whileInView={{ opacity: 1, y: 0 }}
// // // //       viewport={{ once: true }}
// // // //       transition={{ duration: 0.5, delay: index * 0.08 }}
// // // //       className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0EBE3]"
// // // //       onMouseEnter={() => setIsHovered(true)}
// // // //       onMouseLeave={() => setIsHovered(false)}
// // // //     >
// // // //       {/* Image Container */}
// // // //       <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
// // // //         <Link to={`/product/${product.id}`} className="cursor-pointer block w-full h-full">
// // // //           <motion.img
// // // //             src={imgError ? fallbackImage : product.images[0]}
// // // //             alt={product.title}
// // // //             onError={() => setImgError(true)}
// // // //             className="w-full h-full object-cover"
// // // //             animate={{ scale: isHovered ? 1.08 : 1 }}
// // // //             transition={{ duration: 0.6, ease: 'easeOut' }}
// // // //           />
// // // //         </Link>

// // // //         {/* Overlay gradient */}
// // // //         <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

// // // //         {/* Badges */}
// // // //         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
// // // //           {product.badge && (
// // // //             <span className="bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
// // // //               {product.badge}
// // // //             </span>
// // // //           )}
// // // //           {discount > 0 && (
// // // //             <span className="bg-[#C9A86A] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
// // // //               -{discount}%
// // // //             </span>
// // // //           )}
// // // //         </div>

// // // //         {/* Action Buttons */}
// // // //         <div className="absolute top-3 right-3 flex flex-col gap-2">
// // // //           <motion.button
// // // //             onClick={() => addToWishlist(product)}
// // // //             whileHover={{ scale: 1.15 }}
// // // //             whileTap={{ scale: 0.9 }}
// // // //             className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
// // // //               inWishlist
// // // //                 ? 'bg-[#C58C85] text-white'
// // // //                 : 'bg-white/90 text-[#1F1F1F] hover:bg-[#C58C85] hover:text-white'
// // // //             }`}
// // // //             style={{
// // // //               opacity: isHovered || inWishlist ? 1 : 0,
// // // //               transform: isHovered || inWishlist ? 'translateX(0)' : 'translateX(10px)',
// // // //               transition: 'all 0.3s ease',
// // // //             }}
// // // //           >
// // // //             <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
// // // //           </motion.button>

// // // //           <Link
// // // //             to={`/product/${product.id}`}
// // // //             style={{
// // // //               opacity: isHovered ? 1 : 0,
// // // //               transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
// // // //               transition: 'all 0.3s ease 0.05s',
// // // //             }}
// // // //           >
// // // //             <motion.div
// // // //               whileHover={{ scale: 1.15 }}
// // // //               whileTap={{ scale: 0.9 }}
// // // //               className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-[#C9A86A] hover:text-white transition-all duration-200 cursor-pointer"
// // // //             >
// // // //               <FiEye className="w-4 h-4" />
// // // //             </motion.div>
// // // //           </Link>
// // // //         </div>

// // // //         {/* Add to Cart Overlay */}
// // // //         <motion.div
// // // //           className="absolute bottom-0 left-0 right-0 px-3 pb-3"
// // // //           initial={{ y: 60, opacity: 0 }}
// // // //           animate={{ y: isHovered ? 0 : 60, opacity: isHovered ? 1 : 0 }}
// // // //           transition={{ duration: 0.3 }}
// // // //         >
// // // //           <button
// // // //             onClick={() =>
// // // //               addToCart(product, product.sizes[0] || 'Free Size', product.colors[0])
// // // //             }
// // // //             className="w-full py-2.5 bg-[#1F1F1F] text-white text-xs font-body font-medium rounded-xl hover:bg-[#7A4E48] transition-colors cursor-pointer flex items-center justify-center gap-2"
// // // //           >
// // // //             <FiShoppingBag className="w-3.5 h-3.5" />
// // // //             Quick Add to Cart
// // // //           </button>
// // // //         </motion.div>
// // // //       </div>

// // // //       {/* Product Info */}
// // // //       <div className="p-4">
// // // //         <div className="flex items-center justify-between mb-1">
// // // //           <span className="text-[10px] font-body text-[#C9A86A] font-medium uppercase tracking-wider">
// // // //             {product.category}
// // // //           </span>
// // // //           <div className="flex items-center gap-1">
// // // //             <FiStar className="w-3 h-3 text-[#C9A86A] fill-[#C9A86A]" />
// // // //             <span className="text-[11px] font-body text-[#666]">{product.rating}</span>
// // // //             <span className="text-[11px] font-body text-[#999]">({product.reviews})</span>
// // // //           </div>
// // // //         </div>

// // // //         <Link to={`/product/${product.id}`} className="cursor-pointer">
// // // //           <h3 className="font-heading text-[15px] font-semibold text-[#1F1F1F] leading-tight mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
// // // //             {product.title}
// // // //           </h3>
// // // //         </Link>

// // // //         <div className="flex items-center justify-between">
// // // //           <div className="flex items-center gap-2">
// // // //             <span className="font-heading text-lg font-semibold text-[#7A4E48]">
// // // //               ₹{product.price.toLocaleString('en-IN')}
// // // //             </span>
// // // //             <span className="font-body text-xs text-[#999] line-through">
// // // //               ₹{product.oldPrice.toLocaleString('en-IN')}
// // // //             </span>
// // // //           </div>
// // // //           <span className="text-[10px] font-body text-[#C58C85] font-medium">
// // // //             {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
// // // //           </span>
// // // //         </div>

// // // //         {/* Color dots */}
// // // //         <div className="flex gap-1.5 mt-2.5">
// // // //           {product.colors.slice(0, 4).map((color, i) => (
// // // //             <div
// // // //               key={i}
// // // //               className="w-4 h-4 rounded-full border border-[#E8DCCB] cursor-pointer hover:scale-110 transition-transform"
// // // //               title={color}
// // // //               style={{
// // // //                 background:
// // // //                   color.toLowerCase().includes('maroon') ? '#7A4E48' :
// // // //                   color.toLowerCase().includes('blue') ? '#3B5D8C' :
// // // //                   color.toLowerCase().includes('green') ? '#4A7C59' :
// // // //                   color.toLowerCase().includes('red') ? '#B33A3A' :
// // // //                   color.toLowerCase().includes('pink') ? '#E8A0A0' :
// // // //                   color.toLowerCase().includes('gold') || color.toLowerCase().includes('golden') ? '#C9A86A' :
// // // //                   color.toLowerCase().includes('ivory') || color.toLowerCase().includes('white') ? '#F5F0E8' :
// // // //                   color.toLowerCase().includes('navy') ? '#1B2B5B' :
// // // //                   color.toLowerCase().includes('orange') ? '#E07B39' :
// // // //                   color.toLowerCase().includes('purple') ? '#6B3A7D' :
// // // //                   color.toLowerCase().includes('teal') ? '#367A7A' :
// // // //                   color.toLowerCase().includes('peach') ? '#FFDAB9' :
// // // //                   '#C9A86A',
// // // //               }}
// // // //             />
// // // //           ))}
// // // //           {product.colors.length > 4 && (
// // // //             <span className="text-[10px] font-body text-[#999] self-center">+{product.colors.length - 4}</span>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </motion.div>
// // // //   );
// // // // }


// // // import { useState } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { motion } from 'framer-motion';
// // // import { FiHeart, FiEye, FiShoppingBag, FiStar } from 'react-icons/fi';
// // // import { useStore } from '../store/useStore';
// // // import { useAuthStore } from '../store/useAuthStore';

// // // // This interface matches both AdaptedProduct from the API and the legacy static Product type
// // // interface Product {
// // //   id: number;
// // //   title: string;
// // //   category: string;
// // //   price: number;
// // //   oldPrice: number;
// // //   images: string[];
// // //   sizes: string[];
// // //   colors: string[];
// // //   stock: number;
// // //   badge?: string | null;
// // //   rating: number;
// // //   reviews: number;
// // //   isNew: boolean;
// // //   isFeatured: boolean;
// // //   description?: string;
// // //   fabric?: string;
// // //   specifications?: string;
// // // }

// // // interface ProductCardProps {
// // //   product: Product;
// // //   index?: number;
// // // }

// // // export default function ProductCard({ product, index = 0 }: ProductCardProps) {
// // //   const [imgError, setImgError] = useState(false);
// // //   const [isHovered, setIsHovered] = useState(false);
// // //   const { addToCart, addToWishlist, isInWishlist } = useStore();
// // //   const { isAuthenticated } = useAuthStore();
// // //   const navigate = useNavigate();
// // //   const inWishlist = isInWishlist(product.id);

// // //   const discount = product.oldPrice > 0
// // //     ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
// // //     : 0;

// // //   const fallbackImage = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80';

// // //   const handleAddToCart = () => {
// // //     if (!isAuthenticated) {
// // //       navigate('/login', { state: { from: `/product/${product.id}` } });
// // //       return;
// // //     }
// // //     addToCart(product as any, product.sizes[0] || 'Free Size', product.colors[0] || '');
// // //   };

// // //   const handleAddToWishlist = () => {
// // //     if (!isAuthenticated) {
// // //       navigate('/login', { state: { from: `/product/${product.id}` } });
// // //       return;
// // //     }
// // //     addToWishlist(product as any);
// // //   };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 30 }}
// // //       whileInView={{ opacity: 1, y: 0 }}
// // //       viewport={{ once: true }}
// // //       transition={{ duration: 0.5, delay: index * 0.08 }}
// // //       className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0EBE3]"
// // //       onMouseEnter={() => setIsHovered(true)}
// // //       onMouseLeave={() => setIsHovered(false)}
// // //     >
// // //       {/* Image Container */}
// // //       <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
// // //         <Link to={`/product/${product.id}`} className="cursor-pointer block w-full h-full">
// // //           <motion.img
// // //             src={imgError ? fallbackImage : (product.images[0] || fallbackImage)}
// // //             alt={product.title}
// // //             onError={() => setImgError(true)}
// // //             className="w-full h-full object-cover"
// // //             animate={{ scale: isHovered ? 1.08 : 1 }}
// // //             transition={{ duration: 0.6, ease: 'easeOut' }}
// // //           />
// // //         </Link>

// // //         {/* Overlay */}
// // //         <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

// // //         {/* Badges */}
// // //         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
// // //           {product.badge && (
// // //             <span className="bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
// // //               {product.badge}
// // //             </span>
// // //           )}
// // //           {discount > 0 && (
// // //             <span className="bg-[#C9A86A] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
// // //               -{discount}%
// // //             </span>
// // //           )}
// // //         </div>

// // //         {/* Action Buttons */}
// // //         <div className="absolute top-3 right-3 flex flex-col gap-2">
// // //           <motion.button
// // //             onClick={handleAddToWishlist}
// // //             whileHover={{ scale: 1.15 }}
// // //             whileTap={{ scale: 0.9 }}
// // //             className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
// // //               inWishlist
// // //                 ? 'bg-[#C58C85] text-white'
// // //                 : 'bg-white/90 text-[#1F1F1F] hover:bg-[#C58C85] hover:text-white'
// // //             }`}
// // //             style={{
// // //               opacity: isHovered || inWishlist ? 1 : 0,
// // //               transform: isHovered || inWishlist ? 'translateX(0)' : 'translateX(10px)',
// // //               transition: 'all 0.3s ease',
// // //             }}
// // //           >
// // //             <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
// // //           </motion.button>

// // //           <Link
// // //             to={`/product/${product.id}`}
// // //             style={{
// // //               opacity: isHovered ? 1 : 0,
// // //               transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
// // //               transition: 'all 0.3s ease 0.05s',
// // //             }}
// // //           >
// // //             <motion.div
// // //               whileHover={{ scale: 1.15 }}
// // //               whileTap={{ scale: 0.9 }}
// // //               className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-[#C9A86A] hover:text-white transition-all duration-200 cursor-pointer"
// // //             >
// // //               <FiEye className="w-4 h-4" />
// // //             </motion.div>
// // //           </Link>
// // //         </div>

// // //         {/* Add to Cart Overlay */}
// // //         <motion.div
// // //           className="absolute bottom-0 left-0 right-0 px-3 pb-3"
// // //           initial={{ y: 60, opacity: 0 }}
// // //           animate={{ y: isHovered ? 0 : 60, opacity: isHovered ? 1 : 0 }}
// // //           transition={{ duration: 0.3 }}
// // //         >
// // //           <button
// // //             onClick={handleAddToCart}
// // //             className="w-full py-2.5 bg-[#1F1F1F] text-white text-xs font-body font-medium rounded-xl hover:bg-[#7A4E48] transition-colors cursor-pointer flex items-center justify-center gap-2"
// // //           >
// // //             <FiShoppingBag className="w-3.5 h-3.5" />
// // //             {isAuthenticated ? 'Quick Add to Cart' : 'Sign in to Add'}
// // //           </button>
// // //         </motion.div>
// // //       </div>

// // //       {/* Product Info */}
// // //       <div className="p-4">
// // //         <div className="flex items-center justify-between mb-1">
// // //           <span className="text-[10px] font-body text-[#C9A86A] font-medium uppercase tracking-wider">
// // //             {product.category}
// // //           </span>
// // //           <div className="flex items-center gap-1">
// // //             <FiStar className="w-3 h-3 text-[#C9A86A] fill-[#C9A86A]" />
// // //             <span className="text-[11px] font-body text-[#666]">{Number(product.rating).toFixed(1)}</span>
// // //             <span className="text-[11px] font-body text-[#999]">({product.reviews})</span>
// // //           </div>
// // //         </div>

// // //         <Link to={`/product/${product.id}`} className="cursor-pointer">
// // //           <h3 className="font-heading text-[15px] font-semibold text-[#1F1F1F] leading-tight mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
// // //             {product.title}
// // //           </h3>
// // //         </Link>

// // //         <div className="flex items-center justify-between">
// // //           <div className="flex items-center gap-2">
// // //             <span className="font-heading text-lg font-semibold text-[#7A4E48]">
// // //               ₹{Number(product.price).toLocaleString('en-IN')}
// // //             </span>
// // //             {product.oldPrice > product.price && (
// // //               <span className="font-body text-xs text-[#999] line-through">
// // //                 ₹{Number(product.oldPrice).toLocaleString('en-IN')}
// // //               </span>
// // //             )}
// // //           </div>
// // //           <span className="text-[10px] font-body text-[#C58C85] font-medium">
// // //             {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
// // //           </span>
// // //         </div>

// // //         {/* Color dots */}
// // //         <div className="flex gap-1.5 mt-2.5">
// // //           {product.colors.slice(0, 4).map((color, i) => (
// // //             <div
// // //               key={i}
// // //               className="w-4 h-4 rounded-full border border-[#E8DCCB] cursor-pointer hover:scale-110 transition-transform"
// // //               title={color}
// // //               style={{
// // //                 background:
// // //                   color.toLowerCase().includes('maroon') ? '#7A4E48' :
// // //                   color.toLowerCase().includes('blue') ? '#3B5D8C' :
// // //                   color.toLowerCase().includes('green') ? '#4A7C59' :
// // //                   color.toLowerCase().includes('red') ? '#B33A3A' :
// // //                   color.toLowerCase().includes('pink') ? '#E8A0A0' :
// // //                   color.toLowerCase().includes('gold') || color.toLowerCase().includes('golden') ? '#C9A86A' :
// // //                   color.toLowerCase().includes('ivory') || color.toLowerCase().includes('white') ? '#F5F0E8' :
// // //                   color.toLowerCase().includes('navy') ? '#1B2B5B' :
// // //                   color.toLowerCase().includes('orange') ? '#E07B39' :
// // //                   color.toLowerCase().includes('purple') ? '#6B3A7D' :
// // //                   color.toLowerCase().includes('teal') ? '#367A7A' :
// // //                   color.toLowerCase().includes('peach') ? '#FFDAB9' :
// // //                   '#C9A86A',
// // //               }}
// // //             />
// // //           ))}
// // //           {product.colors.length > 4 && (
// // //             <span className="text-[10px] font-body text-[#999] self-center">+{product.colors.length - 4}</span>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // }

// // import { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { FiHeart, FiEye, FiShoppingBag, FiStar } from 'react-icons/fi';
// // import { useStore } from '../store/useStore';
// // import { useAuthStore } from '../store/useAuthStore';

// // // This interface matches both AdaptedProduct from the API and the legacy static Product type
// // interface Product {
// //   id: number;
// //   title: string;
// //   category: string;
// //   price: number;
// //   oldPrice: number;
// //   images: string[];
// //   sizes: string[];
// //   colors: string[];
// //   stock: number;
// //   badge?: string | null;
// //   rating: number;
// //   reviews: number;
// //   isNew: boolean;
// //   isFeatured: boolean;
// //   description?: string;
// //   fabric?: string;
// //   specifications?: string;
// // }

// // interface ProductCardProps {
// //   product: Product;
// //   index?: number;
// // }

// // export default function ProductCard({ product, index = 0 }: ProductCardProps) {
// //   const [imgError, setImgError] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const { addToCart, addToWishlist, isInWishlist } = useStore();
// //   const { isAuthenticated } = useAuthStore();
// //   const navigate = useNavigate();
// //   const inWishlist = isInWishlist(product.id);

// //   const discount = product.oldPrice > 0
// //     ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
// //     : 0;

// //   const fallbackImage = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80';

// //   const handleAddToCart = () => {
// //     if (!isAuthenticated) {
// //       navigate('/login', { state: { from: `/product/${product.id}` } });
// //       return;
// //     }
// //     // Backend requires selected_color to be a non-empty string (min_length=1).
// //     // Default to 'Default' instead of '' when the product has no color variants,
// //     // so the quick-add button never sends an empty string and triggers a 422.
// //     addToCart(product as any, product.sizes[0] || 'Free Size', product.colors[0] || 'Default');
// //   };

// //   const handleAddToWishlist = () => {
// //     if (!isAuthenticated) {
// //       navigate('/login', { state: { from: `/product/${product.id}` } });
// //       return;
// //     }
// //     addToWishlist(product as any);
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 30 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //       transition={{ duration: 0.5, delay: index * 0.08 }}
// //       className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0EBE3]"
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //     >
// //       {/* Image Container */}
// //       <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
// //         <Link to={`/product/${product.id}`} className="cursor-pointer block w-full h-full">
// //           <motion.img
// //             src={imgError ? fallbackImage : (product.images[0] || fallbackImage)}
// //             alt={product.title}
// //             onError={() => setImgError(true)}
// //             className="w-full h-full object-cover"
// //             animate={{ scale: isHovered ? 1.08 : 1 }}
// //             transition={{ duration: 0.6, ease: 'easeOut' }}
// //           />
// //         </Link>

// //         {/* Overlay */}
// //         <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

// //         {/* Badges */}
// //         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
// //           {product.badge && (
// //             <span className="bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
// //               {product.badge}
// //             </span>
// //           )}
// //           {discount > 0 && (
// //             <span className="bg-[#C9A86A] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
// //               -{discount}%
// //             </span>
// //           )}
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="absolute top-3 right-3 flex flex-col gap-2">
// //           <motion.button
// //             onClick={handleAddToWishlist}
// //             whileHover={{ scale: 1.15 }}
// //             whileTap={{ scale: 0.9 }}
// //             className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
// //               inWishlist
// //                 ? 'bg-[#C58C85] text-white'
// //                 : 'bg-white/90 text-[#1F1F1F] hover:bg-[#C58C85] hover:text-white'
// //             }`}
// //             style={{
// //               opacity: isHovered || inWishlist ? 1 : 0,
// //               transform: isHovered || inWishlist ? 'translateX(0)' : 'translateX(10px)',
// //               transition: 'all 0.3s ease',
// //             }}
// //           >
// //             <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
// //           </motion.button>

// //           <Link
// //             to={`/product/${product.id}`}
// //             style={{
// //               opacity: isHovered ? 1 : 0,
// //               transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
// //               transition: 'all 0.3s ease 0.05s',
// //             }}
// //           >
// //             <motion.div
// //               whileHover={{ scale: 1.15 }}
// //               whileTap={{ scale: 0.9 }}
// //               className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-[#C9A86A] hover:text-white transition-all duration-200 cursor-pointer"
// //             >
// //               <FiEye className="w-4 h-4" />
// //             </motion.div>
// //           </Link>
// //         </div>

// //         {/* Add to Cart Overlay */}
// //         <motion.div
// //           className="absolute bottom-0 left-0 right-0 px-3 pb-3"
// //           initial={{ y: 60, opacity: 0 }}
// //           animate={{ y: isHovered ? 0 : 60, opacity: isHovered ? 1 : 0 }}
// //           transition={{ duration: 0.3 }}
// //         >
// //           <button
// //             onClick={handleAddToCart}
// //             className="w-full py-2.5 bg-[#1F1F1F] text-white text-xs font-body font-medium rounded-xl hover:bg-[#7A4E48] transition-colors cursor-pointer flex items-center justify-center gap-2"
// //           >
// //             <FiShoppingBag className="w-3.5 h-3.5" />
// //             {isAuthenticated ? 'Quick Add to Cart' : 'Sign in to Add'}
// //           </button>
// //         </motion.div>
// //       </div>

// //       {/* Product Info */}
// //       <div className="p-4">
// //         <div className="flex items-center justify-between mb-1">
// //           <span className="text-[10px] font-body text-[#C9A86A] font-medium uppercase tracking-wider">
// //             {product.category}
// //           </span>
// //           <div className="flex items-center gap-1">
// //             <FiStar className="w-3 h-3 text-[#C9A86A] fill-[#C9A86A]" />
// //             <span className="text-[11px] font-body text-[#666]">{Number(product.rating).toFixed(1)}</span>
// //             <span className="text-[11px] font-body text-[#999]">({product.reviews})</span>
// //           </div>
// //         </div>

// //         <Link to={`/product/${product.id}`} className="cursor-pointer">
// //           <h3 className="font-heading text-[15px] font-semibold text-[#1F1F1F] leading-tight mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
// //             {product.title}
// //           </h3>
// //         </Link>

// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             <span className="font-heading text-lg font-semibold text-[#7A4E48]">
// //               ₹{Number(product.price).toLocaleString('en-IN')}
// //             </span>
// //             {product.oldPrice > product.price && (
// //               <span className="font-body text-xs text-[#999] line-through">
// //                 ₹{Number(product.oldPrice).toLocaleString('en-IN')}
// //               </span>
// //             )}
// //           </div>
// //           <span className="text-[10px] font-body text-[#C58C85] font-medium">
// //             {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
// //           </span>
// //         </div>

// //         {/* Color dots */}
// //         <div className="flex gap-1.5 mt-2.5">
// //           {product.colors.slice(0, 4).map((color, i) => (
// //             <div
// //               key={i}
// //               className="w-4 h-4 rounded-full border border-[#E8DCCB] cursor-pointer hover:scale-110 transition-transform"
// //               title={color}
// //               style={{
// //                 background:
// //                   color.toLowerCase().includes('maroon') ? '#7A4E48' :
// //                   color.toLowerCase().includes('blue') ? '#3B5D8C' :
// //                   color.toLowerCase().includes('green') ? '#4A7C59' :
// //                   color.toLowerCase().includes('red') ? '#B33A3A' :
// //                   color.toLowerCase().includes('pink') ? '#E8A0A0' :
// //                   color.toLowerCase().includes('gold') || color.toLowerCase().includes('golden') ? '#C9A86A' :
// //                   color.toLowerCase().includes('ivory') || color.toLowerCase().includes('white') ? '#F5F0E8' :
// //                   color.toLowerCase().includes('navy') ? '#1B2B5B' :
// //                   color.toLowerCase().includes('orange') ? '#E07B39' :
// //                   color.toLowerCase().includes('purple') ? '#6B3A7D' :
// //                   color.toLowerCase().includes('teal') ? '#367A7A' :
// //                   color.toLowerCase().includes('peach') ? '#FFDAB9' :
// //                   '#C9A86A',
// //               }}
// //             />
// //           ))}
// //           {product.colors.length > 4 && (
// //             <span className="text-[10px] font-body text-[#999] self-center">+{product.colors.length - 4}</span>
// //           )}
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiHeart, FiEye, FiShoppingBag, FiStar } from 'react-icons/fi';
// import { useStore } from '../store/useStore';
// import { useAuthStore } from '../store/useAuthStore';

// interface Product {
//   id: number;
//   title: string;
//   category: string;
//   price: number;
//   oldPrice: number;
//   images: string[];
//   sizes: string[];
//   colors: string[];
//   stock: number;
//   badge?: string | null;
//   rating: number;
//   reviews: number;
//   isNew: boolean;
//   isFeatured: boolean;
//   description?: string;
//   fabric?: string;
//   specifications?: string;
// }

// interface ProductCardProps {
//   product: Product;
//   index?: number;
// }

// export default function ProductCard({ product, index = 0 }: ProductCardProps) {
//   const [imgError, setImgError] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   // Selected size starts at first available size — user can change from card
//   const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Free Size');

//   const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
//   const { isAuthenticated } = useAuthStore();
//   const navigate = useNavigate();
//   const inWishlist = isInWishlist(product.id);

//   const discount = product.oldPrice > 0
//     ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//     : 0;

//   const fallbackImage = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80';

//   const handleAddToCart = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/product/${product.id}` } });
//       return;
//     }
//     // Use currently selected size; default color to first real color or 'Default'
//     // so the backend min_length=1 constraint is never violated
//     addToCart(
//       product as any,
//       selectedSize,
//       product.colors[0] || 'Default',
//     );
//   };

//   const handleWishlistToggle = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/product/${product.id}` } });
//       return;
//     }
//     // If already in wishlist, clicking heart removes it — toggle behaviour
//     if (inWishlist) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist(product as any);
//     }
//   };

//   // Stock display: show only In Stock / Out of Stock
//   // based on whether the product has any stock — admin controls visibility
//   // via is_active; here stock > 0 is the signal the admin has set stock
//   const inStock = product.stock > 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.08 }}
//       className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0EBE3]"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Container */}
//       <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
//         <Link to={`/product/${product.id}`} className="cursor-pointer block w-full h-full">
//           <motion.img
//             src={imgError ? fallbackImage : (product.images[0] || fallbackImage)}
//             alt={product.title}
//             onError={() => setImgError(true)}
//             className="w-full h-full object-cover"
//             animate={{ scale: isHovered ? 1.08 : 1 }}
//             transition={{ duration: 0.6, ease: 'easeOut' }}
//           />
//         </Link>

//         {/* Overlay */}
//         <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

//         {/* Badges */}
//         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
//           {product.badge && (
//             <span className="bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
//               {product.badge}
//             </span>
//           )}
//           {discount > 0 && (
//             <span className="bg-[#C9A86A] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
//               -{discount}%
//             </span>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="absolute top-3 right-3 flex flex-col gap-2">
//           {/* Heart — toggles wishlist add/remove */}
//           <motion.button
//             onClick={handleWishlistToggle}
//             whileHover={{ scale: 1.15 }}
//             whileTap={{ scale: 0.9 }}
//             className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
//               inWishlist
//                 ? 'bg-[#C58C85] text-white'
//                 : 'bg-white/90 text-[#1F1F1F] hover:bg-[#C58C85] hover:text-white'
//             }`}
//             style={{
//               opacity: isHovered || inWishlist ? 1 : 0,
//               transform: isHovered || inWishlist ? 'translateX(0)' : 'translateX(10px)',
//               transition: 'all 0.3s ease',
//             }}
//             title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//           >
//             <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
//           </motion.button>

//           {/* Eye — link to product detail */}
//           <Link
//             to={`/product/${product.id}`}
//             style={{
//               opacity: isHovered ? 1 : 0,
//               transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
//               transition: 'all 0.3s ease 0.05s',
//             }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.15 }}
//               whileTap={{ scale: 0.9 }}
//               className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-[#C9A86A] hover:text-white transition-all duration-200 cursor-pointer"
//             >
//               <FiEye className="w-4 h-4" />
//             </motion.div>
//           </Link>
//         </div>

//         {/* Quick Add to Cart Overlay */}
//         <motion.div
//           className="absolute bottom-0 left-0 right-0 px-3 pb-3"
//           initial={{ y: 60, opacity: 0 }}
//           animate={{ y: isHovered ? 0 : 60, opacity: isHovered ? 1 : 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <button
//             onClick={handleAddToCart}
//             className="w-full py-2.5 bg-[#1F1F1F] text-white text-xs font-body font-medium rounded-xl hover:bg-[#7A4E48] transition-colors cursor-pointer flex items-center justify-center gap-2"
//           >
//             <FiShoppingBag className="w-3.5 h-3.5" />
//             {isAuthenticated ? `Add ${selectedSize} to Cart` : 'Sign in to Add'}
//           </button>
//         </motion.div>
//       </div>

//       {/* Product Info */}
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-[10px] font-body text-[#C9A86A] font-medium uppercase tracking-wider">
//             {product.category}
//           </span>
//           <div className="flex items-center gap-1">
//             <FiStar className="w-3 h-3 text-[#C9A86A] fill-[#C9A86A]" />
//             <span className="text-[11px] font-body text-[#666]">{Number(product.rating).toFixed(1)}</span>
//             <span className="text-[11px] font-body text-[#999]">({product.reviews})</span>
//           </div>
//         </div>

//         <Link to={`/product/${product.id}`} className="cursor-pointer">
//           <h3 className="font-heading text-[15px] font-semibold text-[#1F1F1F] leading-tight mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
//             {product.title}
//           </h3>
//         </Link>

//         <div className="flex items-center justify-between mb-2.5">
//           <div className="flex items-center gap-2">
//             <span className="font-heading text-lg font-semibold text-[#7A4E48]">
//               ₹{Number(product.price).toLocaleString('en-IN')}
//             </span>
//             {product.oldPrice > product.price && (
//               <span className="font-body text-xs text-[#999] line-through">
//                 ₹{Number(product.oldPrice).toLocaleString('en-IN')}
//               </span>
//             )}
//           </div>
//           {/* Stock: show In Stock / Out of Stock only — no quantity shown */}
//           <span className={`text-[10px] font-body font-medium ${inStock ? 'text-green-600' : 'text-[#C58C85]'}`}>
//             {inStock ? '● In Stock' : '● Out of Stock'}
//           </span>
//         </div>

//         {/* Size selector — user picks size directly from card */}
//         {product.sizes.length > 0 && (
//           <div className="flex flex-wrap gap-1.5 mb-2.5">
//             {product.sizes.map((size) => (
//               <button
//                 key={size}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setSelectedSize(size);
//                 }}
//                 className={`px-2.5 py-1 rounded-lg font-body text-[10px] font-semibold border transition-all cursor-pointer ${
//                   selectedSize === size
//                     ? 'border-[#7A4E48] bg-[#7A4E48] text-white'
//                     : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A]'
//                 }`}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Color dots */}
//         <div className="flex gap-1.5">
//           {product.colors.slice(0, 4).map((color, i) => (
//             <div
//               key={i}
//               className="w-4 h-4 rounded-full border border-[#E8DCCB] cursor-pointer hover:scale-110 transition-transform"
//               title={color}
//               style={{
//                 background:
//                   color.toLowerCase().includes('maroon') ? '#7A4E48' :
//                   color.toLowerCase().includes('blue') ? '#3B5D8C' :
//                   color.toLowerCase().includes('green') ? '#4A7C59' :
//                   color.toLowerCase().includes('red') ? '#B33A3A' :
//                   color.toLowerCase().includes('pink') ? '#E8A0A0' :
//                   color.toLowerCase().includes('gold') || color.toLowerCase().includes('golden') ? '#C9A86A' :
//                   color.toLowerCase().includes('ivory') || color.toLowerCase().includes('white') ? '#F5F0E8' :
//                   color.toLowerCase().includes('navy') ? '#1B2B5B' :
//                   color.toLowerCase().includes('orange') ? '#E07B39' :
//                   color.toLowerCase().includes('purple') ? '#6B3A7D' :
//                   color.toLowerCase().includes('teal') ? '#367A7A' :
//                   color.toLowerCase().includes('peach') ? '#FFDAB9' :
//                   '#C9A86A',
//               }}
//             />
//           ))}
//           {product.colors.length > 4 && (
//             <span className="text-[10px] font-body text-[#999] self-center">+{product.colors.length - 4}</span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingBag, FiStar } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  badge?: string | null;
  rating: number;
  reviews: number;
  isNew: boolean;
  isFeatured: boolean;
  description?: string;
  fabric?: string;
  specifications?: string;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const fallbackImage = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80';

function colorToHex(color: string) {
  const c = color.toLowerCase();
  if (c.includes('maroon')) return '#7A4E48';
  if (c.includes('blue')) return '#3B5D8C';
  if (c.includes('green')) return '#4A7C59';
  if (c.includes('red')) return '#B33A3A';
  if (c.includes('pink')) return '#E8A0A0';
  if (c.includes('gold')) return '#C9A86A';
  if (c.includes('ivory') || c.includes('white')) return '#F5F0E8';
  if (c.includes('navy')) return '#1B2B5B';
  if (c.includes('orange')) return '#E07B39';
  if (c.includes('purple')) return '#6B3A7D';
  if (c.includes('teal')) return '#367A7A';
  if (c.includes('peach')) return '#FFDAB9';
  return '#C9A86A';
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Free Size');

  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const inWishlist = isInWishlist(product.id);
  const inStock = product.stock > 0;
  const discount = product.oldPrice > product.price && product.oldPrice > 0
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleQuickAdd = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${product.id}` } });
      return;
    }

    await addToCart(
      product as any,
      selectedSize || product.sizes[0] || 'Free Size',
      product.colors[0] || 'Default'
    );
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${product.id}` } });
      return;
    }

    await addToWishlist(product as any);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0EBE3]"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-[#F8F5F0]">
        <Link to={`/product/${product.id}`} className="block w-full h-full cursor-pointer">
          <motion.img
            src={imgError ? fallbackImage : (product.images[0] || fallbackImage)}
            alt={product.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </Link>

        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-[#7A4E48] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-[#C9A86A] text-white text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            type="button"
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
              inWishlist
                ? 'bg-[#C58C85] text-white'
                : 'bg-white/90 text-[#1F1F1F] hover:bg-[#C58C85] hover:text-white'
            }`}
            style={{
              opacity: isHovered || inWishlist ? 1 : 0,
              transform: isHovered || inWishlist ? 'translateX(0)' : 'translateX(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
          </motion.button>

          <Link
            to={`/product/${product.id}`}
            title="View product"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
              transition: 'all 0.3s ease 0.05s',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-[#C9A86A] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <FiEye className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 px-3 pb-3"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 60, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!inStock}
            className="w-full py-2.5 bg-[#1F1F1F] text-white text-xs font-body font-medium rounded-xl hover:bg-[#7A4E48] transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiShoppingBag className="w-3.5 h-3.5" />
            {isAuthenticated ? 'Add to Cart' : 'Sign in to Add'}
          </button>
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-body text-[#C9A86A] font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <FiStar className="w-3 h-3 text-[#C9A86A] fill-[#C9A86A]" />
            <span className="text-[11px] font-body text-[#666]">{Number(product.rating).toFixed(1)}</span>
            <span className="text-[11px] font-body text-[#999]">({product.reviews})</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="cursor-pointer">
          <h3 className="font-heading text-[15px] font-semibold text-[#1F1F1F] leading-tight mb-2 hover:text-[#7A4E48] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold text-[#7A4E48]">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            {product.oldPrice > product.price && (
              <span className="font-body text-xs text-[#999] line-through">
                ₹{Number(product.oldPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-body font-medium ${inStock ? 'text-green-600' : 'text-[#C58C85]'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-2.5 py-1 rounded-lg font-body text-[10px] font-semibold border transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'border-[#7A4E48] bg-[#7A4E48] text-white'
                    : 'border-[#E8DCCB] text-[#555] hover:border-[#C9A86A]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-1.5">
          {product.colors.slice(0, 4).map((color, i) => (
            <div
              key={`${color}-${i}`}
              className="w-4 h-4 rounded-full border border-[#E8DCCB]"
              title={color}
              style={{ background: colorToHex(color) }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] font-body text-[#999] self-center">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
