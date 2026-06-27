export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#F0EBE3] animate-pulse">
      <div className="aspect-[3/4] bg-[#EFE7DC]" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 bg-[#EFE7DC] rounded-full w-20" />
        <div className="h-4 bg-[#EFE7DC] rounded-full w-full" />
        <div className="h-4 bg-[#EFE7DC] rounded-full w-3/4" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 bg-[#EFE7DC] rounded-full w-20" />
          <div className="h-3 bg-[#EFE7DC] rounded-full w-16" />
        </div>
        <div className="flex gap-1.5 pt-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-4 h-4 rounded-full bg-[#EFE7DC]" />
          ))}
        </div>
      </div>
    </div>
  );
}
