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
          "linear-gradient(135deg, #020617 0%, #111827 58%, #3730a3 100%)",
        color: "#f8fafc",
        padding: 72,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          color: "#a5b4fc",
        }}
      >
        {project.category.toUpperCase()}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {project.title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            maxWidth: 920,
            fontSize: 30,
            lineHeight: 1.35,
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
          <div
            key={item}
            style={{
              display: "flex",
              padding: "8px 14px",
              border: "1px solid rgba(165, 180, 252, 0.3)",
              borderRadius: 10,
              background: "rgba(15, 23, 42, 0.55)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
