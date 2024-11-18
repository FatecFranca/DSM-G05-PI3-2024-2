import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import portfinder from 'portfinder';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import patchesRouter from './routes/patches.js';
import farmsRouter from './routes/farms.js';
import ocupationsRouter from './routes/ocupations.js';
import animalsRouter from './routes/animals.js';
import alertsRouter from './routes/alerts.js';
import infosRouter from './routes/infos.js';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Rotas
app.use('/api/users', usersRouter);
app.use('/api/patches', patchesRouter);
app.use('/api/farms', farmsRouter);
app.use('/api/ocupations', ocupationsRouter);
app.use('/api/animals', animalsRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/infos', infosRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const DEFAULT_PORT = process.env.PORT || 3000;
portfinder.basePort = DEFAULT_PORT;

portfinder.getPortPromise()
  .then((port) => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao encontrar uma porta disponível:', err);
    process.exit(1);
  });

export default app;
