// // import { useEffect, useRef, useState, useCallback, type WheelEvent } from 'react';
// // import { motion } from 'framer-motion';
// // import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage, FiUpload, FiX, FiChevronDown } from 'react-icons/fi';
// // import toast from 'react-hot-toast';
// // import { adminApi } from '../../api/client';
// // import { Product, Category } from '../../types';
// // import {
// //   PageLoader,
// //   Modal,
// //   ConfirmDialog,
// //   Pagination,
// //   EmptyState,
// //   Badge,
// //   Input,
// //   Textarea,
// //   Select,
// //   Toggle,
// //   Spinner,
// // } from '../../components/ui';
// // import { toastStyle } from '../../store/authstore';

// // const PAGE_SIZE = 12;
// // const SEARCH_DEBOUNCE_MS = 450;

// // const SIZE_OPTIONS = [
// //   'Free Size',
// //   'One Size',
// //   'Extra Small',
// //   'Small',
// //   'Medium',
// //   'Large',
// //   'Extra Large',
// //   'XXS',
// //   'XS',
// //   'S',
// //   'M',
// //   'L',
// //   'XL',
// //   'XXL',
// //   '2XL',
// //   '3XL',
// //   '4XL',
// //   '5XL',
// //   '6XL',
// //   '7XL',
// //   '8XL',
// //   '9XL',
// //   '10XL',
// //   '0',
// //   '2',
// //   '4',
// //   '6',
// //   '8',
// //   '10',
// //   '12',
// //   '14',
// //   '16',
// //   '18',
// //   '20',
// //   '22',
// //   '24',
// //   '26',
// //   '28',
// //   '30',
// //   '32',
// //   '34',
// //   '36',
// //   '38',
// //   '40',
// //   '42',
// //   '44',
// //   '46',
// //   '48',
// //   '50',
// //   '52',
// //   '54',
// //   '56',
// //   '58',
// //   '60',
// // ];

// // const COLOR_OPTIONS = [
// //   'Default',
// //   'Black',
// //   'White',
// //   'Off White',
// //   'Ivory',
// //   'Cream',
// //   'Beige',
// //   'Brown',
// //   'Tan',
// //   'Camel',
// //   'Grey',
// //   'Charcoal',
// //   'Silver',
// //   'Gold',
// //   'Rose Gold',
// //   'Yellow',
// //   'Mustard',
// //   'Orange',
// //   'Peach',
// //   'Coral',
// //   'Red',
// //   'Maroon',
// //   'Wine',
// //   'Burgundy',
// //   'Pink',
// //   'Baby Pink',
// //   'Hot Pink',
// //   'Magenta',
// //   'Purple',
// //   'Lavender',
// //   'Lilac',
// //   'Violet',
// //   'Blue',
// //   'Navy Blue',
// //   'Royal Blue',
// //   'Sky Blue',
// //   'Teal',
// //   'Turquoise',
// //   'Cyan',
// //   'Green',
// //   'Mint Green',
// //   'Olive',
// //   'Mehendi',
// //   'Pista',
// //   'Sea Green',
// //   'Multi Color',
// // ];

// // interface SearchableDropdownProps {
// //   value: string;
// //   options: string[];
// //   placeholder: string;
// //   onChange: (value: string) => void;
// // }

// // function SearchableDropdown({ value, options, placeholder, onChange }: SearchableDropdownProps) {
// //   const [open, setOpen] = useState(false);
// //   const [query, setQuery] = useState(value);

// //   useEffect(() => {
// //     setQuery(value);
// //   }, [value]);

// //   const filteredOptions = options.filter((option) =>
// //     option.toLowerCase().includes(query.trim().toLowerCase())
// //   );

// //   return (
// //     <div
// //       className="relative"
// //       onBlur={(e) => {
// //         if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
// //           setOpen(false);
// //         }
// //       }}
// //     >
// //       <input
// //         value={query}
// //         onFocus={() => setOpen(true)}
// //         onChange={(e) => {
// //           setQuery(e.target.value);
// //           onChange(e.target.value);
// //           setOpen(true);
// //         }}
// //         placeholder={placeholder}
// //         className="admin-input text-xs pr-8"
// //       />

// //       <button
// //         type="button"
// //         onMouseDown={(e) => e.preventDefault()}
// //         onClick={() => setOpen((prev) => !prev)}
// //         className="absolute right-2 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors"
// //       >
// //         <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
// //       </button>

