// src/pages/categories/Categories.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiLayers } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/client';
import { Category } from '../../types';
import { PageLoader, Modal, ConfirmDialog, EmptyState, Badge, Input, Textarea, Toggle, Spinner } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', is_active: true });

  const load = async () => {
    setLoading(true);
    const res = await adminApi.getCategories();
    setCategories(res.data.data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditCat(null);
    setForm({ name: '', description: '', is_active: true });
    setFormOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditCat(cat);
    setForm({ name: cat.name, description: cat.description || '', is_active: cat.is_active });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name) { toast.error('Name is required', { style: toastStyle }); return; }
    setSaving(true);
    try {
      if (editCat) {
        await adminApi.updateCategory(editCat.id, form);
        toast.success('Category updated', { style: toastStyle });
      } else {
        await adminApi.createCategory(form);
        toast.success('Category created', { style: toastStyle });
      }
      setFormOpen(false);
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed', { style: toastStyle });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.deleteCategory(deleteId);
      toast.success('Category deleted', { style: toastStyle });
      setDeleteId(null);
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Cannot delete — products may be using this category', { style: toastStyle });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Categories</h1>
          <p className="font-body text-sm text-admin-muted mt-1">{categories.length} categories</p>
        </div>
        <button onClick={openCreate} className="admin-btn-primary">
          <FiPlus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? <PageLoader /> : categories.length === 0 ? (
        <EmptyState icon={<FiLayers className="w-16 h-16" />} title="No categories yet" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="admin-card p-5 flex items-start justify-between group hover:border-brand-500/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                  <FiLayers className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-admin-text">{cat.name}</h3>
                  <p className="font-body text-xs text-admin-muted mt-0.5">/shop?category={cat.name}</p>
                  {cat.description && (
                    <p className="font-body text-xs text-admin-muted mt-1 line-clamp-2">{cat.description}</p>
                  )}
                  <div className="mt-2">
                    <Badge status={cat.is_active ? 'active' : 'inactive'} label={cat.is_active ? 'Active' : 'Inactive'} />
                  </div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(cat)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-brand-800/30 text-admin-muted hover:text-brand-400 transition-colors cursor-pointer">
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleteId(cat.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-900/30 text-admin-muted hover:text-red-400 transition-colors cursor-pointer">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editCat ? 'Edit Category' : 'Add Category'} size="sm">
        <div className="space-y-4">
          <Input label="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sarees" />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description..." />
          <Toggle checked={form.is_active} onChange={(v) => setForm({ ...form, is_active: v })} label="Active" />
        </div>
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-admin-border">
          <button onClick={() => setFormOpen(false)} className="admin-btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
            {saving ? <Spinner size="sm" /> : null}
            {editCat ? 'Update' : 'Create'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={deleteId !== null} onClose={() => setDeleteId(null)}
        onConfirm={handleDelete} loading={deleting}
        title="Delete Category"
        message="This will permanently delete the category. Products using this category cannot be deleted."
      />
    </div>
  );
}