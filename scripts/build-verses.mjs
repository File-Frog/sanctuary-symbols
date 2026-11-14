// Regenerates src/data/verses.json from a KJV JSON source.
// Usage: node scripts/build-verses.mjs /path/to/en_kjv.json
// Source: https://github.com/thiagobodruk/bible (json/en_kjv.json, public-domain text)
import fs from 'node:fs'
import path from 'node:path'

const src = process.argv[2]
if (!src) throw new Error('Pass the path to en_kjv.json')
const bible = JSON.parse(fs.readFileSync(src, 'utf8').replace(/^﻿/, ''))
const booksTs = fs.readFileSync('src/data/books.ts', 'utf8')
const BOOKS = [...booksTs.match(/BOOKS = \[([\s\S]*?)\]/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1])
const alt = [...BOOKS].sort((a, b) => b.length - a.length).map((b) => b.replace(/ /g, '\\s')).join('|')
const re = new RegExp(`(?:${alt})\\s\\d+:\\d+(?:-\\d+)?`, 'g')

const refs = new Set()
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : /\.tsx?$/.test(e.name) ? [path.join(dir, e.name)] : [])
for (const f of walk('src')) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(re)) refs.add(m[0])
}

const out = {}
for (const ref of [...refs].sort()) {
  const m = ref.match(/^(.+) (\d+):(\d+)(?:-(\d+))?$/)
  const book = BOOKS.indexOf(m[1])
  const ch = bible[book].chapters[+m[2] - 1]
  const from = +m[3], to = m[4] ? +m[4] : from
  const verses = []
  for (let v = from; v <= to; v++) {
    if (!ch[v - 1]) throw new Error('Missing ' + ref)
    verses.push({ v, t: ch[v - 1].replace(/\s+([.,;:?!)])/g, '$1').replace(/\s{2,}/g, ' ').trim() })
  }
  out[ref] = verses
}
fs.writeFileSync('src/data/verses.json', JSON.stringify(out, null, 1))
console.log(Object.keys(out).length, 'references written')
