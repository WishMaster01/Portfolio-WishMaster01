"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          result?.error?.message ??
            result?.message ??
            "Invalid credentials. Please verify your admin email and password.",
        );
        return;
      }

      // Check if logged in user has ADMIN role
      if (result.data?.user?.role !== "ADMIN") {
        setError("Account authenticated, but lacks administrator privileges.");
        return;
      }

      router.refresh();
    } catch {
      setError("Failed to connect to authentication server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-accent/20 bg-surface/90 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 text-center">
        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-accent">
          Restricted Area
        </span>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground">
          Admin Console Authentication
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">
          Sign in with administrator credentials to manage portfolio content, inspect audit logs, and configure platform settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1" htmlFor="admin-email">
            Admin Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@wishmaster01.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-2 font-bold"
        >
          {loading ? "Authenticating..." : "Sign In to Admin Console"}
        </Button>
      </form>
    </div>
  );
}
