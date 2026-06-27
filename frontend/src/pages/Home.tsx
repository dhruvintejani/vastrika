// // // import { Link } from 'react-router-dom';
// // // import { motion } from 'framer-motion';
// // // import { FiArrowRight, FiTruck, FiRefreshCw, FiAward, FiChevronRight } from 'react-icons/fi';
// // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // import { Pagination, Autoplay, Navigation } from 'swiper/modules';
// // // import 'swiper/css';
// // // import 'swiper/css/pagination';
// // // import 'swiper/css/navigation';
// // // import ProductCard from '../components/ProductCard';
// // // import SectionHeader from '../components/SectionHeader';
// // // import { getTrendingProducts, getNewArrivals, products } from '../data/products';

// // // const trendingProducts = getTrendingProducts().slice(0, 8);
// // // const newArrivals = getNewArrivals().slice(0, 4);
// // // const featuredSarees = products.filter(p => p.category === 'Sarees').slice(0, 4);

// // // const testimonials = [
// // //   {
// // //     name: 'Priya Sharma',
// // //     location: 'Delhi',
// // //     avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
// // //     review: 'Absolutely in love with my Banarasi saree from Vastrika! The quality is exceptional and it arrived so beautifully packaged. Will definitely shop again.',
// // //     rating: 5,
// // //     product: 'Banarasi Silk Saree',
// // //   },
// // //   {
// // //     name: 'Ananya Krishnan',
// // //     location: 'Bangalore',
// // //     avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&q=80',
// // //     review: 'The Kanjivaram silk saree is stunning! Exactly as pictured and the fabric quality is premium. Vastrika truly delivers luxury at its finest.',
// // //     rating: 5,
// // //     product: 'Kanjivaram Silk Saree',
// // //   },
// // //   {
// // //     name: 'Meera Patel',
// // //     location: 'Mumbai',
// // //     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
// // //     review: 'Ordered the bridal lehenga for my wedding and I received so many compliments! The embroidery is so intricate and the fabric is divine. Thank you Vastrika!',
// // //     rating: 5,
// // //     product: 'Bridal Lehenga Choli',
// // //   },
// // //   {
// // //     name: 'Kavitha Nair',
// // //     location: 'Chennai',
// // //     avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80',
// // //     review: 'The Chikankari kurti collection is to die for! Each piece is so delicately crafted. Free shipping was a bonus and delivery was super fast.',
// // //     rating: 5,
// // //     product: 'Lucknowi Chikankari Kurti',
// // //   },
// // // ];

// // // const collections = [
// // //   {
// // //     title: 'Silk Sarees',
// // //     subtitle: 'From ₹3,499',
// // //     image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
// // //     path: '/shop?category=Sarees',
// // //     badge: 'Timeless Heritage',
// // //   },
// // //   {
// // //     title: 'Bridal Lehengas',
// // //     subtitle: 'From ₹9,999',
// // //     image: '/images/collection-lehenga.jpg',
// // //     fallback: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=80',
// // //     path: '/shop?category=Lehengas',
// // //     badge: 'Wedding Season',
// // //   },
// // //   {
// // //     title: 'Designer Kurtis',
// // //     subtitle: 'From ₹1,299',
// // //     image: '/images/collection-kurti.jpg',
// // //     fallback: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
// // //     path: '/shop?category=Kurtis',
// // //     badge: 'Everyday Elegance',
// // //   },
// // // ];

// // // const promobanners = [
// // //   {
// // //     title: 'Wedding Season Collection',
// // //     subtitle: 'Celebrate Love in Luxury',
// // //     description: 'Exquisite bridal wear crafted for your most precious moments.',
// // //     cta: 'Shop Bridal',
// // //     path: '/collections',
// // //     bg: 'from-[#7A4E48] to-[#5A3A36]',
// // //     image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=600&q=80',
// // //   },
// // //   {
// // //     title: 'Festive Season Sale',
// // //     subtitle: 'Up to 40% Off',
// // //     description: 'Shop our premium festive collection and celebrate in style.',
// // //     cta: 'Shop Now',
// // //     path: '/shop',
// // //     bg: 'from-[#C9A86A] to-[#B08850]',
// // //     image: 'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=600&q=80',
// // //   },
// // // ];

// // // const features = [
// // //   {
// // //     icon: FiTruck,
// // //     title: 'Free Shipping Across India',
// // //     description: 'Complimentary delivery on all orders above ₹999. Fast & secure shipping to your doorstep.',
// // //   },
// // //   {
// // //     icon: FiAward,
// // //     title: 'Premium Fabric Quality',
// // //     description: 'Every piece is crafted from the finest fabrics sourced directly from India\'s best weavers.',
// // //   },
// // //   {
// // //     icon: FiRefreshCw,
// // //     title: 'Easy 7-Day Returns',
// // //     description: 'Not satisfied? Return within 7 days for a full refund or exchange. No questions asked.',
// // //   },
// // // ];

// // // export default function Home() {
// // //   return (
// // //     <div className="pt-[72px]">
// // //       {/* Hero Section */}
// // //       <section className="relative min-h-screen bg-[#F8F5F0] flex items-center overflow-hidden">
// // //         {/* Background decoration */}
// // //         <div className="absolute inset-0 overflow-hidden">
// // //           <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-[#EFE7DC] opacity-60" />
// // //           <div className="absolute -left-20 bottom-20 w-64 h-64 rounded-full bg-[#E8DCCB] opacity-40" />
// // //         </div>

// // //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-0">
// // //           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-72px)]">
// // //             {/* Left: Text */}
// // //             <motion.div
// // //               initial={{ opacity: 0, x: -50 }}
// // //               animate={{ opacity: 1, x: 0 }}
// // //               transition={{ duration: 0.8, ease: 'easeOut' }}
// // //               className="order-2 lg:order-1"
// // //             >
// // //               <motion.span
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.2, duration: 0.6 }}
// // //                 className="inline-flex items-center gap-2 bg-[#EFE7DC] text-[#7A4E48] text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 border border-[#E8DCCB]"
// // //               >
// // //                 <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse" />
// // //                 Elegant Ethnic Wear Collection
// // //               </motion.span>

// // //               <motion.h1
// // //                 initial={{ opacity: 0, y: 30 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.3, duration: 0.7 }}
// // //                 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1F1F1F] leading-tight mb-6"
// // //               >
// // //                 Graceful Fashion for{' '}
// // //                 <span className="text-[#7A4E48] italic">Modern</span>{' '}
// // //                 Indian Women
// // //               </motion.h1>

// // //               <motion.p
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.45, duration: 0.6 }}
// // //                 className="font-body text-base md:text-lg text-[#666] leading-relaxed mb-8 max-w-md"
// // //               >
// // //                 Premium handcrafted ethnic wear designed with timeless elegance and comfort. From Banarasi silks to Chikankari kurtis — every piece tells a story.
// // //               </motion.p>

// // //               <motion.div
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.55, duration: 0.6 }}
// // //                 className="flex flex-wrap gap-4 mb-10"
// // //               >
// // //                 <Link
// // //                   to="/shop"
// // //                   className="group flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#7A4E48]/30 hover:-translate-y-0.5"
// // //                 >
// // //                   Shop Collection
// // //                   <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //                 </Link>
// // //                 <Link
// // //                   to="/collections"
// // //                   className="flex items-center gap-2 border border-[#7A4E48] text-[#7A4E48] font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#7A4E48] hover:text-white transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
// // //                 >
// // //                   View Collections
// // //                 </Link>
// // //               </motion.div>

// // //               {/* Stats */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.65, duration: 0.6 }}
// // //                 className="flex gap-8"
// // //               >
// // //                 {[
// // //                   { num: '5000+', label: 'Happy Customers' },
// // //                   { num: '200+', label: 'Unique Designs' },
// // //                   { num: '4.9★', label: 'Average Rating' },
// // //                 ].map((stat) => (
// // //                   <div key={stat.label}>
// // //                     <div className="font-heading text-2xl font-bold text-[#7A4E48]">{stat.num}</div>
// // //                     <div className="font-body text-xs text-[#999]">{stat.label}</div>
// // //                   </div>
// // //                 ))}
// // //               </motion.div>
// // //             </motion.div>

