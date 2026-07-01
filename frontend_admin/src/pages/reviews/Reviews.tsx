// // import { useCallback, useEffect, useRef, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { FiCheck, FiX, FiFlag, FiStar, FiUser, FiMail, FiPackage } from 'react-icons/fi';
// // import toast from 'react-hot-toast';
// // import { format } from 'date-fns';
// // import { adminApi } from '../../api/client';
// // import { Review } from '../../types';
// // import { PageLoader, Pagination, EmptyState, StarRating, ConfirmDialog } from '../../components/ui';
// // import { toastStyle } from '../../store/authstore';

// // type ReviewFilter = 'all' | 'flagged' | 'removed';

// // const PAGE_SIZE = 15;
// // const AUTO_REFRESH_MS = 8000;

// // const FILTER_TABS: { key: ReviewFilter; label: string }[] = [
// //   { key: 'all', label: 'All' },
// //   { key: 'flagged', label: 'Flagged' },
// //   { key: 'removed', label: 'Removed' },
// // ];

// // function ReviewStatus({ review }: { review: Review }) {
// //   if (review.is_removed) {
// //     return (
// //       <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-red-900/30 text-red-300 border border-red-800/50">
// //         Removed
// //       </span>
// //     );
// //   }

// //   if (review.is_flagged) {
// //     return (
// //       <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-yellow-900/30 text-yellow-300 border border-yellow-800/50">
// //         Flagged
// //       </span>
// //     );
// //   }

// //   return (
// //     <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-900/30 text-green-300 border border-green-800/50">
// //       Public
// //     </span>
// //   );
// // }

// // export default function Reviews() {
// //   const [reviews, setReviews] = useState<Review[]>([]);
// //   const [total, setTotal] = useState(0);
// //   const [page, setPage] = useState(1);
// //   const [filter, setFilter] = useState<ReviewFilter>('all');
// //   const [loading, setLoading] = useState(true);
// //   const [removeId, setRemoveId] = useState<number | null>(null);
// //   const [acting, setActing] = useState<number | null>(null);
// //   const requestIdRef = useRef(0);

// //   const load = useCallback(
// //     async (silent = false) => {
// //       const requestId = ++requestIdRef.current;

// //       if (!silent) {
// //         setLoading(true);
// //       }

// //       const params: Record<string, unknown> = { page, page_size: PAGE_SIZE };
// //       if (filter === 'flagged') params.flagged = true;
// //       if (filter === 'removed') params.removed = true;

// //       try {
// //         const res = await adminApi.getReviews(params);
// //         if (requestId !== requestIdRef.current) return;

// //         setReviews(res.data.data || []);
// //         setTotal(res.data.total || 0);
// //       } catch (err: any) {
// //         if (!silent) {
// //           toast.error(err.response?.data?.error || 'Failed to load reviews', { style: toastStyle });
// //         }
// //       } finally {
// //         if (requestId === requestIdRef.current) {
// //           setLoading(false);
// //         }
// //       }
// //     },
// //     [page, filter]
// //   );

// //   useEffect(() => {
// //     load(false);
// //   }, [load]);

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

// //   const replaceOrRemoveLocal = (updated: Review, removeFromCurrentList: boolean) => {
// //     setReviews((prev) => {
// //       if (removeFromCurrentList) {
// //         return prev.filter((review) => review.id !== updated.id);
// //       }

// //       return prev.map((review) => (review.id === updated.id ? updated : review));
// //     });

// //     if (removeFromCurrentList) {
// //       setTotal((prev) => Math.max(0, prev - 1));
// //     }
// //   };

// //   const handleApprove = async (id: number) => {
// //     setActing(id);

// //     try {
// //       const res = await adminApi.approveReview(id);
// //       const updated = res.data.data as Review;

// //       replaceOrRemoveLocal(updated, filter === 'flagged' || filter === 'removed');
// //       toast.success('Review made public', { style: toastStyle });
// //       load(true);
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Failed to update review', { style: toastStyle });
// //     } finally {
// //       setActing(null);
// //     }
// //   };

// //   const handleRemove = async () => {
// //     if (!removeId) return;

// //     setActing(removeId);

// //     try {
// //       const res = await adminApi.rejectReview(removeId);
// //       const updated = res.data.data as Review;

