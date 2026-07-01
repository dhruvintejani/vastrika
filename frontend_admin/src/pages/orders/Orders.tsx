// // // // // // src/pages/orders/Orders.tsx
// // // // // import { useEffect, useState, useCallback } from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import { FiSearch, FiShoppingCart, FiChevronRight, FiX } from 'react-icons/fi';
// // // // // import toast from 'react-hot-toast';
// // // // // import { format } from 'date-fns';
// // // // // import { adminApi } from '../../api/client';
// // // // // import { Order, OrderStatus } from '../../types';
// // // // // import { PageLoader, Modal, OrderStatusBadge, Pagination, EmptyState, Select, Spinner } from '../../components/ui';
// // // // // import { toastStyle } from '../../store/authstore';

// // // // // const STATUS_OPTIONS: { value: string; label: string }[] = [
// // // // //   { value: '', label: 'All Statuses' },
// // // // //   { value: 'pending', label: 'Pending' },
// // // // //   { value: 'confirmed', label: 'Confirmed' },
// // // // //   { value: 'processing', label: 'Processing' },
// // // // //   { value: 'shipped', label: 'Shipped' },
// // // // //   { value: 'delivered', label: 'Delivered' },
// // // // //   { value: 'cancelled', label: 'Cancelled' },
// // // // // ];

// // // // // export default function Orders() {
// // // // //   const [orders, setOrders] = useState<Order[]>([]);
// // // // //   const [total, setTotal] = useState(0);
// // // // //   const [page, setPage] = useState(1);
// // // // //   const [search, setSearch] = useState('');
// // // // //   const [statusFilter, setStatusFilter] = useState('');
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// // // // //   const [updating, setUpdating] = useState(false);
// // // // //   const PAGE_SIZE = 15;

// // // // //   const load = useCallback(async () => {
// // // // //     setLoading(true);
// // // // //     const res = await adminApi.getOrders({
// // // // //       page, page_size: PAGE_SIZE,
// // // // //       ...(search && { search }),
// // // // //       ...(statusFilter && { status: statusFilter }),
// // // // //     });
// // // // //     setOrders(res.data.data || []);
// // // // //     setTotal(res.data.total || 0);
// // // // //     setLoading(false);
// // // // //   }, [page, search, statusFilter]);

// // // // //   useEffect(() => { load(); }, [load]);

// // // // //   const handleStatusUpdate = async (orderId: number, status: string) => {
// // // // //     setUpdating(true);
// // // // //     try {
// // // // //       await adminApi.updateOrderStatus(orderId, status);
// // // // //       toast.success(`Order status updated to ${status}`, { style: toastStyle });
// // // // //       // Update locally
// // // // //       setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: status as OrderStatus } : o));
// // // // //       if (selectedOrder?.id === orderId) setSelectedOrder((prev) => prev ? { ...prev, status: status as OrderStatus } : null);
// // // // //     } catch {
// // // // //       toast.error('Failed to update status', { style: toastStyle });
// // // // //     } finally {
// // // // //       setUpdating(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-6 animate-fade-in">
// // // // //       <div className="flex items-center justify-between">
// // // // //         <div>
// // // // //           <h1 className="font-heading text-3xl text-admin-text">Orders</h1>
// // // // //           <p className="font-body text-sm text-admin-muted mt-1">{total} total orders</p>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Filters */}
// // // // //       <div className="flex gap-3 flex-wrap">
// // // // //         <div className="relative flex-1 min-w-48">
// // // // //           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
// // // // //           <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search order #, email, name..." className="admin-input pl-10" />
// // // // //         </div>
// // // // //         <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="admin-input w-44 cursor-pointer">
// // // // //           {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
// // // // //         </select>
// // // // //       </div>

