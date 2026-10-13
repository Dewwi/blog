#!/usr/bin/env node
// Create a Buttondown DRAFT email for each given post file (never sends).
// Usage: BUTTONDOWN_API_KEY=... node scripts/newsletter-draft.mjs [--dry-run] src/content/posts/a.md ...
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { parse } from 'yaml';

const SITE = 'https://david.lequin.dev';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const files = args.filter((a) => !a.startsWith('--'));
const apiKey = process.env.BUTTONDOWN_API_KEY;

if (!files.length) {
  console.log('No new posts, nothing to do.');
  process.exit(0);
}
if (!apiKey && !dryRun) {
  console.log('BUTTONDOWN_API_KEY not set, skipping newsletter drafts.');
  process.exit(0);
}

let failed = false;
for (const file of files) {
  const match = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) continue;
  const fm = parse(match[1]);
  if (fm.draft) {
    console.log(`Skipping draft post: ${file}`);
    continue;
  }
  const url = `${SITE}/blog/${basename(file).replace(/\.mdx?$/, '')}/`;
  const email = {
    subject: fm.title,
    body: `${fm.description}\n\n[Read the post](${url})`,
    status: 'draft',
  };
  if (dryRun) {
    console.log(JSON.stringify(email, null, 2));
    continue;
  }
  const res = await fetch('https://api.buttondown.com/v1/emails', {
    method: 'POST',
    headers: { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });
  if (!res.ok) {
    console.error(`Buttondown responded ${res.status} for ${file}: ${await res.text()}`);
    failed = true;
  } else {
    console.log(`Draft created for "${fm.title}": review it at https://buttondown.com/emails`);
  }
}
process.exit(failed ? 1 : 0);