// //       replaceOrRemoveLocal(updated, filter !== 'removed');
// //       setRemoveId(null);
// //       toast.success('Review removed', { style: toastStyle });
// //       load(true);
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Failed to remove review', { style: toastStyle });
// //     } finally {
// //       setActing(null);
// //     }
// //   };

// //   const handleFlag = async (id: number) => {
// //     setActing(id);

// //     try {
// //       const res = await adminApi.flagReview(id);
// //       const updated = res.data.data as Review;

// //       replaceOrRemoveLocal(updated, false);
// //       toast.success('Review hidden and flagged', { style: toastStyle });
// //       load(true);
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Failed to flag review', { style: toastStyle });
// //     } finally {
// //       setActing(null);
// //     }
// //   };

// //   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div>
// //         <h1 className="font-heading text-3xl text-admin-text">Reviews</h1>
// //         <p className="font-body text-sm text-admin-muted mt-1">
// //           {total} review{total === 1 ? '' : 's'} · customer feedback
// //         </p>
// //       </div>

// //       <div className="flex gap-1 bg-admin-surface border border-admin-border rounded-xl p-1 w-fit">
// //         {FILTER_TABS.map((tab) => (
// //           <button
// //             key={tab.key}
// //             onClick={() => {
// //               setFilter(tab.key);
// //               setPage(1);
// //             }}
// //             className={`font-body text-sm px-4 py-2 rounded-lg transition-all cursor-pointer ${
// //               filter === tab.key ? 'bg-brand-800 text-white' : 'text-admin-muted hover:text-admin-text'
// //             }`}
// //           >
// //             {tab.label}
// //           </button>
// //         ))}
// //       </div>

// //       {loading ? (
// //         <PageLoader />
// //       ) : reviews.length === 0 ? (
// //         <EmptyState
// //           icon={<FiStar className="w-16 h-16" />}
// //           title="No reviews found"
// //           description="No reviews in this section"
// //         />
// //       ) : (
// //         <>
// //           <div className="space-y-3">
// //             {reviews.map((review, index) => (
// //               <motion.div
// //                 key={review.id}
// //                 initial={{ opacity: 0, y: 12 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: Math.min(index * 0.03, 0.18) }}
// //                 className={`admin-card p-5 ${
// //                   review.is_removed ? 'border-red-800/40' : review.is_flagged ? 'border-yellow-800/40' : ''
// //                 }`}
// //               >
// //                 <div className="flex items-start justify-between gap-4">
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex items-start justify-between gap-3 mb-4">
// //                       <div className="flex items-start gap-3 min-w-0">
// //                         <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
// //                           <span className="font-heading text-sm text-brand-400">
// //                             {(review.user_name || review.user_email || 'U')[0].toUpperCase()}
// //                           </span>
// //                         </div>

// //                         <div className="min-w-0">
// //                           <div className="flex flex-wrap items-center gap-2">
// //                             <StarRating rating={review.rating} />
// //                             <ReviewStatus review={review} />
// //                           </div>

// //                           <div className="grid sm:grid-cols-3 gap-2 mt-3">
// //                             <div className="flex items-center gap-2 min-w-0">
// //                               <FiUser className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
// //                               <span className="font-body text-xs text-admin-text truncate">
// //                                 {review.user_name || 'Unknown user'}
// //                               </span>
// //                             </div>

// //                             <div className="flex items-center gap-2 min-w-0">
// //                               <FiMail className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
// //                               <span className="font-body text-xs text-admin-muted truncate">
// //                                 {review.user_email || '-'}
// //                               </span>
// //                             </div>

// //                             <div className="flex items-center gap-2 min-w-0">
// //                               <FiPackage className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
// //                               <span className="font-body text-xs text-brand-400 truncate">
// //                                 {review.product_title || `Product #${review.product_id}`}
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <span className="font-body text-xs text-admin-muted flex-shrink-0">
// //                         {format(new Date(review.created_at), 'dd MMM yyyy')}
// //                       </span>
// //                     </div>

// //                     <p className="font-body text-sm text-admin-muted leading-relaxed">
// //                       {review.body || 'No review text.'}
// //                     </p>

