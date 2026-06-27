// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiArrowRight } from 'react-icons/fi';
// import ProductCard from '../components/ProductCard';
// import SectionHeader from '../components/SectionHeader';
// import { products } from '../data/products';

// // Show "new" products + some featured ones to make it a good page
// const newProducts = products.filter(p => p.isNew);
// const recentProducts = products.slice(0, 12);

// export default function NewArrivals() {
//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       {/* Hero */}
//       <div className="relative bg-[#1F1F1F] py-24 overflow-hidden">
//         <div className="absolute inset-0 opacity-30">
//           <img
//             src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1600&q=60"
//             alt=""
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <motion.span
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 bg-[#C9A86A]/20 text-[#C9A86A] text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 border border-[#C9A86A]/30"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse" />
//               Just Landed
//             </motion.span>
//             <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white mb-4 leading-tight">
//               New Arrivals
//             </h1>
//             <p className="font-body text-base text-white/60 max-w-lg mx-auto">
//               Fresh styles added to our curated collection — be the first to own the newest designs.
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       {/* New Badge Highlight */}
//       <div className="bg-gradient-to-r from-[#EFE7DC] to-[#F8F5F0] border-b border-[#E8DCCB]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-6">
//               {['This Week', 'This Month', 'Sarees', 'Kurtis', 'Lehengas'].map((tag, i) => (
//                 <button
//                   key={tag}
//                   className={`font-body text-sm font-medium transition-colors cursor-pointer ${i === 0 ? 'text-[#7A4E48] border-b-2 border-[#7A4E48] pb-0.5' : 'text-[#999] hover:text-[#7A4E48]'}`}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//             <span className="font-body text-xs text-[#999]">Updated weekly</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
//         {/* New Arrivals Grid */}
//         {newProducts.length > 0 && (
//           <div className="mb-16">
//             <SectionHeader
//               badge="Latest Additions"
//               title="Brand New Styles"
//               subtitle="These just arrived — get them before they sell out."
//             />
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//               {newProducts.map((product, i) => (
//                 <ProductCard key={product.id} product={product} index={i} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Recently Added Section */}
//         <div>
//           <div className="flex items-end justify-between mb-10">
//             <SectionHeader
//               badge="All New"
//               title="Recently Added"
//               subtitle="Explore our latest additions across all categories."
//               centered={false}
//             />
//             <Link
//               to="/shop"
//               className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
//             >
//               View All <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {recentProducts.map((product, i) => (
//               <ProductCard key={product.id} product={product} index={i} />
//             ))}
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="mt-16 text-center py-12 bg-[#EFE7DC] rounded-2xl">
//           <h3 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-3">
//             Never Miss a New Arrival
//           </h3>
//           <p className="font-body text-sm text-[#777] mb-6">
//             Subscribe to our newsletter and be the first to know about new styles, exclusive launches, and special offers.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-xl border border-[#E8DCCB] bg-white font-body text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A]"
//             />
//             <button className="px-6 py-3 bg-[#7A4E48] text-white font-body font-semibold text-sm rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer whitespace-nowrap">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import SectionHeader from '../components/SectionHeader';
import { productsApi, AdaptedProduct } from '../api/products';

export default function NewArrivals() {
  const [newProducts, setNewProducts] = useState<AdaptedProduct[]>([]);
  const [recentProducts, setRecentProducts] = useState<AdaptedProduct[]>([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  // const [email, setEmail] = useState('');

  useEffect(() => {
    // New arrivals (is_new=true)
    productsApi.getNewArrivals(12)
      .then((p) => { setNewProducts(p); setLoadingNew(false); })
      .catch(() => setLoadingNew(false));

    // Recent — newest first, no filter
    productsApi.list({ sort_by: 'newest', page: 1, page_size: 12 })
      .then((r) => { setRecentProducts(r.products); setLoadingRecent(false); })
      .catch(() => setLoadingRecent(false));
  }, []);

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      {/* Hero */}
      <div className="relative bg-[#1F1F1F] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1600&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#C9A86A]/20 text-[#C9A86A] text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 border border-[#C9A86A]/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse" />
              Just Landed
            </motion.span>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white mb-4 leading-tight">
              New Arrivals
            </h1>
            <p className="font-body text-base text-white/60 max-w-lg mx-auto">
              Fresh styles added to our curated collection — be the first to own the newest designs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-gradient-to-r from-[#EFE7DC] to-[#F8F5F0] border-b border-[#E8DCCB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 overflow-x-auto">
              {['Sarees', 'Kurtis', 'Lehengas', 'Dupattas', 'Anarkalis'].map((tag, i) => (
                <Link
                  key={tag}
                  to={`/shop?category=${tag}`}
                  className={`font-body text-sm font-medium transition-colors cursor-pointer whitespace-nowrap hover:text-[#7A4E48] ${i === 0 ? 'text-[#7A4E48]' : 'text-[#999]'}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <span className="font-body text-xs text-[#999]">Updated weekly</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* New Arrivals (isNew=true) */}
        {(loadingNew || newProducts.length > 0) && (
          <div className="mb-16">
            <SectionHeader
              badge="Latest Additions"
              title="Brand New Styles"
              subtitle="These just arrived — get them before they sell out."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {loadingNew
                ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                : newProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product as any} index={i} />
                  ))
              }
            </div>
          </div>
        )}

        {/* Recently added — newest first */}
        <div>
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              badge="All New"
              title="Recently Added"
              subtitle="Explore our latest additions across all categories."
              centered={false}
            />
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
            >
              View All <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loadingRecent
              ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
              : recentProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product as any} index={i} />
                ))
            }
          </div>
        </div>

        {/* Newsletter CTA */}
        {/* <div className="mt-16 text-center py-12 bg-[#EFE7DC] rounded-2xl">
          <h3 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-3">
            Never Miss a New Arrival
          </h3>
          <p className="font-body text-sm text-[#777] mb-6">
            Subscribe to our newsletter and be the first to know about new styles, exclusive launches, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-[#E8DCCB] bg-white font-body text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A]"
            />
            <button className="px-6 py-3 bg-[#7A4E48] text-white font-body font-semibold text-sm rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}