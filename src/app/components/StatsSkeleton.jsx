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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 animate-pulse">
      {/* CARD */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`
            rounded-2xl
            bg-white/5 backdrop-blur
            border border-white/10
            p-5
            ${i === 4 || i === 5 ? "sm:col-span-2" : ""}
          `}
        >
          <div className="h-4 w-32 bg-white/20 rounded mb-3"></div>
          <div className="h-9 w-20 bg-white/30 rounded"></div>

          <p className="mt-3 text-xs text-white/40">
            {i % 2 === 0 ? "Analyzing gym performance…" : "Crunching numbers…"}
          </p>
        </div>
      ))}
    </div>
  );
}
