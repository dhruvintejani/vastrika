// src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import {
  FiUsers, FiShoppingCart, FiDollarSign, FiPackage,
  FiClock, FiTrendingUp, FiArrowUpRight,
} from 'react-icons/fi';
import { adminApi } from '../../api/client';
import { DashboardStats, RevenueDataPoint, Order } from '../../types';
import { PageLoader, OrderStatusBadge, Badge } from '../../components/ui';
import { format } from 'date-fns';

const PERIOD_OPTIONS = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '12 Months', value: '12m' },
];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<RevenueDataPoint[]>([]);
  const [period, setPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [dashRes, revenueRes] = await Promise.all([
        adminApi.getDashboard(),
        adminApi.getRevenue(period),
      ]);
      setStats(dashRes.data.data.stats);
      setRecentOrders(dashRes.data.data.recent_orders);
      setChartData(revenueRes.data.data.data);
      setLoading(false);
    };
    load();
  }, [period]);

  if (loading || !stats) return <PageLoader />;

  const statCards = [
    {
      label: 'Total Revenue',
      value: `₹${Number(stats.total_revenue).toLocaleString('en-IN')}`,
      sub: `₹${Number(stats.revenue_today).toLocaleString('en-IN')} today`,
      icon: FiDollarSign,
      color: 'text-brand-400',
      bg: 'bg-brand-500/10',
    },
    {
      label: 'Total Orders',
      value: stats.total_orders.toLocaleString(),
      sub: `${stats.orders_today} today`,
      icon: FiShoppingCart,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Total Customers',
      value: stats.total_users.toLocaleString(),
      sub: 'registered accounts',
      icon: FiUsers,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Active Products',
      value: stats.total_products.toLocaleString(),
      sub: `${stats.pending_orders} orders pending`,
      icon: FiPackage,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Dashboard</h1>
          <p className="font-body text-sm text-admin-muted mt-1">
            {format(new Date(), 'EEEE, MMMM d yyyy')}
          </p>
        </div>
        {stats.pending_orders > 0 && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 bg-yellow-900/30 border border-yellow-700/40 text-yellow-400 font-body text-sm px-4 py-2 rounded-xl"
          >
            <FiClock className="w-4 h-4" />
            {stats.pending_orders} pending orders
          </motion.div>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <FiArrowUpRight className="w-4 h-4 text-admin-muted" />
            </div>
            <div>
              <p className="font-body text-xs text-admin-muted uppercase tracking-wider">{card.label}</p>
              <p className="font-heading text-2xl text-admin-text mt-1">{card.value}</p>
              <p className="font-body text-xs text-admin-muted mt-0.5">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-xl text-admin-text">Revenue Overview</h2>
            <p className="font-body text-xs text-admin-muted mt-0.5">Orders that are not cancelled</p>
          </div>
          <div className="flex gap-1 bg-admin-bg rounded-xl p-1 border border-admin-border">
            {PERIOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPeriod(opt.value)}
                className={`font-body text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  period === opt.value
                    ? 'bg-brand-800 text-white'
                    : 'text-admin-muted hover:text-admin-text'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c9a86a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#c9a86a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
            <XAxis dataKey="label" tick={{ fill: '#888', fontSize: 11, fontFamily: 'Outfit' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#888', fontSize: 11, fontFamily: 'Outfit' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#232323', border: '1px solid #2e2e2e', borderRadius: '12px', fontFamily: 'Outfit', fontSize: '13px' }}
              labelStyle={{ color: '#f0ebe3' }}
              itemStyle={{ color: '#c9a86a' }}
              formatter={(v: number) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="revenue" stroke="#c9a86a" strokeWidth={2} fill="url(#revenueGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="admin-card">
        <div className="flex items-center justify-between p-6 border-b border-admin-border">
          <h2 className="font-heading text-xl text-admin-text">Recent Orders</h2>
          <a href="/orders" className="font-body text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
            View all <FiArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-admin-border">
                {['Order', 'Customer', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="table-row">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-brand-400">{order.order_number}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body text-sm text-admin-text">{order.user_name}</p>
                      <p className="font-body text-xs text-admin-muted">{order.user_email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm font-semibold text-admin-text">
                      ₹{Number(order.total_amount).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-xs text-admin-muted">
                      {format(new Date(order.created_at), 'dd MMM yyyy')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}