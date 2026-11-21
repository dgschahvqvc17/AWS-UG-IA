import 'dotenv/config';
import app from '../src/app.js';

const server = app.listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

const request = async (path, options) => {
  const res = await fetch(base + path, options);
  const text = await res.text();
  console.log(options?.method || 'GET', path, '->', res.status, text.slice(0, 180));
  return text ? JSON.parse(text) : null;
};

try {
  await request('/health');
  await request('/api/examples');

  const created = await request('/api/examples', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ nombre: 'Smoke test', descripcion: 'prueba temporal' }),
  });

  await request('/api/files');

  const upload = await request('/api/files/upload-url', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'smoke.txt', contentType: 'text/plain' }),
  });
  console.log('URL prefirmada generada:', upload?.url?.startsWith('https://'));

  if (created?.id) {
    await request(`/api/examples/${encodeURIComponent(created.id)}`, {
      method: 'DELETE',
    });
  }
} finally {
  server.close();
}