// // //             {/* Right: Image */}
// // //             <motion.div
// // //               initial={{ opacity: 0, x: 50, scale: 0.95 }}
// // //               animate={{ opacity: 1, x: 0, scale: 1 }}
// // //               transition={{ duration: 0.9, ease: 'easeOut' }}
// // //               className="order-1 lg:order-2 relative"
// // //             >
// // //               <div className="relative">
// // //                 {/* Decorative background */}
// // //                 <div className="absolute -right-6 -top-6 w-full h-full rounded-[2rem] bg-[#EFE7DC]" />
// // //                 <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-2xl bg-[#C9A86A]/20" />

// // //                 <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl">
// // //                   <img
// // //                     src="/images/hero-saree.jpg"
// // //                     alt="Indian Ethnic Fashion"
// // //                     className="w-full h-full object-cover"
// // //                     onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=85'; }}
// // //                   />
// // //                   <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/30 via-transparent to-transparent" />
// // //                 </div>

// // //                 {/* Floating badge */}
// // //                 <motion.div
// // //                   initial={{ opacity: 0, scale: 0.5, x: -30 }}
// // //                   animate={{ opacity: 1, scale: 1, x: 0 }}
// // //                   transition={{ delay: 0.8, duration: 0.5 }}
// // //                   className="absolute -left-6 bottom-12 bg-white rounded-2xl p-4 shadow-xl border border-[#F0EBE3]"
// // //                 >
// // //                   <p className="font-body text-xs text-[#999] mb-1">Today's Pick</p>
// // //                   <p className="font-heading text-sm font-semibold text-[#1F1F1F]">Kanjivaram Silk</p>
// // //                   <p className="font-heading text-base font-bold text-[#7A4E48]">₹14,999</p>
// // //                 </motion.div>

// // //                 {/* Floating tag */}
// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ delay: 1, duration: 0.5 }}
// // //                   className="absolute -right-4 top-12 bg-[#7A4E48] text-white rounded-xl px-4 py-2 shadow-lg"
// // //                 >
// // //                   <p className="font-body text-xs font-medium">✨ New Arrivals</p>
// // //                 </motion.div>
// // //               </div>
// // //             </motion.div>
// // //           </div>
// // //         </div>

// // //         {/* Scroll indicator */}
// // //         <motion.div
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ delay: 1.2 }}
// // //           className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
// // //         >
// // //           <span className="font-body text-xs text-[#999] uppercase tracking-widest">Scroll</span>
// // //           <motion.div
// // //             animate={{ y: [0, 8, 0] }}
// // //             transition={{ repeat: Infinity, duration: 1.5 }}
// // //             className="w-0.5 h-8 bg-gradient-to-b from-[#C9A86A] to-transparent"
// // //           />
// // //         </motion.div>
// // //       </section>

// // //       {/* Marquee Strip */}
// // //       <div className="bg-[#7A4E48] py-3 overflow-hidden">
// // //         <div className="flex gap-0 whitespace-nowrap">
// // //           <div
// // //             className="flex gap-8 animate-marquee font-body text-xs text-white/80 font-medium uppercase tracking-[0.15em]"
// // //           >
// // //             {Array(3).fill([
// // //               '✦ Free Shipping Above ₹999',
// // //               '✦ Handcrafted by Indian Artisans',
// // //               '✦ Premium Silk Fabrics',
// // //               '✦ 7-Day Easy Returns',
// // //               '✦ Authentic Ethnic Wear',
// // //               '✦ New Arrivals Every Week',
// // //             ]).flat().map((text, i) => (
// // //               <span key={i} className="flex-shrink-0">{text}</span>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Features Section */}
// // //       <section className="bg-[#EFE7DC] py-14">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="grid md:grid-cols-3 gap-8">
// // //             {features.map((feature, i) => (
// // //               <motion.div
// // //                 key={feature.title}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 whileInView={{ opacity: 1, y: 0 }}
// // //                 viewport={{ once: true }}
// // //                 transition={{ delay: i * 0.15, duration: 0.5 }}
// // //                 className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
// // //               >
// // //                 <div className="w-12 h-12 rounded-xl bg-[#EFE7DC] flex items-center justify-center flex-shrink-0">
// // //                   <feature.icon className="w-5 h-5 text-[#7A4E48]" />
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-1">
// // //                     {feature.title}
// // //                   </h3>
// // //                   <p className="font-body text-sm text-[#777] leading-relaxed">
// // //                     {feature.description}
// // //                   </p>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Collections Grid */}
// // //       <section className="py-20 bg-[#F8F5F0]">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <SectionHeader
// // //             badge="Curated for You"
// // //             title="Our Signature Collections"
// // //             subtitle="Explore handpicked categories that celebrate the timeless beauty of Indian craftsmanship."
// // //           />
// // //           <div className="grid md:grid-cols-3 gap-6">
// // //             {collections.map((col, i) => (
// // //               <motion.div
// // //                 key={col.title}
// // //                 initial={{ opacity: 0, y: 30 }}
// // //                 whileInView={{ opacity: 1, y: 0 }}
// // //                 viewport={{ once: true }}
// // //                 transition={{ delay: i * 0.12, duration: 0.5 }}
// // //               >
// // //                 <Link to={col.path} className="group cursor-pointer block">
// // //                   <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-md hover:shadow-xl transition-shadow duration-500">
// // //                     <img
// // //                       src={col.image}
// // //                       alt={col.title}
// // //                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
// // //                       onError={(e) => { if ((col as any).fallback) (e.target as HTMLImageElement).src = (col as any).fallback; }}
// // //                     />
// // //                     <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/70 via-[#1F1F1F]/20 to-transparent" />
// // //                     <div className="absolute inset-0 flex flex-col justify-end p-6">
// // //                       <span className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-wider mb-2">
// // //                         {col.badge}
// // //                       </span>
// // //                       <h3 className="font-heading text-2xl font-semibold text-white mb-1">
// // //                         {col.title}
// // //                       </h3>
// // //                       <p className="font-body text-sm text-white/80 mb-4">{col.subtitle}</p>
// // //                       <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
// // //                         <span className="font-body text-sm font-medium">Explore</span>
// // //                         <FiArrowRight className="w-4 h-4" />
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </Link>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Trending Sarees */}
// // //       <section className="py-20 bg-[#EFE7DC]">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex items-end justify-between mb-12">
// // //             <SectionHeader
// // //               badge="Most Loved"
// // //               title="Trending Sarees"
// // //               subtitle="Our most coveted silk & handloom sarees this season."
// // //               centered={false}
// // //             />
// // //             <Link
// // //               to="/shop?category=Sarees"
// // //               className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
// // //             >
// // //               View All <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //             </Link>
// // //           </div>
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
// // //             {featuredSarees.map((product, i) => (
// // //               <ProductCard key={product.id} product={product} index={i} />
// // //             ))}
// // //           </div>
// // //           <div className="text-center mt-8 md:hidden">
// // //             <Link
// // //               to="/shop?category=Sarees"
// // //               className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer"
// // //             >
// // //               View All Sarees <FiChevronRight className="w-4 h-4" />
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Promo Banners */}
// // //       <section className="py-20 bg-[#F8F5F0]">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="grid md:grid-cols-2 gap-6">
// // //             {promobanners.map((banner, i) => (
// // //               <motion.div
// // //                 key={banner.title}
// // //                 initial={{ opacity: 0, y: 30 }}
// // //                 whileInView={{ opacity: 1, y: 0 }}
// // //                 viewport={{ once: true }}
// // //                 transition={{ delay: i * 0.15, duration: 0.5 }}
// // //               >
// // //                 <Link to={banner.path} className="group cursor-pointer block">
// // //                   <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.bg} h-64 md:h-72`}>
// // //                     <img
// // //                       src={banner.image}
// // //                       alt={banner.title}
// // //                       className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-700"
// // //                     />
// // //                     <div className="absolute inset-0 p-8 flex flex-col justify-end">
// // //                       <span className="font-body text-xs text-white/70 uppercase tracking-widest mb-2">
// // //                         {banner.subtitle}
// // //                       </span>
// // //                       <h3 className="font-heading text-3xl font-semibold text-white mb-2">
// // //                         {banner.title}
// // //                       </h3>
// // //                       <p className="font-body text-sm text-white/80 mb-5">{banner.description}</p>
// // //                       <div className="inline-flex items-center gap-2 bg-white text-[#7A4E48] font-body text-sm font-semibold px-6 py-2.5 rounded-full w-fit group-hover:bg-[#F8F5F0] transition-colors cursor-pointer">
// // //                         {banner.cta} <FiArrowRight className="w-3.5 h-3.5" />
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </Link>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Trending Products */}
// // //       <section className="py-20 bg-[#EFE7DC]">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex items-end justify-between mb-12">
// // //             <SectionHeader
// // //               badge="This Season"
// // //               title="Trending Now"
// // //               subtitle="The styles our customers can't stop talking about."
// // //               centered={false}
// // //             />
// // //             <Link
// // //               to="/shop"
// // //               className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
// // //             >
// // //               View All <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //             </Link>
// // //           </div>

