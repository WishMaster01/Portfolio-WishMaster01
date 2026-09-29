import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = process.cwd();

function resolveFile(filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath;
  }
  const extensions = [".ts", ".tsx", ".js", ".mjs", ".json"];
  for (const ext of extensions) {
    if (fs.existsSync(filePath + ext) && fs.statSync(filePath + ext).isFile()) {
      return filePath + ext;
    }
  }
  for (const ext of extensions) {
    const indexPath = path.join(filePath, "index" + ext);
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return indexPath;
    }
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  // Handle Next.js subpath imports
  if (specifier === "next/server") {
    return nextResolve("next/server.js", context);
  }
  if (specifier === "next/navigation") {
    return nextResolve("next/navigation.js", context);
  }
  if (specifier === "next/headers") {
    return nextResolve("next/headers.js", context);
  }

  // 1. Resolve alias @/...
  if (specifier.startsWith("@/")) {
    const rel = specifier.slice(2);
    const target = path.join(root, rel);
    const resolved = resolveFile(target);
    if (resolved) {
      return nextResolve(pathToFileURL(resolved).href, context);
    }
  }

  // 2. Resolve relative imports without extension (./... or ../...)
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL) {
    try {
      const parentDir = path.dirname(fileURLToPath(context.parentURL));
      const target = path.resolve(parentDir, specifier);
      const resolved = resolveFile(target);
      if (resolved) {
        return nextResolve(pathToFileURL(resolved).href, context);
      }
    } catch {
      // Fall through to nextResolve
    }
  }

  return nextResolve(specifier, context);
}