// //       {open && (
// //         <div className="absolute left-0 right-0 top-full z-[80] mt-1 max-h-48 overflow-y-auto rounded-xl border border-admin-border bg-admin-card shadow-xl">
// //           {filteredOptions.length > 0 ? (
// //             filteredOptions.map((option) => (
// //               <button
// //                 key={option}
// //                 type="button"
// //                 onMouseDown={(e) => e.preventDefault()}
// //                 onClick={() => {
// //                   setQuery(option);
// //                   onChange(option);
// //                   setOpen(false);
// //                 }}
// //                 className={`w-full text-left px-3 py-2 font-body text-xs transition-colors cursor-pointer ${
// //                   option === value
// //                     ? 'bg-brand-500/15 text-brand-300'
// //                     : 'text-admin-text hover:bg-admin-hover'
// //                 }`}
// //               >
// //                 {option}
// //               </button>
// //             ))
// //           ) : (
// //             <div className="px-3 py-2 font-body text-xs text-admin-muted">
// //               Press save to use "{query.trim() || placeholder}"
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default function Products() {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [total, setTotal] = useState(0);
// //   const [page, setPage] = useState(1);

// //   const [searchInput, setSearchInput] = useState('');
// //   const [debouncedSearch, setDebouncedSearch] = useState('');

// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);

// //   const [formOpen, setFormOpen] = useState(false);
// //   const [editProduct, setEditProduct] = useState<Product | null>(null);
// //   const [deleteId, setDeleteId] = useState<number | null>(null);
// //   const [deleting, setDeleting] = useState(false);
// //   const [saving, setSaving] = useState(false);

// //   const requestIdRef = useRef(0);

// //   const [form, setForm] = useState({
// //     title: '',
// //     description: '',
// //     category_id: '',
// //     price: '',
// //     old_price: '',
// //     badge: '',
// //     is_new: false,
// //     is_featured: false,
// //     is_active: true,
// //   });
// //   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

// //   const [variantRows, setVariantRows] = useState([
// //     { size: '', color: '', stock: '10' },
// //   ]);

// //   const [imageFiles, setImageFiles] = useState<File[]>([]);

// //   const setFormField = (field: keyof typeof form, value: string | boolean) => {
// //     const nextForm = { ...form, [field]: value };
// //     setForm(nextForm);
// //     setFormErrors((current) => {
// //       if (!current[field]) return current;
// //       const nextErrors = { ...current };
// //       const fieldError = getProductFormErrors(nextForm, variantRows)[field];
// //       if (fieldError) {
// //         nextErrors[field] = fieldError;
// //       } else {
// //         delete nextErrors[field];
// //       }
// //       return nextErrors;
// //     });
// //   };

// //   const sanitizeMoney = (value: string) => {
// //     const cleaned = value.replace(/[^\d.]/g, '');
// //     const [whole, ...rest] = cleaned.split('.');
// //     return rest.length > 0 ? `${whole}.${rest.join('').slice(0, 2)}` : whole;
// //   };

// //   const sanitizeWholeNumber = (value: string) => value.replace(/\D/g, '');

// //   const getProductFormErrors = (
// //     nextForm: typeof form,
// //     nextVariants: typeof variantRows
// //   ) => {
// //     const errors: Record<string, string> = {};
// //     const price = Number(nextForm.price);
// //     const oldPrice = Number(nextForm.old_price);

// //     if (!nextForm.title.trim()) errors.title = 'Product title is required';
// //     if (!nextForm.category_id) errors.category_id = 'Please select a category';
// //     if (!nextForm.price.trim() || Number.isNaN(price) || price <= 0) {
// //       errors.price = 'Enter a valid price greater than 0';
// //     }
// //     if (!nextForm.old_price.trim() || Number.isNaN(oldPrice) || oldPrice < 0) {
// //       errors.old_price = 'Enter a valid old price';
// //     }
// //     if (nextForm.price && nextForm.old_price && oldPrice < price) {
// //       errors.old_price = 'Old price cannot be less than selling price';
// //     }

// //     nextVariants.forEach((row, index) => {
// //       if (!row.size.trim()) errors[`variant_${index}_size`] = 'Size is required';
// //       const stock = Number(row.stock);
// //       if (!row.stock.trim() || Number.isNaN(stock) || stock < 0) {
// //         errors[`variant_${index}_stock`] = 'Stock must be 0 or more';
// //       }
// //     });

// //     return errors;
// //   };

// //   useEffect(() => {
// //     const timer = window.setTimeout(() => {
// //       setDebouncedSearch(searchInput.trim());
// //       setPage(1);
// //     }, SEARCH_DEBOUNCE_MS);

// //     return () => window.clearTimeout(timer);
// //   }, [searchInput]);

// //   const load = useCallback(
// //     async (silent = false) => {
// //       const requestId = ++requestIdRef.current;

// //       if (silent || products.length > 0) {
// //         setRefreshing(true);
// //       } else {
// //         setLoading(true);
// //       }

// //       try {
// //         const res = await adminApi.getProducts({
// //           page,
// //           page_size: PAGE_SIZE,
// //           search: debouncedSearch || undefined,
// //         });

// //         if (requestId !== requestIdRef.current) return;

// //         setProducts(res.data.data || []);
// //         setTotal(res.data.total || 0);
// //       } catch (err: any) {
// //         if (requestId !== requestIdRef.current) return;
// //         toast.error(err.response?.data?.error || 'Failed to load products', { style: toastStyle });
// //       } finally {
// //         if (requestId === requestIdRef.current) {
// //           setLoading(false);
// //           setRefreshing(false);
// //         }
// //       }
// //     },
// //     [page, debouncedSearch, products.length]
// //   );

// //   useEffect(() => {
// //     load(false);
// //   }, [page, debouncedSearch]);

// //   useEffect(() => {
// //     adminApi
// //       .getCategories()
// //       .then((r) => setCategories(r.data.data || []))
// //       .catch(() => toast.error('Failed to load categories', { style: toastStyle }));
// //   }, []);

// //   const updateVariantRow = (index: number, field: 'size' | 'color' | 'stock', value: string) => {
// //     const finalValue = field === 'stock' ? sanitizeWholeNumber(value) : value;
// //     const nextRows = variantRows.map((row, rowIndex) =>
// //         rowIndex === index ? { ...row, [field]: finalValue } : row
// //       );
// //     setVariantRows(nextRows);
// //     setFormErrors((current) => {
// //       const errorKey = `variant_${index}_${field}`;
// //       if (!current[errorKey]) return current;
// //       const nextErrors = { ...current };
// //       const fieldError = getProductFormErrors(form, nextRows)[errorKey];
// //       if (fieldError) {
// //         nextErrors[errorKey] = fieldError;
// //       } else {
// //         delete nextErrors[errorKey];
// //       }
// //       return nextErrors;
// //     });
// //   };

// //   const openCreate = () => {
// //     setEditProduct(null);
// //     setForm({
// //       title: '',
// //       description: '',
// //       category_id: categories.find((cat) => cat.is_active)?.id?.toString() || categories[0]?.id?.toString() || '',
// //       price: '',
// //       old_price: '',
// //       badge: '',
// //       is_new: false,
// //       is_featured: false,
// //       is_active: true,
// //     });
// //     setVariantRows([{ size: '', color: '', stock: '10' }]);
// //     setImageFiles([]);
// //     setFormErrors({});
// //     setFormOpen(true);
// //   };

// //   const openEdit = (p: Product) => {
// //     setEditProduct(p);
// //     setForm({
// //       title: p.title,
// //       description: p.description || '',
// //       category_id: p.category.id.toString(),
// //       price: p.price.toString(),
// //       old_price: p.old_price.toString(),
// //       badge: p.badge || '',
// //       is_new: p.is_new,
// //       is_featured: p.is_featured,
// //       is_active: p.is_active ?? true,
// //     });

// //     setVariantRows(
// //       p.variants.length > 0
// //         ? p.variants.map((v) => ({
// //             size: v.size || 'Free Size',
// //             color: v.color === 'Default' ? '' : v.color || '',
// //             stock: v.stock.toString(),
// //           }))
// //         : [{ size: '', color: '', stock: '10' }]
// //     );

// //     setImageFiles([]);
// //     setFormErrors({});
// //     setFormOpen(true);
// //   };

// //   const handleSave = async () => {
// //     const errors = getProductFormErrors(form, variantRows);
// //     setFormErrors(errors);
// //     if (Object.keys(errors).length > 0) {
// //       toast.error('Please fix the highlighted fields', { style: toastStyle });
// //       return;
// //     }

// //     setSaving(true);

// //     try {
// //       const payload = {
// //         title: form.title.trim(),
// //         description: form.description.trim() || null,
// //         category_id: Number(form.category_id),
// //         price: Number(form.price),
// //         old_price: Number(form.old_price),
// //         badge: form.badge.trim() || null,
// //         is_new: form.is_new,
// //         is_featured: form.is_featured,
// //         is_active: form.is_active,
// //         variants: variantRows.map((r) => ({
// //           size: r.size.trim(),
// //           color: r.color.trim() || 'Default',
// //           stock: Number(r.stock) || 0,
// //           additional_price: 0,
// //         })),
// //       };

// //       let productId: number;

// //       if (editProduct) {
// //         const res = await adminApi.updateProduct(editProduct.id, payload);
// //         productId = res.data.data.id;
// //         toast.success('Product updated', { style: toastStyle });
// //       } else {
// //         const res = await adminApi.createProduct(payload);
// //         productId = res.data.data.id;
// //         toast.success('Product created', { style: toastStyle });
// //       }

// //       for (let i = 0; i < imageFiles.length; i++) {
// //         await adminApi.uploadProductImage(productId, imageFiles[i], i);
// //       }

// //       setFormOpen(false);
// //       setImageFiles([]);
// //       await load(true);
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Failed to save product', { style: toastStyle });
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!deleteId) return;

// //     setDeleting(true);

