// Renders the combined guide Markdown into a single static HTML page for
// GitHub Pages. Deliberately minimal: one page, readable typography, no
// client-side JS. The manual `<a id="...">` anchors already present in the
// source are preserved as-is by marked (raw HTML passthrough), so existing
// #m006-style deep links keep working.

import { Marked } from "marked";

const marked = new Marked({ gfm: true, breaks: false });

const TEMPLATE = (title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  :root {
    color-scheme: light dark;
    --fg: #1a1a1a; --bg: #ffffff; --muted: #595959; --border: #d9d9d9; --code-bg: #f4f4f4; --link: #0a5cad;
  }
  @media (prefers-color-scheme: dark) {
    :root { --fg: #e6e6e6; --bg: #14171a; --muted: #a0a0a0; --border: #33383d; --code-bg: #1e2226; --link: #6cb2ff; }
  }
  body { background: var(--bg); color: var(--fg); font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; }
  main { max-width: 860px; margin: 0 auto; padding: 2.5rem 1.5rem 6rem; }
  h1, h2, h3, h4 { line-height: 1.25; }
  h2 { border-bottom: 1px solid var(--border); padding-bottom: .3rem; margin-top: 2.5rem; }
  a { color: var(--link); }
  code, pre { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
  code { background: var(--code-bg); padding: .1em .35em; border-radius: 4px; }
  pre { background: var(--code-bg); padding: 1rem; overflow-x: auto; border-radius: 6px; }
  pre code { background: none; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  th, td { border: 1px solid var(--border); padding: .4rem .6rem; text-align: left; vertical-align: top; }
  th { background: var(--code-bg); }
  blockquote { margin: 1rem 0; padding: 0 1rem; border-left: 3px solid var(--border); color: var(--muted); }
</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>
`;

export function renderHtml(markdown, title = "AGRI API Style Guide") {
  const body = marked.parse(markdown);
  return TEMPLATE(title, body);
}
