import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="h-px w-6 bg-[#C9A86A]" />
          <span className={`font-body text-xs font-semibold uppercase tracking-[0.15em] ${light ? 'text-[#C9A86A]' : 'text-[#C9A86A]'}`}>
            {badge}
          </span>
          <span className="h-px w-6 bg-[#C9A86A]" />
        </motion.span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${light ? 'text-white' : 'text-[#1F1F1F]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-body text-sm md:text-base mt-4 max-w-xl ${centered ? 'mx-auto' : ''} leading-relaxed ${light ? 'text-white/70' : 'text-[#666]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