// //     try {
// //       await adminApi.deleteProduct(deleteId);
// //       setProducts((prev) => prev.filter((p) => p.id !== deleteId));
// //       setTotal((prev) => Math.max(0, prev - 1));
// //       toast.success('Product deleted', { style: toastStyle });
// //       setDeleteId(null);
// //       await load(true);
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.error || 'Could not delete product', { style: toastStyle });
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   const preventScrollChange = (e: WheelEvent<HTMLInputElement>) => {
// //     e.currentTarget.blur();
// //   };

// //   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="flex items-center justify-between gap-4">
// //         <div>
// //           <h1 className="font-heading text-3xl text-admin-text">Products</h1>
// //           <p className="font-body text-sm text-admin-muted mt-1">{total} total products</p>
// //         </div>

// //         <button onClick={openCreate} className="admin-btn-primary">
// //           <FiPlus className="w-4 h-4" /> Add Product
// //         </button>
// //       </div>

// //       <div className="flex items-center gap-3 flex-wrap">
// //         <div className="relative max-w-sm w-full">
// //           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
// //           <input
// //             value={searchInput}
// //             onChange={(e) => setSearchInput(e.target.value)}
// //             placeholder="Search products..."
// //             className="admin-input pl-10"
// //           />
// //         </div>

// //         {refreshing && !loading && (
// //           <span className="font-body text-xs text-admin-muted">Updating...</span>
// //         )}
// //       </div>

// //       {loading ? (
// //         <PageLoader />
// //       ) : products.length === 0 ? (
// //         <EmptyState
// //           icon={<FiPackage className="w-16 h-16" />}
// //           title="No products found"
// //           description={debouncedSearch ? 'Try a different search keyword' : 'Create your first product to get started'}
// //         />
// //       ) : (
// //         <>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //             {products.map((product, i) => (
// //               <motion.div
// //                 key={product.id}
// //                 initial={false}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: Math.min(i * 0.015, 0.12) }}
// //                 className="admin-card overflow-hidden group hover:border-brand-500/30 transition-all"
// //               >
// //                 <div className="aspect-[4/3] bg-admin-bg overflow-hidden relative">
// //                   {product.images?.[0] ? (
// //                     <img
// //                       src={product.images[0].url}
// //                       alt={product.title}
// //                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-full flex items-center justify-center">
// //                       <FiPackage className="w-10 h-10 text-admin-border" />
// //                     </div>
// //                   )}

// //                   <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
// //                     {product.is_new && <Badge status="active" label="New" />}
// //                     {product.is_featured && <Badge status="approved" label="Featured" />}
// //                     {product.is_active === false && <Badge status="inactive" label="Inactive" />}
// //                   </div>

// //                   <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
// //                     <button
// //                       onClick={() => openEdit(product)}
// //                       className="w-7 h-7 rounded-lg bg-admin-card/90 flex items-center justify-center hover:bg-brand-800 text-admin-text transition-colors cursor-pointer"
// //                     >
// //                       <FiEdit2 className="w-3.5 h-3.5" />
// //                     </button>
// //                     <button
// //                       onClick={() => setDeleteId(product.id)}
// //                       className="w-7 h-7 rounded-lg bg-admin-card/90 flex items-center justify-center hover:bg-red-800 text-admin-text transition-colors cursor-pointer"
// //                     >
// //                       <FiTrash2 className="w-3.5 h-3.5" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <div className="p-4">
// //                   <p className="font-body text-[10px] text-brand-400 uppercase tracking-wider mb-1">
// //                     {product.category.name}
// //                   </p>
// //                   <h3 className="font-body text-sm font-semibold text-admin-text line-clamp-1 mb-2">
// //                     {product.title}
// //                   </h3>

// //                   <div className="flex items-center justify-between gap-3">
// //                     <div className="min-w-0">
// //                       <span className="font-body text-sm font-bold text-admin-text">
// //                         ₹{Number(product.price).toLocaleString('en-IN')}
// //                       </span>
// //                       <span className="font-body text-xs text-admin-muted line-through ml-2">
// //                         ₹{Number(product.old_price).toLocaleString('en-IN')}
// //                       </span>
// //                     </div>
// //                     <span className="font-body text-xs text-admin-muted whitespace-nowrap">
// //                       {product.variants.reduce((s, v) => s + Number(v.stock || 0), 0)} in stock
// //                     </span>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
// //         </>
// //       )}

// //       <Modal
// //         open={formOpen}
// //         onClose={() => !saving && setFormOpen(false)}
// //         title={editProduct ? 'Edit Product' : 'Add Product'}
// //         size="xl"
// //       >
// //         <div className="grid grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto pr-1">
// //           <div className="col-span-2">
// //             <Input
// //               label="Title *"
// //               value={form.title}
// //               onChange={(e) => setFormField('title', e.target.value)}
// //               placeholder="e.g. Kanjivaram Silk Saree"
// //             />
// //             {formErrors.title && (
// //               <p className="font-body text-xs text-red-400 mt-1">{formErrors.title}</p>
// //             )}
// //           </div>

// //           <div className="col-span-2">
// //             <Textarea
// //               label="Description"
// //               value={form.description}
// //               onChange={(e) => setFormField('description', e.target.value)}
// //               placeholder="Product description..."
// //             />
// //           </div>

// //           <Select
// //             label="Category *"
// //             value={form.category_id}
// //             error={formErrors.category_id}
// //             onChange={(e) => setFormField('category_id', e.target.value)}
// //           >
// //             <option value="">Select category</option>
// //             {categories.map((c) => (
// //               <option key={c.id} value={c.id}>
// //                 {c.name}{c.is_active ? '' : ' (Inactive)'}
// //               </option>
// //             ))}
// //           </Select>

// //           <Input
// //             label="Badge"
// //             value={form.badge}
// //             onChange={(e) => setFormField('badge', e.target.value)}
// //             placeholder="e.g. Bestseller"
// //           />

// //           <div>
// //             <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-1.5 block">
// //               Price (₹) *
// //             </label>
// //             <input
// //               type="text"
// //               inputMode="decimal"
// //               value={form.price}
// //               onChange={(e) => setFormField('price', sanitizeMoney(e.target.value))}
// //               onWheel={preventScrollChange}
// //               placeholder="0"
// //               className={`admin-input w-full ${formErrors.price ? 'border-red-500' : ''}`}
// //             />
// //             {formErrors.price && (
// //               <p className="font-body text-xs text-red-400 mt-1">{formErrors.price}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-1.5 block">
// //               Old Price (₹) *
// //             </label>
// //             <input
// //               type="text"
// //               inputMode="decimal"
// //               value={form.old_price}
// //               onChange={(e) => setFormField('old_price', sanitizeMoney(e.target.value))}
// //               onWheel={preventScrollChange}
// //               placeholder="0"
// //               className={`admin-input w-full ${formErrors.old_price ? 'border-red-500' : ''}`}
// //             />
// //             {formErrors.old_price && (
// //               <p className="font-body text-xs text-red-400 mt-1">{formErrors.old_price}</p>
// //             )}
// //           </div>

// //           <div className="col-span-2 flex gap-6 flex-wrap">
// //             <Toggle
// //               checked={form.is_new}
// //               onChange={(v) => setFormField('is_new', v)}
// //               label="Mark as New Arrival"
// //             />
// //             <Toggle
// //               checked={form.is_featured}
// //               onChange={(v) => setFormField('is_featured', v)}
// //               label="Featured Product"
// //             />
// //             <Toggle
// //               checked={form.is_active}
// //               onChange={(v) => setFormField('is_active', v)}
// //               label="Active (visible in store)"
// //             />
// //           </div>

// //           <div className="col-span-2">
// //             <div className="flex items-center justify-between mb-2">
// //               <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
// //                 Variants (Size / Color / Stock)
// //               </label>
// //               <button
// //                 type="button"
// //                 onClick={() => setVariantRows([...variantRows, { size: '', color: '', stock: '0' }])}
// //                 className="font-body text-xs text-brand-400 hover:text-brand-300 cursor-pointer flex items-center gap-1"
// //               >
// //                 <FiPlus className="w-3.5 h-3.5" /> Add Variant
// //               </button>
// //             </div>

// //             <div className="space-y-2">
// //               <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_120px_32px] gap-2 px-1">
// //                 <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Size</span>
// //                 <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Color</span>
// //                 <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Stock</span>
// //                 <span />
// //               </div>

// //               {variantRows.map((row, i) => (
// //                 <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_120px_32px] gap-2 items-start">
// //                   <div>
// //                     <SearchableDropdown
// //                       value={row.size}
// //                       options={SIZE_OPTIONS}
// //                       placeholder="Search or select size"
// //                       onChange={(value) => updateVariantRow(i, 'size', value)}
// //                     />
// //                     {formErrors[`variant_${i}_size`] && (
// //                       <p className="font-body text-[10px] text-red-400 mt-1">
// //                         {formErrors[`variant_${i}_size`]}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <SearchableDropdown
// //                       value={row.color}
// //                       options={COLOR_OPTIONS}
// //                       placeholder="Search or select color"
// //                       onChange={(value) => updateVariantRow(i, 'color', value)}
// //                     />
// //                   </div>

// //                   <div>
// //                     <input
// //                       value={row.stock}
// //                       onChange={(e) => updateVariantRow(i, 'stock', e.target.value)}
// //                       onWheel={preventScrollChange}
// //                       type="text"
// //                       inputMode="numeric"
// //                       placeholder="0"
// //                       className={`admin-input text-xs ${formErrors[`variant_${i}_stock`] ? 'border-red-500' : ''}`}
// //                     />
// //                     {formErrors[`variant_${i}_stock`] && (
// //                       <p className="font-body text-[10px] text-red-400 mt-1">
// //                         {formErrors[`variant_${i}_stock`]}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <button
// //                     type="button"
// //                     onClick={() => setVariantRows(variantRows.filter((_, j) => j !== i))}
// //                     className="w-8 h-8 flex items-center justify-center text-admin-muted hover:text-red-400 cursor-pointer"
// //                   >
// //                     <FiX className="w-4 h-4" />
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="col-span-2">
// //             <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-2 block">
// //               Images
// //             </label>
// //             <label className="flex items-center justify-center gap-2 border-2 border-dashed border-admin-border rounded-xl p-6 cursor-pointer hover:border-brand-500/50 transition-colors">
// //               <FiUpload className="w-5 h-5 text-admin-muted" />
// //               <span className="font-body text-sm text-admin-muted">
// //                 Click to upload images (JPEG, PNG, WebP · max 5MB each)
// //               </span>
// //               <input
// //                 type="file"
// //                 multiple
// //                 accept="image/*"
// //                 className="hidden"
// //                 onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))}
// //               />
// //             </label>

// //             {imageFiles.length > 0 && (
// //               <p className="font-body text-xs text-brand-400 mt-2">
// //                 {imageFiles.length} file(s) selected
// //               </p>
// //             )}

// //             {editProduct && editProduct.images.length > 0 && (
// //               <div className="flex gap-2 mt-3 flex-wrap">
// //                 {editProduct.images.map((img) => (
// //                   <img
// //                     key={img.id}
// //                     src={img.url}
// //                     alt=""
// //                     className="w-16 h-16 rounded-lg object-cover border border-admin-border"
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-admin-border">
// //           <button onClick={() => setFormOpen(false)} disabled={saving} className="admin-btn-secondary">
// //             Cancel
// //           </button>
// //           <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
// //             {saving ? <Spinner size="sm" /> : null}
// //             {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
// //           </button>
// //         </div>
// //       </Modal>

// //       <ConfirmDialog
// //         open={deleteId !== null}
// //         onClose={() => !deleting && setDeleteId(null)}
// //         onConfirm={handleDelete}
// //         loading={deleting}
// //         title="Delete Product"
// //         message="This will soft-delete the product. It won't appear in the store but order history is preserved."
// //       />
// //     </div>
// //   );
// // }


// import { useEffect, useRef, useState, useCallback, type WheelEvent } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage, FiUpload, FiX, FiChevronDown } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import { adminApi } from '../../api/client';
// import { Product, Category } from '../../types';
// import {
//   PageLoader,
//   Modal,
//   ConfirmDialog,
//   Pagination,
//   EmptyState,
//   Badge,
//   Input,
//   Textarea,
//   Select,
//   Toggle,
//   Spinner,
// } from '../../components/ui';
// import { toastStyle } from '../../store/authstore';

// const PAGE_SIZE = 12;
// const SEARCH_DEBOUNCE_MS = 450;

// const SIZE_OPTIONS = [
//   'Free Size',
//   'One Size',
//   'Extra Small',
//   'Small',
//   'Medium',
//   'Large',
//   'Extra Large',
//   'XXS',
//   'XS',
//   'S',
//   'M',
//   'L',
//   'XL',
//   'XXL',
//   '2XL',
//   '3XL',
//   '4XL',
//   '5XL',
//   '6XL',
//   '7XL',
//   '8XL',
//   '9XL',
//   '10XL',
//   '0',
//   '2',
//   '4',
//   '6',
//   '8',
//   '10',
//   '12',
//   '14',
//   '16',
//   '18',
//   '20',
//   '22',
//   '24',
//   '26',
//   '28',
//   '30',
//   '32',
//   '34',
//   '36',
//   '38',
//   '40',
//   '42',
//   '44',
//   '46',
//   '48',
//   '50',
//   '52',
//   '54',
//   '56',
//   '58',
//   '60',
// ];

// const COLOR_OPTIONS = [
//   'Default',
//   'Black',
//   'White',
//   'Off White',
//   'Ivory',
//   'Cream',
//   'Beige',
//   'Brown',
//   'Tan',
//   'Camel',
//   'Grey',
//   'Charcoal',
//   'Silver',
//   'Gold',
//   'Rose Gold',
//   'Yellow',
//   'Mustard',
//   'Orange',
//   'Peach',
//   'Coral',
//   'Red',
//   'Maroon',
//   'Wine',
//   'Burgundy',
//   'Pink',
//   'Baby Pink',
//   'Hot Pink',
//   'Magenta',
//   'Purple',
//   'Lavender',
//   'Lilac',
//   'Violet',
//   'Blue',
//   'Navy Blue',
//   'Royal Blue',
//   'Sky Blue',
//   'Teal',
//   'Turquoise',
//   'Cyan',
//   'Green',
//   'Mint Green',
//   'Olive',
//   'Mehendi',
//   'Pista',
//   'Sea Green',
//   'Multi Color',
// ];

// interface SearchableDropdownProps {
//   value: string;
//   options: string[];
//   placeholder: string;
//   onChange: (value: string) => void;
// }

// function SearchableDropdown({ value, options, placeholder, onChange }: SearchableDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState(value);
//   const selectingRef = useRef(false);

//   useEffect(() => {
//     setQuery(value);
//   }, [value]);

//   const filteredOptions = options.filter((option) =>
//     option.toLowerCase().includes(query.trim().toLowerCase())
//   );

//   return (
//     <div
//       className="relative"
//       onBlur={(e) => {
//         if (selectingRef.current) return;

//         if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
//           setOpen(false);
//         }
//       }}
//     >
//       <input
//         value={query}
//         onFocus={() => setOpen(true)}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           onChange(e.target.value);
//           setOpen(true);
//         }}
//         placeholder={placeholder}
//         className="admin-input text-xs pr-8"
//       />

//       <button
//         type="button"
//         onMouseDown={(e) => e.preventDefault()}
//         onClick={() => setOpen((prev) => !prev)}
//         className="absolute right-2 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors"
//       >
//         <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
//       </button>

//       <AnimatePresence initial={false}>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -4, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -4, scale: 0.98 }}
//             transition={{ duration: 0.14, ease: 'easeOut' }}
//             className="absolute left-0 right-0 top-full z-[80] mt-1 max-h-48 overflow-y-auto rounded-xl border border-admin-border bg-admin-card shadow-xl"
//           >
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option) => (
//                 <button
//                   key={option}
//                   type="button"
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     selectingRef.current = true;
//                   }}
//                   onClick={() => {
//                     setQuery(option);
//                     onChange(option);
//                     setOpen(false);
//                     window.setTimeout(() => {
//                       selectingRef.current = false;
//                     }, 160);
//                   }}
//                   className={`w-full text-left px-3 py-2 font-body text-xs transition-colors cursor-pointer ${
//                     option === value
//                       ? 'bg-brand-500/15 text-brand-300'
//                       : 'text-admin-text hover:bg-admin-hover'
//                   }`}
//                 >
//                   {option}
//                 </button>
//               ))
//             ) : (
//               <div className="px-3 py-2 font-body text-xs text-admin-muted">
//                 Press save to use "{query.trim() || placeholder}"
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default function Products() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);

