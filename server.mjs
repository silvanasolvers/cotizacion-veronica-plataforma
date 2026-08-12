import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT || 3000);

app.disable('x-powered-by');
app.get('/health', (_req, res) => res.json({ ok: true, service: 'cotizacion-veronica-plataforma' }));
app.use(express.static(dist, { maxAge: '1h' }));
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
app.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`));
