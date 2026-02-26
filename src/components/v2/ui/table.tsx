import type { ReactNode } from "react";

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="v2-card-surface overflow-hidden">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-[var(--v2-surface)]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-[var(--v2-border)] px-4 py-3 font-medium text-[var(--v2-text-muted)]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, idy) => (
                <td key={idy} className="border-b border-[var(--v2-border)] px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