// //                     {review.is_removed && review.removed_at && (
// //                       <p className="font-body text-xs text-red-300 mt-3">
// //                         Removed on {format(new Date(review.removed_at), 'dd MMM yyyy · h:mm a')}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div className="flex gap-1.5 flex-shrink-0">
// //                     {(review.is_flagged || review.is_removed) && (
// //                       <button
// //                         onClick={() => handleApprove(review.id)}
// //                         disabled={acting === review.id}
// //                         title="Make public"
// //                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-900/30 hover:bg-green-900/60 text-green-400 transition-colors cursor-pointer disabled:opacity-50"
// //                       >
// //                         <FiCheck className="w-4 h-4" />
// //                       </button>
// //                     )}

// //                     {!review.is_flagged && !review.is_removed && (
// //                       <button
// //                         onClick={() => handleFlag(review.id)}
// //                         disabled={acting === review.id}
// //                         title="Flag and hide"
// //                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-900/30 hover:bg-yellow-900/60 text-yellow-400 transition-colors cursor-pointer disabled:opacity-50"
// //                       >
// //                         <FiFlag className="w-4 h-4" />
// //                       </button>
// //                     )}

// //                     {!review.is_removed && (
// //                       <button
// //                         onClick={() => setRemoveId(review.id)}
// //                         disabled={acting === review.id}
// //                         title="Remove review"
// //                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-900/30 hover:bg-red-900/60 text-red-400 transition-colors cursor-pointer disabled:opacity-50"
// //                       >
// //                         <FiX className="w-4 h-4" />
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
// //         </>
// //       )}

// //       <ConfirmDialog
// //         open={removeId !== null}
// //         onClose={() => setRemoveId(null)}
// //         onConfirm={handleRemove}
// //         title="Remove Review"
// //         message="This review will be hidden from customers and moved to Removed."
// //       />
// //     </div>
// //   );
// // }


// import { useCallback, useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiCheck, FiX, FiFlag, FiStar, FiUser, FiMail, FiPackage } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';
// import { adminApi } from '../../api/client';
// import { Review } from '../../types';
// import { PageLoader, Pagination, EmptyState, StarRating, ConfirmDialog } from '../../components/ui';
// import { toastStyle } from '../../store/authstore';

// type ReviewFilter = 'all' | 'flagged' | 'removed';

// const PAGE_SIZE = 15;
// const AUTO_REFRESH_MS = 8000;

// const FILTER_TABS: { key: ReviewFilter; label: string }[] = [
//   { key: 'all', label: 'All' },
//   { key: 'flagged', label: 'Flagged' },
//   { key: 'removed', label: 'Removed' },
// ];

// function ReviewStatus({ review }: { review: Review }) {
//   if (review.is_removed) {
//     return (
//       <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF0F0] text-[#C58C85] border border-[#F0C6C1]">
//         Removed
//       </span>
//     );
//   }

//   if (review.is_flagged) {
//     return (
//       <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF7E6] text-[#9A6A12] border border-[#F0D49A]">
//         Flagged
//       </span>
//     );
//   }

//   return (
//     <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EEF8EF] text-[#3F7A4B] border border-[#BDE0C3]">
//       Public
//     </span>
//   );
// }

// export default function Reviews() {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [filter, setFilter] = useState<ReviewFilter>('all');
//   const [loading, setLoading] = useState(true);
//   const [removeId, setRemoveId] = useState<number | null>(null);
//   const [acting, setActing] = useState<number | null>(null);
//   const requestIdRef = useRef(0);

//   const load = useCallback(
//     async (silent = false) => {
//       const requestId = ++requestIdRef.current;

//       if (!silent) {
//         setLoading(true);
//       }

//       const params: Record<string, unknown> = { page, page_size: PAGE_SIZE };
//       if (filter === 'flagged') params.flagged = true;
//       if (filter === 'removed') params.removed = true;

//       try {
//         const res = await adminApi.getReviews(params);
//         if (requestId !== requestIdRef.current) return;

//         setReviews(res.data.data || []);
//         setTotal(res.data.total || 0);
//       } catch (err: any) {
//         if (!silent) {
//           toast.error(err.response?.data?.error || 'Failed to load reviews', { style: toastStyle });
//         }
//       } finally {
//         if (requestId === requestIdRef.current) {
//           setLoading(false);
//         }
//       }
//     },
//     [page, filter]
//   );

//   useEffect(() => {
//     load(false);
//   }, [load]);

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

//   const replaceOrRemoveLocal = (updated: Review, removeFromCurrentList: boolean) => {
//     setReviews((prev) => {
//       if (removeFromCurrentList) {
//         return prev.filter((review) => review.id !== updated.id);
//       }

