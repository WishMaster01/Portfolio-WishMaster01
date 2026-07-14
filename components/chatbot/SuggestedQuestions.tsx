"use client";

const suggestedQuestions = [
  "What projects has WishMaster01 built?",
  "What tech stack does he know?",
  "Explain InfinityAI.",
  "Is he experienced with Next.js?",
];

type SuggestedQuestionsProps = {
  disabled?: boolean;
  onSelect: (question: string) => void;
};

export function SuggestedQuestions({
  disabled = false,
  onSelect,
}: SuggestedQuestionsProps) {
  return (
    <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
      {suggestedQuestions.map((question) => (
        <button
          key={question}
          type="button"
          className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onSelect(question)}
          disabled={disabled}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
