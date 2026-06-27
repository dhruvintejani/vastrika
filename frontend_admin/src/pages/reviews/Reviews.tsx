// src/pages/reviews/Reviews.tsx
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiFlag, FiStar, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { adminApi } from '../../api/client';
import { Review } from '../../types';
import { PageLoader, Badge, Pagination, EmptyState, StarRating, ConfirmDialog } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'flagged'>('all');
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [acting, setActing] = useState<number | null>(null);
  const PAGE_SIZE = 15;

  const load = useCallback(async () => {
    setLoading(true);
    const params: Record<string, unknown> = { page, page_size: PAGE_SIZE };
    if (filter === 'pending') params.approved = false;
    if (filter === 'approved') params.approved = true;
    if (filter === 'flagged') params.flagged = true;
    const res = await adminApi.getReviews(params);
    setReviews(res.data.data || []);
    setTotal(res.data.total || 0);
    setLoading(false);
  }, [page, filter]);

  useEffect(() => { load(); }, [load]);

  const handleApprove = async (id: number) => {
    setActing(id);
    try {
      await adminApi.approveReview(id);
      toast.success('Review approved', { style: toastStyle });
      load();
    } catch { toast.error('Failed', { style: toastStyle }); }
    finally { setActing(null); }
  };

  const handleReject = async () => {
    if (!rejectId) return;
    setActing(rejectId);
    try {
      await adminApi.rejectReview(rejectId);
      toast.success('Review rejected', { style: toastStyle });
      setRejectId(null);
      load();
    } catch { toast.error('Failed', { style: toastStyle }); }
    finally { setActing(null); }
  };

  const handleFlag = async (id: number) => {
    setActing(id);
    try {
      await adminApi.flagReview(id);
      toast.success('Review flagged for review', { style: toastStyle });
      load();
    } catch { toast.error('Failed', { style: toastStyle }); }
    finally { setActing(null); }
  };

  const FILTER_TABS = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'flagged', label: 'Flagged' },
  ] as const;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-admin-text">Reviews</h1>
        <p className="font-body text-sm text-admin-muted mt-1">{total} reviews · moderate customer feedback</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-admin-surface border border-admin-border rounded-xl p-1 w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setFilter(tab.key); setPage(1); }}
            className={`font-body text-sm px-4 py-2 rounded-lg transition-all cursor-pointer ${
              filter === tab.key ? 'bg-brand-800 text-white' : 'text-admin-muted hover:text-admin-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? <PageLoader /> : reviews.length === 0 ? (
        <EmptyState
          icon={<FiStar className="w-16 h-16" />}
          title="No reviews found"
          description={filter === 'pending' ? 'No reviews awaiting moderation' : 'No reviews in this category'}
        />
      ) : (
        <>
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`admin-card p-5 ${review.is_flagged ? 'border-red-800/40' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-heading text-sm text-brand-400">{review.user_name[0]}</span>
                      </div>
                      <div>
                        <span className="font-body text-sm font-semibold text-admin-text">{review.user_name}</span>
                        <span className="font-body text-xs text-admin-muted ml-2">on</span>
                        <span className="font-body text-xs text-brand-400 ml-1">{review.product_title}</span>
                      </div>
                      <StarRating rating={review.rating} />
                      <span className="font-body text-xs text-admin-muted ml-auto">
                        {format(new Date(review.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>

                    {/* Review content */}
                    {review.title && (
                      <p className="font-body text-sm font-semibold text-admin-text mb-1">{review.title}</p>
                    )}
                    {review.body && (
                      <p className="font-body text-sm text-admin-muted leading-relaxed">{review.body}</p>
                    )}

                    {/* Status badges */}
                    <div className="flex gap-2 mt-3">
                      {review.is_approved && <Badge status="approved" label="Approved" />}
                      {!review.is_approved && !review.is_flagged && <Badge status="pending_review" label="Pending" />}
                      {review.is_flagged && <Badge status="flagged" label="Flagged" />}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    {!review.is_approved && (
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={acting === review.id}
                        title="Approve"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-900/30 hover:bg-green-900/60 text-green-400 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                    )}
                    {!review.is_flagged && (
                      <button
                        onClick={() => handleFlag(review.id)}
                        disabled={acting === review.id}
                        title="Flag for review"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-900/30 hover:bg-yellow-900/60 text-yellow-400 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FiFlag className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setRejectId(review.id)}
                      disabled={acting === review.id}
                      title="Reject & delete"
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-900/30 hover:bg-red-900/60 text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} onChange={setPage} />
        </>
      )}

      <ConfirmDialog
        open={rejectId !== null}
        onClose={() => setRejectId(null)}
        onConfirm={handleReject}
        title="Reject Review"
        message="This review will be permanently deleted and will not appear on the product page."
      />
    </div>
  );
}