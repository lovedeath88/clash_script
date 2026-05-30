import { readdir, readFile } from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const textExtensions = new Set([
  '.bat',
  '.cjs',
  '.css',
  '.htm',
  '.html',
  '.ini',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.ps1',
  '.sh',
  '.toml',
  '.txt',
  '.vue',
  '.xml',
  '.yaml',
  '.yml',
]);

const textBasenames = new Set([
  '.aiignore',
  '.editorconfig',
  '.gitattributes',
  '.gitignore',
  '.npmrc',
]);

const ignoredDirectories = new Set(['.git', 'node_modules']);
const decoder = new TextDecoder('utf-8', { fatal: true });
const issues = [];
let checkedFiles = 0;

function isTextFile(filePath) {
  const name = basename(filePath).toLowerCase();
  if (textBasenames.has(name)) {
    return true;
  }
  return textExtensions.has(extname(name));
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        continue;
      }
      await walk(join(dir, entry.name));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const absPath = join(dir, entry.name);
    if (!isTextFile(absPath)) {
      continue;
    }

    checkedFiles += 1;
    const bytes = await readFile(absPath);
    if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
      issues.push(`${relative(repoRoot, absPath)}: contains UTF-8 BOM`);
      continue;
    }

    try {
      decoder.decode(bytes);
    } catch {
      issues.push(`${relative(repoRoot, absPath)}: is not valid UTF-8`);
    }
  }
}

await walk(repoRoot);

if (issues.length > 0) {
  console.error('Encoding check failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
  process.exit(1);
}

console.log(`Encoding check passed for ${checkedFiles} text files.`);