// // //           <Swiper
// // //             modules={[Pagination, Autoplay, Navigation]}
// // //             spaceBetween={20}
// // //             slidesPerView={2}
// // //             breakpoints={{
// // //               640: { slidesPerView: 2 },
// // //               768: { slidesPerView: 3 },
// // //               1024: { slidesPerView: 4 },
// // //             }}
// // //             autoplay={{ delay: 3500, disableOnInteraction: false }}
// // //             pagination={{ clickable: true }}
// // //             navigation
// // //             className="pb-12"
// // //           >
// // //             {trendingProducts.map((product, i) => (
// // //               <SwiperSlide key={product.id}>
// // //                 <ProductCard product={product} index={i} />
// // //               </SwiperSlide>
// // //             ))}
// // //           </Swiper>
// // //         </div>
// // //       </section>

// // //       {/* New Arrivals Highlight */}
// // //       {newArrivals.length > 0 && (
// // //         <section className="py-20 bg-[#F8F5F0]">
// // //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //             <SectionHeader
// // //               badge="Just Landed"
// // //               title="New Arrivals"
// // //               subtitle="Fresh styles added to our curated collection this week."
// // //             />
// // //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
// // //               {newArrivals.map((product, i) => (
// // //                 <ProductCard key={product.id} product={product} index={i} />
// // //               ))}
// // //             </div>
// // //             <div className="text-center mt-10">
// // //               <Link
// // //                 to="/new-arrivals"
// // //                 className="inline-flex items-center gap-2 border border-[#7A4E48] text-[#7A4E48] font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#7A4E48] hover:text-white transition-all duration-300 cursor-pointer"
// // //               >
// // //                 View All New Arrivals <FiArrowRight className="w-4 h-4" />
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </section>
// // //       )}

// // //       {/* Festive Banner */}
// // //       <section className="py-24 bg-[#7A4E48] relative overflow-hidden">
// // //         <div className="absolute inset-0 opacity-10">
// // //           <div className="absolute inset-0" style={{
// // //             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A86A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
// // //           }} />
// // //         </div>
// // //         <div className="relative max-w-4xl mx-auto px-4 text-center">
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 30 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 0.6 }}
// // //           >
// // //             <span className="font-body text-[#C9A86A] text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
// // //               ✨ Festive Season 2025 ✨
// // //             </span>
// // //             <h2 className="font-heading text-4xl md:text-6xl text-white font-semibold mb-6 leading-tight">
// // //               Dress to Impress This<br />
// // //               <span className="text-[#C9A86A] italic">Festive Season</span>
// // //             </h2>
// // //             <p className="font-body text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
// // //               From Diwali celebrations to wedding festivities — discover our exclusive festive collection crafted to make you shine.
// // //             </p>
// // //             <Link
// // //               to="/collections"
// // //               className="inline-flex items-center gap-2 bg-[#C9A86A] text-white font-body font-semibold text-sm px-10 py-4 rounded-full hover:bg-[#B08850] transition-colors cursor-pointer hover:shadow-lg hover:shadow-[#C9A86A]/30 hover:-translate-y-0.5 transition-transform"
// // //             >
// // //               Explore Festive Collection <FiArrowRight className="w-4 h-4" />
// // //             </Link>
// // //           </motion.div>
// // //         </div>
// // //       </section>

// // //       {/* Testimonials */}
// // //       <section className="py-20 bg-[#F8F5F0]">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <SectionHeader
// // //             badge="Customer Stories"
// // //             title="What Our Customers Say"
// // //             subtitle="Thousands of happy customers trust Vastrika for their ethnic fashion needs."
// // //           />
// // //           <Swiper
// // //             modules={[Pagination, Autoplay]}
// // //             spaceBetween={20}
// // //             slidesPerView={1}
// // //             breakpoints={{
// // //               640: { slidesPerView: 1 },
// // //               768: { slidesPerView: 2 },
// // //               1024: { slidesPerView: 3 },
// // //             }}
// // //             autoplay={{ delay: 4000, disableOnInteraction: false }}
// // //             pagination={{ clickable: true }}
// // //             className="pb-12"
// // //           >
// // //             {testimonials.map((t, i) => (
// // //               <SwiperSlide key={i}>
// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   whileInView={{ opacity: 1, y: 0 }}
// // //                   viewport={{ once: true }}
// // //                   transition={{ delay: i * 0.1, duration: 0.5 }}
// // //                   className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#F0EBE3] h-full"
// // //                 >
// // //                   <div className="flex items-center gap-1 mb-4">
// // //                     {Array.from({ length: t.rating }).map((_, j) => (
// // //                       <span key={j} className="text-[#C9A86A] text-sm">★</span>
// // //                     ))}
// // //                   </div>
// // //                   <p className="font-body text-sm text-[#555] leading-relaxed mb-5 italic">
// // //                     "{t.review}"
// // //                   </p>
// // //                   <div className="flex items-center gap-3">
// // //                     <img
// // //                       src={t.avatar}
// // //                       alt={t.name}
// // //                       className="w-10 h-10 rounded-full object-cover"
// // //                       onError={(e) => {
// // //                         (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${t.name}&background=EFE7DC&color=7A4E48`;
// // //                       }}
// // //                     />
// // //                     <div>
// // //                       <p className="font-heading text-sm font-semibold text-[#1F1F1F]">{t.name}</p>
// // //                       <p className="font-body text-xs text-[#999]">{t.location} • {t.product}</p>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>
// // //               </SwiperSlide>
// // //             ))}
// // //           </Swiper>
// // //         </div>
// // //       </section>

// // //       {/* Instagram Grid */}
// // //       <section className="py-20 bg-[#EFE7DC]">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <SectionHeader
// // //             badge="@vastrika.official"
// // //             title="Follow Our Story"
// // //             subtitle="Tag us with #VastrikaStyle and get featured on our page."
// // //           />
// // //           <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
// // //             {[
// // //               'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
// // //               'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&q=80',
// // //               'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300&q=80',
// // //               'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=300&q=80',
// // //               'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=300&q=80',
// // //               'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
// // //             ].map((img, i) => (
// // //               <motion.div
// // //                 key={i}
// // //                 initial={{ opacity: 0, scale: 0.95 }}
// // //                 whileInView={{ opacity: 1, scale: 1 }}
// // //                 viewport={{ once: true }}
// // //                 transition={{ delay: i * 0.08, duration: 0.4 }}
// // //                 className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
// // //               >
// // //                 <img
// // //                   src={img}
// // //                   alt={`Instagram ${i + 1}`}
// // //                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
// // //                 />
// // //                 <div className="absolute inset-0 bg-[#7A4E48]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
// // //                   <FiArrowRight className="w-5 h-5 text-white" />
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // }


// // // Home.tsx — replaces ../data/products static imports with live API
// // // All layout, sections, animations, and components are unchanged.
// // // Only data fetching is modified.
// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { FiArrowRight } from 'react-icons/fi';
// // import ProductCard from '../components/ProductCard';
// // import SectionHeader from '../components/SectionHeader';
// // import ProductSkeleton from '../components/ProductSkeleton';
// // import { productsApi, AdaptedProduct } from '../api/products';

