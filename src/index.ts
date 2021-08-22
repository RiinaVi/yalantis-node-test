import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import router from './routes';
import { PUBLIC_DIRECTORY } from './utils';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

const main = async () => {
  await createConnection();

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/public', express.static(PUBLIC_DIRECTORY));
  app.use(express.static(PUBLIC_DIRECTORY));

  app.use('/', router);

  app.use((err: Error, req: Request, res: Response) => {
    if (err.stack) {
      console.error(err.stack);
      return res
        .status(500)
        .send({ error: { message: 'something went wrong :(' } });
    }
  });

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
