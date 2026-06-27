// src/pages/inventory/Inventory.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/client';
import { LowStockItem } from '../../types';
import { PageLoader, EmptyState, Input, Spinner } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

export default function Inventory() {
  const [items, setItems] = useState<LowStockItem[]>([]);
  const [outCount, setOutCount] = useState(0);
  const [lowCount, setLowCount] = useState(0);
  const [threshold, setThreshold] = useState(5);
  const [loading, setLoading] = useState(true);
  const [stockEdits, setStockEdits] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await adminApi.getInventory(threshold);
    const inv = res.data.data;
    setItems(inv.low_stock_items || []);
    setOutCount(inv.out_of_stock_count);
    setLowCount(inv.low_stock_count);
    setLoading(false);
  };

  useEffect(() => { load(); }, [threshold]);

  const handleStockUpdate = async (item: LowStockItem) => {
    const newStock = parseInt(stockEdits[item.variant_id] ?? item.stock.toString());
    if (isNaN(newStock) || newStock < 0) { toast.error('Enter a valid stock number', { style: toastStyle }); return; }
    setSaving(item.variant_id);
    try {
      await adminApi.updateStock(item.product_id, item.variant_id, newStock);
      toast.success('Stock updated', { style: toastStyle });
      setStockEdits((prev) => { const n = { ...prev }; delete n[item.variant_id]; return n; });
      load();
    } catch { toast.error('Failed to update stock', { style: toastStyle }); }
    finally { setSaving(null); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Inventory</h1>
          <p className="font-body text-sm text-admin-muted mt-1">Track low stock and out-of-stock variants</p>
        </div>
        <button onClick={load} className="admin-btn-secondary">
          <FiRefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <FiAlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="font-body text-xs text-admin-muted uppercase tracking-wider">Out of Stock</p>
            <p className="font-heading text-3xl text-admin-text">{outCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <FiAlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="font-body text-xs text-admin-muted uppercase tracking-wider">Low Stock</p>
            <p className="font-heading text-3xl text-admin-text">{lowCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 admin-card p-4">
          <label className="font-body text-xs text-admin-muted whitespace-nowrap">Low stock threshold</label>
          <input type="number" min={1} value={threshold} onChange={(e) => setThreshold(parseInt(e.target.value) || 5)} className="admin-input w-20 text-center" />
        </div>
      </div>

      {loading ? <PageLoader /> : items.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="w-8 h-8 text-green-400" />
          </div>
          <p className="font-heading text-xl text-admin-text">All stocked up!</p>
          <p className="font-body text-sm text-admin-muted mt-1">No variants below threshold of {threshold}</p>
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-admin-border">
                {['Product', 'Category', 'Variant', 'Current Stock', 'Update Stock'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <motion.tr
                  key={item.variant_id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="table-row"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-body text-sm font-medium text-admin-text line-clamp-1">{item.product_title}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-body text-xs text-admin-muted">{item.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-body text-xs text-admin-text">{item.size} / {item.color}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`font-body text-sm font-bold ${item.stock === 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {item.stock === 0 ? 'Out of stock' : `${item.stock} left`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        value={stockEdits[item.variant_id] ?? item.stock}
                        onChange={(e) => setStockEdits((prev) => ({ ...prev, [item.variant_id]: e.target.value }))}
                        className="admin-input w-20 text-center text-sm"
                      />
                      <button
                        onClick={() => handleStockUpdate(item)}
                        disabled={saving === item.variant_id}
                        className="admin-btn-primary px-3 py-2 text-xs"
                      >
                        {saving === item.variant_id ? <Spinner size="sm" /> : 'Update'}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}