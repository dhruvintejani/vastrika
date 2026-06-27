import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, place an order, contact us, or subscribe to our newsletter. This includes your name, email address, phone number, shipping address, and payment information. We also automatically collect certain information about your device and browsing behavior when you visit our website.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to: process and fulfill your orders; communicate with you about your orders, account, and promotions; improve our website and services; personalise your shopping experience; send you marketing communications (with your consent); and comply with legal obligations.`,
  },
  {
    title: '3. Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business (such as payment processors and shipping companies), subject to confidentiality agreements.`,
  },
  {
    title: '4. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: '5. Cookies',
    content: `We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings, though disabling cookies may affect some features of our website.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to access, update, or delete your personal information. You may opt out of marketing emails at any time by clicking the unsubscribe link. To exercise any of these rights, please contact us at privacy@vastrika.in.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date. We encourage you to review this policy periodically.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="bg-[#EFE7DC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl font-semibold text-[#1F1F1F]">Privacy Policy</h1>
            <p className="font-body text-sm text-[#777] mt-3">Last updated: January 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#F0EBE3]">
          <p className="font-body text-base text-[#555] leading-relaxed mb-10 pb-8 border-b border-[#E8DCCB]">
            At Vastrika, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information when you use our website and services. By using Vastrika, you agree to the collection and use of information in accordance with this policy.
          </p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-3">{section.title}</h2>
                <p className="font-body text-sm text-[#666] leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[#E8DCCB]">
            <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-3">9. Contact Us</h2>
            <p className="font-body text-sm text-[#666] leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-[#F8F5F0] rounded-xl font-body text-sm text-[#555] space-y-1">
              <p><strong>Vastrika</strong></p>
              <p>Bandra West, Mumbai, Maharashtra 400050</p>
              <p>Email: <span className="text-[#7A4E48]">privacy@vastrika.in</span></p>
              <p>Phone: +91 74349 61919</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
