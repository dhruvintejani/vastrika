// // import { useState, useEffect, useMemo } from 'react';
// // import { useSearchParams } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
// // import ProductCard from '../components/ProductCard';
// // import SectionHeader from '../components/SectionHeader';
// // import { products, categories } from '../data/products';

// // const sortOptions = [
// //   { label: 'Featured', value: 'featured' },
// //   { label: 'Newest First', value: 'newest' },
// //   { label: 'Price: Low to High', value: 'price-asc' },
// //   { label: 'Price: High to Low', value: 'price-desc' },
// //   { label: 'Best Rated', value: 'rating' },
// //   { label: 'Most Reviews', value: 'reviews' },
// // ];

// // const priceRanges = [
// //   { label: 'All Prices', min: 0, max: Infinity },
// //   { label: 'Under ₹2,000', min: 0, max: 2000 },
// //   { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
// //   { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
// //   { label: '₹10,000 – ₹25,000', min: 10000, max: 25000 },
// //   { label: 'Above ₹25,000', min: 25000, max: Infinity },
// // ];

// // export default function Shop() {
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
// //   const [selectedPriceRange, setSelectedPriceRange] = useState(0);
// //   const [sortBy, setSortBy] = useState('featured');
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [viewMode] = useState<'grid' | 'list'>('grid');

// //   useEffect(() => {
// //     const cat = searchParams.get('category');
// //     if (cat) setSelectedCategory(cat);
// //   }, [searchParams]);

// //   const filteredProducts = useMemo(() => {
// //     let result = [...products];

// //     if (selectedCategory !== 'All') {
// //       result = result.filter(p => p.category === selectedCategory);
// //     }

// //     const range = priceRanges[selectedPriceRange];
// //     result = result.filter(p => p.price >= range.min && p.price <= range.max);

// //     switch (sortBy) {
// //       case 'price-asc': result.sort((a, b) => a.price - b.price); break;
// //       case 'price-desc': result.sort((a, b) => b.price - a.price); break;
// //       case 'rating': result.sort((a, b) => b.rating - a.rating); break;
// //       case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
// //       case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
// //     }

// //     return result;
// //   }, [selectedCategory, selectedPriceRange, sortBy]);

// //   const handleCategoryChange = (cat: string) => {
// //     setSelectedCategory(cat);
// //     if (cat !== 'All') {
// //       setSearchParams({ category: cat });
// //     } else {
// //       setSearchParams({});
// //     }
// //   };

// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// //       {/* Hero Banner */}
// //       <div className="bg-[#EFE7DC] py-14">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <SectionHeader
// //             badge="Explore"
// //             title="The Vastrika Shop"
// //             subtitle="Discover our complete collection of premium Indian ethnic fashion."
// //           />
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// //         {/* Toolbar */}
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => setShowFilters(!showFilters)}
// //               className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm font-body font-medium text-[#1F1F1F] hover:border-[#C9A86A] transition-colors cursor-pointer"
// //             >
// //               <FiFilter className="w-4 h-4" />
// //               Filters
// //               {(selectedCategory !== 'All' || selectedPriceRange !== 0) && (
// //                 <span className="w-5 h-5 bg-[#7A4E48] text-white text-[10px] rounded-full flex items-center justify-center">
// //                   {(selectedCategory !== 'All' ? 1 : 0) + (selectedPriceRange !== 0 ? 1 : 0)}
// //                 </span>
// //               )}
// //             </button>
// //             <span className="font-body text-sm text-[#999]">
// //               {filteredProducts.length} products
// //             </span>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <div className="relative">
// //               <select
// //                 value={sortBy}
// //                 onChange={e => setSortBy(e.target.value)}
// //                 className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm font-body text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A] cursor-pointer"
// //               >
// //                 {sortOptions.map(opt => (
// //                   <option key={opt.value} value={opt.value}>{opt.label}</option>
// //                 ))}
// //               </select>
// //               <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filter Panel */}
// //         <AnimatePresence>
// //           {showFilters && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="bg-white rounded-2xl border border-[#E8DCCB] p-6 mb-8 overflow-hidden"
// //             >
// //               <div className="grid md:grid-cols-2 gap-8">
// //                 {/* Category Filter */}
// //                 <div>
// //                   <h3 className="font-heading text-base font-semibold text-[#1F1F1F] mb-4">Category</h3>
// //                   <div className="flex flex-wrap gap-2">
// //                     {categories.map(cat => (
// //                       <button
// //                         key={cat}
// //                         onClick={() => handleCategoryChange(cat)}
// //                         className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
// //                           selectedCategory === cat
// //                             ? 'bg-[#7A4E48] text-white'
// //                             : 'bg-[#F8F5F0] text-[#555] hover:bg-[#EFE7DC] border border-[#E8DCCB]'
// //                         }`}
// //                       >
// //                         {cat}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Price Filter */}
// //                 <div>
// //                   <h3 className="font-heading text-base font-semibold text-[#1F1F1F] mb-4">Price Range</h3>
// //                   <div className="flex flex-col gap-2">
// //                     {priceRanges.map((range, i) => (
// //                       <label key={i} className="flex items-center gap-3 cursor-pointer group">
// //                         <div
// //                           className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
// //                             selectedPriceRange === i ? 'border-[#7A4E48] bg-[#7A4E48]' : 'border-[#CCC]'
// //                           }`}
// //                           onClick={() => setSelectedPriceRange(i)}
// //                         >
// //                           {selectedPriceRange === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
// //                         </div>
// //                         <span
// //                           className={`font-body text-sm transition-colors cursor-pointer ${
// //                             selectedPriceRange === i ? 'text-[#7A4E48] font-medium' : 'text-[#555] group-hover:text-[#7A4E48]'
// //                           }`}
// //                           onClick={() => setSelectedPriceRange(i)}
// //                         >
// //                           {range.label}
// //                         </span>
// //                       </label>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Clear filters */}
// //               {(selectedCategory !== 'All' || selectedPriceRange !== 0) && (
// //                 <button
// //                   onClick={() => { handleCategoryChange('All'); setSelectedPriceRange(0); }}
// //                   className="mt-4 flex items-center gap-1.5 text-xs font-body text-[#C58C85] hover:text-[#7A4E48] transition-colors cursor-pointer"
// //                 >
// //                   <FiX className="w-3.5 h-3.5" /> Clear All Filters
// //                 </button>
// //               )}
// //             </motion.div>
// //           )}
// //         </AnimatePresence>

// //         {/* Category Chips (always visible) */}
// //         <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
// //           {categories.map(cat => (
// //             <button
// //               key={cat}
// //               onClick={() => handleCategoryChange(cat)}
// //               className={`px-4 py-2 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
// //                 selectedCategory === cat
// //                   ? 'bg-[#7A4E48] text-white shadow-sm'
// //                   : 'bg-white text-[#555] hover:bg-[#EFE7DC] border border-[#E8DCCB]'
// //               }`}
// //             >
// //               {cat}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Products Grid */}
// //         {filteredProducts.length > 0 ? (
// //           <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
// //             {filteredProducts.map((product, i) => (
// //               <ProductCard key={product.id} product={product} index={i} />
// //             ))}
// //           </div>
// //         ) : (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             className="text-center py-24"
// //           >
// //             <div className="w-20 h-20 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
// //               <span className="text-3xl">🪷</span>
// //             </div>
// //             <h3 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-2">No products found</h3>
// //             <p className="font-body text-sm text-[#999] mb-6">Try adjusting your filters to find what you're looking for.</p>
// //             <button
// //               onClick={() => { handleCategoryChange('All'); setSelectedPriceRange(0); }}
// //               className="bg-[#7A4E48] text-white font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
// //             >
// //               Clear Filters
// //             </button>
// //           </motion.div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect, useMemo } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
// import ProductCard from '../components/ProductCard';
// import ProductSkeleton from '../components/ProductSkeleton';
// import SectionHeader from '../components/SectionHeader';
// import { productsApi, AdaptedProduct } from '../api/products';

// const sortOptions = [
//   { label: 'Featured', value: 'featured' },
//   { label: 'Newest First', value: 'newest' },
//   { label: 'Price: Low to High', value: 'price_asc' },
//   { label: 'Price: High to Low', value: 'price_desc' },
//   { label: 'Best Rated', value: 'rating' },
//   { label: 'Most Reviews', value: 'reviews' },
// ];

