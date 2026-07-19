import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  title: string;
  description: string;
  rows: T[];
  columns: DataTableColumn<T>[];
  emptyLabel?: string;
};

export function DataTable<T>({
  title,
  description,
  rows,
  columns,
  emptyLabel = "No records available yet.",
}: DataTableProps<T>) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface/85 shadow-sm shadow-foreground/5 backdrop-blur">
      <div className="border-b border-border p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          Data table
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-border bg-surface-elevated/45 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition hover:bg-accent/5"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="border-b border-border px-5 py-4 align-top"
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  {emptyLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
