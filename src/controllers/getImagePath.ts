import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import { IMAGES_DIRECTORY } from '../utils';

const getImagePath = (req: Request, res: Response) => {
  const { id } = req.params;
  const filePath = path.join(IMAGES_DIRECTORY, id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ error: { message: 'image not found' } });
  }

  res.sendFile(filePath);
};

export default getImagePath;
