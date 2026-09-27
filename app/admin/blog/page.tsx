import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { CreateBlogForm } from "@/components/blog/create-blog-form";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAdminUserFromCookieStore } from "@/lib/server/auth";

export const metadata: Metadata = {
  title: "Admin Blog Publishing",
  description:
    "Protected administrative surface for authoring and publishing technical articles.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminBlogPage() {
  const cookieStore = await cookies();
  const adminUser = await getAdminUserFromCookieStore(cookieStore);

  if (!adminUser) {
    return (
      <div className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 bg-background text-foreground">
        <Container className="max-w-md">
          <AdminLoginForm />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-295">
          <Reveal className="mb-8">
            <Link
              href="/admin"
              className="text-xs font-black uppercase tracking-wider text-accent hover:underline"
            >
              ← Back to Admin Dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Publish New Technical Article
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Administrative content management surface. Authenticated as{" "}
              <span className="font-semibold text-foreground">{adminUser.email}</span>.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="rounded-2xl border border-border bg-surface shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <CreateBlogForm />
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
