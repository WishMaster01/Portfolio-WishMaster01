"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type AdminSessionBarProps = {
  adminEmail: string;
  adminName?: string | null;
};

export function AdminSessionBar({ adminEmail, adminName }: AdminSessionBarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/20 bg-accent/5 px-4 py-2.5 text-xs">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-foreground">
          {adminName || "Administrator"}
        </span>
        <span className="text-muted-foreground">({adminEmail})</span>
        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-black uppercase text-accent">
          RBAC: ADMIN
        </span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        disabled={loggingOut}
        onClick={handleLogout}
        className="h-7 text-xs text-muted-foreground hover:text-foreground"
      >
        {loggingOut ? "Signing out..." : "Sign Out"}
      </Button>
    </div>
  );
}
