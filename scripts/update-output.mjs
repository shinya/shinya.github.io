#!/usr/bin/env node
// OUTPUT セクション（TALKS / ARTICLES）を SpeakerDeck と Qiita の最新情報で書き換える。
// 依存パッケージなし（Node 20+ の fetch を使用）。
//
//   node scripts/update-output.mjs
//
// index.html / en/index.html の以下のマーカー間を置き換える:
//   <!-- TALKS:START --> ... <!-- TALKS:END -->
//   <!-- ARTICLES:START --> ... <!-- ARTICLES:END -->

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SPEAKERDECK_USER = 'shinyasaita';
const QIITA_USER = 'ssaita';
const TALKS_COUNT = 6;
const TALKS_SORT = 'views'; // 'views' = 閲覧数順 / 'latest' = 新着順
const ARTICLES_COUNT = 5;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = [
    { file: 'index.html', lang: 'ja' },
    { file: 'en/index.html', lang: 'en' },
];
const UA = 'Mozilla/5.0 (compatible; shinya.dev-output-updater; +https://shinya.dev)';

const decode = (s) => s
    .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const escape = (s) => s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function get(url) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
    return res;
}

async function fetchTalks() {
    const talks = [];
    for (let page = 1; page <= 20; page++) {
        const html = await (await get(`https://speakerdeck.com/${SPEAKERDECK_USER}?page=${page}`)).text();
        const blocks = html.split('<div class="card deck-preview"').slice(1);
        if (blocks.length === 0) break;
        for (const block of blocks) {
            const id = block.match(/data-id="([0-9a-f]+)"/)?.[1];
            const link = block.match(/class="deck-preview-link" href="([^"]+)" title="([^"]*)"/);
            const views = block.match(/title="([\d,]+) views?"/)?.[1];
            if (!id || !link) continue;
            talks.push({
                id,
                slug: link[1].split('/').pop(),
                url: `https://speakerdeck.com${link[1]}`,
                title: decode(link[2]),
                views: views ? Number(views.replace(/,/g, '')) : 0,
            });
        }
        if (!/rel="next"/.test(html)) break;
    }
    if (talks.length === 0) throw new Error('SpeakerDeck: no talks parsed (markup changed?)');
    if (TALKS_SORT === 'views') talks.sort((a, b) => b.views - a.views);
    return talks.slice(0, TALKS_COUNT);
}

async function fetchArticles() {
    const items = await (await get(`https://qiita.com/api/v2/users/${QIITA_USER}/items?per_page=${ARTICLES_COUNT}`)).json();
    if (!Array.isArray(items) || items.length === 0) throw new Error('Qiita: no items returned');
    return items.map((i) => ({
        url: i.url,
        title: i.title,
        date: i.created_at.slice(0, 10),
        likes: i.likes_count,
        tags: i.tags.map((t) => t.name),
    }));
}

function renderTalks(talks, lang, titlesEn) {
    const pad = ' '.repeat(28);
    const cards = talks.map((t) => {
        const title = escape((lang === 'en' && titlesEn[t.slug]) || t.title);
        return `${pad}<a href="${t.url}" target="_blank" class="talk-card">
${pad}    <div class="talk-thumb-wrap">
${pad}        <img src="https://files.speakerdeck.com/presentations/${t.id}/slide_0.jpg" alt="${title}" class="talk-thumb" loading="lazy">
${pad}    </div>
${pad}    <div class="talk-info">
${pad}        <h4 class="talk-title">${title}</h4>
${pad}        <p class="talk-meta"><i class="far fa-eye"></i> ${t.views.toLocaleString('en-US')} views</p>
${pad}    </div>
${pad}</a>`;
    });
    return `\n${cards.join('\n')}\n${pad}`;
}

function renderArticles(articles) {
    const pad = ' '.repeat(28);
    const rows = articles.map((a) => `${pad}<a href="${a.url}" target="_blank" class="article-item">
${pad}    <h4 class="article-title">${escape(a.title)}</h4>
${pad}    <p class="article-meta">
${pad}        <span><i class="far fa-calendar"></i> ${a.date}</span>
${pad}        <span><i class="far fa-heart"></i> ${a.likes}</span>
${pad}        <span class="article-tags">${a.tags.map((t) => `<span class="article-tag">${escape(t)}</span>`).join('')}</span>
${pad}    </p>
${pad}</a>`);
    return `\n${rows.join('\n')}\n${pad}`;
}

function replaceBetween(html, name, body, file) {
    const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
    if (!re.test(html)) throw new Error(`${file}: marker ${name}:START/END not found`);
    return html.replace(re, (_, start, end) => `${start}${body}${end}`);
}

const [talks, articles, titlesEn] = await Promise.all([
    fetchTalks(),
    fetchArticles(),
    readFile(path.join(ROOT, 'scripts/talk-titles-en.json'), 'utf8').then(JSON.parse),
]);

const untranslated = talks.filter((t) => !titlesEn[t.slug]);
if (untranslated.length > 0) {
    console.warn('No English title (falling back to Japanese) — add to scripts/talk-titles-en.json:');
    for (const t of untranslated) console.warn(`  "${t.slug}": "${t.title}"`);
}

for (const { file, lang } of PAGES) {
    const full = path.join(ROOT, file);
    const before = await readFile(full, 'utf8');
    let after = replaceBetween(before, 'TALKS', renderTalks(talks, lang, titlesEn), file);
    after = replaceBetween(after, 'ARTICLES', renderArticles(articles), file);
    if (after !== before) {
        await writeFile(full, after);
        console.log(`updated: ${file}`);
    } else {
        console.log(`unchanged: ${file}`);
    }
}