//       return prev.map((review) => (review.id === updated.id ? updated : review));
//     });

//     if (removeFromCurrentList) {
//       setTotal((prev) => Math.max(0, prev - 1));
//     }
//   };

//   const handleApprove = async (id: number) => {
//     setActing(id);

//     try {
//       const res = await adminApi.approveReview(id);
//       const updated = res.data.data as Review;

//       replaceOrRemoveLocal(updated, filter === 'flagged' || filter === 'removed');
//       toast.success('Review made public', { style: toastStyle });
//       load(true);
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Failed to update review', { style: toastStyle });
//     } finally {
//       setActing(null);
//     }
//   };

//   const handleRemove = async () => {
//     if (!removeId) return;

//     setActing(removeId);

//     try {
//       const res = await adminApi.rejectReview(removeId);
//       const updated = res.data.data as Review;

//       replaceOrRemoveLocal(updated, filter !== 'removed');
//       setRemoveId(null);
//       toast.success('Review removed', { style: toastStyle });
//       load(true);
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Failed to remove review', { style: toastStyle });
//     } finally {
//       setActing(null);
//     }
//   };

//   const handleFlag = async (id: number) => {
//     setActing(id);

//     try {
//       const res = await adminApi.flagReview(id);
//       const updated = res.data.data as Review;

//       replaceOrRemoveLocal(updated, false);
//       toast.success('Review hidden and flagged', { style: toastStyle });
//       load(true);
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Failed to flag review', { style: toastStyle });
//     } finally {
//       setActing(null);
//     }
//   };

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div>
//         <h1 className="font-heading text-3xl text-admin-text">Reviews</h1>
//         <p className="font-body text-sm text-admin-muted mt-1">
//           {total} review{total === 1 ? '' : 's'} · customer feedback
//         </p>
//       </div>

//       <div className="flex gap-1 bg-admin-surface border border-admin-border rounded-xl p-1 w-fit">
//         {FILTER_TABS.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => {
//               setFilter(tab.key);
//               setPage(1);
//             }}
//             className={`font-body text-sm px-4 py-2 rounded-lg transition-all cursor-pointer ${
//               filter === tab.key ? 'bg-brand-800 text-white' : 'text-admin-muted hover:text-admin-text'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <PageLoader />
//       ) : reviews.length === 0 ? (
//         <EmptyState
//           icon={<FiStar className="w-16 h-16" />}
//           title="No reviews found"
//           description="No reviews in this section"
//         />
//       ) : (
//         <>
//           <div className="space-y-3">
//             {reviews.map((review, index) => (
//               <motion.div
//                 key={review.id}
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: Math.min(index * 0.03, 0.18) }}
//                 className={`admin-card p-5 ${
//                   review.is_removed ? 'border-[#F0C6C1]' : review.is_flagged ? 'border-[#F0D49A]' : ''
//                 }`}
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-3 mb-4">
//                       <div className="flex items-start gap-3 min-w-0">
//                         <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
//                           <span className="font-heading text-sm text-brand-400">
//                             {(review.user_name || review.user_email || 'U')[0].toUpperCase()}
//                           </span>
//                         </div>

//                         <div className="min-w-0">
//                           <div className="flex flex-wrap items-center gap-2">
//                             <StarRating rating={review.rating} />
//                             <ReviewStatus review={review} />
//                           </div>

//                           <div className="grid sm:grid-cols-3 gap-2 mt-3">
//                             <div className="flex items-center gap-2 min-w-0">
//                               <FiUser className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
//                               <span className="font-body text-xs text-admin-text truncate">
//                                 {review.user_name || 'Unknown user'}
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-2 min-w-0">
//                               <FiMail className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
//                               <span className="font-body text-xs text-admin-muted truncate">
//                                 {review.user_email || '-'}
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-2 min-w-0">
//                               <FiPackage className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
//                               <span className="font-body text-xs text-brand-400 truncate">
//                                 {review.product_title || `Product #${review.product_id}`}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <span className="font-body text-xs text-admin-muted flex-shrink-0">
//                         {format(new Date(review.created_at), 'dd MMM yyyy')}
//                       </span>
//                     </div>

//                     <p className="font-body text-sm text-admin-muted leading-relaxed">
//                       {review.body || 'No review text.'}
//                     </p>