// // // ── Static content (unchanged) ────────────────────────────────────────────────
// // const categories = [
// //   { name: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', path: '/shop?category=Sarees' },
// //   { name: 'Kurtis', image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80', path: '/shop?category=Kurtis' },
// //   { name: 'Lehengas', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=600&q=80', path: '/shop?category=Lehengas' },
// //   { name: 'Dupattas', image: 'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=600&q=80', path: '/shop?category=Dupattas' },
// //   { name: 'Anarkalis', image: 'https://images.unsplash.com/photo-1583391733975-7b1b3a1d9c3e?w=600&q=80', path: '/shop?category=Anarkalis' },
// //   { name: 'Ethnic Gowns', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80', path: '/shop?category=Ethnic Gowns' },
// // ];

// // const testimonials = [
// //   { name: 'Priya Sharma', city: 'Mumbai', text: 'Absolutely stunning sarees! The quality is exceptional and the delivery was prompt. My go-to store for all ethnic wear.', rating: 5, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80' },
// //   { name: 'Anjali Patel', city: 'Ahmedabad', text: "Vastrika has the best Kanjivaram collection I've seen online. The fabric is authentic and the colours are exactly as shown.", rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&q=80' },
// //   { name: 'Deepika Nair', city: 'Chennai', text: 'Ordered a lehenga for my cousin\'s wedding and it was perfect. The embroidery detail was exquisite. Will definitely order again!', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
// // ];

// // const features = [
// //   { icon: '🧵', title: 'Handcrafted Quality', desc: 'Every piece is carefully handcrafted by skilled artisans.' },
// //   { icon: '🚚', title: 'Free Shipping ₹999+', desc: 'Free delivery on all orders above ₹999 across India.' },
// //   { icon: '↩️', title: '7-Day Easy Returns', desc: 'Hassle-free returns within 7 days of delivery.' },
// //   { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Cards, Net Banking & COD — all fully secure.' },
// // ];

// // export default function Home() {
// //   const [featured, setFeatured] = useState<AdaptedProduct[]>([]);
// //   const [newArrivals, setNewArrivals] = useState<AdaptedProduct[]>([]);
// //   const [loadingFeatured, setLoadingFeatured] = useState(true);
// //   const [loadingNew, setLoadingNew] = useState(true);

// //   useEffect(() => {
// //     productsApi.getFeatured(8).then((p) => { setFeatured(p); setLoadingFeatured(false); }).catch(() => setLoadingFeatured(false));
// //     productsApi.getNewArrivals(4).then((p) => { setNewArrivals(p); setLoadingNew(false); }).catch(() => setLoadingNew(false));
// //   }, []);

// //   return (
// //     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
// //       {/* ── Hero ── */}
// //       <section className="relative bg-[#EFE7DC] min-h-[90vh] flex items-center overflow-hidden">
// //         <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
// //           <img src="/images/hero-saree.jpg" alt="Hero" className="w-full h-full object-cover"
// //             onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80'; }} />
// //           <div className="absolute inset-0 bg-gradient-to-r from-[#EFE7DC] via-[#EFE7DC]/60 to-transparent" />
// //         </div>
// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
// //           <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
// //             <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
// //               className="inline-flex items-center gap-2 bg-[#C9A86A]/15 text-[#C9A86A] text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 border border-[#C9A86A]/30">
// //               <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse" />New Arrivals for Festive Season 2025
// //             </motion.span>
// //             <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1F1F1F] leading-tight mb-6">
// //               Where Heritage<br />Meets{' '}
// //               <span className="text-[#7A4E48] italic">Modern Grace</span>
// //             </h1>
// //             <p className="font-body text-base md:text-lg text-[#555] leading-relaxed mb-8 max-w-lg">
// //               Discover India's finest ethnic fashion — handcrafted sarees, kurtis, lehengas, and more. Each piece tells a story of tradition and artistry.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-all cursor-pointer shadow-lg hover:shadow-xl">
// //                 Shop Collection <FiArrowRight className="w-4 h-4" />
// //               </Link>
// //               <Link to="/collections" className="inline-flex items-center justify-center gap-2 border-2 border-[#7A4E48] text-[#7A4E48] font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#7A4E48] hover:text-white transition-all cursor-pointer">
// //                 View Collections
// //               </Link>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* ── Features bar ── */}
// //       <section className="bg-[#7A4E48] py-10">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             {features.map((f, i) => (
// //               <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
// //                 className="flex items-start gap-3">
// //                 <span className="text-2xl">{f.icon}</span>
// //                 <div>
// //                   <p className="font-heading text-sm text-white font-semibold">{f.title}</p>
// //                   <p className="font-body text-xs text-white/60 mt-0.5">{f.desc}</p>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Category grid ── */}
// //       <section className="py-20 bg-[#F8F5F0]">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <SectionHeader badge="Browse by" title="Our Categories" subtitle="Explore our curated range of ethnic fashion across all occasions." />
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// //             {categories.map((cat, i) => (
// //               <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
// //                 <Link to={cat.path} className="group block text-center cursor-pointer">
// //                   <div className="aspect-square rounded-2xl overflow-hidden bg-[#EFE7DC] mb-3 shadow-sm group-hover:shadow-md transition-shadow">
// //                     <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
// //                       onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80'; }} />
// //                   </div>
// //                   <p className="font-heading text-sm font-semibold text-[#1F1F1F] group-hover:text-[#7A4E48] transition-colors">{cat.name}</p>
// //                 </Link>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Featured Products ── */}
// //       <section className="py-20 bg-[#EFE7DC]">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-end justify-between mb-12">
// //             <SectionHeader badge="Handpicked" title="Featured Collection" subtitle="Our curators' most-loved pieces this season." centered={false} />
// //             <Link to="/shop" className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group">
// //               View All <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //           </div>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
// //             {loadingFeatured
// //               ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
// //               : featured.map((p, i) => <ProductCard key={p.id} product={p as any} index={i} />)
// //             }
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── New Arrivals ── */}
// //       <section className="py-20 bg-[#F8F5F0]">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-end justify-between mb-12">
// //             <SectionHeader badge="Just In" title="New Arrivals" subtitle="Fresh styles added to our collection." centered={false} />
// //             <Link to="/new-arrivals" className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group">
// //               See All New <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //           </div>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
// //             {loadingNew
// //               ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
// //               : newArrivals.map((p, i) => <ProductCard key={p.id} product={p as any} index={i} />)
// //             }
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Testimonials ── */}
// //       <section className="py-20 bg-[#EFE7DC]">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <SectionHeader badge="Customer Love" title="What Our Customers Say" />
// //           <div className="grid md:grid-cols-3 gap-6">
// //             {testimonials.map((t, i) => (
// //               <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
// //                 className="bg-white rounded-2xl p-7 shadow-sm border border-[#F0EBE3]">
// //                 <div className="flex gap-1 mb-4">
// //                   {Array.from({ length: t.rating }).map((_, j) => <span key={j} className="text-[#C9A86A] text-sm">★</span>)}
// //                 </div>
// //                 <p className="font-body text-sm text-[#555] leading-relaxed mb-6 italic">"{t.text}"</p>
// //                 <div className="flex items-center gap-3">
// //                   <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover"
// //                     onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${t.name}&background=EFE7DC&color=7A4E48&size=80`; }} />
// //                   <div>
// //                     <p className="font-heading text-sm font-semibold text-[#1F1F1F]">{t.name}</p>
// //                     <p className="font-body text-xs text-[#999]">{t.city}</p>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── CTA Banner ── */}
// //       <section className="py-20 bg-[#1F1F1F] relative overflow-hidden">
// //         <div className="absolute inset-0 opacity-10">
// //           <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=40" alt="" className="w-full h-full object-cover" />
// //         </div>
// //         <div className="relative max-w-4xl mx-auto px-4 text-center">
// //           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
// //             <span className="inline-flex items-center gap-2 mb-6">
// //               <span className="h-px w-8 bg-[#C9A86A]" />
// //               <span className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-[0.2em]">New Season</span>
// //               <span className="h-px w-8 bg-[#C9A86A]" />
// //             </span>
// //             <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
// //               Celebrate Every Moment<br />in <span className="text-[#C9A86A] italic">Vastrika</span>
// //             </h2>
// //             <p className="font-body text-base text-white/60 mb-8 max-w-xl mx-auto">
// //               From festive celebrations to everyday elegance — find the perfect ethnic piece for every occasion.
// //             </p>
// //             <Link to="/shop" className="inline-flex items-center gap-2 bg-[#C9A86A] text-white font-body font-semibold text-sm px-10 py-4 rounded-full hover:bg-[#B08850] transition-colors cursor-pointer shadow-lg">
// //               Shop Now <FiArrowRight className="w-4 h-4" />
// //             </Link>
// //           </motion.div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiArrowRight, FiTruck, FiRefreshCw, FiAward, FiChevronRight } from 'react-icons/fi';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import ProductCard from '../components/ProductCard';
// import SectionHeader from '../components/SectionHeader';
// import ProductSkeleton from '../components/ProductSkeleton';
// import { productsApi, AdaptedProduct } from '../api/products';