//   const [searchInput, setSearchInput] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [formOpen, setFormOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);
//   const [deleteId, setDeleteId] = useState<number | null>(null);
//   const [deleting, setDeleting] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const requestIdRef = useRef(0);

//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     category_id: '',
//     price: '',
//     old_price: '',
//     badge: '',
//     is_new: false,
//     is_featured: false,
//     is_active: true,
//   });

//   const [variantRows, setVariantRows] = useState([
//     { size: '', color: '', stock: '10' },
//   ]);

//   const [imageFiles, setImageFiles] = useState<File[]>([]);

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       setDebouncedSearch(searchInput.trim());
//       setPage(1);
//     }, SEARCH_DEBOUNCE_MS);

//     return () => window.clearTimeout(timer);
//   }, [searchInput]);

//   const load = useCallback(
//     async (silent = false) => {
//       const requestId = ++requestIdRef.current;

//       if (silent || products.length > 0) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       try {
//         const res = await adminApi.getProducts({
//           page,
//           page_size: PAGE_SIZE,
//           search: debouncedSearch || undefined,
//         });

//         if (requestId !== requestIdRef.current) return;

//         setProducts(res.data.data || []);
//         setTotal(res.data.total || 0);
//       } catch (err: any) {
//         if (requestId !== requestIdRef.current) return;
//         toast.error(err.response?.data?.error || 'Failed to load products', { style: toastStyle });
//       } finally {
//         if (requestId === requestIdRef.current) {
//           setLoading(false);
//           setRefreshing(false);
//         }
//       }
//     },
//     [page, debouncedSearch, products.length]
//   );

