import { Request, Response } from 'express';
import formidable, { File, Files } from 'formidable';
import { getConnection } from 'typeorm';

import { createImageById, createUserSchema, getImageLink } from '../utils';
import UserRepository from '../repositories/UserRepository';
import User from '../entities/User';

const IMAGE_MAX_SIZE = 10_485_760; // 10MB in B
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const createUser = (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  form.parse(
    req,
    async (
      err: Error,
      fields: Omit<User, 'id' | 'image'>,
      files: Files & { image: File },
    ) => {
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

      const userRepository =
        getConnection().getCustomRepository(UserRepository);

      const user = User.create(fields);

      const fileName = await createImageById(user.id, files.image);

      user.image = getImageLink(req, fileName);

      await userRepository.put(user);

      res.send(user);
    },
  );
};

export default createUser;
