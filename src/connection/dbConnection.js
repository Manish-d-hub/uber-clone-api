import 'dotenv/config';
// import express from "express";
import mongoose from 'mongoose';

// const app = express();
import { app } from '../index.js';
import { logger } from '../middleware/logger.js';

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  logger.info('connected to DATABASE');
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  logger.info(`Listening on ...${port}...`);
});
