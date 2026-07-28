/**
 * Refuses to build while `npm run dev` is listening.
 *
 * Even with distDir pointed elsewhere, `next build` still touches .next during
 * parts of the run. Doing that under a live dev server leaves it referencing
 * chunks that no longer exist, and the site then fails with either a blank page
 * (404 stylesheet) or "Cannot find module './331.js'" — a confusing failure
 * with no obvious link to the build that caused it.
 *
 * Cheaper to make the mistake impossible than to diagnose it again.
 */
import { createConnection } from "node:net";

const PORT = Number(process.env.PORT || 3000);

function isListening(port) {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host: "127.0.0.1" });
    const done = (result) => {
      socket.destroy();
      resolve(result);
    };
    socket.setTimeout(600);
    socket.on("connect", () => done(true));
    socket.on("error", () => done(false));
    socket.on("timeout", () => done(false));
  });
}

export async function assertDevServerStopped() {
  if (!(await isListening(PORT))) return;

  console.error(
    [
      "",
      `✗ Something is already listening on port ${PORT} — most likely \`npm run dev\`.`,
      "",
      "  Building now would corrupt that server's .next directory and the site",
      "  would start failing with a blank page or a missing-module error.",
      "",
      "  Stop the dev server first, then run this again.",
      "  If it is already broken: delete .next and restart `npm run dev`.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}