//                     {review.is_removed && review.removed_at && (
//                       <p className="font-body text-xs text-red-300 mt-3">
//                         Removed on {format(new Date(review.removed_at), 'dd MMM yyyy · h:mm a')}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex gap-1.5 flex-shrink-0">
//                     {(review.is_flagged || review.is_removed) && (
//                       <button
//                         onClick={() => handleApprove(review.id)}
//                         disabled={acting === review.id}
//                         title="Make public"
//                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEF8EF] hover:bg-[#DFF1E1] text-[#3F7A4B] border border-[#BDE0C3] transition-colors cursor-pointer disabled:opacity-50"
//                       >
//                         <FiCheck className="w-4 h-4" />
//                       </button>
//                     )}

//                     {!review.is_flagged && !review.is_removed && (
//                       <button
//                         onClick={() => handleFlag(review.id)}
//                         disabled={acting === review.id}
//                         title="Flag and hide"
//                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FFF7E6] hover:bg-[#FCECC4] text-[#9A6A12] border border-[#F0D49A] transition-colors cursor-pointer disabled:opacity-50"
//                       >
//                         <FiFlag className="w-4 h-4" />
//                       </button>
//                     )}

//                     {!review.is_removed && (
//                       <button
//                         onClick={() => setRemoveId(review.id)}
//                         disabled={acting === review.id}
//                         title="Remove review"
//                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FFF0F0] hover:bg-[#FBE0DD] text-[#C58C85] border border-[#F0C6C1] transition-colors cursor-pointer disabled:opacity-50"
//                       >
//                         <FiX className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//         </>
//       )}

//       <ConfirmDialog
//         open={removeId !== null}
//         onClose={() => setRemoveId(null)}
//         onConfirm={handleRemove}
//         title="Remove Review"
//         message="This review will be hidden from customers and moved to Removed."
//       />
//     </div>
//   );
// }


import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiFlag, FiStar, FiUser, FiMail, FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { adminApi } from '../../api/client';
import { Review } from '../../types';
import { PageLoader, Pagination, EmptyState, StarRating, ConfirmDialog } from '../../components/ui';
import { toastStyle } from '../../store/authstore';

type ReviewFilter = 'all' | 'flagged' | 'removed';

const PAGE_SIZE = 15;
const AUTO_REFRESH_MS = 8000;

const FILTER_TABS: { key: ReviewFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'flagged', label: 'Flagged' },
  { key: 'removed', label: 'Removed' },
];

