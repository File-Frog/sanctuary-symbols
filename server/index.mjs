import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const app = express()
app.disable('x-powered-by')
app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/assets', express.static(path.join(dir, 'assets'), { immutable: true, maxAge: '1y' }))
app.use(express.static(dir, { index: false, maxAge: '1h' }))
app.get(/.*/, (_req, res) => res.sendFile(path.join(dir, 'index.html')))
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Sanctuary site on :${port}`))
