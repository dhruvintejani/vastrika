import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 is applied. We ship across all major cities and towns in India.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 5–7 business days. Express delivery (2–3 days) is available for select pin codes at an additional charge. You will receive a tracking number once your order is dispatched.',
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely! Once your order ships, you\'ll receive an SMS and email with a tracking link. You can also track your order from our website using your order ID.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we ship within India only. However, international shipping (especially for the Indian diaspora) is coming soon! Subscribe to our newsletter to be notified.',
      },
    ],
  },
  {
    category: 'Products & Quality',
    questions: [
      {
        q: 'Are your fabrics authentic?',
        a: 'Absolutely. We partner directly with certified weaving clusters across India — Kanjivaram from Tamil Nadu, Banarasi from Varanasi, Phulkari from Punjab, Chikankari from Lucknow, and more. All silk sarees come with authenticity certifications where applicable.',
      },
      {
        q: 'What is the quality of embroidery?',
        a: 'All embroidery is done by skilled artisans using traditional techniques. We inspect every piece for quality before shipping. Whether it\'s zardozi, sequin, or thread work — you can expect premium craftsmanship.',
      },
      {
        q: 'How do I care for my saree/lehenga?',
        a: 'Care instructions vary by product. Most silk sarees require dry cleaning only. Cotton and linen pieces can be hand washed cold. Detailed care instructions are included with every product and on the product detail page.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 7-day hassle-free return policy. If you\'re not satisfied with your purchase, initiate a return within 7 days of delivery. The item must be unworn, unwashed, and in its original packaging with all tags attached.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Email us at returns@vastrika.in or contact our support team with your order number. We\'ll arrange a pickup and process your refund within 5–7 business days after receiving the item.',
      },
      {
        q: 'Can I exchange for a different size or color?',
        a: 'Yes! Size and color exchanges are accepted within 7 days of delivery, subject to availability. Contact our team to check stock availability before initiating an exchange.',
      },
    ],
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major payment methods: Credit Cards, Debit Cards, UPI (PhonePe, GPay, Paytm), Net Banking, and Cash on Delivery (COD) for eligible pin codes.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, completely. We use industry-standard SSL encryption and trusted payment gateways. We never store your card details on our servers.',
      },
      {
        q: 'Can I use a coupon code?',
        a: 'Yes! Apply coupon codes at checkout to avail discounts. Subscribe to our newsletter to receive exclusive coupon codes and early access to sales.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E8DCCB] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className={`font-heading text-base font-semibold transition-colors ${open ? 'text-[#7A4E48]' : 'text-[#1F1F1F] group-hover:text-[#7A4E48]'}`}>
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-colors ${open ? 'text-[#7A4E48]' : 'text-[#999]'}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-[#666] leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="bg-[#EFE7DC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#C9A86A]" />
              <span className="font-body text-xs font-semibold text-[#C9A86A] uppercase tracking-[0.2em]">Help Center</span>
              <span className="h-px w-8 bg-[#C9A86A]" />
            </span>
            <h1 className="font-heading text-5xl font-semibold text-[#1F1F1F] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-base text-[#666] max-w-lg mx-auto">
              Find answers to the most common questions about our products, shipping, and services.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {faqs.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#F0EBE3]"
            >
              <h2 className="font-heading text-xl font-semibold text-[#7A4E48] mb-2 pb-4 border-b border-[#E8DCCB]">
                {section.category}
              </h2>
              <div>
                {section.questions.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center bg-[#EFE7DC] rounded-2xl p-10"
        >
          <h3 className="font-heading text-2xl font-semibold text-[#1F1F1F] mb-3">
            Still have questions?
          </h3>
          <p className="font-body text-sm text-[#777] mb-6">
            Our team is happy to help! Reach out to us and we'll get back to you within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
