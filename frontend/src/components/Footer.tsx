import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { FaPinterestP, FaYoutube } from 'react-icons/fa';
// import { useState } from 'react';
// import toast from 'react-hot-toast';

const shopLinks = [
  { label: 'Sarees', path: '/shop?category=Sarees' },
  { label: 'Kurtis', path: '/shop?category=Kurtis' },
  { label: 'Lehengas', path: '/shop?category=Lehengas' },
  { label: 'Dupattas', path: '/shop?category=Dupattas' },
  { label: 'Anarkalis', path: '/shop?category=Anarkalis' },
  { label: 'Ethnic Gowns', path: '/shop?category=Ethnic Gowns' },
];

const companyLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Collections', path: '/collections' },
  { label: 'New Arrivals', path: '/new-arrivals' },
  { label: 'Contact', path: '/contact' },
];

const supportLinks = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Shipping Policy', path: '/faq' },
];

const socialLinks = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FaPinterestP, href: '#', label: 'Pinterest' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  // const [email, setEmail] = useState('');

  // const handleSubscribe = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email) return;
  //   toast.success('Thank you for subscribing!', {
  //     style: {
  //       fontFamily: 'Outfit, sans-serif',
  //       background: '#F8F5F0',
  //       color: '#1F1F1F',
  //       border: '1px solid #C9A86A',
  //     },
  //     iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
  //   });
  //   setEmail('');
  // };

  return (
    <footer className="bg-[#1F1F1F] text-white">
      {/* Newsletter Banner */}
      {/* <div className="bg-gradient-to-r from-[#7A4E48] to-[#C9A86A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-white font-semibold">
                Join the Vastrika Circle
              </h3>
              <p className="text-white/80 font-body text-sm mt-1">
                Get exclusive access to new arrivals, festive collections & special offers.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white font-body text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-[#7A4E48] font-body font-semibold text-sm rounded-lg hover:bg-[#F8F5F0] transition-colors cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 cursor-pointer group mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#7A4E48] flex items-center justify-center">
                <span className="text-white text-xs font-bold font-heading">V</span>
              </div>
              <span className="font-heading text-2xl font-semibold text-white tracking-wide">
                Vastrika
              </span>
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Celebrating the timeless beauty of Indian ethnic fashion. Handcrafted with love, inspired by heritage, designed for the modern Indian woman.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A86A] transition-colors cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
            <div className="mt-6 space-y-1.5">
              <p className="font-body text-sm text-white/60">📍 Surat, Gujarat, India</p>
              <p className="font-body text-sm text-white/60">📞 +91 74349 61919</p>
              <p className="font-body text-sm text-white/60">✉️ hello@vastrika.in</p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-white/60 hover:text-[#C9A86A] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-white/60 hover:text-[#C9A86A] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-white/60 hover:text-[#C9A86A] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © 2026 Vastrika. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-4">
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-5 opacity-50 hover:opacity-80 transition-opacity"
            /> */}
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-5 opacity-50 hover:opacity-80 transition-opacity"
            /> */}
            <span className="font-body text-xs text-white/40 bg-white/10 px-2 py-1 rounded">UPI</span>
            <span className="font-body text-xs text-white/40 bg-white/10 px-2 py-1 rounded">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