//   useEffect(() => {
//     load(false);
//   }, [page, debouncedSearch]);

//   useEffect(() => {
//     adminApi
//       .getCategories()
//       .then((r) => setCategories(r.data.data || []))
//       .catch(() => toast.error('Failed to load categories', { style: toastStyle }));
//   }, []);

//   const updateVariantRow = (index: number, field: 'size' | 'color' | 'stock', value: string) => {
//     setVariantRows((rows) =>
//       rows.map((row, rowIndex) =>
//         rowIndex === index ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const openCreate = () => {
//     setEditProduct(null);
//     setForm({
//       title: '',
//       description: '',
//       category_id: categories.find((cat) => cat.is_active)?.id?.toString() || categories[0]?.id?.toString() || '',
//       price: '',
//       old_price: '',
//       badge: '',
//       is_new: false,
//       is_featured: false,
//       is_active: true,
//     });
//     setVariantRows([{ size: '', color: '', stock: '10' }]);
//     setImageFiles([]);
//     setFormOpen(true);
//   };

//   const openEdit = (p: Product) => {
//     setEditProduct(p);
//     setForm({
//       title: p.title,
//       description: p.description || '',
//       category_id: p.category.id.toString(),
//       price: p.price.toString(),
//       old_price: p.old_price.toString(),
//       badge: p.badge || '',
//       is_new: p.is_new,
//       is_featured: p.is_featured,
//       is_active: p.is_active ?? true,
//     });

//     setVariantRows(
//       p.variants.length > 0
//         ? p.variants.map((v) => ({
//             size: v.size || 'Free Size',
//             color: v.color === 'Default' ? '' : v.color || '',
//             stock: v.stock.toString(),
//           }))
//         : [{ size: '', color: '', stock: '10' }]
//     );

//     setImageFiles([]);
//     setFormOpen(true);
//   };

//   const handleSave = async () => {
//     if (!form.title.trim() || !form.category_id || !form.price || !form.old_price) {
//       toast.error('Fill in required fields', { style: toastStyle });
//       return;
//     }

//     if (variantRows.some((row) => !row.size.trim())) {
//       toast.error('Please select size for all variants', { style: toastStyle });
//       return;
//     }

//     setSaving(true);

//     try {
//       const payload = {
//         title: form.title.trim(),
//         description: form.description.trim() || null,
//         category_id: Number(form.category_id),
//         price: Number(form.price),
//         old_price: Number(form.old_price),
//         badge: form.badge.trim() || null,
//         is_new: form.is_new,
//         is_featured: form.is_featured,
//         is_active: form.is_active,
//         variants: variantRows.map((r) => ({
//           size: r.size.trim(),
//           color: r.color.trim() || 'Default',
//           stock: Number(r.stock) || 0,
//           additional_price: 0,
//         })),
//       };

//       let productId: number;

//       if (editProduct) {
//         const res = await adminApi.updateProduct(editProduct.id, payload);
//         productId = res.data.data.id;
//         toast.success('Product updated', { style: toastStyle });
//       } else {
//         const res = await adminApi.createProduct(payload);
//         productId = res.data.data.id;
//         toast.success('Product created', { style: toastStyle });
//       }

//       for (let i = 0; i < imageFiles.length; i++) {
//         await adminApi.uploadProductImage(productId, imageFiles[i], i);
//       }

//       setFormOpen(false);
//       setImageFiles([]);
//       await load(true);
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Failed to save product', { style: toastStyle });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;

//     setDeleting(true);

