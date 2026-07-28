import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ProjectOgImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({ params }: ProjectOgImageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-linear(135deg, #020617 0%, #111827 58%, #3730a3 100%)",
        color: "#f8fafc",
        padding: 72,
        fontFamily: "Arial",
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 4, color: "#a5b4fc" }}>
        {project.category.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1 }}>
          {project.title}
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 920,
            fontSize: 30,
            color: "#cbd5e1",
          }}
        >
          {project.summary}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
          fontSize: 24,
          color: "#a5b4fc",
        }}
      >
        {project.stack.slice(0, 4).map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>,
    size,
  );
}
