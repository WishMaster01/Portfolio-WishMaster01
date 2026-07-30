import { NextResponse } from "next/server";
import { education, experienceItems } from "@/data/experience";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { skillGroups } from "@/data/skills";

export const runtime = "nodejs";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 42;

type PdfOp = {
  x: number;
  y: number;
  size: number;
  text: string;
  font?: "regular" | "bold";
};

function escapePdfText(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, "-");
}

function wrapText(text: string, maxChars: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;

    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

function addWrapped(
  ops: PdfOp[],
  text: string,
  x: number,
  y: number,
  options: {
    size: number;
    maxChars: number;
    leading?: number;
    maxLines?: number;
    font?: "regular" | "bold";
  },
) {
  const lines = wrapText(text, options.maxChars).slice(0, options.maxLines);
  const leading = options.leading ?? options.size + 3;
  let currentY = y;

  for (const line of lines) {
    ops.push({
      x,
      y: currentY,
      size: options.size,
      text: line,
      font: options.font,
    });
    currentY -= leading;
  }

  return currentY;
}

function section(ops: PdfOp[], title: string, x: number, y: number) {
  ops.push({ x, y, size: 9, text: title.toUpperCase(), font: "bold" });
  return y - 12;
}

function buildResumeOps() {
  const ops: PdfOp[] = [];
  let leftY = PAGE_HEIGHT - MARGIN;
  let rightY = PAGE_HEIGHT - MARGIN - 92;
  const leftX = MARGIN;
  const rightX = 318;
  const leftChars = 58;
  const rightChars = 42;

  ops.push({ x: leftX, y: leftY, size: 24, text: resume.name, font: "bold" });
  leftY -= 24;
  ops.push({ x: leftX, y: leftY, size: 12, text: resume.title, font: "bold" });
  leftY -= 16;
  ops.push({
    x: leftX,
    y: leftY,
    size: 8,
    text: `${resume.location} | ${resume.email} | github.com/WishMaster01 | ${resume.portfolio.replace(/^https?:\/\//, "")}`,
  });
  leftY -= 24;

  leftY = section(ops, "Profile", leftX, leftY);
  leftY =
    addWrapped(ops, resume.summary, leftX, leftY, {
      size: 8,
      maxChars: leftChars,
      maxLines: 4,
    }) - 8;

  leftY = section(ops, "Experience", leftX, leftY);
  for (const item of experienceItems.slice(0, 3)) {
    ops.push({ x: leftX, y: leftY, size: 9, text: item.title, font: "bold" });
    ops.push({
      x: leftX + 190,
      y: leftY,
      size: 7,
      text: item.period,
      font: "bold",
    });
    leftY -= 10;
    ops.push({ x: leftX, y: leftY, size: 7, text: item.company, font: "bold" });
    leftY -= 10;
    for (const achievement of item.achievements.slice(0, 2)) {
      leftY = addWrapped(ops, `- ${achievement}`, leftX, leftY, {
        size: 7,
        maxChars: leftChars,
        maxLines: 2,
        leading: 9,
      });
    }
    leftY -= 5;
  }

  leftY = section(ops, "Projects", leftX, leftY);
  for (const project of projects.slice(0, 4)) {
    ops.push({
      x: leftX,
      y: leftY,
      size: 8,
      text: project.title,
      font: "bold",
    });
    leftY -= 9;
    leftY =
      addWrapped(
        ops,
        `${project.summary} Stack: ${project.stack.slice(0, 4).join(", ")}.`,
        leftX,
        leftY,
        { size: 7, maxChars: leftChars, maxLines: 2, leading: 9 },
      ) - 3;
  }

  rightY = section(ops, "Skills", rightX, rightY);
  for (const group of skillGroups.slice(0, 6)) {
    rightY =
      addWrapped(
        ops,
        `${group.title}: ${group.skills.join(", ")}`,
        rightX,
        rightY,
        { size: 7, maxChars: rightChars, maxLines: 2, leading: 9 },
      ) - 3;
  }

  rightY = section(ops, "Education", rightX, rightY - 4);
  ops.push({
    x: rightX,
    y: rightY,
    size: 8,
    text: education.degree,
    font: "bold",
  });
  rightY -= 10;
  ops.push({
    x: rightX,
    y: rightY,
    size: 7,
    text: `${education.institution} | ${education.period}`,
    font: "bold",
  });
  rightY -= 10;
  rightY =
    addWrapped(ops, education.coursework, rightX, rightY, {
      size: 7,
      maxChars: rightChars,
      maxLines: 3,
      leading: 9,
    }) - 8;

  rightY = section(ops, "Achievements", rightX, rightY);
  for (const achievement of resume.achievements.slice(0, 4)) {
    rightY =
      addWrapped(ops, `- ${achievement}`, rightX, rightY, {
        size: 7,
        maxChars: rightChars,
        maxLines: 2,
        leading: 9,
      }) - 2;
  }

  rightY = section(ops, "Certifications", rightX, rightY - 4);
  for (const certification of resume.certifications) {
    rightY =
      addWrapped(
        ops,
        `- ${certification.title} - ${certification.issuer}, ${certification.year}`,
        rightX,
        rightY,
        { size: 7, maxChars: rightChars, maxLines: 2, leading: 9 },
      ) - 2;
  }

  return ops;
}

function buildPdf() {
  const ops = buildResumeOps();
  const stream = [
    "BT",
    ...ops.map((op) => {
      const font = op.font === "bold" ? "F2" : "F1";
      return `/${font} ${op.size} Tf\n${op.x} ${op.y} Td\n(${escapePdfText(op.text)}) Tj\n-${op.x} -${op.y} Td`;
    }),
    "ET",
  ].join("\n");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n`,
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    `6 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += object;
  }

  const xrefOffset = Buffer.byteLength(pdf, "ascii");
  pdf += "xref\n0 7\n";
  pdf += "0000000000 65535 f \n";

  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "ascii");
}

export async function GET(request: Request) {
  const file = buildPdf();
  const { searchParams } = new URL(request.url);
  const disposition =
    searchParams.get("disposition") === "inline" ? "inline" : "attachment";

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="WishMaster01-Resume.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
