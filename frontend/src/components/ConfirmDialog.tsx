// src/components/ConfirmDialog.tsx
// Reusable confirmation modal for the customer-facing site.
// Used for: logout, remove from wishlist, remove from cart, cancel order.
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Use 'danger' for destructive actions (delete, cancel order, logout). Default 'danger'. */
  variant?: 'danger' | 'default';
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && onClose()}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E8DCCB] w-full max-w-sm p-6"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                variant === 'danger' ? 'bg-[#FFF0F0]' : 'bg-[#EFE7DC]'
              }`}
            >
              <FiAlertTriangle
                className={`w-5 h-5 ${variant === 'danger' ? 'text-[#C58C85]' : 'text-[#7A4E48]'}`}
              />
            </div>

            <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-2">{title}</h3>
            <p className="font-body text-sm text-[#777] leading-relaxed mb-6">{message}</p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-2.5 border border-[#E8DCCB] text-[#777] font-body text-sm font-medium rounded-xl hover:bg-[#F8F5F0] transition-colors cursor-pointer disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`flex-1 py-2.5 font-body text-sm font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 ${
                  variant === 'danger'
                    ? 'bg-[#C58C85] text-white hover:bg-[#B07A73]'
                    : 'bg-[#7A4E48] text-white hover:bg-[#5A3A36]'
                }`}
              >
                {loading && (
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}