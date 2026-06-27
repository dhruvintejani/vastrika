// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// export default function Contact() {
//   const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.message) {
//       toast.error('Please fill in all required fields');
//       return;
//     }
//     setSubmitting(true);
//     await new Promise(r => setTimeout(r, 1500));
//     setSubmitting(false);
//     toast.success('Message sent! We\'ll get back to you within 24 hours.', {
//       style: {
//         fontFamily: 'Outfit, sans-serif',
//         background: '#F8F5F0',
//         color: '#1F1F1F',
//         border: '1px solid #C9A86A',
//       },
//       iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
//     });
//     setForm({ name: '', email: '', subject: '', message: '' });
//   };

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
//       {/* Hero */}
//       <div className="bg-[#EFE7DC] py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="inline-flex items-center gap-2 mb-4">
//               <span className="h-px w-8 bg-[#C9A86A]" />
//               <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Get in Touch</span>
//               <span className="h-px w-8 bg-[#C9A86A]" />
//             </span>
//             <h1 className="font-heading text-5xl font-semibold text-[#1F1F1F] mb-4">Contact Us</h1>
//             <p className="font-body text-base text-[#666] max-w-lg mx-auto">
//               We'd love to hear from you. Whether you have a question about your order or just want to say hello!
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Contact Info */}
//           <div className="space-y-6">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Let's Talk</h2>

//               {[
//                 {
//                   icon: FiMail,
//                   title: 'Email Us',
//                   details: ['hello@vastrika.in', 'support@vastrika.in'],
//                   sub: 'We reply within 24 hours',
//                 },
//                 {
//                   icon: FiPhone,
//                   title: 'Call Us',
//                   details: ['+91 98765 43210', '+91 87654 32109'],
//                   sub: 'Mon–Sat, 10am–7pm IST',
//                 },
//                 {
//                   icon: FiMapPin,
//                   title: 'Visit Us',
//                   details: ['Vastrika Studio', 'Bandra West, Mumbai, Maharashtra 400050'],
//                   sub: 'By appointment only',
//                 },
//               ].map(({ icon: Icon, title, details, sub }) => (
//                 <div key={title} className="flex gap-4 p-5 bg-white rounded-2xl border border-[#F0EBE3] shadow-sm hover:shadow-md transition-shadow duration-300">
//                   <div className="w-10 h-10 rounded-xl bg-[#EFE7DC] flex items-center justify-center flex-shrink-0">
//                     <Icon className="w-4 h-4 text-[#7A4E48]" />
//                   </div>
//                   <div>
//                     <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mb-1">{title}</h3>
//                     {details.map((d, i) => (
//                       <p key={i} className="font-body text-sm text-[#555]">{d}</p>
//                     ))}
//                     <p className="font-body text-xs text-[#999] mt-1">{sub}</p>
//                   </div>
//                 </div>
//               ))}

//               {/* Social */}
//               <div className="p-5 bg-white rounded-2xl border border-[#F0EBE3] shadow-sm">
//                 <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mb-3">Follow Us</h3>
//                 <div className="flex gap-3">
//                   {[
//                     { icon: FiInstagram, label: 'Instagram', color: 'hover:bg-pink-50 hover:text-pink-500' },
//                     { icon: FiFacebook, label: 'Facebook', color: 'hover:bg-blue-50 hover:text-blue-500' },
//                     { icon: FiTwitter, label: 'Twitter', color: 'hover:bg-sky-50 hover:text-sky-500' },
//                   ].map(({ icon: Icon, label, color }) => (
//                     <a
//                       key={label}
//                       href="#"
//                       className={`w-10 h-10 rounded-xl bg-[#F8F5F0] flex items-center justify-center text-[#555] transition-all cursor-pointer ${color}`}
//                       aria-label={label}
//                     >
//                       <Icon className="w-4 h-4" />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="bg-white rounded-2xl p-8 shadow-sm border border-[#F0EBE3]"
//             >
//               <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Send a Message</h2>
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       value={form.name}
//                       onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//                       placeholder="Your name"
//                       className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       value={form.email}
//                       onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
//                       placeholder="your@email.com"
//                       className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">
//                     Subject
//                   </label>
//                   <select
//                     value={form.subject}
//                     onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
//                     className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A] transition-colors cursor-pointer"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="order">Order Enquiry</option>
//                     <option value="product">Product Question</option>
//                     <option value="return">Returns & Exchange</option>
//                     <option value="custom">Custom Order</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">
//                     Message *
//                   </label>
//                   <textarea
//                     value={form.message}
//                     onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
//                     placeholder="Tell us how we can help..."
//                     rows={5}
//                     className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors resize-none"
//                   />
//                 </div>