function ReviewStatus({ review }: { review: Review }) {
  if (review.is_removed) {
    return (
      <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF0F0] text-[#C58C85] border border-[#F0C6C1]">
        Removed
      </span>
    );
  }

  if (review.is_flagged) {
    return (
      <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF7E6] text-[#9A6A12] border border-[#F0D49A]">
        Flagged
      </span>
    );
  }

  return (
    <span className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EEF8EF] text-[#3F7A4B] border border-[#BDE0C3]">
      Public
    </span>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [loading, setLoading] = useState(true);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [acting, setActing] = useState<number | null>(null);
  const requestIdRef = useRef(0);

  const load = useCallback(
    async (silent = false) => {
      const requestId = ++requestIdRef.current;

      if (!silent) {
        setLoading(true);
      }

      const params: Record<string, unknown> = { page, page_size: PAGE_SIZE };
      if (filter === 'flagged') params.flagged = true;
      if (filter === 'removed') params.removed = true;

      try {
        const res = await adminApi.getReviews(params);
        if (requestId !== requestIdRef.current) return;

        setReviews(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (err: any) {
        if (!silent) {
          toast.error(err.response?.data?.error || 'Failed to load reviews', { style: toastStyle });
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [page, filter]
  );

  useEffect(() => {
    load(false);
  }, [load]);

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

  const replaceOrRemoveLocal = (updated: Review, removeFromCurrentList: boolean) => {
    setReviews((prev) => {
      if (removeFromCurrentList) {
        return prev.filter((review) => review.id !== updated.id);
      }

      return prev.map((review) => (review.id === updated.id ? updated : review));
    });

    if (removeFromCurrentList) {
      setTotal((prev) => Math.max(0, prev - 1));
    }
  };

  const handleApprove = async (id: number) => {
    setActing(id);

    try {
      const res = await adminApi.approveReview(id);
      const updated = res.data.data as Review;

      replaceOrRemoveLocal(updated, filter === 'flagged' || filter === 'removed');
      toast.success('Review made public', { style: toastStyle });
      load(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update review', { style: toastStyle });
    } finally {
      setActing(null);
    }
  };

  const handleRemove = async () => {
    if (!removeId) return;

    setActing(removeId);

    try {
      const res = await adminApi.rejectReview(removeId);
      const updated = res.data.data as Review;

      replaceOrRemoveLocal(updated, filter !== 'removed');
      setRemoveId(null);
      toast.success('Review removed', { style: toastStyle });
      load(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to remove review', { style: toastStyle });
    } finally {
      setActing(null);
    }
  };

  const handleFlag = async (id: number) => {
    setActing(id);

    try {
      const res = await adminApi.flagReview(id);
      const updated = res.data.data as Review;

      replaceOrRemoveLocal(updated, false);
      toast.success('Review hidden and flagged', { style: toastStyle });
      load(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to flag review', { style: toastStyle });
    } finally {
      setActing(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-admin-text">Reviews</h1>
        <p className="font-body text-sm text-admin-muted mt-1">
          {total} review{total === 1 ? '' : 's'} · customer feedback
        </p>
      </div>

      <div className="flex gap-1 bg-admin-surface border border-admin-border rounded-xl p-1 w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setFilter(tab.key);
              setPage(1);
            }}
            className={`font-body text-sm px-4 py-2 rounded-lg transition-all cursor-pointer ${
              filter === tab.key
                ? 'bg-[#7A4E48] text-white shadow-sm'
                : 'text-admin-muted hover:bg-[#F8F5F0] hover:text-[#7A4E48]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <PageLoader />
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={<FiStar className="w-16 h-16" />}
          title="No reviews found"
          description="No reviews in this section"
        />
      ) : (
        <>
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.18) }}
                className={`admin-card p-5 ${
                  review.is_removed ? 'border-[#F0C6C1]' : review.is_flagged ? 'border-[#F0D49A]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="font-heading text-sm text-brand-400">
                            {(review.user_name || review.user_email || 'U')[0].toUpperCase()}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <StarRating rating={review.rating} />
                            <ReviewStatus review={review} />
                          </div>

                          <div className="grid sm:grid-cols-3 gap-2 mt-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <FiUser className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
                              <span className="font-body text-xs text-admin-text truncate">
                                {review.user_name || 'Unknown user'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 min-w-0">
                              <FiMail className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
                              <span className="font-body text-xs text-admin-muted truncate">
                                {review.user_email || '-'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 min-w-0">
                              <FiPackage className="w-3.5 h-3.5 text-admin-muted flex-shrink-0" />
                              <span className="font-body text-xs text-brand-400 truncate">
                                {review.product_title || `Product #${review.product_id}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <span className="font-body text-xs text-admin-muted flex-shrink-0">
                        {format(new Date(review.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>

                    <p className="font-body text-sm text-admin-muted leading-relaxed">
                      {review.body || 'No review text.'}
                    </p>

                    {review.is_removed && review.removed_at && (
                      <p className="font-body text-xs text-red-300 mt-3">
                        Removed on {format(new Date(review.removed_at), 'dd MMM yyyy · h:mm a')}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-1.5 flex-shrink-0">
                    {(review.is_flagged || review.is_removed) && (
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={acting === review.id}
                        title="Make public"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEF8EF] hover:bg-[#DFF1E1] text-[#3F7A4B] border border-[#BDE0C3] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                    )}

                    {!review.is_flagged && !review.is_removed && (
                      <button
                        onClick={() => handleFlag(review.id)}
                        disabled={acting === review.id}
                        title="Flag and hide"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FFF7E6] hover:bg-[#FCECC4] text-[#9A6A12] border border-[#F0D49A] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FiFlag className="w-4 h-4" />
                      </button>
                    )}

                    {!review.is_removed && (
                      <button
                        onClick={() => setRemoveId(review.id)}
                        disabled={acting === review.id}
                        title="Remove review"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FFF0F0] hover:bg-[#FBE0DD] text-[#C58C85] border border-[#F0C6C1] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <ConfirmDialog
        open={removeId !== null}
        onClose={() => setRemoveId(null)}
        onConfirm={handleRemove}
        title="Remove Review"
        message="This review will be hidden from customers and moved to Removed."
      />
    </div>
  );
}