// // // // //       {loading ? <PageLoader /> : orders.length === 0 ? (
// // // // //         <EmptyState icon={<FiShoppingCart className="w-16 h-16" />} title="No orders found" />
// // // // //       ) : (
// // // // //         <>
// // // // //           <div className="admin-card overflow-hidden">
// // // // //             <table className="w-full">
// // // // //               <thead>
// // // // //                 <tr className="border-b border-admin-border">
// // // // //                   {['Order #', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map((h) => (
// // // // //                     <th key={h} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">{h}</th>
// // // // //                   ))}
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {orders.map((order) => (
// // // // //                   <tr key={order.id} className="table-row">
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <span className="font-mono text-xs text-brand-400">{order.order_number}</span>
// // // // //                     </td>
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <div>
// // // // //                         <p className="font-body text-sm text-admin-text">{order.shipping_name}</p>
// // // // //                         <p className="font-body text-xs text-admin-muted">{order.shipping_phone}</p>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <span className="font-body text-sm text-admin-text">{order.items?.length ?? '—'}</span>
// // // // //                     </td>
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <span className="font-body text-sm font-semibold text-admin-text">
// // // // //                         ₹{Number(order.total_amount).toLocaleString('en-IN')}
// // // // //                       </span>
// // // // //                     </td>
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <span className="font-body text-xs text-admin-muted uppercase">{order.payment_method}</span>
// // // // //                     </td>
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <OrderStatusBadge status={order.status} />
// // // // //                     </td>
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <span className="font-body text-xs text-admin-muted">
// // // // //                         {format(new Date(order.created_at), 'dd MMM yy')}
// // // // //                       </span>
// // // // //                     </td>
// // // // //                     <td className="px-5 py-3.5">
// // // // //                       <button onClick={() => setSelectedOrder(order)} className="text-admin-muted hover:text-brand-400 transition-colors cursor-pointer">
// // // // //                         <FiChevronRight className="w-4 h-4" />
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //           <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} onChange={setPage} />
// // // // //         </>
// // // // //       )}

// // // // //       {/* Order Detail Modal */}
// // // // //       <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order ${selectedOrder?.order_number}`} size="lg">
// // // // //         {selectedOrder && (
// // // // //           <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
// // // // //             {/* Status update */}
// // // // //             <div className="flex items-center gap-3 p-4 bg-admin-bg rounded-xl">
// // // // //               <div className="flex-1">
// // // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Current Status</p>
// // // // //                 <OrderStatusBadge status={selectedOrder.status} />
// // // // //               </div>
// // // // //               <div className="flex-1">
// // // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Update Status</p>
// // // // //                 <select
// // // // //                   value={selectedOrder.status}
// // // // //                   onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
// // // // //                   disabled={updating}
// // // // //                   className="admin-input text-xs cursor-pointer"
// // // // //                 >
// // // // //                   {STATUS_OPTIONS.filter(o => o.value).map((o) => (
// // // // //                     <option key={o.value} value={o.value}>{o.label}</option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </div>
// // // // //               {updating && <Spinner size="sm" />}
// // // // //             </div>

// // // // //             {/* Customer & shipping */}
// // // // //             <div className="grid grid-cols-2 gap-4">
// // // // //               <div className="p-4 bg-admin-bg rounded-xl">
// // // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Customer</p>
// // // // //                 <p className="font-body text-sm font-semibold text-admin-text">{selectedOrder.shipping_name}</p>
// // // // //                 <p className="font-body text-xs text-admin-muted">{selectedOrder.shipping_phone}</p>
// // // // //               </div>
// // // // //               <div className="p-4 bg-admin-bg rounded-xl">
// // // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Shipping Address</p>
// // // // //                 <p className="font-body text-sm text-admin-text">{selectedOrder.shipping_address}</p>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Items */}
// // // // //             <div>
// // // // //               <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-3">Order Items</p>
// // // // //               <div className="space-y-2">
// // // // //                 {selectedOrder.items?.map((item) => (
// // // // //                   <div key={item.id} className="flex items-center gap-3 p-3 bg-admin-bg rounded-xl">
// // // // //                     <img src={item.product_image} alt={item.product_title} className="w-12 h-14 rounded-lg object-cover bg-admin-border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <p className="font-body text-sm font-medium text-admin-text line-clamp-1">{item.product_title}</p>
// // // // //                       <p className="font-body text-xs text-admin-muted">{item.selected_size} · {item.selected_color} · Qty: {item.quantity}</p>
// // // // //                     </div>
// // // // //                     <span className="font-body text-sm font-semibold text-admin-text">₹{Number(item.total_price).toLocaleString('en-IN')}</span>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Totals */}
// // // // //             <div className="p-4 bg-admin-bg rounded-xl space-y-2">
// // // // //               <div className="flex justify-between font-body text-sm text-admin-muted">
// // // // //                 <span>Subtotal</span><span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
// // // // //               </div>
// // // // //               <div className="flex justify-between font-body text-sm text-admin-muted">
// // // // //                 <span>Shipping</span>
// // // // //                 <span>{Number(selectedOrder.shipping_charge) === 0 ? 'FREE' : `₹${Number(selectedOrder.shipping_charge).toLocaleString('en-IN')}`}</span>
// // // // //               </div>
// // // // //               <div className="flex justify-between font-body text-base font-bold text-admin-text border-t border-admin-border pt-2 mt-2">
// // // // //                 <span>Total</span><span>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </Modal>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // src/pages/orders/Orders.tsx
// // // // import { useEffect, useState, useCallback } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { FiSearch, FiShoppingCart, FiChevronRight } from 'react-icons/fi';
// // // // import toast from 'react-hot-toast';
// // // // import { format } from 'date-fns';
// // // // import { adminApi } from '../../api/client';
// // // // import { Order, OrderStatus } from '../../types';
// // // // import { PageLoader, Modal, OrderStatusBadge, Pagination, EmptyState, Spinner } from '../../components/ui';
// // // // import { toastStyle } from '../../store/authstore';

// // // // const STATUS_OPTIONS: { value: string; label: string }[] = [
// // // //   { value: '', label: 'All Statuses' },
// // // //   { value: 'pending', label: 'Pending' },
// // // //   { value: 'confirmed', label: 'Confirmed' },
// // // //   { value: 'processing', label: 'Processing' },
// // // //   { value: 'shipped', label: 'Shipped' },
// // // //   { value: 'delivered', label: 'Delivered' },
// // // //   { value: 'cancelled', label: 'Cancelled' },
// // // // ];

// // // // export default function Orders() {
// // // //   const [orders, setOrders] = useState<Order[]>([]);
// // // //   const [total, setTotal] = useState(0);
// // // //   const [page, setPage] = useState(1);
// // // //   const [search, setSearch] = useState('');
// // // //   const [statusFilter, setStatusFilter] = useState('');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// // // //   const [updating, setUpdating] = useState(false);
// // // //   const PAGE_SIZE = 15;

// // // //   const load = useCallback(async () => {
// // // //     setLoading(true);
// // // //     const res = await adminApi.getOrders({
// // // //       page, page_size: PAGE_SIZE,
// // // //       ...(search && { search }),
// // // //       ...(statusFilter && { status: statusFilter }),
// // // //     });
// // // //     setOrders(res.data.data || []);
// // // //     setTotal(res.data.total || 0);
// // // //     setLoading(false);
// // // //   }, [page, search, statusFilter]);

// // // //   useEffect(() => { load(); }, [load]);

// // // //   const handleStatusUpdate = async (orderId: number, status: string) => {
// // // //     setUpdating(true);
// // // //     try {
// // // //       await adminApi.updateOrderStatus(orderId, status);
// // // //       toast.success(`Order status updated to ${status}`, { style: toastStyle });
// // // //       setOrders((prev) => prev.map((o) =>
// // // //         o.id === orderId ? { ...o, status: status as OrderStatus } : o
// // // //       ));
// // // //       if (selectedOrder?.id === orderId) {
// // // //         setSelectedOrder((prev) => prev ? { ...prev, status: status as OrderStatus } : null);
// // // //       }
// // // //     } catch {
// // // //       toast.error('Failed to update status', { style: toastStyle });
// // // //     } finally {
// // // //       setUpdating(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6 animate-fade-in">
// // // //       <div className="flex items-center justify-between">
// // // //         <div>
// // // //           <h1 className="font-heading text-3xl text-admin-text">Orders</h1>
// // // //           <p className="font-body text-sm text-admin-muted mt-1">{total} total orders</p>
// // // //         </div>
// // // //       </div>

// // // //       {/* Filters */}
// // // //       <div className="flex gap-3 flex-wrap">
// // // //         <div className="relative flex-1 min-w-48">
// // // //           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
// // // //           <input
// // // //             value={search}
// // // //             onChange={(e) => { setSearch(e.target.value); setPage(1); }}
// // // //             placeholder="Search order #, email, name..."
// // // //             className="admin-input pl-10"
// // // //           />
// // // //         </div>
// // // //         <select
// // // //           value={statusFilter}
// // // //           onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
// // // //           className="admin-input w-44 cursor-pointer"
// // // //         >
// // // //           {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
// // // //         </select>
// // // //       </div>

// // // //       {loading ? <PageLoader /> : orders.length === 0 ? (
// // // //         <EmptyState icon={<FiShoppingCart className="w-16 h-16" />} title="No orders found" />
// // // //       ) : (
// // // //         <>
// // // //           <div className="admin-card overflow-hidden">
// // // //             <table className="w-full">
// // // //               <thead>
// // // //                 <tr className="border-b border-admin-border">
// // // //                   {['Order #', 'Customer', 'Email', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map((h) => (
// // // //                     <th key={h} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
// // // //                       {h}
// // // //                     </th>
// // // //                   ))}
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {orders.map((order) => (
// // // //                   <tr key={order.id} className="table-row border-b border-admin-border/50 hover:bg-admin-bg/50 transition-colors">
// // // //                     <td className="px-5 py-3.5">
// // // //                       <span className="font-mono text-xs text-brand-400">{order.order_number}</span>
// // // //                     </td>
// // // //                     <td className="px-5 py-3.5">
// // // //                       <div>
// // // //                         <p className="font-body text-sm text-admin-text">
// // // //                           {(order as any).user_name || order.shipping_name}
// // // //                         </p>
// // // //                         <p className="font-body text-xs text-admin-muted">{order.shipping_phone}</p>
// // // //                       </div>
// // // //                     </td>
// // // //                     {/* User email column — populated from AdminOrderResponse */}
// // // //                     <td className="px-5 py-3.5">
// // // //                       <span className="font-body text-xs text-admin-muted">
// // // //                         {(order as any).user_email || '—'}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="px-5 py-3.5">
// // // //                       <span className="font-body text-sm text-admin-text">{order.items?.length ?? '—'}</span>
// // // //                     </td>
// // // //                     <td className="px-5 py-3.5">
// // // //                       <span className="font-body text-sm font-semibold text-admin-text">
// // // //                         ₹{Number(order.total_amount).toLocaleString('en-IN')}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="px-5 py-3.5">
// // // //                       <span className="font-body text-xs text-admin-muted uppercase">{order.payment_method}</span>
// // // //                     </td>
// // // //                     <td className="px-5 py-3.5">
// // // //                       <OrderStatusBadge status={order.status} />
// // // //                     </td>
// // // //                     <td className="px-5 py-3.5">
// // // //                       <span className="font-body text-xs text-admin-muted">
// // // //                         {format(new Date(order.created_at), 'dd MMM yy')}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="px-5 py-3.5">
// // // //                       <button
// // // //                         onClick={() => setSelectedOrder(order)}
// // // //                         className="text-admin-muted hover:text-brand-400 transition-colors cursor-pointer"
// // // //                       >
// // // //                         <FiChevronRight className="w-4 h-4" />
// // // //                       </button>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //           <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} onChange={setPage} />
// // // //         </>
// // // //       )}

// // // //       {/* Order Detail Modal */}
// // // //       <Modal
// // // //         open={!!selectedOrder}
// // // //         onClose={() => setSelectedOrder(null)}
// // // //         title={`Order ${selectedOrder?.order_number}`}
// // // //         size="lg"
// // // //       >
// // // //         {selectedOrder && (
// // // //           <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
// // // //             {/* Status update */}
// // // //             <div className="flex items-center gap-3 p-4 bg-admin-bg rounded-xl">
// // // //               <div className="flex-1">
// // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Current Status</p>
// // // //                 <OrderStatusBadge status={selectedOrder.status} />
// // // //               </div>
// // // //               <div className="flex-1">
// // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Update Status</p>
// // // //                 <select
// // // //                   value={selectedOrder.status}
// // // //                   onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
// // // //                   disabled={updating}
// // // //                   className="admin-input text-xs cursor-pointer"
// // // //                 >
// // // //                   {STATUS_OPTIONS.filter(o => o.value).map((o) => (
// // // //                     <option key={o.value} value={o.value}>{o.label}</option>
// // // //                   ))}
// // // //                 </select>
// // // //               </div>
// // // //               {updating && <Spinner size="sm" />}
// // // //             </div>

// // // //             {/* Customer info — now includes email */}
// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div className="p-4 bg-admin-bg rounded-xl">
// // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Customer</p>
// // // //                 <p className="font-body text-sm font-semibold text-admin-text">
// // // //                   {(selectedOrder as any).user_name || selectedOrder.shipping_name}
// // // //                 </p>
// // // //                 <p className="font-body text-xs text-admin-muted mt-0.5">
// // // //                   {(selectedOrder as any).user_email || '—'}
// // // //                 </p>
// // // //                 <p className="font-body text-xs text-admin-muted">{selectedOrder.shipping_phone}</p>
// // // //               </div>
// // // //               <div className="p-4 bg-admin-bg rounded-xl">
// // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Shipping Address</p>
// // // //                 <p className="font-body text-sm text-admin-text">{selectedOrder.shipping_address}</p>
// // // //               </div>
// // // //             </div>

// // // //             {/* Cancellation reason if cancelled */}
// // // //             {selectedOrder.status === 'cancelled' && (selectedOrder as any).cancellation_reason && (
// // // //               <div className="p-4 bg-red-900/20 border border-red-800/40 rounded-xl">
// // // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Cancellation Reason</p>
// // // //                 <p className="font-body text-sm text-red-300">{(selectedOrder as any).cancellation_reason}</p>
// // // //               </div>
// // // //             )}

// // // //             {/* Items */}
// // // //             <div>
// // // //               <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-3">Order Items</p>
// // // //               <div className="space-y-2">
// // // //                 {selectedOrder.items?.map((item) => (
// // // //                   <div key={item.id} className="flex items-center gap-3 p-3 bg-admin-bg rounded-xl">
// // // //                     <img
// // // //                       src={item.product_image}
// // // //                       alt={item.product_title}
// // // //                       className="w-12 h-14 rounded-lg object-cover bg-admin-border"
// // // //                       onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
// // // //                     />
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <p className="font-body text-sm font-medium text-admin-text line-clamp-1">{item.product_title}</p>
// // // //                       <p className="font-body text-xs text-admin-muted">
// // // //                         {item.selected_size}
// // // //                         {item.selected_color && item.selected_color !== 'Default' ? ` · ${item.selected_color}` : ''}
// // // //                         {' · '}Qty: {item.quantity}
// // // //                       </p>
// // // //                     </div>
// // // //                     <span className="font-body text-sm font-semibold text-admin-text">
// // // //                       ₹{Number(item.total_price).toLocaleString('en-IN')}
// // // //                     </span>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* Totals */}
// // // //             <div className="p-4 bg-admin-bg rounded-xl space-y-2">
// // // //               <div className="flex justify-between font-body text-sm text-admin-muted">
// // // //                 <span>Subtotal</span>
// // // //                 <span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
// // // //               </div>
// // // //               <div className="flex justify-between font-body text-sm text-admin-muted">
// // // //                 <span>Shipping</span>
// // // //                 <span>
// // // //                   {Number(selectedOrder.shipping_charge) === 0
// // // //                     ? 'FREE'
// // // //                     : `₹${Number(selectedOrder.shipping_charge).toLocaleString('en-IN')}`}
// // // //                 </span>
// // // //               </div>
// // // //               <div className="flex justify-between font-body text-base font-bold text-admin-text border-t border-admin-border pt-2 mt-2">
// // // //                 <span>Total</span>
// // // //                 <span>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useCallback, useEffect, useRef, useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { FiSearch, FiShoppingCart, FiChevronRight } from 'react-icons/fi';
// // // import toast from 'react-hot-toast';
// // // import { format } from 'date-fns';
// // // import { adminApi } from '../../api/client';
// // // import { Order, OrderStatus } from '../../types';
// // // import { PageLoader, Modal, OrderStatusBadge, Pagination, EmptyState, Spinner } from '../../components/ui';
// // // import { toastStyle } from '../../store/authstore';

// // // const PAGE_SIZE = 15;
// // // const SEARCH_DEBOUNCE_MS = 450;
// // // const AUTO_REFRESH_MS = 8000;

// // // const STATUS_OPTIONS: { value: string; label: string }[] = [
// // //   { value: '', label: 'All Statuses' },
// // //   { value: 'pending', label: 'Pending' },
// // //   { value: 'confirmed', label: 'Confirmed' },
// // //   { value: 'processing', label: 'Processing' },
// // //   { value: 'shipped', label: 'Shipped' },
// // //   { value: 'delivered', label: 'Delivered' },
// // //   { value: 'cancelled', label: 'Cancelled' },
// // // ];

// // // export default function Orders() {
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [total, setTotal] = useState(0);
// // //   const [page, setPage] = useState(1);

// // //   const [searchInput, setSearchInput] = useState('');
// // //   const [debouncedSearch, setDebouncedSearch] = useState('');
// // //   const [statusFilter, setStatusFilter] = useState('');

// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// // //   const [updating, setUpdating] = useState(false);

// // //   const requestIdRef = useRef(0);

// // //   useEffect(() => {
// // //     const timer = window.setTimeout(() => {
// // //       setDebouncedSearch(searchInput.trim());
// // //       setPage(1);
// // //     }, SEARCH_DEBOUNCE_MS);

// // //     return () => window.clearTimeout(timer);
// // //   }, [searchInput]);

// // //   const load = useCallback(
// // //     async (silent = false) => {
// // //       const requestId = ++requestIdRef.current;

// // //       if (silent || orders.length > 0) {
// // //         setRefreshing(true);
// // //       } else {
// // //         setLoading(true);
// // //       }

// // //       try {
// // //         const res = await adminApi.getOrders({
// // //           page,
// // //           page_size: PAGE_SIZE,
// // //           ...(debouncedSearch && { search: debouncedSearch }),
// // //           ...(statusFilter && { status: statusFilter }),
// // //         });

// // //         if (requestId !== requestIdRef.current) return;

// // //         const freshOrders: Order[] = res.data.data || [];
// // //         setOrders(freshOrders);
// // //         setTotal(res.data.total || 0);

// // //         setSelectedOrder((current) => {
// // //           if (!current) return current;
// // //           return freshOrders.find((o) => o.id === current.id) || current;
// // //         });
// // //       } catch (err: any) {
// // //         if (!silent) {
// // //           toast.error(err.response?.data?.error || 'Failed to load orders', { style: toastStyle });
// // //         }
// // //       } finally {
// // //         if (requestId === requestIdRef.current) {
// // //           setLoading(false);
// // //           setRefreshing(false);
// // //         }
// // //       }
// // //     },
// // //     [page, debouncedSearch, statusFilter, orders.length]
// // //   );

// // //   useEffect(() => {
// // //     load(false);
// // //   }, [page, debouncedSearch, statusFilter]);

// // //   useEffect(() => {
// // //     const interval = window.setInterval(() => {
// // //       if (document.visibilityState === 'visible') {
// // //         load(true);
// // //       }
// // //     }, AUTO_REFRESH_MS);

// // //     return () => window.clearInterval(interval);
// // //   }, [load]);

// // //   useEffect(() => {
// // //     const handleFocus = () => load(true);
// // //     window.addEventListener('focus', handleFocus);
// // //     return () => window.removeEventListener('focus', handleFocus);
// // //   }, [load]);

// // //   const handleStatusUpdate = async (orderId: number, status: string) => {
// // //     setUpdating(true);

// // //     try {
// // //       const res = await adminApi.updateOrderStatus(orderId, status);
// // //       const updatedOrder = res.data.data as Order;

// // //       toast.success(`Order status updated to ${status}`, { style: toastStyle });

// // //       setOrders((prev) =>
// // //         prev.map((o) =>
// // //           o.id === orderId ? { ...o, ...updatedOrder, status: status as OrderStatus } : o
// // //         )
// // //       );

// // //       setSelectedOrder((prev) =>
// // //         prev?.id === orderId ? { ...prev, ...updatedOrder, status: status as OrderStatus } : prev
// // //       );

// // //       await load(true);
// // //     } catch (err: any) {
// // //       toast.error(err.response?.data?.error || 'Failed to update status', { style: toastStyle });
// // //     } finally {
// // //       setUpdating(false);
// // //     }
// // //   };

// // //   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

// // //   return (
// // //     <div className="space-y-6 animate-fade-in">
// // //       <div className="flex items-center justify-between">
// // //         <div>
// // //           <h1 className="font-heading text-3xl text-admin-text">Orders</h1>
// // //           <p className="font-body text-sm text-admin-muted mt-1">{total} total orders</p>
// // //         </div>
// // //       </div>

// // //       <div className="flex gap-3 flex-wrap items-center">
// // //         <div className="relative flex-1 min-w-48">
// // //           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
// // //           <input
// // //             value={searchInput}
// // //             onChange={(e) => setSearchInput(e.target.value)}
// // //             placeholder="Search order #, email, name..."
// // //             className="admin-input pl-10"
// // //           />
// // //         </div>

// // //         <select
// // //           value={statusFilter}
// // //           onChange={(e) => {
// // //             setStatusFilter(e.target.value);
// // //             setPage(1);
// // //           }}
// // //           className="admin-input w-44 cursor-pointer"
// // //         >
// // //           {STATUS_OPTIONS.map((o) => (
// // //             <option key={o.value} value={o.value}>{o.label}</option>
// // //           ))}
// // //         </select>

// // //         {refreshing && !loading && (
// // //           <span className="font-body text-xs text-admin-muted">Syncing...</span>
// // //         )}
// // //       </div>

// // //       {loading ? (
// // //         <PageLoader />
// // //       ) : orders.length === 0 ? (
// // //         <EmptyState icon={<FiShoppingCart className="w-16 h-16" />} title="No orders found" />
// // //       ) : (
// // //         <>
// // //           <div className="admin-card overflow-hidden overflow-x-auto">
// // //             <table className="w-full min-w-[980px]">
// // //               <thead>
// // //                 <tr className="border-b border-admin-border">
// // //                   {['Order #', 'Customer', 'Email', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map((h) => (
// // //                     <th key={h} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
// // //                       {h}
// // //                     </th>
// // //                   ))}
// // //                 </tr>
// // //               </thead>

// // //               <tbody>
// // //                 {orders.map((order) => (
// // //                   <tr key={order.id} className="table-row border-b border-admin-border/50 hover:bg-admin-bg/50 transition-colors">
// // //                     <td className="px-5 py-3.5">
// // //                       <span className="font-mono text-xs text-brand-400">{order.order_number}</span>
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <div>
// // //                         <p className="font-body text-sm text-admin-text">
// // //                           {(order as any).user_name || order.shipping_name}
// // //                         </p>
// // //                         <p className="font-body text-xs text-admin-muted">{order.shipping_phone}</p>
// // //                       </div>
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <span className="font-body text-xs text-admin-muted">
// // //                         {(order as any).user_email || '—'}
// // //                       </span>
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <span className="font-body text-sm text-admin-text">{order.items?.length ?? '—'}</span>
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <span className="font-body text-sm font-semibold text-admin-text">
// // //                         ₹{Number(order.total_amount).toLocaleString('en-IN')}
// // //                       </span>
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <span className="font-body text-xs text-admin-muted uppercase">{order.payment_method}</span>
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <OrderStatusBadge status={order.status} />
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <span className="font-body text-xs text-admin-muted">
// // //                         {format(new Date(order.created_at), 'dd MMM yy')}
// // //                       </span>
// // //                     </td>

// // //                     <td className="px-5 py-3.5">
// // //                       <button
// // //                         onClick={() => setSelectedOrder(order)}
// // //                         className="text-admin-muted hover:text-brand-400 transition-colors cursor-pointer"
// // //                       >
// // //                         <FiChevronRight className="w-4 h-4" />
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>

// // //           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
// // //         </>
// // //       )}

// // //       <Modal
// // //         open={!!selectedOrder}
// // //         onClose={() => setSelectedOrder(null)}
// // //         title={`Order ${selectedOrder?.order_number || ''}`}
// // //         size="lg"
// // //       >
// // //         {selectedOrder && (
// // //           <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
// // //             <div className="flex items-center gap-3 p-4 bg-admin-bg rounded-xl">
// // //               <div className="flex-1">
// // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Current Status</p>
// // //                 <OrderStatusBadge status={selectedOrder.status} />
// // //               </div>

// // //               <div className="flex-1">
// // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Update Status</p>
// // //                 <select
// // //                   value={selectedOrder.status}
// // //                   onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
// // //                   disabled={updating}
// // //                   className="admin-input text-xs cursor-pointer"
// // //                 >
// // //                   {STATUS_OPTIONS.filter((o) => o.value).map((o) => (
// // //                     <option key={o.value} value={o.value}>{o.label}</option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               {updating && <Spinner size="sm" />}
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="p-4 bg-admin-bg rounded-xl">
// // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Customer</p>
// // //                 <p className="font-body text-sm font-semibold text-admin-text">
// // //                   {(selectedOrder as any).user_name || selectedOrder.shipping_name}
// // //                 </p>
// // //                 <p className="font-body text-xs text-admin-muted mt-0.5">
// // //                   {(selectedOrder as any).user_email || '—'}
// // //                 </p>
// // //                 <p className="font-body text-xs text-admin-muted">{selectedOrder.shipping_phone}</p>
// // //               </div>

// // //               <div className="p-4 bg-admin-bg rounded-xl">
// // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Shipping Address</p>
// // //                 <p className="font-body text-sm text-admin-text">{selectedOrder.shipping_address}</p>
// // //               </div>
// // //             </div>

// // //             {selectedOrder.status === 'cancelled' && (selectedOrder as any).cancellation_reason && (
// // //               <div className="p-4 bg-red-900/20 border border-red-800/40 rounded-xl">
// // //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Cancellation Reason</p>
// // //                 <p className="font-body text-sm text-red-300">{(selectedOrder as any).cancellation_reason}</p>
// // //               </div>
// // //             )}

// // //             <div>
// // //               <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-3">Order Items</p>
// // //               <div className="space-y-2">
// // //                 {selectedOrder.items?.map((item) => (
// // //                   <div key={item.id} className="flex items-center gap-3 p-3 bg-admin-bg rounded-xl">
// // //                     <img
// // //                       src={item.product_image}
// // //                       alt={item.product_title}
// // //                       className="w-12 h-14 rounded-lg object-cover bg-admin-border"
// // //                       onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
// // //                     />

// // //                     <div className="flex-1 min-w-0">
// // //                       <p className="font-body text-sm font-medium text-admin-text line-clamp-1">
// // //                         {item.product_title}
// // //                       </p>
// // //                       <p className="font-body text-xs text-admin-muted">
// // //                         {item.selected_size}
// // //                         {item.selected_color && item.selected_color !== 'Default' ? ` · ${item.selected_color}` : ''}
// // //                         {' · '}Qty: {item.quantity}
// // //                       </p>
// // //                     </div>

// // //                     <span className="font-body text-sm font-semibold text-admin-text">
// // //                       ₹{Number(item.total_price).toLocaleString('en-IN')}
// // //                     </span>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="p-4 bg-admin-bg rounded-xl space-y-2">
// // //               <div className="flex justify-between font-body text-sm text-admin-muted">
// // //                 <span>Subtotal</span>
// // //                 <span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
// // //               </div>

// // //               <div className="flex justify-between font-body text-sm text-admin-muted">
// // //                 <span>Shipping</span>
// // //                 <span>
// // //                   {Number(selectedOrder.shipping_charge) === 0
// // //                     ? 'FREE'
// // //                     : `₹${Number(selectedOrder.shipping_charge).toLocaleString('en-IN')}`}
// // //                 </span>
// // //               </div>

// // //               <div className="flex justify-between font-body text-base font-bold text-admin-text border-t border-admin-border pt-2 mt-2">
// // //                 <span>Total</span>
// // //                 <span>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </Modal>
// // //     </div>
// // //   );
// // // }

// // import { useCallback, useEffect, useRef, useState } from 'react';
// // import { FiSearch, FiShoppingCart, FiChevronRight } from 'react-icons/fi';
// // import toast from 'react-hot-toast';
// // import { format } from 'date-fns';
// // import { adminApi } from '../../api/client';
// // import { Order, OrderStatus } from '../../types';
// // import { PageLoader, Modal, OrderStatusBadge, Pagination, EmptyState, Spinner } from '../../components/ui';
// // import { toastStyle } from '../../store/authstore';

// // const PAGE_SIZE = 15;
// // const SEARCH_DEBOUNCE_MS = 450;
// // const AUTO_REFRESH_MS = 8000;

// // const STATUS_OPTIONS: { value: string; label: string }[] = [
// //   { value: '', label: 'All Statuses' },
// //   { value: 'pending', label: 'Pending' },
// //   { value: 'confirmed', label: 'Confirmed' },
// //   { value: 'processing', label: 'Processing' },
// //   { value: 'shipped', label: 'Shipped' },
// //   { value: 'delivered', label: 'Delivered' },
// //   { value: 'cancelled', label: 'Cancelled' },
// // ];

// // const STATUS_UPDATE_OPTIONS = STATUS_OPTIONS.filter((option) => option.value);

// // export default function Orders() {
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [total, setTotal] = useState(0);
// //   const [page, setPage] = useState(1);

// //   const [searchInput, setSearchInput] = useState('');
// //   const [debouncedSearch, setDebouncedSearch] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('');

// //   const [loading, setLoading] = useState(true);
// //   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// //   const [updating, setUpdating] = useState(false);

// //   const requestIdRef = useRef(0);

// //   useEffect(() => {
// //     const timer = window.setTimeout(() => {
// //       setDebouncedSearch(searchInput.trim());
// //       setPage(1);
// //     }, SEARCH_DEBOUNCE_MS);

// //     return () => window.clearTimeout(timer);
// //   }, [searchInput]);

// //   const load = useCallback(
// //     async (silent = false) => {
// //       const requestId = ++requestIdRef.current;

// //       if (!silent && orders.length === 0) {
// //         setLoading(true);
// //       }

// //       try {
// //         const res = await adminApi.getOrders({
// //           page,
// //           page_size: PAGE_SIZE,
// //           ...(debouncedSearch && { search: debouncedSearch }),
// //           ...(statusFilter && { status: statusFilter }),
// //         });

// //         if (requestId !== requestIdRef.current) return;

// //         const freshOrders: Order[] = res.data.data || [];
// //         setOrders(freshOrders);
// //         setTotal(res.data.total || 0);

// //         setSelectedOrder((current) => {
// //           if (!current) return current;
// //           return freshOrders.find((o) => o.id === current.id) || current;
// //         });
// //       } catch (err: any) {
// //         if (!silent) {
// //           toast.error(err.response?.data?.error || 'Failed to load orders', { style: toastStyle });
// //         }
// //       } finally {
// //         if (requestId === requestIdRef.current) {
// //           setLoading(false);
// //         }
// //       }
// //     },
// //     [page, debouncedSearch, statusFilter, orders.length]
// //   );

// //   useEffect(() => {
// //     load(false);
// //   }, [page, debouncedSearch, statusFilter]);

// //   useEffect(() => {
// //     const interval = window.setInterval(() => {
// //       if (document.visibilityState === 'visible') {
// //         load(true);
// //       }
// //     }, AUTO_REFRESH_MS);

// //     return () => window.clearInterval(interval);
// //   }, [load]);

// //   useEffect(() => {
// //     const handleFocus = () => load(true);
// //     window.addEventListener('focus', handleFocus);
// //     return () => window.removeEventListener('focus', handleFocus);
// //   }, [load]);

// //   const handleStatusUpdate = async (orderId: number, status: string) => {
// //     const currentOrder = orders.find((order) => order.id === orderId) || selectedOrder;

// //     if (currentOrder?.status === 'cancelled') {
// //       toast.error('Cancelled orders cannot be changed.', { style: toastStyle });
// //       return;
// //     }

// //     setUpdating(true);

// //     try {
// //       const res = await adminApi.updateOrderStatus(orderId, status);
// //       const updatedOrder = res.data.data as Order;

// //       toast.success(`Order status updated to ${status}`, { style: toastStyle });

// //       setOrders((prev) =>
// //         prev.map((o) =>
// //           o.id === orderId ? { ...o, ...updatedOrder, status: status as OrderStatus } : o
// //         )
// //       );

// //       setSelectedOrder((prev) =>
// //         prev?.id === orderId ? { ...prev, ...updatedOrder, status: status as OrderStatus } : prev
// //       );

// //       await load(true);
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Failed to update status', { style: toastStyle });
// //       await load(true);
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
// //   const selectedOrderLocked = selectedOrder?.status === 'cancelled';

// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="font-heading text-3xl text-admin-text">Orders</h1>
// //           <p className="font-body text-sm text-admin-muted mt-1">{total} total orders</p>
// //         </div>
// //       </div>

// //       <div className="flex gap-3 flex-wrap items-center">
// //         <div className="relative flex-1 min-w-48">
// //           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
// //           <input
// //             value={searchInput}
// //             onChange={(e) => setSearchInput(e.target.value)}
// //             placeholder="Search order #, email, name..."
// //             className="admin-input pl-10"
// //           />
// //         </div>

// //         <select
// //           value={statusFilter}
// //           onChange={(e) => {
// //             setStatusFilter(e.target.value);
// //             setPage(1);
// //           }}
// //           className="admin-input w-44 cursor-pointer"
// //         >
// //           {STATUS_OPTIONS.map((option) => (
// //             <option key={option.value} value={option.value}>{option.label}</option>
// //           ))}
// //         </select>
// //       </div>

// //       {loading ? (
// //         <PageLoader />
// //       ) : orders.length === 0 ? (
// //         <EmptyState icon={<FiShoppingCart className="w-16 h-16" />} title="No orders found" />
// //       ) : (
// //         <>
// //           <div className="admin-card overflow-hidden overflow-x-auto">
// //             <table className="w-full min-w-[980px]">
// //               <thead>
// //                 <tr className="border-b border-admin-border">
// //                   {['Order #', 'Customer', 'Email', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map((heading) => (
// //                     <th key={heading} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
// //                       {heading}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {orders.map((order) => (
// //                   <tr key={order.id} className="table-row border-b border-admin-border/50 hover:bg-admin-bg/50 transition-colors">
// //                     <td className="px-5 py-3.5">
// //                       <span className="font-mono text-xs text-brand-400">{order.order_number}</span>
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <div>
// //                         <p className="font-body text-sm text-admin-text">
// //                           {(order as any).user_name || order.shipping_name}
// //                         </p>
// //                         <p className="font-body text-xs text-admin-muted">{order.shipping_phone}</p>
// //                       </div>
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <span className="font-body text-xs text-admin-muted">
// //                         {(order as any).user_email || '-'}
// //                       </span>
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <span className="font-body text-sm text-admin-text">{order.items?.length ?? '-'}</span>
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <span className="font-body text-sm font-semibold text-admin-text">
// //                         ₹{Number(order.total_amount).toLocaleString('en-IN')}
// //                       </span>
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <span className="font-body text-xs text-admin-muted uppercase">{order.payment_method}</span>
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <OrderStatusBadge status={order.status} />
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <span className="font-body text-xs text-admin-muted">
// //                         {format(new Date(order.created_at), 'dd MMM yy')}
// //                       </span>
// //                     </td>

// //                     <td className="px-5 py-3.5">
// //                       <button
// //                         onClick={() => setSelectedOrder(order)}
// //                         className="text-admin-muted hover:text-brand-400 transition-colors cursor-pointer"
// //                       >
// //                         <FiChevronRight className="w-4 h-4" />
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
// //         </>
// //       )}

// //       <Modal
// //         open={!!selectedOrder}
// //         onClose={() => setSelectedOrder(null)}
// //         title={`Order ${selectedOrder?.order_number || ''}`}
// //         size="lg"
// //       >
// //         {selectedOrder && (
// //           <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
// //             <div className="flex items-center gap-3 p-4 bg-admin-bg rounded-xl">
// //               <div className="flex-1">
// //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Current Status</p>
// //                 <OrderStatusBadge status={selectedOrder.status} />
// //               </div>

// //               <div className="flex-1">
// //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Update Status</p>
// //                 <select
// //                   value={selectedOrder.status}
// //                   onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
// //                   disabled={updating || selectedOrderLocked}
// //                   className="admin-input text-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
// //                 >
// //                   {STATUS_UPDATE_OPTIONS.map((option) => (
// //                     <option key={option.value} value={option.value}>{option.label}</option>
// //                   ))}
// //                 </select>

// //                 {selectedOrderLocked && (
// //                   <p className="mt-2 font-body text-[11px] text-admin-muted">
// //                     This order was cancelled and its status is locked.
// //                   </p>
// //                 )}
// //               </div>

// //               {updating && <Spinner size="sm" />}
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="p-4 bg-admin-bg rounded-xl">
// //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Customer</p>
// //                 <p className="font-body text-sm font-semibold text-admin-text">
// //                   {(selectedOrder as any).user_name || selectedOrder.shipping_name}
// //                 </p>
// //                 <p className="font-body text-xs text-admin-muted mt-0.5">
// //                   {(selectedOrder as any).user_email || '-'}
// //                 </p>
// //                 <p className="font-body text-xs text-admin-muted">{selectedOrder.shipping_phone}</p>
// //               </div>

// //               <div className="p-4 bg-admin-bg rounded-xl">
// //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Shipping Address</p>
// //                 <p className="font-body text-sm text-admin-text">{selectedOrder.shipping_address}</p>
// //               </div>
// //             </div>

// //             {selectedOrder.status === 'cancelled' && (selectedOrder as any).cancellation_reason && (
// //               <div className="p-4 bg-red-900/20 border border-red-800/40 rounded-xl">
// //                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Cancellation Reason</p>
// //                 <p className="font-body text-sm text-red-300">{(selectedOrder as any).cancellation_reason}</p>
// //               </div>
// //             )}

// //             <div>
// //               <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-3">Order Items</p>
// //               <div className="space-y-2">
// //                 {selectedOrder.items?.map((item) => (
// //                   <div key={item.id} className="flex items-center gap-3 p-3 bg-admin-bg rounded-xl">
// //                     <img
// //                       src={item.product_image}
// //                       alt={item.product_title}
// //                       className="w-12 h-14 rounded-lg object-cover bg-admin-border"
// //                       onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
// //                     />

// //                     <div className="flex-1 min-w-0">
// //                       <p className="font-body text-sm font-medium text-admin-text line-clamp-1">
// //                         {item.product_title}
// //                       </p>
// //                       <p className="font-body text-xs text-admin-muted">
// //                         {item.selected_size}
// //                         {item.selected_color && item.selected_color !== 'Default' ? ` · ${item.selected_color}` : ''}
// //                         {' · '}Qty: {item.quantity}
// //                       </p>
// //                     </div>

// //                     <span className="font-body text-sm font-semibold text-admin-text">
// //                       ₹{Number(item.total_price).toLocaleString('en-IN')}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="p-4 bg-admin-bg rounded-xl space-y-2">
// //               <div className="flex justify-between font-body text-sm text-admin-muted">
// //                 <span>Subtotal</span>
// //                 <span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
// //               </div>

// //               <div className="flex justify-between font-body text-sm text-admin-muted">
// //                 <span>Shipping</span>
// //                 <span>
// //                   {Number(selectedOrder.shipping_charge) === 0
// //                     ? 'FREE'
// //                     : `₹${Number(selectedOrder.shipping_charge).toLocaleString('en-IN')}`}
// //                 </span>
// //               </div>

// //               <div className="flex justify-between font-body text-base font-bold text-admin-text border-t border-admin-border pt-2 mt-2">
// //                 <span>Total</span>
// //                 <span>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // }

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { FiSearch, FiShoppingCart, FiChevronRight, FiChevronDown } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';
// import { adminApi } from '../../api/client';
// import { Order, OrderStatus } from '../../types';
// import { PageLoader, Modal, OrderStatusBadge, Pagination, EmptyState, Spinner } from '../../components/ui';
// import { toastStyle } from '../../store/authstore';

// const PAGE_SIZE = 15;
// const SEARCH_DEBOUNCE_MS = 450;
// const AUTO_REFRESH_MS = 8000;

// const STATUS_OPTIONS: { value: string; label: string }[] = [
//   { value: '', label: 'All Statuses' },
//   { value: 'pending', label: 'Pending' },
//   { value: 'confirmed', label: 'Confirmed' },
//   { value: 'processing', label: 'Processing' },
//   { value: 'shipped', label: 'Shipped' },
//   { value: 'delivered', label: 'Delivered' },
//   { value: 'cancelled', label: 'Cancelled' },
// ];

// const STATUS_UPDATE_OPTIONS = STATUS_OPTIONS.filter((option) => option.value);

// function StatusSelect({
//   value,
//   options,
//   onChange,
//   disabled = false,
//   className = '',
// }: {
//   value: string;
//   options: { value: string; label: string }[];
//   onChange: (value: string) => void;
//   disabled?: boolean;
//   className?: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const selected = options.find((option) => option.value === value) || options[0];

//   return (
//     <div
//       className={`relative ${className}`}
//       onBlur={(e) => {
//         if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
//           setOpen(false);
//         }
//       }}
//     >
//       <button
//         type="button"
//         disabled={disabled}
//         onClick={() => setOpen((current) => !current)}
//         className="admin-input w-full min-h-[42px] flex items-center justify-between gap-3 text-left cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
//       >
//         <span className="truncate">{selected?.label || 'Select status'}</span>
//         <FiChevronDown className={`w-4 h-4 text-admin-muted transition-transform ${open ? 'rotate-180 text-brand-400' : ''}`} />
//       </button>

//       {open && !disabled && (
//         <div className="absolute left-0 right-0 top-full z-[90] mt-2 rounded-2xl border border-brand-500/20 bg-admin-card p-1.5 shadow-2xl shadow-black/30">
//           {options.map((option) => {
//             const isSelected = option.value === value;

//             return (
//               <button
//                 key={option.value || 'all-statuses'}
//                 type="button"
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => {
//                   onChange(option.value);
//                   setOpen(false);
//                 }}
//                 className={`w-full rounded-xl px-3 py-2.5 text-left font-body text-sm transition-colors cursor-pointer ${
//                   isSelected
//                     ? 'bg-brand-500/15 text-brand-300'
//                     : 'text-admin-text hover:bg-admin-hover hover:text-brand-300'
//                 }`}
//               >
//                 {option.label}
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Orders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);

//   const [searchInput, setSearchInput] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [updating, setUpdating] = useState(false);

//   const requestIdRef = useRef(0);

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       setDebouncedSearch(searchInput.trim());
//       setPage(1);
//     }, SEARCH_DEBOUNCE_MS);

//     return () => window.clearTimeout(timer);
//   }, [searchInput]);

//   const load = useCallback(
//     async (silent = false) => {
//       const requestId = ++requestIdRef.current;

//       if (!silent && orders.length === 0) {
//         setLoading(true);
//       }

//       try {
//         const res = await adminApi.getOrders({
//           page,
//           page_size: PAGE_SIZE,
//           ...(debouncedSearch && { search: debouncedSearch }),
//           ...(statusFilter && { status: statusFilter }),
//         });

//         if (requestId !== requestIdRef.current) return;

//         const freshOrders: Order[] = res.data.data || [];
//         setOrders(freshOrders);
//         setTotal(res.data.total || 0);

//         setSelectedOrder((current) => {
//           if (!current) return current;
//           return freshOrders.find((o) => o.id === current.id) || current;
//         });
//       } catch (err: any) {
//         if (!silent) {
//           toast.error(err.response?.data?.error || 'Failed to load orders', { style: toastStyle });
//         }
//       } finally {
//         if (requestId === requestIdRef.current) {
//           setLoading(false);
//         }
//       }
//     },
//     [page, debouncedSearch, statusFilter, orders.length]
//   );

//   useEffect(() => {
//     load(false);
//   }, [page, debouncedSearch, statusFilter]);

//   useEffect(() => {
//     const interval = window.setInterval(() => {
//       if (document.visibilityState === 'visible') {
//         load(true);
//       }
//     }, AUTO_REFRESH_MS);

//     return () => window.clearInterval(interval);
//   }, [load]);

//   useEffect(() => {
//     const handleFocus = () => load(true);
//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [load]);

//   const handleStatusUpdate = async (orderId: number, status: string) => {
//     const currentOrder = orders.find((order) => order.id === orderId) || selectedOrder;

//     if (currentOrder?.status === 'cancelled') {
//       toast.error('Cancelled orders cannot be changed.', { style: toastStyle });
//       return;
//     }

//     setUpdating(true);

//     try {
//       const res = await adminApi.updateOrderStatus(orderId, status);
//       const updatedOrder = res.data.data as Order;

//       toast.success(`Order status updated to ${status}`, { style: toastStyle });

//       setOrders((prev) =>
//         prev.map((o) =>
//           o.id === orderId ? { ...o, ...updatedOrder, status: status as OrderStatus } : o
//         )
//       );

//       setSelectedOrder((prev) =>
//         prev?.id === orderId ? { ...prev, ...updatedOrder, status: status as OrderStatus } : prev
//       );

//       await load(true);
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Failed to update status', { style: toastStyle });
//       await load(true);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
//   const selectedOrderLocked = selectedOrder?.status === 'cancelled';

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-heading text-3xl text-admin-text">Orders</h1>
//           <p className="font-body text-sm text-admin-muted mt-1">{total} total orders</p>
//         </div>
//       </div>

//       <div className="flex gap-3 flex-wrap items-center">
//         <div className="relative flex-1 min-w-48">
//           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
//           <input
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search order #, email, name..."
//             className="admin-input pl-10"
//           />
//         </div>

//         <StatusSelect
//           value={statusFilter}
//           onChange={(value) => {
//             setStatusFilter(value);
//             setPage(1);
//           }}
//           options={STATUS_OPTIONS}
//           className="w-44"
//         />
//       </div>

//       {loading ? (
//         <PageLoader />
//       ) : orders.length === 0 ? (
//         <EmptyState icon={<FiShoppingCart className="w-16 h-16" />} title="No orders found" />
//       ) : (
//         <>
//           <div className="admin-card overflow-hidden overflow-x-auto">
//             <table className="w-full min-w-[980px]">
//               <thead>
//                 <tr className="border-b border-admin-border">
//                   {['Order #', 'Customer', 'Email', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map((heading) => (
//                     <th key={heading} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
//                       {heading}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order.id} className="table-row border-b border-admin-border/50 hover:bg-admin-bg/50 transition-colors">
//                     <td className="px-5 py-3.5">
//                       <span className="font-mono text-xs text-brand-400">{order.order_number}</span>
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <div>
//                         <p className="font-body text-sm text-admin-text">
//                           {(order as any).user_name || order.shipping_name}
//                         </p>
//                         <p className="font-body text-xs text-admin-muted">{order.shipping_phone}</p>
//                       </div>
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <span className="font-body text-xs text-admin-muted">
//                         {(order as any).user_email || '-'}
//                       </span>
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <span className="font-body text-sm text-admin-text">{order.items?.length ?? '-'}</span>
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <span className="font-body text-sm font-semibold text-admin-text">
//                         ₹{Number(order.total_amount).toLocaleString('en-IN')}
//                       </span>
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <span className="font-body text-xs text-admin-muted uppercase">{order.payment_method}</span>
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <OrderStatusBadge status={order.status} />
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <span className="font-body text-xs text-admin-muted">
//                         {format(new Date(order.created_at), 'dd MMM yy')}
//                       </span>
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <button
//                         onClick={() => setSelectedOrder(order)}
//                         className="text-admin-muted hover:text-brand-400 transition-colors cursor-pointer"
//                       >
//                         <FiChevronRight className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//         </>
//       )}

//       <Modal
//         open={!!selectedOrder}
//         onClose={() => setSelectedOrder(null)}
//         title={`Order ${selectedOrder?.order_number || ''}`}
//         size="lg"
//       >
//         {selectedOrder && (
//           <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
//             <div className="flex items-center gap-3 p-4 bg-admin-bg rounded-xl">
//               <div className="flex-1">
//                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Current Status</p>
//                 <OrderStatusBadge status={selectedOrder.status} />
//               </div>

//               <div className="flex-1">
//                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Update Status</p>
//                 <StatusSelect
//                   value={selectedOrder.status}
//                   onChange={(value) => handleStatusUpdate(selectedOrder.id, value)}
//                   disabled={updating || selectedOrderLocked}
//                   options={STATUS_UPDATE_OPTIONS}
//                 />

//                 {selectedOrderLocked && (
//                   <p className="mt-2 font-body text-[11px] text-admin-muted">
//                     This order was cancelled and its status is locked.
//                   </p>
//                 )}
//               </div>

//               {updating && <Spinner size="sm" />}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-4 bg-admin-bg rounded-xl">
//                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Customer</p>
//                 <p className="font-body text-sm font-semibold text-admin-text">
//                   {(selectedOrder as any).user_name || selectedOrder.shipping_name}
//                 </p>
//                 <p className="font-body text-xs text-admin-muted mt-0.5">
//                   {(selectedOrder as any).user_email || '-'}
//                 </p>
//                 <p className="font-body text-xs text-admin-muted">{selectedOrder.shipping_phone}</p>
//               </div>

//               <div className="p-4 bg-admin-bg rounded-xl">
//                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Shipping Address</p>
//                 <p className="font-body text-sm text-admin-text">{selectedOrder.shipping_address}</p>
//               </div>
//             </div>

//             {selectedOrder.status === 'cancelled' && (selectedOrder as any).cancellation_reason && (
//               <div className="p-4 bg-red-900/20 border border-red-800/40 rounded-xl">
//                 <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Cancellation Reason</p>
//                 <p className="font-body text-sm text-red-300">{(selectedOrder as any).cancellation_reason}</p>
//               </div>
//             )}

//             <div>
//               <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-3">Order Items</p>
//               <div className="space-y-2">
//                 {selectedOrder.items?.map((item) => (
//                   <div key={item.id} className="flex items-center gap-3 p-3 bg-admin-bg rounded-xl">
//                     <img
//                       src={item.product_image}
//                       alt={item.product_title}
//                       className="w-12 h-14 rounded-lg object-cover bg-admin-border"
//                       onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
//                     />

//                     <div className="flex-1 min-w-0">
//                       <p className="font-body text-sm font-medium text-admin-text line-clamp-1">
//                         {item.product_title}
//                       </p>
//                       <p className="font-body text-xs text-admin-muted">
//                         {item.selected_size}
//                         {item.selected_color && item.selected_color !== 'Default' ? ` · ${item.selected_color}` : ''}
//                         {' · '}Qty: {item.quantity}
//                       </p>
//                     </div>

//                     <span className="font-body text-sm font-semibold text-admin-text">
//                       ₹{Number(item.total_price).toLocaleString('en-IN')}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="p-4 bg-admin-bg rounded-xl space-y-2">
//               <div className="flex justify-between font-body text-sm text-admin-muted">
//                 <span>Subtotal</span>
//                 <span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
//               </div>

//               <div className="flex justify-between font-body text-sm text-admin-muted">
//                 <span>Shipping</span>
//                 <span>
//                   {Number(selectedOrder.shipping_charge) === 0
//                     ? 'FREE'
//                     : `₹${Number(selectedOrder.shipping_charge).toLocaleString('en-IN')}`}
//                 </span>
//               </div>

//               <div className="flex justify-between font-body text-base font-bold text-admin-text border-t border-admin-border pt-2 mt-2">
//                 <span>Total</span>
//                 <span>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }


import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { adminApi } from '../../api/client';
import { Order, OrderStatus } from '../../types';
import { PageLoader, Modal, OrderStatusBadge, Pagination, EmptyState, Spinner } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

const PAGE_SIZE = 15;
const SEARCH_DEBOUNCE_MS = 450;
const AUTO_REFRESH_MS = 8000;

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_UPDATE_OPTIONS = STATUS_OPTIONS.filter((option) => option.value);

function StatusSelect({
  value,
  options,
  onChange,
  disabled = false,
  className = '',
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selectingRef = useRef(false);
  const selected = options.find((option) => option.value === value) || options[0];

  return (
    <div
      className={`relative ${className}`}
      onBlur={(e) => {
        if (selectingRef.current) return;

        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="admin-input w-full min-h-[42px] flex items-center justify-between gap-3 text-left cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
      >
        <span className="truncate">{selected?.label || 'Select status'}</span>
        <FiChevronDown className={`w-4 h-4 text-admin-muted transition-transform ${open ? 'rotate-180 text-brand-400' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full z-[90] mt-2 rounded-2xl border border-brand-500/20 bg-admin-card p-1.5 shadow-[0_18px_45px_rgba(122,78,72,0.18)]"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value || 'all-statuses'}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectingRef.current = true;
                  }}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    window.setTimeout(() => {
                      selectingRef.current = false;
                    }, 160);
                  }}
                  className={`w-full rounded-xl px-3 py-2.5 text-left font-body text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-brand-500/15 text-brand-300'
                      : 'text-admin-text hover:bg-admin-hover hover:text-brand-300'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);

  const requestIdRef = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const load = useCallback(
    async (silent = false) => {
      const requestId = ++requestIdRef.current;

      if (!silent && orders.length === 0) {
        setLoading(true);
      }

      try {
        const res = await adminApi.getOrders({
          page,
          page_size: PAGE_SIZE,
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(statusFilter && { status: statusFilter }),
        });

        if (requestId !== requestIdRef.current) return;

        const freshOrders: Order[] = res.data.data || [];
        setOrders(freshOrders);
        setTotal(res.data.total || 0);

        setSelectedOrder((current) => {
          if (!current) return current;
          return freshOrders.find((o) => o.id === current.id) || current;
        });
      } catch (err: any) {
        if (!silent) {
          toast.error(err.response?.data?.error || 'Failed to load orders', { style: toastStyle });
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [page, debouncedSearch, statusFilter, orders.length]
  );

  useEffect(() => {
    load(false);
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        load(true);
      }
    }, AUTO_REFRESH_MS);

    return () => window.clearInterval(interval);
  }, [load]);

  useEffect(() => {
    const handleFocus = () => load(true);
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [load]);

  const handleStatusUpdate = async (orderId: number, status: string) => {
    const currentOrder = orders.find((order) => order.id === orderId) || selectedOrder;

    if (currentOrder?.status === 'cancelled') {
      toast.error('Cancelled orders cannot be changed.', { style: toastStyle });
      return;
    }

    setUpdating(true);

    try {
      const res = await adminApi.updateOrderStatus(orderId, status);
      const updatedOrder = res.data.data as Order;

      toast.success(`Order status updated to ${status}`, { style: toastStyle });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, ...updatedOrder, status: status as OrderStatus } : o
        )
      );

      setSelectedOrder((prev) =>
        prev?.id === orderId ? { ...prev, ...updatedOrder, status: status as OrderStatus } : prev
      );

      await load(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update status', { style: toastStyle });
      await load(true);
    } finally {
      setUpdating(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const selectedOrderLocked = selectedOrder?.status === 'cancelled';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Orders</h1>
          <p className="font-body text-sm text-admin-muted mt-1">{total} total orders</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search order #, email, name..."
            className="admin-input pl-10"
          />
        </div>

        <StatusSelect
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
          options={STATUS_OPTIONS}
          className="w-44"
        />
      </div>

      {loading ? (
        <PageLoader />
      ) : orders.length === 0 ? (
        <EmptyState icon={<FiShoppingCart className="w-16 h-16" />} title="No orders found" />
      ) : (
        <>
          <div className="admin-card overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[980px]">
              <thead>
                <tr className="border-b border-admin-border">
                  {['Order #', 'Customer', 'Email', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map((heading) => (
                    <th key={heading} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="table-row border-b border-admin-border/50 hover:bg-admin-bg/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-brand-400">{order.order_number}</span>
                    </td>

                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-body text-sm text-admin-text">
                          {(order as any).user_name || order.shipping_name}
                        </p>
                        <p className="font-body text-xs text-admin-muted">{order.shipping_phone}</p>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-body text-xs text-admin-muted">
                        {(order as any).user_email || '-'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm text-admin-text">{order.items?.length ?? '-'}</span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm font-semibold text-admin-text">
                        ₹{Number(order.total_amount).toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-body text-xs text-admin-muted uppercase">{order.payment_method}</span>
                    </td>

                    <td className="px-5 py-3.5">
                      <OrderStatusBadge status={order.status} />
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-body text-xs text-admin-muted">
                        {format(new Date(order.created_at), 'dd MMM yy')}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-admin-muted hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <Modal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order ${selectedOrder?.order_number || ''}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            <div className="flex items-center gap-3 p-4 bg-admin-bg rounded-xl">
              <div className="flex-1">
                <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Current Status</p>
                <OrderStatusBadge status={selectedOrder.status} />
              </div>

              <div className="flex-1">
                <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Update Status</p>
                <StatusSelect
                  value={selectedOrder.status}
                  onChange={(value) => handleStatusUpdate(selectedOrder.id, value)}
                  disabled={updating || selectedOrderLocked}
                  options={STATUS_UPDATE_OPTIONS}
                />

                {selectedOrderLocked && (
                  <p className="mt-2 font-body text-[11px] text-admin-muted">
                    This order was cancelled and its status is locked.
                  </p>
                )}
              </div>

              {updating && <Spinner size="sm" />}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-admin-bg rounded-xl">
                <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Customer</p>
                <p className="font-body text-sm font-semibold text-admin-text">
                  {(selectedOrder as any).user_name || selectedOrder.shipping_name}
                </p>
                <p className="font-body text-xs text-admin-muted mt-0.5">
                  {(selectedOrder as any).user_email || '-'}
                </p>
                <p className="font-body text-xs text-admin-muted">{selectedOrder.shipping_phone}</p>
              </div>

              <div className="p-4 bg-admin-bg rounded-xl">
                <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-2">Shipping Address</p>
                <p className="font-body text-sm text-admin-text">{selectedOrder.shipping_address}</p>
              </div>
            </div>

            {selectedOrder.status === 'cancelled' && (selectedOrder as any).cancellation_reason && (
              <div className="p-4 bg-[#FFF0F0] border border-[#F0C6C1] rounded-xl">
                <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-1">Cancellation Reason</p>
                <p className="font-body text-sm text-[#C58C85]">{(selectedOrder as any).cancellation_reason}</p>
              </div>
            )}

            <div>
              <p className="font-body text-xs text-admin-muted uppercase tracking-wider mb-3">Order Items</p>
              <div className="space-y-2">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-admin-bg rounded-xl">
                    <img
                      src={item.product_image}
                      alt={item.product_title}
                      className="w-12 h-14 rounded-lg object-cover bg-admin-border"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-admin-text line-clamp-1">
                        {item.product_title}
                      </p>
                      <p className="font-body text-xs text-admin-muted">
                        {item.selected_size}
                        {item.selected_color && item.selected_color !== 'Default' ? ` · ${item.selected_color}` : ''}
                        {' · '}Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="font-body text-sm font-semibold text-admin-text">
                      ₹{Number(item.total_price).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-admin-bg rounded-xl space-y-2">
              <div className="flex justify-between font-body text-sm text-admin-muted">
                <span>Subtotal</span>
                <span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between font-body text-sm text-admin-muted">
                <span>Shipping</span>
                <span>
                  {Number(selectedOrder.shipping_charge) === 0
                    ? 'FREE'
                    : `₹${Number(selectedOrder.shipping_charge).toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="flex justify-between font-body text-base font-bold text-admin-text border-t border-admin-border pt-2 mt-2">
                <span>Total</span>
                <span>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
