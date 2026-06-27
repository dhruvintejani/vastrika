// src/pages/Orders.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { format } from 'date-fns';
import { ordersApi, OrderListItem } from '../api/orders';

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed:  'bg-blue-100 text-blue-700 border-blue-200',
  processing: 'bg-purple-100 text-purple-700 border-purple-200',
  shipped:    'bg-cyan-100 text-cyan-700 border-cyan-200',
  delivered:  'bg-green-100 text-green-700 border-green-200',
  cancelled:  'bg-red-100 text-red-700 border-red-200',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending', confirmed: 'Confirmed', processing: 'Processing',
  shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const PAGE_SIZE = 10;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await ordersApi.list(page, PAGE_SIZE);
        setOrders(res.data.data ?? []);
        setTotal(res.data.total ?? 0);
      } catch {
        setError('Could not load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="bg-[#EFE7DC] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-body text-[#999] mb-4">
            <Link to="/" className="hover:text-[#7A4E48] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#555]">My Orders</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#1F1F1F]">My Orders</h1>
          <p className="font-body text-sm text-[#777] mt-2">{total} order{total !== 1 ? 's' : ''} placed</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8DCCB] p-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-[#EFE7DC] rounded-full w-32" />
                    <div className="h-3 bg-[#EFE7DC] rounded-full w-24" />
                  </div>
                  <div className="h-6 bg-[#EFE7DC] rounded-full w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="font-body text-base text-red-500 mb-4">{error}</p>
            <button onClick={() => setPage(1)} className="font-body text-sm text-[#7A4E48] hover:text-[#C9A86A] cursor-pointer">Try again</button>
          </div>
        ) : orders.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-6">
              <FiPackage className="w-10 h-10 text-[#C9A86A]" />
            </div>
            <h2 className="font-heading text-3xl font-semibold text-[#1F1F1F] mb-3">No orders yet</h2>
            <p className="font-body text-sm text-[#999] mb-8 max-w-sm mx-auto">
              You haven't placed any orders yet. Explore our beautiful collection!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#7A4E48] text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#5A3A36] transition-colors cursor-pointer"
            >
              Start Shopping <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/orders/${order.id}`}
                  className="block bg-white rounded-2xl border border-[#E8DCCB] p-5 shadow-sm hover:shadow-md hover:border-[#C9A86A]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="font-mono text-sm font-semibold text-[#7A4E48]">{order.order_number}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-body font-semibold uppercase tracking-wide border ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABELS[order.status] || order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="font-body text-xs text-[#999]">
                          {format(new Date(order.created_at), 'dd MMM yyyy, h:mm a')}
                        </span>
                        <span className="font-body text-xs text-[#999]">
                          {order.item_count} item{order.item_count !== 1 ? 's' : ''}
                        </span>
                        <span className="font-body text-xs text-[#999] uppercase">{order.payment_method}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-heading text-lg font-bold text-[#7A4E48]">
                        ₹{Number(order.total_amount).toLocaleString('en-IN')}
                      </span>
                      <FiChevronRight className="w-4 h-4 text-[#CCC] group-hover:text-[#7A4E48] transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <span className="font-body text-sm text-[#999]">Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => p - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-[#E8DCCB] text-[#777] font-body text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 border border-[#E8DCCB] text-[#777] font-body text-sm rounded-xl hover:bg-[#EFE7DC] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}