// const testimonials = [
//   {
//     name: 'Priya Sharma',
//     location: 'Delhi',
//     avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
//     review: 'Absolutely in love with my Banarasi saree from Vastrika! The quality is exceptional and it arrived so beautifully packaged. Will definitely shop again.',
//     rating: 5,
//     product: 'Banarasi Silk Saree',
//   },
//   {
//     name: 'Ananya Krishnan',
//     location: 'Bangalore',
//     avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&q=80',
//     review: 'The Kanjivaram silk saree is stunning! Exactly as pictured and the fabric quality is premium. Vastrika truly delivers luxury at its finest.',
//     rating: 5,
//     product: 'Kanjivaram Silk Saree',
//   },
//   {
//     name: 'Meera Patel',
//     location: 'Mumbai',
//     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
//     review: 'Ordered the bridal lehenga for my cousin\'s wedding and I received so many compliments!. Thank you Vastrika!',
//     rating: 5,
//     product: 'Bridal Lehenga Choli',
//   },
//   {
//     name: 'Kavitha Nair',
//     location: 'Chennai',
//     avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80',
//     review: 'The Chikankari kurti collection is to die for! Each piece is so delicately crafted. Free shipping was a bonus and delivery was super fast.',
//     rating: 5,
//     product: 'Lucknowi Chikankari Kurti',
//   },
// ];

// const collections = [
//   {
//     title: 'Silk Sarees',
//     subtitle: 'From ₹3,499',
//     image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
//     path: '/shop?category=Sarees',
//     badge: 'Timeless Heritage',
//   },
//   {
//     title: 'Bridal Lehengas',
//     subtitle: 'From ₹9,999',
//     image: '/public/collection-lehenga.jpg',
//     fallback: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=80',
//     path: '/shop?category=Lehengas',
//     badge: 'Wedding Season',
//   },
//   {
//     title: 'Designer Kurtis',
//     subtitle: 'From ₹1,299',
//     image: '/public/collection-kurti.jpg',
//     fallback: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
//     path: '/shop?category=Kurtis',
//     badge: 'Everyday Elegance',
//   },
// ];

// const promobanners = [
//   {
//     title: 'Wedding Season Collection',
//     subtitle: 'Celebrate Love in Luxury',
//     description: 'Exquisite bridal wear crafted for your most precious moments.',
//     cta: 'Shop Bridal',
//     path: '/collections',
//     bg: 'from-[#7A4E48] to-[#5A3A36]',
//     image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=600&q=80',
//   },
//   {
//     title: 'Festive Season Sale',
//     subtitle: 'Up to 40% Off',
//     description: 'Shop our premium festive collection and celebrate in style.',
//     cta: 'Shop Now',
//     path: '/shop',
//     bg: 'from-[#C9A86A] to-[#B08850]',
//     image: 'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=600&q=80',
//   },
// ];

// const features = [
//   {
//     icon: FiTruck,
//     title: 'Free Shipping Across India',
//     description: 'Complimentary delivery on all orders above ₹999. Fast & secure shipping to your doorstep.',
//   },
//   {
//     icon: FiAward,
//     title: 'Premium Fabric Quality',
//     description: 'Every piece is crafted from the finest fabrics sourced directly from India\'s best weavers.',
//   },
//   {
//     icon: FiRefreshCw,
//     title: 'Easy 7-Day Returns',
//     description: 'Not satisfied? Return within 7 days for a full refund or exchange. No questions asked.',
//   },
// ];

// export default function Home() {
//   const [trendingProducts, setTrendingProducts] = useState<AdaptedProduct[]>([]);
//   const [newArrivals, setNewArrivals] = useState<AdaptedProduct[]>([]);
//   const [featuredSarees, setFeaturedSarees] = useState<AdaptedProduct[]>([]);
//   const [loadingTrending, setLoadingTrending] = useState(true);
//   const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
//   const [loadingFeaturedSarees, setLoadingFeaturedSarees] = useState(true);

//   useEffect(() => {
//     // Fetch trending products
//     productsApi.getFeatured(8)
//       .then((products) => {
//         setTrendingProducts(products);
//         setLoadingTrending(false);
//       })
//       .catch(() => setLoadingTrending(false));

//     // Fetch new arrivals
//     productsApi.getNewArrivals(4)
//       .then((products) => {
//         setNewArrivals(products);
//         setLoadingNewArrivals(false);
//       })
//       .catch(() => setLoadingNewArrivals(false));

//     // Fetch featured sarees (filter by category)
//     // productsApi.getByCategory('Sarees', 4)
//     //   .then((products) => {
//     //     setFeaturedSarees(products);
//     //     setLoadingFeaturedSarees(false);
//     //   })
//     //   .catch(() => setLoadingFeaturedSarees(false));
//   }, []);

//   return (
//     <div className="pt-[72px]">
//       {/* Hero Section */}
//       <section className="relative min-h-screen bg-[#F8F5F0] flex items-center overflow-hidden">
//         {/* Background decoration */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-[#EFE7DC] opacity-60" />
//           <div className="absolute -left-20 bottom-20 w-64 h-64 rounded-full bg-[#E8DCCB] opacity-40" />
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-0">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-72px)]">
//             {/* Left: Text */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: 'easeOut' }}
//               className="order-2 lg:order-1"
//             >
//               <motion.span
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="inline-flex items-center gap-2 bg-[#EFE7DC] text-[#7A4E48] text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 border border-[#E8DCCB]"
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse" />
//                 Elegant Ethnic Wear Collection
//               </motion.span>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.7 }}
//                 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1F1F1F] leading-tight mb-6"
//               >
//                 Graceful Fashion for{' '}
//                 <span className="text-[#7A4E48] italic">Modern</span>{' '}
//                 Indian Women
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.45, duration: 0.6 }}
//                 className="font-body text-base md:text-lg text-[#666] leading-relaxed mb-8 max-w-md"
//               >
//                 Premium handcrafted ethnic wear designed with timeless elegance and comfort. From Banarasi silks to Chikankari kurtis — every piece tells a story.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.55, duration: 0.6 }}
//                 className="flex flex-wrap gap-4 mb-10"
//               >
//                 <Link
//                   to="/shop"
//                   className="group flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#7A4E48]/30 hover:-translate-y-0.5"
//                 >
//                   Shop Collection
//                   <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//                 <Link
//                   to="/collections"
//                   className="flex items-center gap-2 border border-[#7A4E48] text-[#7A4E48] font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#7A4E48] hover:text-white transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
//                 >
//                   View Collections
//                 </Link>
//               </motion.div>

//               {/* Stats */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.65, duration: 0.6 }}
//                 className="flex gap-8"
//               >
//                 {[
//                   { num: '50000+', label: 'Happy Customers' },
//                   { num: '200+', label: 'Unique Designs' },
//                   { num: '4.9★', label: 'Average Rating' },
//                 ].map((stat) => (
//                   <div key={stat.label}>
//                     <div className="font-heading text-2xl font-bold text-[#7A4E48]">{stat.num}</div>
//                     <div className="font-body text-xs text-[#999]">{stat.label}</div>
//                   </div>
//                 ))}
//               </motion.div>
//             </motion.div>

