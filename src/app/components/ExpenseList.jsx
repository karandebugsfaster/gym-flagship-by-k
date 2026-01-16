// "use client";

// export default function ExpenseList({ expenses }) {
//   if (expenses.length === 0) {
//     return <p className="text-white/60">No expenses added yet.</p>;
//   }

//   return (
//     <div className="space-y-3">
//       {expenses.map((e) => (
//         <div
//           key={e._id}
//           className="p-3 rounded-xl border border-white/20 bg-black"
//         >
//           <div className="flex justify-between">
//             <p className="font-semibold">{e.title}</p>
//             <p className="text-red-400">₹{e.amount}</p>
//           </div>

//           <p className="text-sm text-white/60">
//             {e.category} • {new Date(e.createdAt).toDateString()}
//           </p>

//           {e.note && <p className="text-sm text-white/50 mt-1">{e.note}</p>}
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white/60 text-center">
        💸 No expenses added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((e) => (
        <div
          key={e._id}
          className="
            rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            p-4
            shadow-[0_0_30px_rgba(0,0,0,0.4)]
            space-y-2
          "
        >
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-semibold">{e.title}</p>
              <p className="text-xs text-white/50">
                {e.category} • {new Date(e.createdAt).toDateString()}
              </p>
            </div>

            <p className="text-lg font-bold text-red-400">₹{e.amount}</p>
          </div>

          {/* NOTE */}
          {e.note && (
            <p className="text-sm text-white/60 border-l-2 border-red-500/30 pl-3 mt-2">
              {e.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