// const priceRanges = [
//   { label: 'All Prices', min: 0, max: 0 },
//   { label: 'Under ₹2,000', min: 0, max: 2000 },
//   { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
//   { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
//   { label: '₹10,000 – ₹25,000', min: 10000, max: 25000 },
//   { label: 'Above ₹25,000', min: 25000, max: 0 },
// ];

// export default function Shop() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
//   const [selectedPriceRange, setSelectedPriceRange] = useState(0);
//   const [sortBy, setSortBy] = useState('featured');
//   const [showFilters, setShowFilters] = useState(false);

//   const [products, setProducts] = useState<AdaptedProduct[]>([]);
//   const [categories, setCategories] = useState<string[]>(['All']);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const PAGE_SIZE = 20;

//   // Load categories once
//   useEffect(() => {
//     productsApi.getCategories().then((cats) => {
//       setCategories(['All', ...cats.map((c) => c.name)]);
//     }).catch(() => {});
//   }, []);

//   // Load products whenever filters change
//   useEffect(() => {
//     const cat = searchParams.get('category');
//     if (cat) setSelectedCategory(cat);
//   }, [searchParams]);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const range = priceRanges[selectedPriceRange];
//         const params: Record<string, unknown> = {
//           page,
//           page_size: PAGE_SIZE,
//           sort_by: sortBy,
//         };
//         if (selectedCategory && selectedCategory !== 'All') {
//           // Backend accepts category as slug — convert name to slug
//           params.category = selectedCategory.toLowerCase().replace(/\s+/g, '-');
//         }
//         if (range.min > 0) params.min_price = range.min;
//         if (range.max > 0) params.max_price = range.max;

//         const result = await productsApi.list(params as any);
//         setProducts(result.products);
//         setTotal(result.total);
//         setTotalPages(result.totalPages);
//       } catch {
//         setError('Failed to load products. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [selectedCategory, selectedPriceRange, sortBy, page]);

//   const handleCategoryChange = (cat: string) => {
//     setSelectedCategory(cat);
//     setPage(1);
//     if (cat !== 'All') {
//       setSearchParams({ category: cat });
//     } else {
//       setSearchParams({});
//     }
//   };

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       {/* Hero Banner */}
//       <div className="bg-[#EFE7DC] py-14">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionHeader
//             badge="Explore"
//             title="The Vastrika Shop"
//             subtitle="Discover our complete collection of premium Indian ethnic fashion."
//           />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Toolbar */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm font-body font-medium text-[#1F1F1F] hover:border-[#C9A86A] transition-colors cursor-pointer"
//             >
//               <FiFilter className="w-4 h-4" />
//               Filters
//               {(selectedCategory !== 'All' || selectedPriceRange !== 0) && (
//                 <span className="w-5 h-5 bg-[#7A4E48] text-white text-[10px] rounded-full flex items-center justify-center">
//                   {(selectedCategory !== 'All' ? 1 : 0) + (selectedPriceRange !== 0 ? 1 : 0)}
//                 </span>
//               )}
//             </button>
//             <span className="font-body text-sm text-[#999]">{total} products</span>
//           </div>

//           <div className="relative">
//             <select
//               value={sortBy}
//               onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
//               className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm font-body text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A] cursor-pointer"
//             >
//               {sortOptions.map((opt) => (
//                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//               ))}
//             </select>
//             <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
//           </div>
//         </div>

