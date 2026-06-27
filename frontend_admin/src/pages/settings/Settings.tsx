// src/pages/settings/Settings.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/client';
import { Setting } from '../../types';
import { PageLoader, Spinner, Toggle } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

export default function Settings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getSettings().then((res) => {
      const s: Setting[] = res.data.data || [];
      setSettings(s);
      const v: Record<string, string> = {};
      s.forEach((item) => { v[item.key] = item.value; });
      setValues(v);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateSettings(values);
      toast.success('Settings saved successfully', { style: toastStyle });
    } catch {
      toast.error('Failed to save settings', { style: toastStyle });
    } finally {
      setSaving(false);
    }
  };

  // Group settings by their group field
  const grouped = settings.reduce<Record<string, Setting[]>>((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {});

  const groupLabels: Record<string, string> = {
    general: 'General Settings',
    shipping: 'Shipping Settings',
  };

  const isBooleanKey = (key: string) =>
    ['maintenance_mode', 'allow_reviews', 'auto_approve_reviews'].includes(key);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Settings</h1>
          <p className="font-body text-sm text-admin-muted mt-1">Configure your store settings</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
          {saving ? <Spinner size="sm" /> : <FiSave className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {Object.entries(grouped).map(([group, items], gi) => (
        <motion.div
          key={group}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.08 }}
          className="admin-card p-6"
        >
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-admin-border">
            <FiSettings className="w-4 h-4 text-brand-400" />
            <h2 className="font-heading text-lg text-admin-text">
              {groupLabels[group] || group}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((setting) => (
              <div key={setting.key}>
                <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-2 block">
                  {setting.label}
                </label>
                {isBooleanKey(setting.key) ? (
                  <Toggle
                    checked={values[setting.key] === 'true'}
                    onChange={(v) => setValues({ ...values, [setting.key]: v ? 'true' : 'false' })}
                    label={values[setting.key] === 'true' ? 'Enabled' : 'Disabled'}
                  />
                ) : (
                  <input
                    type="text"
                    value={values[setting.key] || ''}
                    onChange={(e) => setValues({ ...values, [setting.key]: e.target.value })}
                    className="admin-input"
                  />
                )}
                <p className="font-mono text-[10px] text-admin-muted/50 mt-1">{setting.key}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Save button bottom */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
          {saving ? <Spinner size="sm" /> : <FiSave className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}