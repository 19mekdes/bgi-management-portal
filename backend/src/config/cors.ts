import cors from 'cors';
import { config } from '.';

export const corsOptions: cors.CorsOptions = {
  origin: config.frontendUrl,
  credentials: true,
  optionsSuccessStatus: 200,
};