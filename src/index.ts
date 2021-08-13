import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import router from './routes';
import { PUBLIC_DIRECTORY } from './utils';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

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
