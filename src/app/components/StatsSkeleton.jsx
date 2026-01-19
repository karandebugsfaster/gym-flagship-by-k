// "use client";

// export default function StatsSkeleton() {
//   return (
//     <div className="grid grid-cols-2 gap-4 mb-6 animate-pulse">
//       {Array.from({ length: 7 }).map((_, i) => (
//         <div
//           key={i}
//           className={`
//             rounded-xl p-4
//             bg-white/5 border border-white/10
//             ${i === 5 || i === 6 ? "col-span-2" : ""}
//           `}
//         >
//           <div className="h-4 w-24 bg-white/20 rounded mb-3"></div>
//           <div className="h-8 w-16 bg-white/30 rounded"></div>

//           {i === 0 && (
//             <p className="mt-3 text-xs text-white/40">Calculating stats…</p>
//           )}
//           {i === 3 && (
//             <p className="mt-3 text-xs text-white/40">Analyzing gym data…</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

export default function StatsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {/* TITLE PLACEHOLDER */}
      <div className="px-1">
        <div className="h-3 w-28 bg-white/20 rounded" />
      </div>

      {/* HORIZONTAL SCROLL SKELETON */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="
              glass-card glass-border
              min-w-[220px] max-w-[220px]
              p-5 flex flex-col justify-between
            "
          >
            {/* Title */}
            <div className="h-4 w-28 bg-white/20 rounded" />

            {/* Big number */}
            <div className="h-10 w-20 bg-white/30 rounded mt-4" />

            {/* Sub text */}
            <div className="h-3 w-32 bg-white/15 rounded mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
