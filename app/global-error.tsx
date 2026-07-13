"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            fontFamily: "system-ui, sans-serif",
            padding: "2rem",
          }}
        >
          <section style={{ maxWidth: "40rem" }}>
            <p>Fatal application error</p>
            <h1>WishMaster01 could not render.</h1>
            <p>Retry the render, then check the server logs if it persists.</p>
            <button onClick={reset}>Try again</button>
          </section>
        </main>
      </body>
    </html>
  );
}