//     try {
//       await adminApi.deleteProduct(deleteId);
//       setProducts((prev) => prev.filter((p) => p.id !== deleteId));
//       setTotal((prev) => Math.max(0, prev - 1));
//       toast.success('Product deleted', { style: toastStyle });
//       setDeleteId(null);
//       await load(true);
//     } catch (err: any) {
//       toast.error(err.response?.data?.error || 'Could not delete product', { style: toastStyle });
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const preventScrollChange = (e: WheelEvent<HTMLInputElement>) => {
//     e.currentTarget.blur();
//   };

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <h1 className="font-heading text-3xl text-admin-text">Products</h1>
//           <p className="font-body text-sm text-admin-muted mt-1">{total} total products</p>
//         </div>

//         <button onClick={openCreate} className="admin-btn-primary">
//           <FiPlus className="w-4 h-4" /> Add Product
//         </button>
//       </div>

//       <div className="flex items-center gap-3 flex-wrap">
//         <div className="relative max-w-sm w-full">
//           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
//           <input
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search products..."
//             className="admin-input pl-10"
//           />
//         </div>

//         {refreshing && !loading && (
//           <span className="font-body text-xs text-admin-muted">Updating...</span>
//         )}
//       </div>

//       {loading ? (
//         <PageLoader />
//       ) : products.length === 0 ? (
//         <EmptyState
//           icon={<FiPackage className="w-16 h-16" />}
//           title="No products found"
//           description={debouncedSearch ? 'Try a different search keyword' : 'Create your first product to get started'}
//         />
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {products.map((product, i) => (
//               <motion.div
//                 key={product.id}
//                 initial={false}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: Math.min(i * 0.015, 0.12) }}
//                 className="admin-card overflow-hidden group hover:border-brand-500/30 transition-all"
//               >
//                 <div className="aspect-[4/3] bg-admin-bg overflow-hidden relative">
//                   {product.images?.[0] ? (
//                     <img
//                       src={product.images[0].url}
//                       alt={product.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <FiPackage className="w-10 h-10 text-admin-border" />
//                     </div>
//                   )}

//                   <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
//                     {product.is_new && <Badge status="active" label="New" />}
//                     {product.is_featured && <Badge status="approved" label="Featured" />}
//                     {product.is_active === false && <Badge status="inactive" label="Inactive" />}
//                   </div>

//                   <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
//                     <button
//                       onClick={() => openEdit(product)}
//                       className="w-7 h-7 rounded-lg bg-admin-card/90 flex items-center justify-center hover:bg-brand-800 text-admin-text transition-colors cursor-pointer"
//                     >
//                       <FiEdit2 className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       onClick={() => setDeleteId(product.id)}
//                       className="w-7 h-7 rounded-lg bg-admin-card/90 flex items-center justify-center hover:bg-red-800 text-admin-text transition-colors cursor-pointer"
//                     >
//                       <FiTrash2 className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <p className="font-body text-[10px] text-brand-400 uppercase tracking-wider mb-1">
//                     {product.category.name}
//                   </p>
//                   <h3 className="font-body text-sm font-semibold text-admin-text line-clamp-1 mb-2">
//                     {product.title}
//                   </h3>

//                   <div className="flex items-center justify-between gap-3">
//                     <div className="min-w-0">
//                       <span className="font-body text-sm font-bold text-admin-text">
//                         ₹{Number(product.price).toLocaleString('en-IN')}
//                       </span>
//                       <span className="font-body text-xs text-admin-muted line-through ml-2">
//                         ₹{Number(product.old_price).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                     <span className="font-body text-xs text-admin-muted whitespace-nowrap">
//                       {product.variants.reduce((s, v) => s + Number(v.stock || 0), 0)} in stock
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//         </>
//       )}

//       <Modal
//         open={formOpen}
//         onClose={() => !saving && setFormOpen(false)}
//         title={editProduct ? 'Edit Product' : 'Add Product'}
//         size="xl"
//       >
//         <div className="grid grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto pr-1">
//           <div className="col-span-2">
//             <Input
//               label="Title *"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               placeholder="e.g. Kanjivaram Silk Saree"
//             />
//           </div>

//           <div className="col-span-2">
//             <Textarea
//               label="Description"
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//               placeholder="Product description..."
//             />
//           </div>

//           <Select
//             label="Category *"
//             value={form.category_id}
//             onChange={(e) => setForm({ ...form, category_id: e.target.value })}
//           >
//             <option value="">Select category</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}{c.is_active ? '' : ' (Inactive)'}
//               </option>
//             ))}
//           </Select>

//           <Input
//             label="Badge"
//             value={form.badge}
//             onChange={(e) => setForm({ ...form, badge: e.target.value })}
//             placeholder="e.g. Bestseller"
//           />

//           <div>
//             <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-1.5 block">
//               Price (₹) *
//             </label>
//             <input
//               type="number"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//               onWheel={preventScrollChange}
//               placeholder="0"
//               className="admin-input w-full"
//               min="0"
//               step="1"
//             />
//           </div>

//           <div>
//             <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-1.5 block">
//               Old Price (₹) *
//             </label>
//             <input
//               type="number"
//               value={form.old_price}
//               onChange={(e) => setForm({ ...form, old_price: e.target.value })}
//               onWheel={preventScrollChange}
//               placeholder="0"
//               className="admin-input w-full"
//               min="0"
//               step="1"
//             />
//           </div>

//           <div className="col-span-2 flex gap-6 flex-wrap">
//             <Toggle
//               checked={form.is_new}
//               onChange={(v) => setForm({ ...form, is_new: v })}
//               label="Mark as New Arrival"
//             />
//             <Toggle
//               checked={form.is_featured}
//               onChange={(v) => setForm({ ...form, is_featured: v })}
//               label="Featured Product"
//             />
//             <Toggle
//               checked={form.is_active}
//               onChange={(v) => setForm({ ...form, is_active: v })}
//               label="Active (visible in store)"
//             />
//           </div>

//           <div className="col-span-2">
//             <div className="flex items-center justify-between mb-2">
//               <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
//                 Variants (Size / Color / Stock)
//               </label>
//               <button
//                 type="button"
//                 onClick={() => setVariantRows([...variantRows, { size: '', color: '', stock: '0' }])}
//                 className="font-body text-xs text-brand-400 hover:text-brand-300 cursor-pointer flex items-center gap-1"
//               >
//                 <FiPlus className="w-3.5 h-3.5" /> Add Variant
//               </button>
//             </div>

//             <div className="space-y-2">
//               <div className="grid grid-cols-4 gap-2 px-1">
//                 <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Size</span>
//                 <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Color</span>
//                 <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Stock</span>
//                 <span />
//               </div>

//               {variantRows.map((row, i) => (
//                 <div key={i} className="grid grid-cols-4 gap-2 items-start">
//                   <SearchableDropdown
//                     value={row.size}
//                     options={SIZE_OPTIONS}
//                     placeholder="Search or select size"
//                     onChange={(value) => updateVariantRow(i, 'size', value)}
//                   />

//                   <SearchableDropdown
//                     value={row.color}
//                     options={COLOR_OPTIONS}
//                     placeholder="Search or select color"
//                     onChange={(value) => updateVariantRow(i, 'color', value)}
//                   />

//                   <input
//                     value={row.stock}
//                     onChange={(e) => updateVariantRow(i, 'stock', e.target.value)}
//                     onWheel={preventScrollChange}
//                     type="number"
//                     placeholder="0"
//                     min="0"
//                     className="admin-input text-xs"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setVariantRows(variantRows.filter((_, j) => j !== i))}
//                     className="w-8 h-8 flex items-center justify-center text-admin-muted hover:text-red-400 cursor-pointer"
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="col-span-2">
//             <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-2 block">
//               Images
//             </label>
//             <label className="flex items-center justify-center gap-2 border-2 border-dashed border-admin-border rounded-xl p-6 cursor-pointer hover:border-brand-500/50 transition-colors">
//               <FiUpload className="w-5 h-5 text-admin-muted" />
//               <span className="font-body text-sm text-admin-muted">
//                 Click to upload images (JPEG, PNG, WebP · max 5MB each)
//               </span>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))}
//               />
//             </label>

//             {imageFiles.length > 0 && (
//               <p className="font-body text-xs text-brand-400 mt-2">
//                 {imageFiles.length} file(s) selected
//               </p>
//             )}

//             {editProduct && editProduct.images.length > 0 && (
//               <div className="flex gap-2 mt-3 flex-wrap">
//                 {editProduct.images.map((img) => (
//                   <img
//                     key={img.id}
//                     src={img.url}
//                     alt=""
//                     className="w-16 h-16 rounded-lg object-cover border border-admin-border"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-admin-border">
//           <button onClick={() => setFormOpen(false)} disabled={saving} className="admin-btn-secondary">
//             Cancel
//           </button>
//           <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
//             {saving ? <Spinner size="sm" /> : null}
//             {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
//           </button>
//         </div>
//       </Modal>

//       <ConfirmDialog
//         open={deleteId !== null}
//         onClose={() => !deleting && setDeleteId(null)}
//         onConfirm={handleDelete}
//         loading={deleting}
//         title="Delete Product"
//         message="This will soft-delete the product. It won't appear in the store but order history is preserved."
//       />
//     </div>
//   );
// }


import { useEffect, useRef, useState, useCallback, type WheelEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage, FiUpload, FiX, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/client';
import { Product, Category } from '../../types';
import {
  PageLoader,
  Modal,
  ConfirmDialog,
  Pagination,
  EmptyState,
  Badge,
  Input,
  Textarea,
  Select,
  Toggle,
  Spinner,
} from '../../components/ui';
import { toastStyle } from '../../store/authstore';

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 450;

const SIZE_OPTIONS = [
  'Free Size',
  'One Size',
  'Extra Small',
  'Small',
  'Medium',
  'Large',
  'Extra Large',
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '2XL',
  '3XL',
  '4XL',
  '5XL',
  '6XL',
  '7XL',
  '8XL',
  '9XL',
  '10XL',
  '0',
  '2',
  '4',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  '32',
  '34',
  '36',
  '38',
  '40',
  '42',
  '44',
  '46',
  '48',
  '50',
  '52',
  '54',
  '56',
  '58',
  '60',
];

const COLOR_OPTIONS = [
  'Default',
  'Black',
  'White',
  'Off White',
  'Ivory',
  'Cream',
  'Beige',
  'Brown',
  'Tan',
  'Camel',
  'Grey',
  'Charcoal',
  'Silver',
  'Gold',
  'Rose Gold',
  'Yellow',
  'Mustard',
  'Orange',
  'Peach',
  'Coral',
  'Red',
  'Maroon',
  'Wine',
  'Burgundy',
  'Pink',
  'Baby Pink',
  'Hot Pink',
  'Magenta',
  'Purple',
  'Lavender',
  'Lilac',
  'Violet',
  'Blue',
  'Navy Blue',
  'Royal Blue',
  'Sky Blue',
  'Teal',
  'Turquoise',
  'Cyan',
  'Green',
  'Mint Green',
  'Olive',
  'Mehendi',
  'Pista',
  'Sea Green',
  'Multi Color',
];

interface SearchableDropdownProps {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

function SearchableDropdown({ value, options, placeholder, onChange }: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const selectingRef = useRef(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (selectingRef.current) return;

        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        placeholder={placeholder}
        className="admin-input text-xs pr-8"
      />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors"
      >
        <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full z-[80] mt-1 max-h-48 overflow-y-auto rounded-xl border border-admin-border bg-admin-card shadow-xl"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectingRef.current = true;
                  }}
                  onClick={() => {
                    setQuery(option);
                    onChange(option);
                    setOpen(false);
                    window.setTimeout(() => {
                      selectingRef.current = false;
                    }, 160);
                  }}
                  className={`w-full text-left px-3 py-2 font-body text-xs transition-colors cursor-pointer ${
                    option === value
                      ? 'bg-brand-500/15 text-brand-300'
                      : 'text-admin-text hover:bg-admin-hover'
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 font-body text-xs text-admin-muted">
                Press save to use "{query.trim() || placeholder}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const requestIdRef = useRef(0);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    old_price: '',
    badge: '',
    is_new: false,
    is_featured: false,
    is_active: true,
  });

  const [variantRows, setVariantRows] = useState([
    { size: '', color: '', stock: '10' },
  ]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const load = useCallback(
    async (silent = false) => {
      const requestId = ++requestIdRef.current;

      if (silent || products.length > 0) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const res = await adminApi.getProducts({
          page,
          page_size: PAGE_SIZE,
          search: debouncedSearch || undefined,
        });

        if (requestId !== requestIdRef.current) return;

        setProducts(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (err: any) {
        if (requestId !== requestIdRef.current) return;
        toast.error(err.response?.data?.error || 'Failed to load products', { style: toastStyle });
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [page, debouncedSearch, products.length]
  );

  useEffect(() => {
    load(false);
  }, [page, debouncedSearch]);

  useEffect(() => {
    adminApi
      .getCategories()
      .then((r) => setCategories(r.data.data || []))
      .catch(() => toast.error('Failed to load categories', { style: toastStyle }));
  }, []);

  const updateVariantRow = (index: number, field: 'size' | 'color' | 'stock', value: string) => {
    setVariantRows((rows) =>
      rows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row
      )
    );
  };

  const openCreate = () => {
    setEditProduct(null);
    setForm({
      title: '',
      description: '',
      category_id: categories.find((cat) => cat.is_active)?.id?.toString() || categories[0]?.id?.toString() || '',
      price: '',
      old_price: '',
      badge: '',
      is_new: false,
      is_featured: false,
      is_active: true,
    });
    setVariantRows([{ size: '', color: '', stock: '10' }]);
    setImageFiles([]);
    setFormOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      title: p.title,
      description: p.description || '',
      category_id: p.category.id.toString(),
      price: p.price.toString(),
      old_price: p.old_price.toString(),
      badge: p.badge || '',
      is_new: p.is_new,
      is_featured: p.is_featured,
      is_active: p.is_active ?? true,
    });

    setVariantRows(
      p.variants.length > 0
        ? p.variants.map((v) => ({
            size: v.size || 'Free Size',
            color: v.color === 'Default' ? '' : v.color || '',
            stock: v.stock.toString(),
          }))
        : [{ size: '', color: '', stock: '10' }]
    );

    setImageFiles([]);
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.category_id || !form.price || !form.old_price) {
      toast.error('Fill in required fields', { style: toastStyle });
      return;
    }

    if (variantRows.some((row) => !row.size.trim())) {
      toast.error('Please select size for all variants', { style: toastStyle });
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        category_id: Number(form.category_id),
        price: Number(form.price),
        old_price: Number(form.old_price),
        badge: form.badge.trim() || null,
        is_new: form.is_new,
        is_featured: form.is_featured,
        is_active: form.is_active,
        variants: variantRows.map((r) => ({
          size: r.size.trim(),
          color: r.color.trim() || 'Default',
          stock: Number(r.stock) || 0,
          additional_price: 0,
        })),
      };

      let productId: number;

      if (editProduct) {
        const res = await adminApi.updateProduct(editProduct.id, payload);
        productId = res.data.data.id;
        toast.success('Product updated', { style: toastStyle });
      } else {
        const res = await adminApi.createProduct(payload);
        productId = res.data.data.id;
        toast.success('Product created', { style: toastStyle });
      }

      for (let i = 0; i < imageFiles.length; i++) {
        await adminApi.uploadProductImage(productId, imageFiles[i], i);
      }

      setFormOpen(false);
      setImageFiles([]);
      await load(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to save product', { style: toastStyle });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await adminApi.deleteProduct(deleteId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setTotal((prev) => Math.max(0, prev - 1));
      toast.success('Product deleted', { style: toastStyle });
      setDeleteId(null);
      await load(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Could not delete product', { style: toastStyle });
    } finally {
      setDeleting(false);
    }
  };

  const preventScrollChange = (e: WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-admin-text">Products</h1>
          <p className="font-body text-sm text-admin-muted mt-1">{total} total products</p>
        </div>

        <button onClick={openCreate} className="admin-btn-primary">
          <FiPlus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative max-w-sm w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="admin-input pl-10"
          />
        </div>

        {refreshing && !loading && (
          <span className="font-body text-xs text-admin-muted">Updating...</span>
        )}
      </div>

      {loading ? (
        <PageLoader />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<FiPackage className="w-16 h-16" />}
          title="No products found"
          description={debouncedSearch ? 'Try a different search keyword' : 'Create your first product to get started'}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.12) }}
                className="admin-card overflow-hidden group hover:border-brand-500/30 transition-all"
              >
                <div className="aspect-[4/3] bg-admin-bg overflow-hidden relative">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiPackage className="w-10 h-10 text-admin-border" />
                    </div>
                  )}

                  <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                    {product.is_new && <Badge status="active" label="New" />}
                    {product.is_featured && <Badge status="approved" label="Featured" />}
                    {product.is_active === false && <Badge status="inactive" label="Inactive" />}
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => openEdit(product)}
                      className="w-7 h-7 rounded-lg bg-white/95 flex items-center justify-center text-[#7A4E48] border border-[#E8DCCB] shadow-sm hover:bg-[#FFF7E6] hover:border-[#C9A86A] hover:text-[#5A3A36] hover:shadow-md transition-all cursor-pointer"
                      title="Edit product"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="w-7 h-7 rounded-lg bg-white/95 flex items-center justify-center text-[#C58C85] border border-[#F0C6C1] shadow-sm hover:bg-[#FFF0F0] hover:border-[#C58C85] hover:text-[#A8665F] hover:shadow-md transition-all cursor-pointer"
                      title="Delete product"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="font-body text-[10px] text-brand-400 uppercase tracking-wider mb-1">
                    {product.category.name}
                  </p>
                  <h3 className="font-body text-sm font-semibold text-admin-text line-clamp-1 mb-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="font-body text-sm font-bold text-admin-text">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </span>
                      <span className="font-body text-xs text-admin-muted line-through ml-2">
                        ₹{Number(product.old_price).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="font-body text-xs text-admin-muted whitespace-nowrap">
                      {product.variants.reduce((s, v) => s + Number(v.stock || 0), 0)} in stock
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <Modal
        open={formOpen}
        onClose={() => !saving && setFormOpen(false)}
        title={editProduct ? 'Edit Product' : 'Add Product'}
        size="xl"
      >
        <div className="grid grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto pr-1">
          <div className="col-span-2">
            <Input
              label="Title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Kanjivaram Silk Saree"
            />
          </div>

          <div className="col-span-2">
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Product description..."
            />
          </div>

          <Select
            label="Category *"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}{c.is_active ? '' : ' (Inactive)'}
              </option>
            ))}
          </Select>

          <Input
            label="Badge"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            placeholder="e.g. Bestseller"
          />

          <div>
            <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-1.5 block">
              Price (₹) *
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              onWheel={preventScrollChange}
              placeholder="0"
              className="admin-input w-full"
              min="0"
              step="1"
            />
          </div>

          <div>
            <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-1.5 block">
              Old Price (₹) *
            </label>
            <input
              type="number"
              value={form.old_price}
              onChange={(e) => setForm({ ...form, old_price: e.target.value })}
              onWheel={preventScrollChange}
              placeholder="0"
              className="admin-input w-full"
              min="0"
              step="1"
            />
          </div>

          <div className="col-span-2 flex gap-6 flex-wrap">
            <Toggle
              checked={form.is_new}
              onChange={(v) => setForm({ ...form, is_new: v })}
              label="Mark as New Arrival"
            />
            <Toggle
              checked={form.is_featured}
              onChange={(v) => setForm({ ...form, is_featured: v })}
              label="Featured Product"
            />
            <Toggle
              checked={form.is_active}
              onChange={(v) => setForm({ ...form, is_active: v })}
              label="Active (visible in store)"
            />
          </div>

          <div className="col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider">
                Variants (Size / Color / Stock)
              </label>
              <button
                type="button"
                onClick={() => setVariantRows([...variantRows, { size: '', color: '', stock: '0' }])}
                className="font-body text-xs text-brand-400 hover:text-brand-300 cursor-pointer flex items-center gap-1"
              >
                <FiPlus className="w-3.5 h-3.5" /> Add Variant
              </button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 px-1">
                <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Size</span>
                <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Color</span>
                <span className="font-body text-[10px] text-admin-muted uppercase tracking-wider">Stock</span>
                <span />
              </div>

              {variantRows.map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 items-start">
                  <SearchableDropdown
                    value={row.size}
                    options={SIZE_OPTIONS}
                    placeholder="Search or select size"
                    onChange={(value) => updateVariantRow(i, 'size', value)}
                  />

                  <SearchableDropdown
                    value={row.color}
                    options={COLOR_OPTIONS}
                    placeholder="Search or select color"
                    onChange={(value) => updateVariantRow(i, 'color', value)}
                  />

                  <input
                    value={row.stock}
                    onChange={(e) => updateVariantRow(i, 'stock', e.target.value)}
                    onWheel={preventScrollChange}
                    type="number"
                    placeholder="0"
                    min="0"
                    className="admin-input text-xs"
                  />

                  <button
                    type="button"
                    onClick={() => setVariantRows(variantRows.filter((_, j) => j !== i))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-admin-muted hover:bg-[#FFF0F0] hover:text-[#C58C85] transition-colors cursor-pointer"
                    title="Remove variant"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="font-body text-xs font-semibold text-admin-muted uppercase tracking-wider mb-2 block">
              Images
            </label>
            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-admin-border rounded-xl p-6 cursor-pointer hover:border-brand-500/50 transition-colors">
              <FiUpload className="w-5 h-5 text-admin-muted" />
              <span className="font-body text-sm text-admin-muted">
                Click to upload images (JPEG, PNG, WebP · max 5MB each)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))}
              />
            </label>

            {imageFiles.length > 0 && (
              <p className="font-body text-xs text-brand-400 mt-2">
                {imageFiles.length} file(s) selected
              </p>
            )}

            {editProduct && editProduct.images.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {editProduct.images.map((img) => (
                  <img
                    key={img.id}
                    src={img.url}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-admin-border"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-admin-border">
          <button onClick={() => setFormOpen(false)} disabled={saving} className="admin-btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
            {saving ? <Spinner size="sm" /> : null}
            {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => !deleting && setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Product"
        message="This will soft-delete the product. It won't appear in the store but order history is preserved."
      />
    </div>
  );
}
