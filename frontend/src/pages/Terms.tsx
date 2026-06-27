import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using the Vastrika website and services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.`,
  },
  {
    title: '2. Products and Pricing',
    content: `All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to change prices at any time without notice. Product descriptions and images are provided for reference; actual products may have slight variations in colour due to screen settings and handcrafted nature.`,
  },
  {
    title: '3. Orders and Payment',
    content: `When you place an order, you are making an offer to purchase. We reserve the right to accept or decline any order. Payment must be received before goods are dispatched. We accept UPI, credit/debit cards, net banking, and cash on delivery (where available).`,
  },
  {
    title: '4. Shipping and Delivery',
    content: `We aim to dispatch all orders within 2–3 business days. Delivery times are estimates and may vary based on location and courier availability. Vastrika is not responsible for delays caused by courier partners or unforeseen circumstances.`,
  },
  {
    title: '5. Returns and Refunds',
    content: `Items may be returned within 7 days of delivery, provided they are unworn, unwashed, and in original condition with tags attached. Refunds will be processed to your original payment method within 5–7 business days of receiving the returned item. Custom-ordered items are non-refundable.`,
  },
  {
    title: '6. Intellectual Property',
    content: `All content on the Vastrika website, including images, text, logos, and designs, is the property of Vastrika and protected by intellectual property laws. You may not reproduce, distribute, or use our content without written permission.`,
  },
  {
    title: '7. User Conduct',
    content: `You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair our services. You must not attempt to gain unauthorised access to any part of our systems or engage in any fraudulent activity.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `To the fullest extent permitted by law, Vastrika shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid for the specific order in question.`,
  },
  {
    title: '9. Governing Law',
    content: `These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.`,
  },
];

export default function Terms() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="bg-[#EFE7DC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl font-semibold text-[#1F1F1F]">Terms of Service</h1>
            <p className="font-body text-sm text-[#777] mt-3">Last updated: January 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#F0EBE3]">
          <p className="font-body text-base text-[#555] leading-relaxed mb-10 pb-8 border-b border-[#E8DCCB]">
            Welcome to Vastrika. These Terms of Service govern your use of our website and the purchase of products from us. Please read these terms carefully before using our services.
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
            <h2 className="font-heading text-xl font-semibold text-[#1F1F1F] mb-3">10. Contact Information</h2>
            <p className="font-body text-sm text-[#666] mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="p-4 bg-[#F8F5F0] rounded-xl font-body text-sm text-[#555] space-y-1">
              <p><strong>Vastrika</strong></p>
              <p>Bandra West, Mumbai, Maharashtra 400050</p>
              <p>Email: <span className="text-[#7A4E48]">legal@vastrika.in</span></p>
              <p>Phone: +91 74349 61919</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
