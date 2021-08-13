import { Request, Response } from 'express';
import formidable, { Fields, File, Files } from 'formidable';
import { v4 } from 'uuid';
import fs from 'fs';

import {
  createFileById,
  createUserSchema,
  DATA_FILE,
  getAllUsersData,
  getImageLink,
} from '../utils';

const IMAGE_MAX_SIZE = 10_485_760; // 10MB in B
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const createUser = (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  form.parse(
    req,
    async (err: Error, fields: Fields, files: Files & { image: File }) => {
      if (err) {
        console.error(err.message);
        return res.status(400).send({ error: { message: 'invalid payload' } });
      }

      if (!files.image) {
        return res
          .status(400)
          .send({ error: { message: 'image is required' } });
      }

      if (files.image.size > IMAGE_MAX_SIZE) {
        return res
          .status(400)
          .send({ error: { message: 'image size is more than 10 MB' } });
      }

      if (VALID_IMAGE_TYPES.indexOf(files.image.type) === -1) {
        return res
          .status(400)
          .send({ error: { message: 'invalid image type' } });
      }

      const { error: validationError } = createUserSchema.validate(fields);
      if (validationError) {
        return res.status(400).send({
          error: { message: validationError.message.split('"').join('') },
        });
      }

      const newUserId = v4();
      const fileName = await createFileById(newUserId, files.image);

      const newUserData = {
        id: newUserId,
        ...fields,
        image: getImageLink(req, fileName),
      };

      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify([...getAllUsersData(), newUserData]),
      );

      res.send(newUserData);
    },
  );
};

export default createUser;
