// src/pages/customers/Customers.tsx
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUsers, FiShield, FiShieldOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { adminApi } from '../../api/client';
import { User } from '../../types';
import { PageLoader, Badge, Pagination, EmptyState, ConfirmDialog } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

export default function Customers() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState<{ id: number; block: boolean } | null>(null);
  const PAGE_SIZE = 20;

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.getUsers({ page, page_size: PAGE_SIZE });
    setUsers(res.data.data || []);
    setTotal(res.data.total || 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const filtered = users.filter(
    (u) => !search || u.full_name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleBlock = async () => {
    if (!confirmAction) return;
    try {
      if (confirmAction.block) { await adminApi.blockUser(confirmAction.id); toast.success('User blocked', { style: toastStyle }); }
      else { await adminApi.unblockUser(confirmAction.id); toast.success('User unblocked', { style: toastStyle }); }
      setConfirmAction(null);
      load();
    } catch { toast.error('Failed', { style: toastStyle }); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Customers</h1>
          <p className="font-body text-sm text-admin-muted mt-1">{total} registered accounts</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="admin-input pl-10" />
      </div>

      {loading ? <PageLoader /> : filtered.length === 0 ? (
        <EmptyState icon={<FiUsers className="w-16 h-16" />} title="No customers found" />
      ) : (
        <>
          <div className="admin-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-admin-border">
                  {['Customer', 'Location', 'Joined', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="table-row">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="font-heading text-sm text-brand-400">{user.full_name[0]}</span>
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-admin-text">{user.full_name}</p>
                          <p className="font-body text-xs text-admin-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm text-admin-muted">
                        {[user.city, user.state].filter(Boolean).join(', ') || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-xs text-admin-muted">{format(new Date(user.created_at), 'dd MMM yyyy')}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={user.is_blocked ? 'blocked' : 'active'} label={user.is_blocked ? 'Blocked' : 'Active'} />
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setConfirmAction({ id: user.id, block: !user.is_blocked })}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${user.is_blocked ? 'hover:bg-green-900/30 text-admin-muted hover:text-green-400' : 'hover:bg-red-900/30 text-admin-muted hover:text-red-400'}`}
                      >
                        {user.is_blocked ? <FiShieldOff className="w-4 h-4" /> : <FiShield className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} onChange={setPage} />
        </>
      )}

      <ConfirmDialog
        open={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleToggleBlock}
        title={confirmAction?.block ? 'Block User' : 'Unblock User'}
        message={confirmAction?.block ? 'This user will not be able to login until unblocked.' : 'This user will regain access to their account.'}
      />
    </div>
  );
}