//             {/* Right: Image */}
//             <motion.div
//               initial={{ opacity: 0, x: 50, scale: 0.95 }}
//               animate={{ opacity: 1, x: 0, scale: 1 }}
//               transition={{ duration: 0.9, ease: 'easeOut' }}
//               className="order-1 lg:order-2 relative"
//             >
//               <div className="relative">
//                 {/* Decorative background */}
//                 <div className="absolute -right-6 -top-6 w-full h-full rounded-[2rem] bg-[#EFE7DC]" />
//                 <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-2xl bg-[#C9A86A]/20" />

//                 <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl">
//                   <img
//                     src="/public/hero-saree.jpg"
//                     alt="Indian Ethnic Fashion"
//                     className="w-full h-full object-cover"
//                     onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=85'; }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/30 via-transparent to-transparent" />
//                 </div>

//                 {/* Floating badge */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.5, x: -30 }}
//                   animate={{ opacity: 1, scale: 1, x: 0 }}
//                   transition={{ delay: 0.8, duration: 0.5 }}
//                   className="absolute -left-6 bottom-12 bg-white rounded-2xl p-4 shadow-xl border border-[#F0EBE3]"
//                 >
//                   <p className="font-body text-xs text-[#999] mb-1">Today's Pick</p>
//                   <p className="font-heading text-sm font-semibold text-[#1F1F1F]">Kanjivaram Silk</p>
//                   <p className="font-heading text-base font-bold text-[#7A4E48]">₹14,999</p>
//                 </motion.div>

//                 {/* Floating tag */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1, duration: 0.5 }}
//                   className="absolute -right-4 top-12 bg-[#7A4E48] text-white rounded-xl px-4 py-2 shadow-lg"
//                 >
//                   <p className="font-body text-xs font-medium">✨ New Arrivals</p>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//         >
//           <span className="font-body text-xs text-[#999] uppercase tracking-widest">Scroll</span>
//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ repeat: Infinity, duration: 1.5 }}
//             className="w-0.5 h-8 bg-gradient-to-b from-[#C9A86A] to-transparent"
//           />
//         </motion.div>
//       </section>

//       {/* Marquee Strip */}
//       <div className="bg-[#7A4E48] py-3 overflow-hidden">
//         <div className="flex gap-0 whitespace-nowrap">
//           <div
//             className="flex gap-8 animate-marquee font-body text-xs text-white/80 font-medium uppercase tracking-[0.15em]"
//           >
//             {Array(3).fill([
//               '✦ Free Shipping Above ₹999',
//               '✦ Handcrafted by Indian Artisans',
//               '✦ Premium Silk Fabrics',
//               '✦ 7-Day Easy Returns',
//               '✦ Authentic Ethnic Wear',
//               '✦ New Arrivals Every Week',
//             ]).flat().map((text, i) => (
//               <span key={i} className="flex-shrink-0">{text}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="bg-[#EFE7DC] py-14">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, i) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.15, duration: 0.5 }}
//                 className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="w-12 h-12 rounded-xl bg-[#EFE7DC] flex items-center justify-center flex-shrink-0">
//                   <feature.icon className="w-5 h-5 text-[#7A4E48]" />
//                 </div>
//                 <div>
//                   <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-1">
//                     {feature.title}
//                   </h3>
//                   <p className="font-body text-sm text-[#777] leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Collections Grid */}
//       <section className="py-20 bg-[#F8F5F0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionHeader
//             badge="Curated for You"
//             title="Our Signature Collections"
//             subtitle="Explore handpicked categories that celebrate the timeless beauty of Indian craftsmanship."
//           />
//           <div className="grid md:grid-cols-3 gap-6">
//             {collections.map((col, i) => (
//               <motion.div
//                 key={col.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.12, duration: 0.5 }}
//               >
//                 <Link to={col.path} className="group cursor-pointer block">
//                   <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-md hover:shadow-xl transition-shadow duration-500">
//                     <img
//                       src={col.image}
//                       alt={col.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                       onError={(e) => { if ((col as any).fallback) (e.target as HTMLImageElement).src = (col as any).fallback; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/70 via-[#1F1F1F]/20 to-transparent" />
//                     <div className="absolute inset-0 flex flex-col justify-end p-6">
//                       <span className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-wider mb-2">
//                         {col.badge}
//                       </span>
//                       <h3 className="font-heading text-2xl font-semibold text-white mb-1">
//                         {col.title}
//                       </h3>
//                       <p className="font-body text-sm text-white/80 mb-4">{col.subtitle}</p>
//                       <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
//                         <span className="font-body text-sm font-medium">Explore</span>
//                         <FiArrowRight className="w-4 h-4" />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Trending Sarees */}
//       <section className="py-20 bg-[#EFE7DC]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-end justify-between mb-12">
//             <SectionHeader
//               badge="Most Loved"
//               title="Trending Sarees"
//               subtitle="Our most coveted silk & handloom sarees this season."
//               centered={false}
//             />
//             <Link
//               to="/shop?category=Sarees"
//               className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
//             >
//               View All <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//             {loadingFeaturedSarees
//               ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
//               : featuredSarees.map((product, i) => (
//                   <ProductCard key={product.id} product={product as any} index={i} />
//                 ))
//             }
//           </div>
//           <div className="text-center mt-8 md:hidden">
//             <Link
//               to="/shop?category=Sarees"
//               className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer"
//             >
//               View All Sarees <FiChevronRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Promo Banners */}
//       <section className="py-20 bg-[#F8F5F0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-6">
//             {promobanners.map((banner, i) => (
//               <motion.div
//                 key={banner.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.15, duration: 0.5 }}
//               >
//                 <Link to={banner.path} className="group cursor-pointer block">
//                   <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.bg} h-64 md:h-72`}>
//                     <img
//                       src={banner.image}
//                       alt={banner.title}
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 p-8 flex flex-col justify-end">
//                       <span className="font-body text-xs text-white/70 uppercase tracking-widest mb-2">
//                         {banner.subtitle}
//                       </span>
//                       <h3 className="font-heading text-3xl font-semibold text-white mb-2">
//                         {banner.title}
//                       </h3>
//                       <p className="font-body text-sm text-white/80 mb-5">{banner.description}</p>
//                       <div className="inline-flex items-center gap-2 bg-white text-[#7A4E48] font-body text-sm font-semibold px-6 py-2.5 rounded-full w-fit group-hover:bg-[#F8F5F0] transition-colors cursor-pointer">
//                         {banner.cta} <FiArrowRight className="w-3.5 h-3.5" />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Trending Products */}
//       <section className="py-20 bg-[#EFE7DC]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-end justify-between mb-12">
//             <SectionHeader
//               badge="This Season"
//               title="Trending Now"
//               subtitle="The styles our customers can't stop talking about."
//               centered={false}
//             />
//             <Link
//               to="/shop"
//               className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
//             >
//               View All <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//           {loadingTrending ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
//             </div>
//           ) : (
//             <Swiper
//               modules={[Pagination, Autoplay, Navigation]}
//               spaceBetween={20}
//               slidesPerView={2}
//               breakpoints={{
//                 640: { slidesPerView: 2 },
//                 768: { slidesPerView: 3 },
//                 1024: { slidesPerView: 4 },
//               }}
//               autoplay={{ delay: 3500, disableOnInteraction: false }}
//               pagination={{ clickable: true }}
//               navigation
//               className="pb-12"
//             >
//               {trendingProducts.map((product, i) => (
//                 <SwiperSlide key={product.id}>
//                   <ProductCard product={product as any} index={i} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           )}
//         </div>
//       </section>

