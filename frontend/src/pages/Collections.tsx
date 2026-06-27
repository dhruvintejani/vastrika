// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiArrowRight } from 'react-icons/fi';
// import SectionHeader from '../components/SectionHeader';
// import ProductCard from '../components/ProductCard';
// import { getFeaturedProducts } from '../data/products';

// const collectionsData = [
//   {
//     id: 'wedding',
//     title: 'The Wedding Edit',
//     subtitle: 'Bridal & Wedding Guest Collection',
//     description: 'From the bride\'s ensemble to the wedding guest\'s perfect outfit, our wedding collection curates the finest in bridal fashion — lehengas, silk sarees, and embroidered anarkalis.',
//     image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=85',
//     path: '/shop?category=Lehengas',
//     color: 'from-[#7A4E48] to-[#5A3A36]',
//     tag: 'Bridal Season 2025',
//     count: '45+ Styles',
//   },
//   {
//     id: 'festive',
//     title: 'Festive Luminance',
//     subtitle: 'Navratri, Diwali & Celebration Wear',
//     description: 'Celebrate every festival with our vibrant and exquisitely crafted festive collection — from traditional silk sarees to dazzling lehengas and anarkalis that make you shine.',
//     image: 'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=800&q=85',
//     path: '/shop',
//     color: 'from-[#C9A86A] to-[#A07840]',
//     tag: 'Festive 2025',
//     count: '60+ Styles',
//   },
//   {
//     id: 'everyday',
//     title: 'Everyday Elegance',
//     subtitle: 'Kurtis, Co-ord Sets & Casual Ethnic',
//     description: 'Elevate your everyday wardrobe with our collection of handcrafted kurtis, co-ord sets, and casual ethnic wear designed for the modern woman who doesn\'t compromise on style.',
//     image: '/images/collection-kurti.jpg',
//     fallback: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=85',
//     path: '/shop?category=Kurtis',
//     color: 'from-[#4A7C59] to-[#2E5A3A]',
//     tag: 'Everyday Wear',
//     count: '80+ Styles',
//   },
//   {
//     id: 'luxury',
//     title: 'Luxury Silks',
//     subtitle: 'Kanjivaram, Banarasi & Patola',
//     description: 'Our heritage silk collection celebrates India\'s finest weaving traditions — Kanjivaram from Tamil Nadu, Banarasi from Varanasi, Patola from Gujarat. Each saree a masterpiece.',
//     image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85',
//     path: '/shop?category=Sarees',
//     color: 'from-[#3B5D8C] to-[#1B3A6B]',
//     tag: 'Heritage Silks',
//     count: '30+ Styles',
//   },
// ];

// const featuredProducts = getFeaturedProducts().slice(0, 8);

