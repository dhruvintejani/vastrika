// src/pages/banners/Banners.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/client';
import { Banner } from '../../types';
import { PageLoader, Modal, ConfirmDialog, Badge, EmptyState, Input, Toggle, Spinner } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', cta_text: '', cta_link: '', sort_order: '0', is_active: true, target: 'homepage' });

  const load = async () => { setLoading(true); const r = await adminApi.getBanners(); setBanners(r.data.data || []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditBanner(null); setForm({ title: '', subtitle: '', cta_text: '', cta_link: '', sort_order: '0', is_active: true, target: 'homepage' }); setImageFile(null); setFormOpen(true); };
  const openEdit = (b: Banner) => { setEditBanner(b); setForm({ title: b.title, subtitle: b.subtitle || '', cta_text: b.cta_text || '', cta_link: b.cta_link || '', sort_order: b.sort_order.toString(), is_active: b.is_active, target: b.target || 'homepage' }); setImageFile(null); setFormOpen(true); };

  const handleSave = async () => {
    if (!form.title) { toast.error('Title is required', { style: toastStyle }); return; }
    setSaving(true);
    try {
      const payload = { ...form, sort_order: parseInt(form.sort_order) };
      let bannerId: number;
      if (editBanner) { await adminApi.updateBanner(editBanner.id, payload); bannerId = editBanner.id; toast.success('Banner updated', { style: toastStyle }); }
      else { const r = await adminApi.createBanner(payload); bannerId = r.data.data.id; toast.success('Banner created', { style: toastStyle }); }
      if (imageFile) { await adminApi.uploadBannerImage(bannerId, imageFile); toast.success('Image uploaded', { style: toastStyle }); }
      setFormOpen(false); load();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed', { style: toastStyle }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try { await adminApi.deleteBanner(deleteId); toast.success('Banner deleted', { style: toastStyle }); setDeleteId(null); load(); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div><h1 className="font-heading text-3xl text-admin-text">Banners</h1><p className="font-body text-sm text-admin-muted mt-1">Manage homepage and shop banners</p></div>
        <button onClick={openCreate} className="admin-btn-primary"><FiPlus className="w-4 h-4" /> Add Banner</button>
      </div>

      {loading ? <PageLoader /> : banners.length === 0 ? (
        <EmptyState icon={<FiImage className="w-16 h-16" />} title="No banners yet" description="Add a banner to feature on your homepage" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((banner, i) => (
            <motion.div key={banner.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="admin-card overflow-hidden group hover:border-brand-500/30 transition-all">
              <div className="aspect-[16/5] bg-admin-bg overflow-hidden relative">
                {banner.image_url ? <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  : <div className="w-full h-full flex items-center justify-center"><FiImage className="w-10 h-10 text-admin-border" /></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(banner)} className="w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center hover:bg-brand-800 text-white cursor-pointer"><FiEdit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteId(banner.id)} className="w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center hover:bg-red-800 text-white cursor-pointer"><FiTrash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-admin-text">{banner.title}</p>
                  {banner.subtitle && <p className="font-body text-xs text-admin-muted mt-0.5 line-clamp-1">{banner.subtitle}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs text-admin-muted">Order: {banner.sort_order}</span>
                  <Badge status={banner.is_active ? 'active' : 'inactive'} label={banner.is_active ? 'Live' : 'Off'} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editBanner ? 'Edit Banner' : 'Add Banner'} size="md">
        <div className="space-y-4">
          <Input label="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Festive Season Sale" />
          <Input label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Optional subtitle" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="CTA Button Text" value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} placeholder="Shop Now" />
            <Input label="CTA Link" value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} placeholder="/shop" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Sort Order" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">Target Page</label>
              <select value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} className="admin-input cursor-pointer">
                <option value="homepage">Homepage</option>
                <option value="shop">Shop</option>
                <option value="collections">Collections</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-2 block">Banner Image</label>
            <label className="flex items-center gap-2 border-2 border-dashed border-admin-border rounded-xl p-5 cursor-pointer hover:border-brand-500/50 transition-colors">
              <FiUpload className="w-5 h-5 text-admin-muted" />
              <span className="font-body text-sm text-admin-muted">{imageFile ? imageFile.name : 'Click to upload image'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
            </label>
            {editBanner?.image_url && <img src={editBanner.image_url} alt="" className="mt-2 h-16 rounded-lg object-cover" />}
          </div>
          <Toggle checked={form.is_active} onChange={(v) => setForm({ ...form, is_active: v })} label="Active / Visible" />
        </div>
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-admin-border">
          <button onClick={() => setFormOpen(false)} className="admin-btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary">{saving ? <Spinner size="sm" /> : null}{editBanner ? 'Update' : 'Create'}</button>
        </div>
      </Modal>
      <ConfirmDialog open={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} title="Delete Banner" message="This banner will be permanently deleted and removed from the site." />
    </div>
  );
}