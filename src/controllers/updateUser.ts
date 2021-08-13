import { Request, Response } from 'express';
import formidable, { Fields, File, Files } from 'formidable';
import fs from 'fs';

import {
  createFileById,
  DATA_FILE,
  deleteFileById,
  getAllUsersData,
  getImageLink,
  getUserData,
  updateUserSchema,
} from '../utils';

const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const allUsers = getAllUsersData();
  const userData = getUserData(id);

  if (!userData) {
    return res.status(400).send({ error: { message: 'no such user found' } });
  }

  const form = formidable({ multiples: true });
  form.parse(
    req,
    async (err: Error, fields: Fields, files: Files & { image: File }) => {
      if (err) {
        console.error(err.message);
        return res.status(400).send({ error: { message: 'invalid payload' } });
      }

      const { error: validationError } = updateUserSchema.validate(fields);
      if (validationError) {
        return res.status(400).send({
          error: { message: validationError.message.split('"').join('') },
        });
      }

      if (files.image) {
        deleteFileById(id);
      }

      const userImage = files.image
        ? getImageLink(req, await createFileById(id, files.image))
        : userData.image;

      const newUserData = {
        id,
        ...userData,
        ...fields,
        image: userImage,
      };

      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify([
          ...allUsers.filter((user) => user.id !== id),
          { ...newUserData },
        ]),
      );

      res.send(newUserData);
    },
  );
};

export default updateUser;
