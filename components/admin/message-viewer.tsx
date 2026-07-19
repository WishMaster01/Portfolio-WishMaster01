type MessageRecord = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

type MessageViewerProps = {
  messages: MessageRecord[];
};

export function MessageViewer({ messages }: MessageViewerProps) {
  return (
    <section
      id="messages"
      className="rounded-[2rem] border border-border bg-surface/85 shadow-sm shadow-foreground/5 backdrop-blur"
    >
      <div className="border-b border-border p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          MessageViewer
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
          Contact messages
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Recent contact submissions from PostgreSQL when available. If the
          database is not connected, this module stays ready with an empty state.
        </p>
      </div>

      <div className="grid gap-3 p-5 sm:p-6">
        {messages.length ? (
          messages.map((message) => (
            <article
              key={message.id}
              className="rounded-2xl border border-border bg-background/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-black">{message.subject}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {message.name} · {message.email}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-black uppercase text-accent">
                  {message.status}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {message.message}
              </p>
              <p className="mt-3 text-xs font-bold text-muted-foreground">
                {new Date(message.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background/50 p-8 text-center">
            <p className="font-black">No messages loaded yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect PostgreSQL and submit the contact form to populate this
              admin module.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
