// DynamicTable.jsx
import React from "react";

export default function DynamicTable({
  title = "Tablo",
  columns = [],
  rows = [],
  isLoading = false,
  onCellClick,
}) {
  const align = (a) =>
    a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

  // işaret tespiti (number veya "-12,3"/"0,00" stringlerini anlar)
  const signOf = (val) => {
    if (typeof val === "number") return Math.sign(val);
    if (typeof val === "string") {
      const s = val.trim();
      if (/^-/.test(s)) return -1;
      if (/^[+]?0+(?:[.,]0+)?$/.test(s)) return 0; // "0", "0,0", "0.00"
      return 1;
    }
    return null;
  };

  const colorClass = (val) => {
    const s = signOf(val);
    if (s < 0) return "bg-red-50 text-red-700";
    if (s > 0) return "bg-green-50 text-green-700";
    return ""; // 0 veya anlaşılmayan değer → nötr
  };

  const thKey = (col, i) => col.key ?? col.header ?? `col-${i}`;

  return (
    <div className="rounded-2xl border shadow-sm bg-base-100">
      <div className="px-5 py-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              {columns.map((col, ci) => (
                <th key={thKey(col, ci)} className={`px-2 py-3 ${align(col.align)}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center">
                  Yükleniyor…
                </td>
              </tr>
            )}

            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center opacity-70">
                  Gösterilecek veri yok.
                </td>
              </tr>
            )}

            {!isLoading &&
              rows.map((row, ri) => (
                <tr key={row.id ?? row.year ?? ri}>
                  {columns.map((col, ci) => {
                    const raw = row[col.key];
                    const value = col.render ? col.render(row) : raw;

                    // sadece colorize:true olan kolonlar boyansın
                    const colored = col.colorize ? colorClass(raw) : "";

                    const clickable = Boolean(onCellClick) && (col.clickable ?? true);
                    return (
                      <td
                        key={`${ri}-${thKey(col, ci)}`}
                        className={`px-2 py-6 ${align(col.align)} ${colored} ${
                          clickable ? "cursor-pointer hover:brightness-95" : ""
                        }`}
                        onClick={
                          clickable
                            ? () =>
                                onCellClick?.({
                                  row,
                                  rowIndex: ri,
                                  columnKey: col.key,
                                  columnIndex: ci,
                                  value: raw,
                                })
                            : undefined
                        }
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* legend / not */}
      <div className="px-5 py-3 text-xs sm:text-sm text-neutral-600 flex gap-4 items-center">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> Yeşil: Ödül
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span> Kırmızı: Ceza
        </span>
      </div>
    </div>
  );
}
