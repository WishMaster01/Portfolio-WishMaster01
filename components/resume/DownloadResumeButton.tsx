import { buttonVariants } from "@/components/ui/button";

export function DownloadResumeButton() {
  return (
    <a
      href="/api/resume/pdf"
      download
      className={buttonVariants({ className: "w-full sm:w-auto" })}
    >
      Download PDF
    </a>
  );
}
