import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import portfinder from 'portfinder';
import cors from 'cors'; // Importando o middleware CORS

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import patchesRouter from './routes/patches.js';
import farmsRouter from './routes/farms.js';
import ocupationsRouter from './routes/ocupations.js';
import animalsRouter from './routes/animals.js';
import alertsRouter from './routes/alerts.js';
import infosRouter from './routes/infos.js';

const app = express();

const allowedOrigins = [
  'https://dsm-g05-pi3-2024-2.onrender.com', // Frontend na produção
  'http://localhost:5173', // Frontend em desenvolvimento (caso esteja rodando localmente)
];

const corsOptions = {
  origin: (origin, callback) => {
    // Se a origem for permitida ou se não houver origem (como em chamadas diretas do backend)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

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
