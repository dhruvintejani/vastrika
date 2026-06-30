// // src/components/ui/index.tsx
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiX, FiAlertTriangle } from "react-icons/fi";
// import { OrderStatus } from "../../types";

// // ── Badge ─────────────────────────────────────────────────────────────────────

// const statusColors: Record<string, string> = {
//   pending: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
//   confirmed: "bg-blue-900/40 text-blue-400 border-blue-700/40",
//   processing: "bg-purple-900/40 text-purple-400 border-purple-700/40",
//   shipped: "bg-cyan-900/40 text-cyan-400 border-cyan-700/40",
//   delivered: "bg-green-900/40 text-green-400 border-green-700/40",
//   cancelled: "bg-red-900/40 text-red-400 border-red-700/40",
//   paid: "bg-green-900/40 text-green-400 border-green-700/40",
//   failed: "bg-red-900/40 text-red-400 border-red-700/40",
//   refunded: "bg-orange-900/40 text-orange-400 border-orange-700/40",
//   active: "bg-green-900/40 text-green-400 border-green-700/40",
//   inactive: "bg-gray-800 text-gray-400 border-gray-700/40",
//   blocked: "bg-red-900/40 text-red-400 border-red-700/40",
//   approved: "bg-green-900/40 text-green-400 border-green-700/40",
//   flagged: "bg-red-900/40 text-red-400 border-red-700/40",
//   pending_review: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
// };

// export function Badge({ status, label }: { status: string; label?: string }) {
//   return (
//     <span
//       className={`admin-badge border ${statusColors[status] || "bg-gray-800 text-gray-400 border-gray-700"}`}
//     >
//       {label || status}
//     </span>
//   );
// }

// // ── Spinner ───────────────────────────────────────────────────────────────────

// export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
//   const s = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" }[size];
//   return (
//     <div
//       className={`${s} border-2 border-admin-border border-t-brand-500 rounded-full animate-spin`}
//     />
//   );
// }

// export function PageLoader() {
//   return (
//     <div className="flex items-center justify-center h-64">
//       <Spinner size="lg" />
//     </div>
//   );
// }

// // ── Modal ─────────────────────────────────────────────────────────────────────

// interface ModalProps {
//   open: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode;
//   size?: "sm" | "md" | "lg" | "xl";
// }

// export function Modal({
//   open,
//   onClose,
//   title,
//   children,
//   size = "md",
// }: ModalProps) {
//   const maxW = {
//     sm: "max-w-sm",
//     md: "max-w-lg",
//     lg: "max-w-2xl",
//     xl: "max-w-4xl",
//   }[size];
//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           onClick={onClose}
//         >
//           <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 10 }}
//             transition={{ duration: 0.2 }}
//             className={`relative w-full ${maxW} admin-card p-6 shadow-2xl`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="font-heading text-xl text-admin-text">{title}</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-lg hover:bg-admin-hover text-admin-muted hover:text-admin-text transition-colors cursor-pointer"
//               >
//                 <FiX className="w-4 h-4" />
//               </button>
//             </div>
//             {children}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // ── Confirm Dialog ────────────────────────────────────────────────────────────

// export function ConfirmDialog({
//   open,
//   onClose,
//   onConfirm,
//   title,
//   message,
//   loading,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
//   loading?: boolean;
// }) {
//   return (
//     <Modal open={open} onClose={onClose} title={title} size="sm">
//       <div className="flex items-start gap-3 mb-6">
//         <FiAlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
//         <p className="font-body text-sm text-admin-muted">{message}</p>
//       </div>
//       <div className="flex gap-3 justify-end">
//         <button onClick={onClose} className="admin-btn-secondary">
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           disabled={loading}
//           className="admin-btn-danger"
//         >
//           {loading ? <Spinner size="sm" /> : "Confirm"}
//         </button>
//       </div>
//     </Modal>
//   );
// }

// // ── Empty State ───────────────────────────────────────────────────────────────

// export function EmptyState({
//   icon,
//   title,
//   description,
// }: {
//   icon?: React.ReactNode;
//   title: string;
//   description?: string;
// }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-20 text-center">
//       {icon && <div className="mb-4 text-admin-muted/50">{icon}</div>}
//       <p className="font-heading text-xl text-admin-muted">{title}</p>
//       {description && (
//         <p className="font-body text-sm text-admin-muted/60 mt-2 max-w-xs">
//           {description}
//         </p>
//       )}
//     </div>
//   );
// }

// // ── Pagination ────────────────────────────────────────────────────────────────

