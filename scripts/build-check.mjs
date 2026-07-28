/**
 * Safe production build for verification.
 *
 * `next dev` and `next build` both write to .next by default, so running a
 * build while the dev server is live deletes the chunks that server is still
 * serving — the page then loads a 404 stylesheet and renders blank.
 *
 * This points the build at .next-build instead (see distDir in next.config.ts),
 * so it can run any time without disturbing `npm run dev`.
 *
 * Written as a script rather than an inline env prefix because Windows npm
 * scripts run through cmd.exe, which does not understand `VAR=value cmd`.
 */
import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, BUILD_DIR: ".next-build" },
});

process.exit(result.status ?? 1);
