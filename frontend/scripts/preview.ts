/** Local preview only. Vercel serves out/ directly; there is no production backend. */
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const port = Number(process.env.PORT);
if (!port) throw new Error('Set PORT to serve the static export locally.');
const mime: Record<string, string> = { '.html':'text/html; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.txt':'text/plain; charset=utf-8', '.woff2':'font/woff2', '.woff':'font/woff', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.mp4':'video/mp4', '.webm':'video/webm' };

createServer(async (req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow:'GET, HEAD' }); res.end(); return; }
    const pathname = decodeURIComponent(new URL(req.url || '/', 'http://static.local').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    let status = 200;
    let info;
    try { info = await stat(file); if (info.isDirectory()) { file = resolve(file, 'index.html'); info = await stat(file); } }
    catch { status = 404; file = resolve(root, '404.html'); info = await stat(file); }
    const size = info.size;
    const headers: Record<string, string | number> = { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Accept-Ranges':'bytes', 'X-Content-Type-Options':'nosniff', 'Cache-Control': pathname.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : 'no-cache' };
    if (req.headers.range && status === 200) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      const start = match?.[1] ? Number(match[1]) : match?.[2] ? Math.max(0, size - Number(match[2])) : 0;
      const end = match?.[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
      if (!match || start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); res.end(); return; }
      res.writeHead(206, { ...headers, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${size}` });
      if (req.method === 'HEAD') res.end(); else createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(status, { ...headers, 'Content-Length': size });
      if (req.method === 'HEAD') res.end(); else createReadStream(file).pipe(res);
    }
  } catch { if (!res.headersSent) res.writeHead(500); res.end('Unable to serve this file.'); }
}).listen(port, process.env.HOST || '0.0.0.0', () => console.log('Static Next.js preview ready'));