// export function Pagination({
//   page,
//   totalPages,
//   onChange,
// }: {
//   page: number;
//   totalPages: number;
//   onChange: (p: number) => void;
// }) {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex items-center justify-between mt-6">
//       <span className="font-body text-xs text-admin-muted">
//         Page {page} of {totalPages}
//       </span>
//       <div className="flex gap-2">
//         <button
//           onClick={() => onChange(page - 1)}
//           disabled={page <= 1}
//           className="admin-btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
//         >
//           ← Prev
//         </button>
//         <button
//           onClick={() => onChange(page + 1)}
//           disabled={page >= totalPages}
//           className="admin-btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Input ─────────────────────────────────────────────────────────────────────

// export function Input({
//   label,
//   error,
//   ...props
// }: React.InputHTMLAttributes<HTMLInputElement> & {
//   label?: string;
//   error?: string;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       {label && (
//         <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
//           {label}
//         </label>
//       )}
//       <input className="admin-input" {...props} />
//       {error && <p className="font-body text-xs text-red-400">{error}</p>}
//     </div>
//   );
// }

// export function Textarea({
//   label,
//   error,
//   ...props
// }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
//   label?: string;
//   error?: string;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       {label && (
//         <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
//           {label}
//         </label>
//       )}
//       <textarea className="admin-input resize-none" rows={4} {...props} />
//       {error && <p className="font-body text-xs text-red-400">{error}</p>}
//     </div>
//   );
// }

// export function Select({
//   label,
//   error,
//   children,
//   ...props
// }: React.SelectHTMLAttributes<HTMLSelectElement> & {
//   label?: string;
//   error?: string;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       {label && (
//         <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
//           {label}
//         </label>
//       )}
//       <select className="admin-input cursor-pointer" {...props}>
//         {children}
//       </select>
//       {error && <p className="font-body text-xs text-red-400">{error}</p>}
//     </div>
//   );
// }

// // ── Toggle ────────────────────────────────────────────────────────────────────

// export function Toggle({
//   checked,
//   onChange,
//   label,
// }: {
//   checked: boolean;
//   onChange: (v: boolean) => void;
//   label?: string;
// }) {
//   return (
//     <label className="flex items-center gap-3 cursor-pointer">
//       <button
//         type="button"
//         onClick={() => onChange(!checked)}
//         className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-brand-500" : "bg-admin-border"}`}
//       >
//         <span
//           className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
//         />
//       </button>
//       {label && (
//         <span className="font-body text-sm text-admin-text">{label}</span>
//       )}
//     </label>
//   );
// }

// // ── Star Rating ───────────────────────────────────────────────────────────────

// export function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex gap-0.5">
//       {[1, 2, 3, 4, 5].map((s) => (
//         <span
//           key={s}
//           className={`text-sm ${s <= rating ? "text-brand-500" : "text-admin-border"}`}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// // ── Status Badge (order-specific) ────────────────────────────────────────────

// // export function OrderStatusBadge({ status }: { status: OrderStatus }) {
// //   const labels: Record<OrderStatus, string> = {
// //     PENDING: "Pending",
// //     CONFIRMED: "Confirmed",
// //     PROCESSING: "Processing",
// //     SHIPPED: "Shipped",
// //     DELIVERED: "Delivered",
// //     CANCELLED: "Cancelled",
// //   };
// //   return <Badge status={status} label={labels[status]} />;
// // }

// // export function OrderStatusBadge({ status }: { status: OrderStatus }) {
// //   const labels: Record<OrderStatus, string> = {
// //     pending: 'Pending', confirmed: 'Confirmed', processing: 'Processing',
// //     shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
// //   };
// //   return <Badge status={status} label={labels[status]} />;
// // }


// // OrderStatusBadge.tsx
// // Backend stores and returns LOWERCASE status values ('pending', 'cancelled', etc).
// // The OrderStatus type (src/types/index.ts) is now lowercase to match.
// // This component's `labels` map must use lowercase keys — using uppercase keys
// // (PENDING, CANCELLED) would mean labels[status] always returns undefined
// // because status will be 'pending' not 'PENDING'.

// export function OrderStatusBadge({ status }: { status: OrderStatus }) {
//   const labels: Record<OrderStatus, string> = {
//     pending: 'Pending',
//     confirmed: 'Confirmed',
//     processing: 'Processing',
//     shipped: 'Shipped',
//     delivered: 'Delivered',
//     cancelled: 'Cancelled',
//   };
//   return <Badge status={status} label={labels[status]} />;
// }


// src/components/ui/index.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAlertTriangle, FiChevronDown, FiCheck } from "react-icons/fi";
import { OrderStatus } from "../../types";