//         {/* Filter Panel */}
//         <AnimatePresence>
//           {showFilters && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white rounded-2xl border border-[#E8DCCB] p-6 mb-8 overflow-hidden"
//             >
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="font-heading text-base font-semibold text-[#1F1F1F] mb-4">Category</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {categories.map((cat) => (
//                       <button
//                         key={cat}
//                         onClick={() => handleCategoryChange(cat)}
//                         className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
//                           selectedCategory === cat
//                             ? 'bg-[#7A4E48] text-white'
//                             : 'bg-[#F8F5F0] text-[#555] hover:bg-[#EFE7DC] border border-[#E8DCCB]'
//                         }`}
//                       >
//                         {cat}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-heading text-base font-semibold text-[#1F1F1F] mb-4">Price Range</h3>
//                   <div className="flex flex-col gap-2">
//                     {priceRanges.map((range, i) => (
//                       <label key={i} className="flex items-center gap-3 cursor-pointer group">
//                         <div
//                           className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPriceRange === i ? 'border-[#7A4E48] bg-[#7A4E48]' : 'border-[#CCC]'}`}
//                           onClick={() => { setSelectedPriceRange(i); setPage(1); }}
//                         >
//                           {selectedPriceRange === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                         </div>
//                         <span
//                           className={`font-body text-sm transition-colors cursor-pointer ${selectedPriceRange === i ? 'text-[#7A4E48] font-medium' : 'text-[#555] group-hover:text-[#7A4E48]'}`}
//                           onClick={() => { setSelectedPriceRange(i); setPage(1); }}
//                         >
//                           {range.label}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {(selectedCategory !== 'All' || selectedPriceRange !== 0) && (
//                 <button
//                   onClick={() => { handleCategoryChange('All'); setSelectedPriceRange(0); }}
//                   className="mt-4 flex items-center gap-1.5 text-xs font-body text-[#C58C85] hover:text-[#7A4E48] transition-colors cursor-pointer"
//                 >
//                   <FiX className="w-3.5 h-3.5" /> Clear All Filters
//                 </button>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Category Chips */}
//         <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => handleCategoryChange(cat)}
//               className={`px-4 py-2 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
//                 selectedCategory === cat
//                   ? 'bg-[#7A4E48] text-white shadow-sm'
//                   : 'bg-white text-[#555] hover:bg-[#EFE7DC] border border-[#E8DCCB]'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Error state */}
//         {error && (
//           <div className="text-center py-16">
//             <p className="font-body text-base text-red-500 mb-4">{error}</p>
//             <button onClick={() => setPage(1)} className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] cursor-pointer">Try again</button>
//           </div>
//         )}

//         {/* Products Grid */}
//         {!error && (
//           <>
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//                 {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
//               </div>
//             ) : products.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//                 {products.map((product, i) => (
//                   <ProductCard key={product.id} product={product as any} index={i} />
//                 ))}
//               </div>
//             ) : (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
//                 <div className="w-20 h-20 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
//                   <span className="text-3xl">🪷</span>
//                 </div>
//                 <h3 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-2">No products found</h3>
//                 <p className="font-body text-sm text-[#999] mb-6">Try adjusting your filters to find what you're looking for.</p>
//                 <button
//                   onClick={() => { handleCategoryChange('All'); setSelectedPriceRange(0); }}
//                   className="bg-[#7A4E48] text-white font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
//                 >
//                   Clear Filters
//                 </button>
//               </motion.div>
//             )}

//             {/* Pagination */}
//             {!loading && totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-10">
//                 <button
//                   onClick={() => setPage(p => p - 1)}
//                   disabled={page <= 1}
//                   className="px-5 py-2.5 border border-[#E8DCCB] text-[#777] font-body text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   ← Previous
//                 </button>
//                 <span className="font-body text-sm text-[#777]">Page {page} of {totalPages}</span>
//                 <button
//                   onClick={() => setPage(p => p + 1)}
//                   disabled={page >= totalPages}
//                   className="px-5 py-2.5 border border-[#E8DCCB] text-[#777] font-body text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   Next →
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import SectionHeader from '../components/SectionHeader';
import { productsApi, AdaptedProduct } from '../api/products';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

const priceRanges = [
  { label: 'All Prices', min: 0, max: 0 },
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { label: 'Above ₹25,000', min: 25000, max: 0 },
];

function PremiumSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value) || options[0];

  return (
    <div
      className="relative w-full sm:w-56"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full flex items-center justify-between gap-3 pl-4 pr-3 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm font-body text-[#1F1F1F] hover:border-[#C9A86A] focus:outline-none focus:border-[#C9A86A] focus:ring-2 focus:ring-[#C9A86A]/15 transition-colors cursor-pointer"
      >
        <span className="truncate">{selected.label}</span>
        <FiChevronDown className={`w-4 h-4 text-[#999] transition-transform ${open ? 'rotate-180 text-[#7A4E48]' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-full z-40 mt-2 w-full overflow-hidden rounded-2xl border border-[#E8DCCB] bg-white shadow-xl"
          >
            <div className="p-1.5">
              {options.map((option) => {
                const selectedOption = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full rounded-xl px-3 py-2.5 text-left font-body text-sm transition-colors cursor-pointer ${
                      selectedOption
                        ? 'bg-[#EFE7DC] text-[#7A4E48] font-semibold'
                        : 'text-[#555] hover:bg-[#F8F5F0] hover:text-[#7A4E48]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState<AdaptedProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const PAGE_SIZE = 20;

  useEffect(() => {
    productsApi
      .getCategories()
      .then((cats) => {
        setCategories(['All', ...cats.map((c) => c.name)]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const range = priceRanges[selectedPriceRange];
        const params: Record<string, unknown> = {
          page,
          page_size: PAGE_SIZE,
          sort_by: sortBy,
        };

        if (selectedCategory && selectedCategory !== 'All') {
          params.category = selectedCategory.toLowerCase().replace(/\s+/g, '-');
        }
        if (range.min > 0) params.min_price = range.min;
        if (range.max > 0) params.max_price = range.max;

        const result = await productsApi.list(params as any);
        setProducts(result.products);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedCategory, selectedPriceRange, sortBy, page]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1);

    if (cat !== 'All') {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="bg-[#EFE7DC] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Explore"
            title="The Vastrika Shop"
            subtitle="Discover our complete collection of premium Indian ethnic fashion."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm font-body font-medium text-[#1F1F1F] hover:border-[#C9A86A] transition-colors cursor-pointer"
            >
              <FiFilter className="w-4 h-4" />
              Filters
              {(selectedCategory !== 'All' || selectedPriceRange !== 0) && (
                <span className="w-5 h-5 bg-[#7A4E48] text-white text-[10px] rounded-full flex items-center justify-center">
                  {(selectedCategory !== 'All' ? 1 : 0) + (selectedPriceRange !== 0 ? 1 : 0)}
                </span>
              )}
            </button>
            <span className="font-body text-sm text-[#999]">{total} products</span>
          </div>

          <PremiumSelect
            value={sortBy}
            options={sortOptions}
            onChange={(value) => {
              setSortBy(value);
              setPage(1);
            }}
          />
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-[#E8DCCB] p-6 mb-8 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-base font-semibold text-[#1F1F1F] mb-4">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#7A4E48] text-white'
                            : 'bg-[#F8F5F0] text-[#555] hover:bg-[#EFE7DC] border border-[#E8DCCB]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-base font-semibold text-[#1F1F1F] mb-4">Price Range</h3>
                  <div className="flex flex-col gap-2">
                    {priceRanges.map((range, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedPriceRange === i ? 'border-[#7A4E48] bg-[#7A4E48]' : 'border-[#CCC]'
                          }`}
                          onClick={() => {
                            setSelectedPriceRange(i);
                            setPage(1);
                          }}
                        >
                          {selectedPriceRange === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span
                          className={`font-body text-sm transition-colors cursor-pointer ${
                            selectedPriceRange === i ? 'text-[#7A4E48] font-medium' : 'text-[#555] group-hover:text-[#7A4E48]'
                          }`}
                          onClick={() => {
                            setSelectedPriceRange(i);
                            setPage(1);
                          }}
                        >
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {(selectedCategory !== 'All' || selectedPriceRange !== 0) && (
                <button
                  onClick={() => {
                    handleCategoryChange('All');
                    setSelectedPriceRange(0);
                  }}
                  className="mt-4 flex items-center gap-1.5 text-xs font-body text-[#C58C85] hover:text-[#7A4E48] transition-colors cursor-pointer"
                >
                  <FiX className="w-3.5 h-3.5" /> Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#7A4E48] text-white shadow-sm'
                  : 'bg-white text-[#555] hover:bg-[#EFE7DC] border border-[#E8DCCB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && (
          <div className="text-center py-16">
            <p className="font-body text-base text-red-500 mb-4">{error}</p>
            <button
              onClick={() => setPage(1)}
              className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {!error && (
          <>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product as any} index={i} />
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading text-2xl font-semibold text-[#7A4E48]">0</span>
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-2">No products found</h3>
                <p className="font-body text-sm text-[#999] mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    handleCategoryChange('All');
                    setSelectedPriceRange(0);
                  }}
                  className="bg-[#7A4E48] text-white font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page <= 1}
                  className="px-5 py-2.5 border border-[#E8DCCB] text-[#777] font-body text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="font-body text-sm text-[#777]">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages}
                  className="px-5 py-2.5 border border-[#E8DCCB] text-[#777] font-body text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
