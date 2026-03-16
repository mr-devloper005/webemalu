const SkeletonCard = () => (
  <div className="flex gap-5 items-start animate-pulse">
    <div className="flex-1 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-muted" />
        <div className="w-20 h-3 rounded bg-muted" />
      </div>
      <div className="w-full h-5 rounded bg-muted" />
      <div className="w-3/4 h-5 rounded bg-muted" />
      <div className="w-2/3 h-3 rounded bg-muted" />
      <div className="w-1/3 h-3 rounded bg-muted" />
    </div>
    <div className="w-24 h-24 sm:w-32 sm:h-28 rounded-sm bg-muted flex-shrink-0" />
  </div>
);

export default SkeletonCard;
