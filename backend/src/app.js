import express from 'express';
import cors from 'cors';
import exampleRoutes from './routes/example.routes.js';
import fileRoutes from './routes/file.routes.js';
import { auth } from './middleware/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', auth);
app.use('/api/examples', exampleRoutes);
app.use('/api/files', fileRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
