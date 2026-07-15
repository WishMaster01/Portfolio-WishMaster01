import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const stats = [
  { value: "500+", label: "Problems Solved" },
  { value: "200+", label: "LeetCode Problems" },
  { value: "150+", label: "Codeforces Problems" },
  { value: "Master", label: "DSA in Java" },
] as const;

const topics = [
  "Arrays",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs",
  "Searching",
  "Sorting",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Bit Manipulation",
] as const;

export default function DsaShowcasePage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-16">
        <Container className="max-w-[1380px]">
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              DSA Showcase
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              My DSA journey and problem solving skills
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.label} className="rounded-2xl">
                <CardContent className="p-5">
                  <p className="text-2xl font-black">{item.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <h2 className="font-black">Topics</h2>
                <ul className="mt-4 space-y-2">
                  {topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-accent/10 hover:text-accent"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="grid gap-6 p-6 lg:grid-cols-2">
                <div>
                  <h2 className="font-black">Arrays</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Arrays are the most fundamental data structure. They allow
                    efficient traversal, indexing, and pattern-based problem
                    solving.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    {["Traversal", "Insertion", "Deletion", "Searching"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-xl bg-accent/10 px-3 py-2 font-bold text-accent"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5 font-mono text-xs leading-6 text-muted-foreground">
                  <p className="text-accent">public class ArrayExample {"{"}</p>
                  <p className="pl-4">public static void main(String[] args) {"{"}</p>
                  <p className="pl-8">int[] arr = {"{1, 2, 3, 4, 5}"};</p>
                  <p className="pl-8">for (int n : arr) {"{"}</p>
                  <p className="pl-12">System.out.println(n);</p>
                  <p className="pl-8">{"}"}</p>
                  <p className="pl-4">{"}"}</p>
                  <p>{"}"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}
