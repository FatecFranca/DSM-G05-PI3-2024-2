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

const allowedOrigins = [
  'https://dsm-g05-pi3-2024-2.onrender.com',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/patches', patchesRouter);
app.use('/farms', farmsRouter);
app.use('/ocupations', ocupationsRouter);
app.use('/api/animals', animalsRouter);
app.use('/alerts', alertsRouter);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
