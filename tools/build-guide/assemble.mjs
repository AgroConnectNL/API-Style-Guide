#!/usr/bin/env node
// Assembles the split AGRI API Style Guide (docs/style-guide/**) back into a
// single combined Markdown document, regenerating the two compliance
// matrices from each rule file's front matter instead of hand-maintaining
// them. Also validates the source files (`check`).
//
// Usage:
//   node assemble.mjs check
//   node assemble.mjs build --out <path.md> [--html <path.html>]

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderHtml } from "./render.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, "../../docs/style-guide");
const MANIFEST_PATH = path.join(DOCS_DIR, "manifest.yaml");
const ADR_ONLY_PATH = path.join(DOCS_DIR, "adr-only-rules.json");

function parseManifest() {
  const text = readFileSync(MANIFEST_PATH, "utf8");
  const files = [];
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*-\s+(\S.*)$/);
    if (m) files.push(m[1].trim());
  }
  if (files.length === 0) throw new Error(`No files found in ${MANIFEST_PATH}`);
  return files;
}

// Minimal parser for the fixed front-matter shape written by the split
// migration (id/level/title/adr/see_also). Not a general YAML parser.
function parseFrontMatter(content) {
  if (!content.startsWith("---\n")) return { meta: null, body: content };
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) throw new Error("Unterminated front matter block");
  const yaml = content.slice(4, end);
  // The generator always writes exactly one blank line after the closing
  // "---" before the body; strip it so bodies don't gain a spurious blank
  // line when reassembled (the body's own original trailing blank line is
  // preserved as-is).
  const body = content.slice(end + 5).replace(/^\n/, "");

  const meta = {};
  const lines = yaml.split("\n");
  let i = 0;
  const unquote = (s) => {
    s = s.trim();
    if (s === "[]") return [];
    if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1).replace(/\\"/g, '"');
    return s;
  };
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const top = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!top) { i++; continue; }
    const [, key, rest] = top;
    if (rest.trim() !== "") {
      meta[key] = unquote(rest);
      i++;
      continue;
    }
    // block value: nested keys/lists indented under this key
    const block = {};
    i++;
    while (i < lines.length && /^\s+/.test(lines[i]) && lines[i].trim() !== "") {
      const sub = lines[i].match(/^\s+([a-zA-Z_]+):\s*(.*)$/);
      if (sub) {
        const [, subKey, subRest] = sub;
        if (subRest.trim() !== "") {
          block[subKey] = unquote(subRest);
          i++;
        } else {
          const items = [];
          i++;
          while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
            items.push(unquote(lines[i].replace(/^\s+-\s+/, "")));
            i++;
          }
          block[subKey] = items;
        }
      } else {
        i++;
      }
    }
    meta[key] = block;
  }
  return { meta, body };
}

function loadAdrOnlyRules() {
  return JSON.parse(readFileSync(ADR_ONLY_PATH, "utf8")).rules;
}

function mdEscapeCell(s) {
  return String(s).replace(/\|/g, "\\|");
}

function padTable(rows, headers) {
  const widths = headers.map((h, c) => Math.max(h.length, ...rows.map((r) => String(r[c] ?? "").length)));
  const fmt = (cells) => "| " + cells.map((c, i) => String(c ?? "").padEnd(widths[i])).join(" | ") + " |";
  const sep = "| " + widths.map((w) => "-".repeat(w)).join(" | ") + " |";
  return [fmt(headers), sep, ...rows.map(fmt)].join("\n");
}

function generateAasgToAdr(rules) {
  const rows = rules.map((r) => [
    `[${r.id}](#${r.id.toLowerCase()})`,
    r.adr.rules.length ? r.adr.rules.map((x) => `\`${x}\``).join("<br>") : "None",
    r.adr.adoption,
    mdEscapeCell(r.adr.remark),
  ]);
  return padTable(rows, ["AASG Rule", "ADR Rule", "Adoption", "Remark"]);
}

function generateAdrToAasg(rules, adrOnlyRules) {
  const rows = [];
  for (const r of rules) {
    for (const adrRule of r.adr.rules) {
      rows.push([adrRule, `[${r.id}](#${r.id.toLowerCase()})`, r.adr.adoption, mdEscapeCell(r.adr.remark)]);
    }
  }
  for (const extra of adrOnlyRules) {
    rows.push([extra.rule, "-", "ADR Only", mdEscapeCell(extra.remark)]);
  }
  rows.sort((a, b) => a[0].localeCompare(b[0]));
  return padTable(rows, ["ADR Rule", "AASG Rule", "Adoption", "Remark"]);
}

function walkMarkdownFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkMarkdownFiles(full));
    else if (entry.endsWith(".md")) out.push(path.relative(DOCS_DIR, full).split(path.sep).join("/"));
  }
  return out;
}