//                 <motion.button
//                   type="submit"
//                   disabled={submitting}
//                   whileHover={{ scale: submitting ? 1 : 1.02 }}
//                   whileTap={{ scale: submitting ? 1 : 0.98 }}
//                   className="w-full py-4 bg-[#7A4E48] text-white font-body font-semibold text-sm rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {submitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     'Send Message'
//                   )}
//                 </motion.button>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Map placeholder */}
//       <div className="h-64 bg-[#EFE7DC] flex items-center justify-center border-t border-[#E8DCCB]">
//         <div className="text-center">
//           <FiMapPin className="w-8 h-8 text-[#C9A86A] mx-auto mb-2" />
//           <p className="font-heading text-lg text-[#7A4E48]">Vastrika Studio, Bandra West, Mumbai</p>
//           <p className="font-body text-sm text-[#999] mt-1">Open by appointment — call us to schedule a visit</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { apiClient } from '../api/client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiClient.post('/contact', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      toast.success(res.data.message || "We'll get back to you within 24 hours.", {
        style: {
          fontFamily: 'Outfit, sans-serif',
          background: '#F8F5F0',
          color: '#1F1F1F',
          border: '1px solid #C9A86A',
        },
        iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      {/* Hero */}
      <div className="bg-[#EFE7DC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#C9A86A]" />
              <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Get in Touch</span>
              <span className="h-px w-8 bg-[#C9A86A]" />
            </span>
            <h1 className="font-heading text-5xl font-semibold text-[#1F1F1F] mb-4">Contact Us</h1>
            <p className="font-body text-base text-[#666] max-w-lg mx-auto">
              We'd love to hear from you. Whether you have a question about your order or just want to say hello!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Let's Talk</h2>
              {[
                { icon: FiMail, title: 'Email Us', details: ['hello@vastrika.in', 'support@vastrika.in'], sub: 'We reply within 24 hours' },
                { icon: FiPhone, title: 'Call Us', details: ['+91 74349 61919', ''], sub: 'Mon–Sat, 10am–7pm IST' },
                { icon: FiMapPin, title: 'Visit Us', details: ['Vastrika Studio', 'Bandra West, Mumbai, Maharashtra 400050'], sub: 'By appointment only' },
              ].map(({ icon: Icon, title, details, sub }) => (
                <div key={title} className="flex gap-4 p-5 bg-white rounded-2xl border border-[#F0EBE3] shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE7DC] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#7A4E48]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mb-1">{title}</h3>
                    {details.map((d, i) => <p key={i} className="font-body text-sm text-[#555]">{d}</p>)}
                    <p className="font-body text-xs text-[#999] mt-1">{sub}</p>
                  </div>
                </div>
              ))}

              <div className="p-5 bg-white rounded-2xl border border-[#F0EBE3] shadow-sm">
                <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: FiInstagram, label: 'Instagram', color: 'hover:bg-pink-50 hover:text-pink-500' },
                    { icon: FiFacebook, label: 'Facebook', color: 'hover:bg-blue-50 hover:text-blue-500' },
                    { icon: FiTwitter, label: 'Twitter', color: 'hover:bg-sky-50 hover:text-sky-500' },
                  ].map(({ icon: Icon, label, color }) => (
                    <a key={label} href="#" className={`w-10 h-10 rounded-xl bg-[#F8F5F0] flex items-center justify-center text-[#555] transition-all cursor-pointer ${color}`} aria-label={label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#F0EBE3]"
            >
              <h2 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">Full Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">Email Address *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">Subject</label>
                  <select value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C9A86A] transition-colors cursor-pointer">
                    <option value="">Select a subject</option>
                    <option value="order">Order Enquiry</option>
                    <option value="product">Product Question</option>
                    <option value="return">Returns & Exchange</option>
                    <option value="custom">Custom Order</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-[#555] uppercase tracking-wider mb-1.5 block">Message *</label>
                  <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help..." rows={5} className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#E8DCCB] rounded-xl font-body text-sm text-[#1F1F1F] placeholder-[#BBB] focus:outline-none focus:border-[#C9A86A] transition-colors resize-none" />
                </div>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="w-full py-4 bg-[#7A4E48] text-white font-body font-semibold text-sm rounded-xl hover:bg-[#5A3A36] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-64 bg-[#EFE7DC] flex items-center justify-center border-t border-[#E8DCCB]">
        <div className="text-center">
          <FiMapPin className="w-8 h-8 text-[#C9A86A] mx-auto mb-2" />
          <p className="font-heading text-lg text-[#7A4E48]">Vastrika Studio, Bandra West, Mumbai</p>
          <p className="font-body text-sm text-[#999] mt-1">Open by appointment — call us to schedule a visit</p>
        </div>
      </div>
    </div>
  );
}