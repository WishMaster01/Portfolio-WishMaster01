"use client";

import { Button } from "@/components/ui/button";

export function PrintResumeButton() {
  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full sm:w-auto"
      onClick={() => window.print()}
    >
      Print
    </Button>
  );
}