function assemble() {
  const manifestFiles = parseManifest();
  const rules = [];
  const parts = [];
  const rawByFile = {};

  for (const rel of manifestFiles) {
    const content = readFileSync(path.join(DOCS_DIR, rel), "utf8");
    const { meta, body } = parseFrontMatter(content);
    rawByFile[rel] = { meta, body };
    if (meta && meta.id) {
      if (!meta.adr) {
        throw new Error(
          `${rel}: missing "adr" front matter. Every rule must state its ADR relationship ` +
          `(rules: [] with adoption "AASG only" if it has none) so the compliance matrices stay complete.`
        );
      }
      rules.push({
        id: meta.id,
        level: meta.level,
        title: meta.title,
        adr: meta.adr,
        file: rel,
      });
    }
  }

  const adrOnlyRules = loadAdrOnlyRules();
  const table1 = generateAasgToAdr(rules);
  const table2 = generateAdrToAasg(rules, adrOnlyRules);

  for (const rel of manifestFiles) {
    let { body } = rawByFile[rel];
    if (body.includes("<!-- GENERATED:AASG-TO-ADR -->")) {
      body = body.replace("<!-- GENERATED:AASG-TO-ADR -->", table1);
    }
    if (body.includes("<!-- GENERATED:ADR-TO-AASG -->")) {
      body = body.replace("<!-- GENERATED:ADR-TO-AASG -->", table2);
    }
    parts.push(body);
  }

  return { markdown: parts.join(""), rules, manifestFiles };
}

function check() {
  const errors = [];
  const { markdown, rules, manifestFiles } = assemble();

  // 1. Duplicate rule IDs
  const seen = new Map();
  for (const r of rules) {
    seen.set(r.id, (seen.get(r.id) || 0) + 1);
  }
  for (const [id, count] of seen) {
    if (count > 1) errors.push(`Duplicate rule id ${id} (${count} files)`);
  }

  // 2. level keyword must actually appear in the rule's title
  for (const r of rules) {
    if (!r.level || !r.title || !r.title.includes(r.level)) {
      errors.push(`${r.file}: front-matter level "${r.level}" not found in title "${r.title}"`);
    }
  }

  // 3. Cross-reference anchors: every [X](#y) must resolve to an <a id="y">
  const definedAnchors = new Set([...markdown.matchAll(/<a id="([a-z0-9-]+)">/g)].map((m) => m[1]));
  const referencedAnchors = new Set(
    [...markdown.matchAll(/\]\(#([a-z0-9-]+)\)/g)].map((m) => m[1])
  );
  for (const ref of referencedAnchors) {
    if (!definedAnchors.has(ref)) errors.push(`Broken cross-reference: #${ref} has no matching <a id="${ref}">`);
  }

  // 4. Every markdown file on disk must be listed in the manifest (and vice versa)
  const onDisk = new Set(walkMarkdownFiles(DOCS_DIR));
  const inManifest = new Set(manifestFiles);
  for (const f of onDisk) {
    if (!inManifest.has(f)) errors.push(`${f} exists on disk but is not listed in manifest.yaml`);
  }
  for (const f of inManifest) {
    if (!onDisk.has(f)) errors.push(`manifest.yaml lists ${f} but it does not exist on disk`);
  }

  if (errors.length) {
    console.error(`FAILED: ${errors.length} problem(s) found\n`);
    for (const e of errors) console.error(" - " + e);
    process.exit(1);
  }
  console.log(`OK: ${rules.length} rules, ${manifestFiles.length} files, no issues found.`);
}

function build(argv) {
  const outIdx = argv.indexOf("--out");
  const htmlIdx = argv.indexOf("--html");
  if (outIdx === -1) throw new Error("build requires --out <path.md>");
  const outPath = path.resolve(argv[outIdx + 1]);
  const htmlPath = htmlIdx !== -1 ? path.resolve(argv[htmlIdx + 1]) : null;

  const { markdown } = assemble();
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, markdown, "utf8");
  console.log(`Wrote ${outPath} (${markdown.length} bytes)`);

  if (htmlPath) {
    const html = renderHtml(markdown);
    mkdirSync(path.dirname(htmlPath), { recursive: true });
    writeFileSync(htmlPath, html, "utf8");
    console.log(`Wrote ${htmlPath} (${html.length} bytes)`);
  }
}

const [, , cmd, ...rest] = process.argv;
try {
  if (cmd === "check") check();
  else if (cmd === "build") build(rest);
  else {
    console.error("Usage: node assemble.mjs <check|build> [--out <path.md>] [--html <path.html>]");
    process.exit(1);
  }
} catch (err) {
  console.error(`FAILED: ${err.message}`);
  process.exit(1);
}
