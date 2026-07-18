import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { resume } from "@/data/resume";

export function ContactDetailsSection() {
  return (
    <Card className="rounded-3xl bg-accent text-accent-foreground shadow-xl shadow-accent/20">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-black">Contact details</h2>
        <div className="mt-5 grid gap-3 text-sm">
          <Info label="Email" value={resume.email} />
          <Info label="Phone" value={resume.phone} />
          <Info label="Location" value={resume.location} />
          <Info label="Portfolio" value={resume.portfolio} />
        </div>
        <Link
          href="/contact"
          className={buttonVariants({
            variant: "secondary",
            className: "mt-5 w-full border-white/30 bg-white/15 text-white hover:bg-white/20",
          })}
        >
          Contact Me
        </Link>
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background/15 px-4 py-3">
      <p className="text-xs font-black uppercase tracking-[0.18em] opacity-70">
        {label}
      </p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
