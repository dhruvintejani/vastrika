import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const values = [
  {
    icon: '🧵',
    title: 'Artisan Craftsmanship',
    description: 'Every piece is made by skilled artisans who carry forward centuries of traditional weaving and embroidery techniques.',
  },
  {
    icon: '🌱',
    title: 'Sustainable Fashion',
    description: 'We prioritise natural fabrics, eco-friendly dyes, and ethical production practices to care for both people and planet.',
  },
  {
    icon: '💎',
    title: 'Uncompromising Quality',
    description: 'From fabric sourcing to final stitching, we maintain the highest quality standards so every purchase feels like a luxury.',
  },
  {
    icon: '🤝',
    title: 'Empowering Artisans',
    description: 'We partner directly with weaving clusters and embroidery artisans, ensuring fair wages and preserving traditional crafts.',
  },
];

const team = [
  {
    name: 'Anika Sharma',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80',
    description: 'With 15 years in luxury fashion, Anika founded Vastrika to bring India\'s finest textile heritage to modern women.',
  },
  {
    name: 'Priya Malhotra',
    role: 'Head of Curation',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=300&q=80',
    description: 'Priya travels across India\'s weaving heartlands to discover the most beautiful and authentic ethnic wear pieces.',
  },
  {
    name: 'Meera Krishnan',
    role: 'Lead Stylist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    description: 'Meera bridges traditional aesthetics with contemporary styling, making ethnic fashion accessible and aspirational.',
  },
];

const milestones = [
  { year: '2018', event: 'Vastrika founded in Surat' },
  { year: '2019', event: 'Launched our first Kanjivaram collection' },
  { year: '2020', event: 'Reached 1000+ happy customers' },
  { year: '2021', event: 'Partnered with 50+ artisan communities' },
  { year: '2022', event: 'Expanded to bridal & festive collections' },
  { year: '2023', event: '50000+ orders & nationwide shipping' },
  { year: '2025', event: 'Launching internationally to the Indian diaspora' },
];

export default function About() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      {/* Hero */}
      <section className="relative bg-[#EFE7DC] py-24 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-60">
          <img
            src="/hero-saree.jpg"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFE7DC] to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#C9A86A]" />
              <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Our Story</span>
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-[#1F1F1F] mb-6 leading-tight">
              Where Heritage Meets<br />
              <span className="text-[#7A4E48] italic">Modern Elegance</span>
            </h1>
            <p className="font-body text-base text-[#555] leading-relaxed mb-8">
              Vastrika was born from a deep love for India's incredible textile heritage and a vision to make luxury ethnic fashion accessible to every modern Indian woman. We believe that traditional craft is not just clothing — it's culture, identity, and artistry.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
            >
              Explore Our Collection <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#7A4E48] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '50000+', label: 'Happy Customers' },
              { num: '50+', label: 'Artisan Partners' },
              { num: '200+', label: 'Unique Designs' },
              { num: '15+', label: 'States of Origin' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-heading text-4xl md:text-5xl font-bold text-[#C9A86A] mb-2">{stat.num}</div>
                <div className="font-body text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-[#C9A86A]" />
              <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">What We Stand For</span>
              <span className="h-px w-8 bg-[#C9A86A]" />
            </span>
            <h2 className="font-heading text-4xl font-semibold text-[#1F1F1F]">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#F0EBE3]"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-3">{value.title}</h3>
                <p className="font-body text-sm text-[#777] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-[#EFE7DC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-[#C9A86A]" />
              <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Our Journey</span>
              <span className="h-px w-8 bg-[#C9A86A]" />
            </span>
            <h2 className="font-heading text-4xl font-semibold text-[#1F1F1F]">The Vastrika Story</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#E8DCCB]" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex gap-6 md:gap-0 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2" />
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C9A86A] border-4 border-[#EFE7DC] z-10 mt-1.5" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
                  <span className="font-heading text-lg font-bold text-[#C9A86A]">{m.year}</span>
                  <p className="font-body text-sm text-[#555] mt-1">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-[#C9A86A]" />
              <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Meet the Team</span>
              <span className="h-px w-8 bg-[#C9A86A]" />
            </span>
            <h2 className="font-heading text-4xl font-semibold text-[#1F1F1F]">The People Behind Vastrika</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 border-4 border-[#EFE7DC] group-hover:border-[#C9A86A] transition-colors duration-300 shadow-md">
                  <img
                    src={member.name}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name}&background=EFE7DC&color=7A4E48&size=200`;
                    }}
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-1">{member.name}</h3>
                <p className="font-body text-xs text-[#C9A86A] font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                <p className="font-body text-sm text-[#777] leading-relaxed max-w-xs mx-auto">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#7A4E48]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-semibold text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="font-body text-base text-white/70 mb-8 max-w-lg mx-auto">
            Discover the beauty of handcrafted Indian ethnic fashion. Every purchase supports artisan communities.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#C9A86A] text-white font-body font-semibold text-sm px-10 py-4 rounded-full hover:bg-[#B08850] transition-colors cursor-pointer"
          >
            Shop the Collection <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
