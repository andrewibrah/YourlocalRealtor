/**
 * Static file server for the test suites.
 *
 * Replaces `python3 -m http.server`, which had two problems that showed up as
 * product failures when they were nothing of the kind:
 *
 *   1. It dropped connections under concurrent load, surfacing as
 *      ERR_CONNECTION_RESET and ERR_SOCKET_NOT_CONNECTED once the site started
 *      serving media.
 *   2. It does not implement HTTP range requests. GitHub Pages does, so video
 *      seeking behaviour could not be tested against a server that behaved like
 *      production.
 *
 * This also serves `404.html` for unmatched paths, matching GitHub Pages.
 *
 * Usage: node scripts/static-server.mjs <root> <port>
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".vtt": "text/vtt; charset=utf-8",
  ".woff2": "font/woff2",
};

/** Resolves a URL path to a file inside `root`, or null. */
function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  // Contain the path: reject anything that escapes the root.
  const target = path.resolve(root, `.${path.posix.normalize(decoded)}`);
  if (target !== root && !target.startsWith(root + path.sep)) return null;

  const candidates = decoded.endsWith("/")
    ? [path.join(target, "index.html")]
    : [target, `${target}.html`, path.join(target, "index.html")];

  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

const server = createServer((req, res) => {
  let file = resolveFile(req.url ?? "/");
  let status = 200;

  if (!file) {
    // GitHub Pages serves 404.html for unmatched paths.
    const notFound = path.join(root, "404.html");
    if (existsSync(notFound)) {
      file = notFound;
      status = 404;
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Not found");
      return;
    }
  }

  const { size } = statSync(file);
  const type = TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const range = req.headers.range;

  // Range support, so media seeking behaves as it does on Pages.
  if (range && status === 200) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : size - 1;

      if (start >= size || end >= size || start > end) {
        res.writeHead(416, { "content-range": `bytes */${size}` });
        res.end();
        return;
      }

      res.writeHead(206, {
        "content-type": type,
        "content-length": end - start + 1,
        "content-range": `bytes ${start}-${end}/${size}`,
        "accept-ranges": "bytes",
      });
      createReadStream(file, { start, end }).pipe(res);
      return;
    }
  }

  res.writeHead(status, {
    "content-type": type,
    "content-length": size,
    "accept-ranges": "bytes",
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(file).pipe(res);
});

server.keepAliveTimeout = 30_000;
server.headersTimeout = 35_000;
server.listen(port, "127.0.0.1", () => {
  console.log(`static-server: ${root} on http://127.0.0.1:${port}`);
});
