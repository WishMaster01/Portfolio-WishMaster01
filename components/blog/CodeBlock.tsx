type CodeBlockProps = {
  code: string;
  language?: string;
};

function highlightCode(code: string) {
  const keywordPattern =
    /\b(const|let|async|await|return|function|type|model|datasource|provider|url|where|data|if|new|class|export|import|from)\b/;

  return code
    .split(
      /(\b(?:const|let|async|await|return|function|type|model|datasource|provider|url|where|data|if|new|class|export|import|from)\b)/g,
    )
    .map((part, index) =>
      keywordPattern.test(part) ? (
        <span key={`${part}-${index}`} className="text-accent">
          {part}
        </span>
      ) : (
        part
      ),
    );
}

export function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-[#050816] shadow-inner">
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
      <pre className="overflow-x-auto p-5 text-xs leading-6 text-slate-200 sm:text-sm">
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}
