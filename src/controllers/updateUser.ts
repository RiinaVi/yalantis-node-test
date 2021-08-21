import { Request, Response } from 'express';
import formidable, { Fields, File, Files } from 'formidable';
import { getConnection } from 'typeorm';

import {
  createImageById,
  deleteImageById,
  getImageLink,
  updateUserSchema,
} from '../utils';
import UserRepository from '../repositories/UserRepository';

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRepository = getConnection().getCustomRepository(UserRepository);

  const userData = await userRepository.getById(id);

  if (!userData) {
    return res.status(404).send({ error: { message: 'no such user found' } });
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
        deleteImageById(id);
      }

      const userImage = files.image
        ? getImageLink(req, await createImageById(id, files.image))
        : userData.image;

      await userRepository.patch(id, {
        ...fields,
        image: userImage,
      });

      res.send({ ...userData, ...fields, image: userImage });
    },
  );
};

export default updateUser;