// ── Badge ─────────────────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  pending: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
  confirmed: "bg-blue-900/40 text-blue-400 border-blue-700/40",
  processing: "bg-purple-900/40 text-purple-400 border-purple-700/40",
  shipped: "bg-cyan-900/40 text-cyan-400 border-cyan-700/40",
  delivered: "bg-green-900/40 text-green-400 border-green-700/40",
  cancelled: "bg-red-900/40 text-red-400 border-red-700/40",
  paid: "bg-green-900/40 text-green-400 border-green-700/40",
  failed: "bg-red-900/40 text-red-400 border-red-700/40",
  refunded: "bg-orange-900/40 text-orange-400 border-orange-700/40",
  active: "bg-green-900/40 text-green-400 border-green-700/40",
  inactive: "bg-gray-800 text-gray-400 border-gray-700/40",
  blocked: "bg-red-900/40 text-red-400 border-red-700/40",
  approved: "bg-green-900/40 text-green-400 border-green-700/40",
  flagged: "bg-red-900/40 text-red-400 border-red-700/40",
  pending_review: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
};

export function Badge({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={`admin-badge border ${statusColors[status] || "bg-gray-800 text-gray-400 border-gray-700"}`}
    >
      {label || status}
    </span>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" }[size];
  return (
    <div
      className={`${s} border-2 border-admin-border border-t-brand-500 rounded-full animate-spin`}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Spinner size="lg" />
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const maxW = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${maxW} admin-card p-6 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl text-admin-text">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-admin-hover text-admin-muted hover:text-admin-text transition-colors cursor-pointer"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Confirm Dialog ────────────────────────────────────────────────────────────

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex items-start gap-3 mb-6">
        <FiAlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <p className="font-body text-sm text-admin-muted">{message}</p>
      </div>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="admin-btn-secondary">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="admin-btn-danger"
        >
          {loading ? <Spinner size="sm" /> : "Confirm"}
        </button>
      </div>
    </Modal>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="mb-4 text-admin-muted/50">{icon}</div>}
      <p className="font-heading text-xl text-admin-muted">{title}</p>
      {description && (
        <p className="font-body text-sm text-admin-muted/60 mt-2 max-w-xs">
          {description}
        </p>
      )}
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-6">
      <span className="font-body text-xs text-admin-muted">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="admin-btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
        >
          ← Prev
        </button>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className="admin-btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────

export function Input({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input className="admin-input" {...props} />
      {error && <p className="font-body text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea className="admin-input resize-none" rows={4} {...props} />
      {error && <p className="font-body text-xs text-red-400">{error}</p>}
    </div>
  );
}

type CustomSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

function getSelectOptions(children: React.ReactNode): CustomSelectOption[] {
  return React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child) => {
      const option = child as React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>;
      return {
        value: String(option.props.value ?? ""),
        label: String(option.props.children ?? option.props.value ?? ""),
        disabled: option.props.disabled,
      };
    });
}

export function Select({
  label,
  error,
  children,
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
}) {
  const options = getSelectOptions(children);
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? value ?? "")
  );

  const selectedValue = value !== undefined ? String(value) : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const placeholder = options.find((option) => option.value === "")?.label || "Select option";

  const handleSelect = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    const event = {
      target: { value: nextValue, name: props.name },
      currentTarget: { value: nextValue, name: props.name },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;

    onChange?.(event);
    setOpen(false);
  };

  return (
    <div
      className="flex flex-col gap-1.5"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      {label && (
        <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          className="sr-only"
          value={selectedValue}
          disabled={disabled}
          onChange={onChange}
          tabIndex={-1}
          aria-hidden="true"
          {...props}
        >
          {children}
        </select>

        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          className={`admin-input w-full min-h-[42px] flex items-center justify-between gap-3 text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 ${className || ""}`}
        >
          <span className={selectedOption && selectedOption.value !== "" ? "text-admin-text" : "text-admin-muted"}>
            {selectedOption?.label || placeholder}
          </span>
          <FiChevronDown className={`w-4 h-4 text-admin-muted transition-transform ${open ? "rotate-180 text-brand-400" : ""}`} />
        </button>

        <AnimatePresence>
          {open && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute left-0 right-0 top-full z-[90] mt-2 max-h-60 overflow-y-auto rounded-2xl border border-brand-500/20 bg-admin-card shadow-2xl shadow-black/30"
            >
              <div className="p-1.5">
                {options.map((option) => {
                  const selected = option.value === selectedValue;
                  return (
                    <button
                      key={`${option.value}-${option.label}`}
                      type="button"
                      disabled={option.disabled}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(option.value)}
                      className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 font-body text-sm transition-colors ${
                        selected
                          ? "bg-brand-500/15 text-brand-300"
                          : "text-admin-text hover:bg-admin-hover hover:text-brand-300"
                      } ${option.disabled ? "opacity-45 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span className="truncate">{option.label}</span>
                      {selected && <FiCheck className="w-4 h-4 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="font-body text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-brand-500" : "bg-admin-border"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
      {label && (
        <span className="font-body text-sm text-admin-text">{label}</span>
      )}
    </label>
  );
}

// ── Star Rating ───────────────────────────────────────────────────────────────

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`text-sm ${s <= rating ? "text-brand-500" : "text-admin-border"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const labels: Record<OrderStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return <Badge status={status} label={labels[status]} />;
}
