import { Request, Response } from 'express';

import { getConnection } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRepository = getConnection().getCustomRepository(UserRepository);

  const userData = await userRepository.getById(id);

  if (!userData) {
    return res.status(404).send({ error: { message: 'no such user found' } });
  }

  res.send(userData);
};

export default getUser;
