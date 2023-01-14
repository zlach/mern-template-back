import dotenv from 'dotenv';
import helmet from 'helmet';
import express, { json } from 'express';
import cors from 'cors';

import connectDB from './db.js';
import router from './src/routes/index.js';
import errorHandler from './src/middleware/error.js';
import logger from './src/utils/logger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// TODO: should probably add a max request size in case I forget e.g. to limit string length

connectDB();

app.use(helmet());
// app.use(morgan('combined'));

app.use(cors());

// eslint-disable-next-line no-unused-vars
app.get('/health-checks', (req, res, next) => res.status(200).send('OK'))
app.get('/healthcheck', (req, res) => res.send('Hello World!'))

app.use(json());
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server Listening on Port ${port}`);
})
