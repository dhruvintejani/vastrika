// src/pages/coupons/Coupons.tsx
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { adminApi } from '../../api/client';
import { Coupon } from '../../types';
import { PageLoader, Modal, ConfirmDialog, Badge, EmptyState, Input, Textarea, Select, Toggle, Spinner, Pagination } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

const initForm = { code: '', description: '', discount_type: 'percentage', discount_value: '', min_order_amount: '0', max_discount_amount: '', usage_limit: '', is_active: true, expires_at: '' };

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState(initForm);
  const PAGE_SIZE = 15;

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.getCoupons({ page, page_size: PAGE_SIZE });
    setCoupons(res.data.data || []);
    setTotal(res.data.total || 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditCoupon(null);
    setForm(initForm);
    setFormOpen(true);
  };

  const openEdit = (c: Coupon) => {
    setEditCoupon(c);
    setForm({
      code: c.code, description: c.description || '', discount_type: c.discount_type,
      discount_value: c.discount_value.toString(), min_order_amount: c.min_order_amount.toString(),
      max_discount_amount: c.max_discount_amount?.toString() || '', usage_limit: c.usage_limit?.toString() || '',
      is_active: c.is_active, expires_at: c.expires_at ? c.expires_at.split('T')[0] : '',
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.code || !form.discount_value) { toast.error('Fill in required fields', { style: toastStyle }); return; }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        code: form.code.toUpperCase(), description: form.description || null,
        discount_type: form.discount_type, discount_value: parseFloat(form.discount_value),
        min_order_amount: parseFloat(form.min_order_amount) || 0, is_active: form.is_active,
        max_discount_amount: form.max_discount_amount ? parseFloat(form.max_discount_amount) : null,
        usage_limit: form.usage_limit ? parseInt(form.usage_limit) : null,
        expires_at: form.expires_at || null,
      };
      if (editCoupon) { await adminApi.updateCoupon(editCoupon.id, payload); toast.success('Coupon updated', { style: toastStyle }); }
      else { await adminApi.createCoupon(payload); toast.success('Coupon created', { style: toastStyle }); }
      setFormOpen(false); load();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed', { style: toastStyle }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.deleteCoupon(deleteId);
      toast.success('Coupon deleted', { style: toastStyle });
      setDeleteId(null); load();
    } finally { setDeleting(false); }
  };

  const copyCode = (code: string) => { navigator.clipboard.writeText(code); toast.success('Copied!', { style: toastStyle }); };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Coupons</h1>
          <p className="font-body text-sm text-admin-muted mt-1">{total} discount codes</p>
        </div>
        <button onClick={openCreate} className="admin-btn-primary"><FiPlus className="w-4 h-4" /> Add Coupon</button>
      </div>

      {loading ? <PageLoader /> : coupons.length === 0 ? (
        <EmptyState icon={<FiTag className="w-16 h-16" />} title="No coupons yet" description="Create discount codes for your customers" />
      ) : (
        <>
          <div className="admin-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-admin-border">
                  {['Code', 'Discount', 'Usage', 'Min Order', 'Expires', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="table-row">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-brand-400">{coupon.code}</span>
                        <button onClick={() => copyCode(coupon.code)} className="text-admin-muted hover:text-admin-text cursor-pointer"><FiCopy className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm text-admin-text">
                        {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                        {coupon.max_discount_amount ? ` (max ₹${coupon.max_discount_amount})` : ''}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm text-admin-text">
                        {coupon.used_count}{coupon.usage_limit ? `/${coupon.usage_limit}` : ''} used
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm text-admin-muted">
                        {Number(coupon.min_order_amount) > 0 ? `₹${coupon.min_order_amount}` : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-xs text-admin-muted">
                        {coupon.expires_at ? format(new Date(coupon.expires_at), 'dd MMM yyyy') : 'Never'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={coupon.is_active ? 'active' : 'inactive'} label={coupon.is_active ? 'Active' : 'Inactive'} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(coupon)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-brand-800/30 text-admin-muted hover:text-brand-400 cursor-pointer"><FiEdit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setDeleteId(coupon.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-900/30 text-admin-muted hover:text-red-400 cursor-pointer"><FiTrash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} onChange={setPage} />
        </>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editCoupon ? 'Edit Coupon' : 'Add Coupon'} size="md">
        <div className="space-y-4">
          <Input label="Coupon Code *" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. FESTIVE20" />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description..." />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Discount Type" value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value })}>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </Select>
            <Input label="Discount Value *" type="number" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: e.target.value })} placeholder={form.discount_type === 'percentage' ? '20' : '200'} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Min Order (₹)" type="number" value={form.min_order_amount} onChange={(e) => setForm({ ...form, min_order_amount: e.target.value })} />
            <Input label="Max Discount (₹)" type="number" value={form.max_discount_amount} onChange={(e) => setForm({ ...form, max_discount_amount: e.target.value })} placeholder="Optional cap" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Usage Limit" type="number" value={form.usage_limit} onChange={(e) => setForm({ ...form, usage_limit: e.target.value })} placeholder="Unlimited" />
            <Input label="Expires On" type="date" value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} />
          </div>
          <Toggle checked={form.is_active} onChange={(v) => setForm({ ...form, is_active: v })} label="Active" />
        </div>
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-admin-border">
          <button onClick={() => setFormOpen(false)} className="admin-btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary">{saving ? <Spinner size="sm" /> : null}{editCoupon ? 'Update' : 'Create'}</button>
        </div>
      </Modal>

      <ConfirmDialog open={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} title="Delete Coupon" message="This coupon will be permanently deleted and can no longer be used." />
    </div>
  );
}