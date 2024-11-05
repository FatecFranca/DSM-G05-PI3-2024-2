import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import patchesRouter from './routes/patches.js';
import farmsRouter from './routes/farms.js';
import ocupationsRouter from './routes/ocupations.js';
import animalsRouter from './routes/animals.js';
import alertsRouter from './routes/alerts.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/patches', patchesRouter);
app.use('/api/farms', farmsRouter);
app.use('/api/ocupations', ocupationsRouter);
app.use('/api/animals', animalsRouter);
app.use('/api/alerts', alertsRouter);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'front-end', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
