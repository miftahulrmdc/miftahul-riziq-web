/**
 * Static export for self-hosting.
 *
 * Emits plain HTML/CSS/JS into out/, which Nginx (or any web server) can serve
 * directly — no Node process in production, nothing to keep alive, and no
 * runtime attack surface beyond the web server itself.
 *
 * Builds through .next-build so it never disturbs a running `npm run dev`.
 * With a custom distDir Next writes the exported site into that directory
 * rather than out/, so the finished files are copied across afterwards to give
 * one predictable folder to upload.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { assertDevServerStopped } from "./guard-dev-server.mjs";

await assertDevServerStopped();

const BUILD_DIR = ".next-build";
const OUT_DIR = "out";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, BUILD_DIR, BUILD_STATIC: "1" },
});

if (result.status !== 0) process.exit(result.status ?? 1);

// The export is identified by index.html sitting at the root of the build dir.
if (!existsSync(join(BUILD_DIR, "index.html"))) {
  console.error(
    `\nExpected ${BUILD_DIR}/index.html after the export but it is missing.`,
  );
  process.exit(1);
}

rmSync(OUT_DIR, { recursive: true, force: true });

// Copy the exported site, skipping Next's own build bookkeeping.
const SKIP = new Set([
  "cache",
  "server",
  "static",
  "types",
  "trace",
  "build-manifest.json",
  "app-build-manifest.json",
  "app-path-routes-manifest.json",
  "prerender-manifest.json",
  "routes-manifest.json",
  "required-server-files.json",
  "images-manifest.json",
  "export-marker.json",
  "export-detail.json",
  "next-minimal-server.js.nft.json",
  "next-server.js.nft.json",
  "package.json",
  "BUILD_ID",
  "react-loadable-manifest.json",
]);

for (const entry of readdirSync(BUILD_DIR)) {
  if (SKIP.has(entry)) continue;
  cpSync(join(BUILD_DIR, entry), join(OUT_DIR, entry), { recursive: true });
}

console.log(`\n✓ Static site ready in ${OUT_DIR}/ — upload its contents to your web root.`);
