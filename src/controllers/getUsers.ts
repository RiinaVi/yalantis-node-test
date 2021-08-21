import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import UserRepository from '../repositories/UserRepository';

const getUsers = async (req: Request, res: Response) => {
  const userRepository = getConnection().getCustomRepository(UserRepository);

  const userData = await userRepository.list();

  res.send(userData);
};

export default getUsers;
