type CodeViewerProps = {
  code: string;
  language?: string;
};

export function CodeViewer({ code, language = "Java" }: CodeViewerProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-[#050816] shadow-2xl shadow-accent/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.24em] text-white/50">
          {language}
        </span>
      </div>
      <pre className="max-h-[620px] overflow-x-auto p-5 text-xs leading-6 text-slate-200 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
