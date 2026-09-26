import { redirect } from "next/navigation";

export default function DeprecatedCreateBlogPage() {
  redirect("/admin/blog");
}