// export default function Collections() {
//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       {/* Hero */}
//       <div className="relative bg-[#EFE7DC] py-20 overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <img
//             src="https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=1600&q=60"
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
//             <span className="inline-flex items-center gap-2 mb-4">
//               <span className="h-px w-8 bg-[#C9A86A]" />
//               <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Curated Collections</span>
//               <span className="h-px w-8 bg-[#C9A86A]" />
//             </span>
//             <h1 className="font-heading text-5xl md:text-6xl font-semibold text-[#1F1F1F] mb-4">
//               Our Collections
//             </h1>
//             <p className="font-body text-base text-[#666] max-w-xl mx-auto leading-relaxed">
//               Carefully curated collections celebrating the richness of Indian textile heritage and contemporary fashion sensibility.
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       {/* Collection Cards */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="space-y-8">
//           {collectionsData.map((col, i) => (
//             <motion.div
//               key={col.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: i * 0.1 }}
//             >
//               <Link to={col.path} className="group cursor-pointer block">
//                 <div className={`grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 ${i % 2 === 0 ? '' : ''}`}>
//                   {/* Image */}
//                   <div className={`relative overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
//                     <div className="aspect-[16/9] md:aspect-auto md:h-full">
//                       <img
//                         src={col.image}
//                         alt={col.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                         style={{ minHeight: '280px' }}
//                         onError={(e) => { if ((col as any).fallback) (e.target as HTMLImageElement).src = (col as any).fallback; }}
//                       />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className={`bg-gradient-to-br ${col.color} p-10 md:p-14 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
//                     <span className="font-body text-xs text-white/60 uppercase tracking-[0.2em] mb-3">{col.tag}</span>
//                     <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">{col.title}</h2>
//                     <p className="font-body text-sm text-white/70 mb-4">{col.subtitle}</p>
//                     <p className="font-body text-sm text-white/80 leading-relaxed mb-6">{col.description}</p>
//                     <div className="flex items-center gap-4">
//                       <span className="font-body text-xs text-white/60">{col.count}</span>
//                       <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-body text-sm font-semibold px-6 py-3 rounded-full transition-colors">
//                         Shop Now <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Featured Products */}
//       <section className="py-20 bg-[#EFE7DC]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionHeader
//             badge="Editor's Choice"
//             title="Featured Picks"
//             subtitle="Our curators' favourite pieces from across all collections."
//           />
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//             {featuredProducts.map((product, i) => (
//               <ProductCard key={product.id} product={product} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { productsApi, AdaptedProduct } from '../api/products';

// Static collection data — unchanged (no API for these curated collections)
const collectionsData = [
  {
    id: 'wedding',
    title: 'The Wedding Edit',
    subtitle: 'Bridal & Wedding Guest Collection',
    description: "From the bride's ensemble to the wedding guest's perfect outfit, our wedding collection curates the finest in bridal fashion — lehengas, silk sarees, and embroidered anarkalis.",
    image: '/collection-lehenga.jpg',
    path: '/shop?category=Lehengas',
    color: 'from-[#7A4E48] to-[#5A3A36]',
    tag: 'Bridal Season 2025',
    count: '45+ Styles',
  },
  {
    id: 'festive',
    title: 'Festive Luminance',
    subtitle: 'Navratri, Diwali & Celebration Wear',
    description: 'Celebrate every festival with our vibrant and exquisitely crafted festive collection — from traditional silk sarees to dazzling lehengas and anarkalis that make you shine.',
    image: '/collection-lehenga.jpg',
    path: '/shop',
    color: 'from-[#C9A86A] to-[#A07840]',
    tag: 'Festive 2025',
    count: '60+ Styles',
  },
  {
    id: 'everyday',
    title: 'Everyday Elegance',
    subtitle: 'Kurtis, Co-ord Sets & Casual Ethnic',
    description: "Elevate your everyday wardrobe with our collection of handcrafted kurtis, co-ord sets, and casual ethnic wear designed for the modern woman who doesn't compromise on style.",
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=85',
    path: '/shop?category=Kurtis',
    color: 'from-[#4A7C59] to-[#2E5A3A]',
    tag: 'Everyday Wear',
    count: '80+ Styles',
  },
  {
    id: 'luxury',
    title: 'Luxury Silks',
    subtitle: 'Kanjivaram, Banarasi & Patola',
    description: "Our heritage silk collection celebrates India's finest weaving traditions — Kanjivaram from Tamil Nadu, Banarasi from Varanasi, Patola from Gujarat. Each saree a masterpiece.",
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85',
    path: '/shop?category=Sarees',
    color: 'from-[#3B5D8C] to-[#1B3A6B]',
    tag: 'Heritage Silks',
    count: '30+ Styles',
  },
];

export default function Collections() {
  const [featuredProducts, setFeaturedProducts] = useState<AdaptedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getFeatured(8)
      .then((p) => { setFeaturedProducts(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      {/* Hero */}
      <div className="relative bg-[#EFE7DC] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/collection-kurti.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#C9A86A]" />
              <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Curated Collections</span>
              <span className="h-px w-8 bg-[#C9A86A]" />
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-[#1F1F1F] mb-4">
              Our Collections
            </h1>
            <p className="font-body text-base text-[#666] max-w-xl mx-auto leading-relaxed">
              Carefully curated collections celebrating the richness of Indian textile heritage and contemporary fashion sensibility.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Collection Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          {collectionsData.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={col.path} className="group cursor-pointer block">
                <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                  {/* Image */}
                  <div className={`relative overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="aspect-[16/9] md:aspect-auto md:h-full">
                      <img
                        src={col.image}
                        alt={col.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ minHeight: '280px' }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`bg-gradient-to-br ${col.color} p-10 md:p-14 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <span className="font-body text-xs text-white/60 uppercase tracking-[0.2em] mb-3">{col.tag}</span>
                    <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">{col.title}</h2>
                    <p className="font-body text-sm text-white/70 mb-4">{col.subtitle}</p>
                    <p className="font-body text-sm text-white/80 leading-relaxed mb-6">{col.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="font-body text-xs text-white/60">{col.count}</span>
                      <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-body text-sm font-semibold px-6 py-3 rounded-full transition-colors">
                        Shop Now <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products from API */}
      <section className="py-20 bg-[#EFE7DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Editor's Choice"
            title="Featured Picks"
            subtitle="Our curators' favourite pieces from across all collections."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : featuredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product as any} index={i} />
                ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}