//       {/* New Arrivals Highlight */}
//       {newArrivals.length > 0 && (
//         <section className="py-20 bg-[#F8F5F0]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <SectionHeader
//               badge="Just Landed"
//               title="New Arrivals"
//               subtitle="Fresh styles added to our curated collection this week."
//             />
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {loadingNewArrivals
//                 ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
//                 : newArrivals.map((product, i) => (
//                     <ProductCard key={product.id} product={product as any} index={i} />
//                   ))
//               }
//             </div>
//             <div className="text-center mt-10">
//               <Link
//                 to="/new-arrivals"
//                 className="inline-flex items-center gap-2 border border-[#7A4E48] text-[#7A4E48] font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#7A4E48] hover:text-white transition-all duration-300 cursor-pointer"
//               >
//                 View All New Arrivals <FiArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Festive Banner */}
//       <section className="py-24 bg-[#7A4E48] relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A86A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//           }} />
//         </div>
//         <div className="relative max-w-4xl mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="font-body text-[#C9A86A] text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
//               ✨ Festive Season 2025 ✨
//             </span>
//             <h2 className="font-heading text-4xl md:text-6xl text-white font-semibold mb-6 leading-tight">
//               Dress to Impress This<br />
//               <span className="text-[#C9A86A] italic">Festive Season</span>
//             </h2>
//             <p className="font-body text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
//               From Diwali celebrations to wedding festivities — discover our exclusive festive collection crafted to make you shine.
//             </p>
//             <Link
//               to="/collections"
//               className="inline-flex items-center gap-2 bg-[#C9A86A] text-white font-body font-semibold text-sm px-10 py-4 rounded-full hover:bg-[#B08850] transition-colors cursor-pointer hover:shadow-lg hover:shadow-[#C9A86A]/30 hover:-translate-y-0.5 transition-transform"
//             >
//               Explore Festive Collection <FiArrowRight className="w-4 h-4" />
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-[#F8F5F0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionHeader
//             badge="Customer Stories"
//             title="What Our Customers Say"
//             subtitle="Thousands of happy customers trust Vastrika for their ethnic fashion needs."
//           />
//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={1}
//             breakpoints={{
//               640: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             autoplay={{ delay: 4000, disableOnInteraction: false }}
//             pagination={{ clickable: true }}
//             className="pb-12"
//           >
//             {testimonials.map((t, i) => (
//               <SwiperSlide key={i}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1, duration: 0.5 }}
//                   className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#F0EBE3] h-full"
//                 >
//                   <div className="flex items-center gap-1 mb-4">
//                     {Array.from({ length: t.rating }).map((_, j) => (
//                       <span key={j} className="text-[#C9A86A] text-sm">★</span>
//                     ))}
//                   </div>
//                   <p className="font-body text-sm text-[#555] leading-relaxed mb-5 italic">
//                     "{t.review}"
//                   </p>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={t.avatar}
//                       alt={t.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${t.name}&background=EFE7DC&color=7A4E48`;
//                       }}
//                     />
//                     <div>
//                       <p className="font-heading text-sm font-semibold text-[#1F1F1F]">{t.name}</p>
//                       <p className="font-body text-xs text-[#999]">{t.location} • {t.product}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {/* Instagram Grid */}
//       <section className="py-20 bg-[#EFE7DC]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionHeader
//             badge="@vastrika.official"
//             title="Follow Our Story"
//             subtitle="Tag us with #VastrikaStyle and get featured on our page."
//           />
//           <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
//             {[
//               'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
//               'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&q=80',
//               'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300&q=80',
//               'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=300&q=80',
//               'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=300&q=80',
//               'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
//             ].map((img, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.08, duration: 0.4 }}
//                 className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
//               >
//                 <img
//                   src={img}
//                   alt={`Instagram ${i + 1}`}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-[#7A4E48]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <FiArrowRight className="w-5 h-5 text-white" />
//                 </div>
//               </motion.div>
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
import { FiArrowRight, FiTruck, FiRefreshCw, FiAward, FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import ProductSkeleton from '../components/ProductSkeleton';
import { productsApi, AdaptedProduct } from '../api/products';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
    review: 'Absolutely in love with my Banarasi saree from Vastrika! The quality is exceptional and it arrived so beautifully packaged. Will definitely shop again.',
    rating: 5,
    product: 'Banarasi Silk Saree',
  },
  {
    name: 'Ananya Krishnan',
    location: 'Bangalore',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&q=80',
    review: 'The Kanjivaram silk saree is stunning! Exactly as pictured and the fabric quality is premium. Vastrika truly delivers luxury at its finest.',
    rating: 5,
    product: 'Kanjivaram Silk Saree',
  },
  {
    name: 'Meera Patel',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    review: 'Ordered the bridal lehenga for my cousin\'s wedding and I received so many compliments! The embroidery is so intricate and the fabric is divine. Thank you Vastrika!',
    rating: 5,
    product: 'Bridal Lehenga Choli',
  },
  {
    name: 'Kavitha Nair',
    location: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80',
    review: 'The Chikankari kurti collection is to die for! Each piece is so delicately crafted. Free shipping was a bonus and delivery was super fast.',
    rating: 5,
    product: 'Lucknowi Chikankari Kurti',
  },
];

const collections = [
  {
    title: 'Silk Sarees',
    subtitle: 'From ₹3,499',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    path: '/shop?category=Sarees',
    badge: 'Timeless Heritage',
  },
  {
    title: 'Bridal Lehengas',
    subtitle: 'From ₹9,999',
    image: '/images/collection-lehenga.jpg',
    fallback: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=80',
    path: '/shop?category=Lehengas',
    badge: 'Wedding Season',
  },
  {
    title: 'Designer Kurtis',
    subtitle: 'From ₹1,299',
    image: '/images/collection-kurti.jpg',
    fallback: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
    path: '/shop?category=Kurtis',
    badge: 'Everyday Elegance',
  },
];

const promobanners = [
  {
    title: 'Wedding Season Collection',
    subtitle: 'Celebrate Love in Luxury',
    description: 'Exquisite bridal wear crafted for your most precious moments.',
    cta: 'Shop Bridal',
    path: '/collections',
    bg: 'from-[#7A4E48] to-[#5A3A36]',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=600&q=80',
  },
  {
    title: 'Festive Season Sale',
    subtitle: 'Up to 40% Off',
    description: 'Shop our premium festive collection and celebrate in style.',
    cta: 'Shop Now',
    path: '/shop',
    bg: 'from-[#C9A86A] to-[#B08850]',
    image: 'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=600&q=80',
  },
];

const features = [
  {
    icon: FiTruck,
    title: 'Free Shipping Across India',
    description: 'Complimentary delivery on all orders above ₹999. Fast & secure shipping to your doorstep.',
  },
  {
    icon: FiAward,
    title: 'Premium Fabric Quality',
    description: 'Every piece is crafted from the finest fabrics sourced directly from India\'s best weavers.',
  },
  {
    icon: FiRefreshCw,
    title: 'Easy 7-Day Returns',
    description: 'Not satisfied? Return within 7 days for a full refund or exchange. No questions asked.',
  },
];

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<AdaptedProduct[]>([]);
  const [newArrivals, setNewArrivals] = useState<AdaptedProduct[]>([]);
  const [featuredSarees, setFeaturedSarees] = useState<AdaptedProduct[]>([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [loadingFeaturedSarees, setLoadingFeaturedSarees] = useState(true);

  useEffect(() => {
    // Fetch trending products
    productsApi.getFeatured(8)
      .then((products) => {
        setTrendingProducts(products);
        setLoadingTrending(false);
      })
      .catch(() => setLoadingTrending(false));

    // Fetch new arrivals
    productsApi.getNewArrivals(4)
      .then((products) => {
        setNewArrivals(products);
        setLoadingNewArrivals(false);
      })
      .catch(() => setLoadingNewArrivals(false));

    // Fetch featured sarees (filter by category)
    // Defensive: productsApi.getByCategory may be missing on stale builds —
    // fall back to a plain category-filtered list() call so this section
    // never crashes the whole Home page.
    const fetchFeaturedSarees = productsApi.getByCategory
      ? productsApi.getByCategory('Sarees', 4)
      : productsApi.list({ category: 'sarees', page: 1, page_size: 4 }).then((r) => r.products);

    fetchFeaturedSarees
      .then((products) => {
        setFeaturedSarees(products);
        setLoadingFeaturedSarees(false);
      })
      .catch(() => setLoadingFeaturedSarees(false));
  }, []);

  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#F8F5F0] flex items-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-[#EFE7DC] opacity-60" />
          <div className="absolute -left-20 bottom-20 w-64 h-64 rounded-full bg-[#E8DCCB] opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-72px)]">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="order-2 lg:order-1"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-[#EFE7DC] text-[#7A4E48] text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 border border-[#E8DCCB]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse" />
                Elegant Ethnic Wear Collection
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1F1F1F] leading-tight mb-6"
              >
                Graceful Fashion for{' '}
                <span className="text-[#7A4E48] italic">Modern</span>{' '}
                Indian Women
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="font-body text-base md:text-lg text-[#666] leading-relaxed mb-8 max-w-md"
              >
                Premium handcrafted ethnic wear designed with timeless elegance and comfort. From Banarasi silks to Chikankari kurtis — every piece tells a story.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link
                  to="/shop"
                  className="group flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#7A4E48]/30 hover:-translate-y-0.5"
                >
                  Shop Collection
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/collections"
                  className="flex items-center gap-2 border border-[#7A4E48] text-[#7A4E48] font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#7A4E48] hover:text-white transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  View Collections
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex gap-8"
              >
                {[
                  { num: '5000+', label: 'Happy Customers' },
                  { num: '200+', label: 'Unique Designs' },
                  { num: '4.9★', label: 'Average Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading text-2xl font-bold text-[#7A4E48]">{stat.num}</div>
                    <div className="font-body text-xs text-[#999]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -right-6 -top-6 w-full h-full rounded-[2rem] bg-[#EFE7DC]" />
                <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-2xl bg-[#C9A86A]/20" />

                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl">
                  <img
                    src="/images/hero-saree.jpg"
                    alt="Indian Ethnic Fashion"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=85'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/30 via-transparent to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: -30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -left-6 bottom-12 bg-white rounded-2xl p-4 shadow-xl border border-[#F0EBE3]"
                >
                  <p className="font-body text-xs text-[#999] mb-1">Today's Pick</p>
                  <p className="font-heading text-sm font-semibold text-[#1F1F1F]">Kanjivaram Silk</p>
                  <p className="font-heading text-base font-bold text-[#7A4E48]">₹14,999</p>
                </motion.div>

                {/* Floating tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-4 top-12 bg-[#7A4E48] text-white rounded-xl px-4 py-2 shadow-lg"
                >
                  <p className="font-body text-xs font-medium">✨ New Arrivals</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-xs text-[#999] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-gradient-to-b from-[#C9A86A] to-transparent"
          />
        </motion.div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-[#7A4E48] py-3 overflow-hidden">
        <div className="flex gap-0 whitespace-nowrap">
          <div
            className="flex gap-8 animate-marquee font-body text-xs text-white/80 font-medium uppercase tracking-[0.15em]"
          >
            {Array(3).fill([
              '✦ Free Shipping Above ₹999',
              '✦ Handcrafted by Indian Artisans',
              '✦ Premium Silk Fabrics',
              '✦ 7-Day Easy Returns',
              '✦ Authentic Ethnic Wear',
              '✦ New Arrivals Every Week',
            ]).flat().map((text, i) => (
              <span key={i} className="flex-shrink-0">{text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-[#EFE7DC] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EFE7DC] flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-[#7A4E48]" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-[#777] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Curated for You"
            title="Our Signature Collections"
            subtitle="Explore handpicked categories that celebrate the timeless beauty of Indian craftsmanship."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <Link to={col.path} className="group cursor-pointer block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-md hover:shadow-xl transition-shadow duration-500">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { if ((col as any).fallback) (e.target as HTMLImageElement).src = (col as any).fallback; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/70 via-[#1F1F1F]/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-wider mb-2">
                        {col.badge}
                      </span>
                      <h3 className="font-heading text-2xl font-semibold text-white mb-1">
                        {col.title}
                      </h3>
                      <p className="font-body text-sm text-white/80 mb-4">{col.subtitle}</p>
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                        <span className="font-body text-sm font-medium">Explore</span>
                        <FiArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Sarees */}
      <section className="py-20 bg-[#EFE7DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              badge="Most Loved"
              title="Trending Sarees"
              subtitle="Our most coveted silk & handloom sarees this season."
              centered={false}
            />
            <Link
              to="/shop?category=Sarees"
              className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
            >
              View All <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loadingFeaturedSarees
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : featuredSarees.map((product, i) => (
                  <ProductCard key={product.id} product={product as any} index={i} />
                ))
            }
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link
              to="/shop?category=Sarees"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer"
            >
              View All Sarees <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {promobanners.map((banner, i) => (
              <motion.div
                key={banner.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Link to={banner.path} className="group cursor-pointer block">
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.bg} h-64 md:h-72`}>
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className="font-body text-xs text-white/70 uppercase tracking-widest mb-2">
                        {banner.subtitle}
                      </span>
                      <h3 className="font-heading text-3xl font-semibold text-white mb-2">
                        {banner.title}
                      </h3>
                      <p className="font-body text-sm text-white/80 mb-5">{banner.description}</p>
                      <div className="inline-flex items-center gap-2 bg-white text-[#7A4E48] font-body text-sm font-semibold px-6 py-2.5 rounded-full w-fit group-hover:bg-[#F8F5F0] transition-colors cursor-pointer">
                        {banner.cta} <FiArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-[#EFE7DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              badge="This Season"
              title="Trending Now"
              subtitle="The styles our customers can't stop talking about."
              centered={false}
            />
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-[#7A4E48] hover:text-[#C9A86A] transition-colors cursor-pointer group"
            >
              View All <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loadingTrending ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : (
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="pb-12"
            >
              {trendingProducts.map((product, i) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product as any} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* New Arrivals Highlight */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-[#F8F5F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Just Landed"
              title="New Arrivals"
              subtitle="Fresh styles added to our curated collection this week."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {loadingNewArrivals
                ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
                : newArrivals.map((product, i) => (
                    <ProductCard key={product.id} product={product as any} index={i} />
                  ))
              }
            </div>
            <div className="text-center mt-10">
              <Link
                to="/new-arrivals"
                className="inline-flex items-center gap-2 border border-[#7A4E48] text-[#7A4E48] font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#7A4E48] hover:text-white transition-all duration-300 cursor-pointer"
              >
                View All New Arrivals <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Festive Banner */}
      <section className="py-24 bg-[#7A4E48] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A86A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-[#C9A86A] text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              ✨ Festive Season 2025 ✨
            </span>
            <h2 className="font-heading text-4xl md:text-6xl text-white font-semibold mb-6 leading-tight">
              Dress to Impress This<br />
              <span className="text-[#C9A86A] italic">Festive Season</span>
            </h2>
            <p className="font-body text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              From Diwali celebrations to wedding festivities — discover our exclusive festive collection crafted to make you shine.
            </p>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-[#C9A86A] text-white font-body font-semibold text-sm px-10 py-4 rounded-full hover:bg-[#B08850] transition-colors cursor-pointer hover:shadow-lg hover:shadow-[#C9A86A]/30 hover:-translate-y-0.5 transition-transform"
            >
              Explore Festive Collection <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Customer Stories"
            title="What Our Customers Say"
            subtitle="Thousands of happy customers trust Vastrika for their ethnic fashion needs."
          />
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#F0EBE3] h-full"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-[#C9A86A] text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-body text-sm text-[#555] leading-relaxed mb-5 italic">
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${t.name}&background=EFE7DC&color=7A4E48`;
                      }}
                    />
                    <div>
                      <p className="font-heading text-sm font-semibold text-[#1F1F1F]">{t.name}</p>
                      <p className="font-body text-xs text-[#999]">{t.location} • {t.product}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Instagram Grid */}
      <section className="py-20 bg-[#EFE7DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="@vastrika.official"
            title="Follow Our Story"
            subtitle="Tag us with #VastrikaStyle and get featured on our page."
          />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
              'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&q=80',
              'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300&q=80',
              'https://images.unsplash.com/photo-1614886137799-0a4d9e0e0c23?w=300&q=80',
              'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=300&q=80',
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Instagram ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#7A4E48]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FiArrowRight className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
