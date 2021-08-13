import { Request, Response } from 'express';

import { getUserData } from '../utils';

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = getUserData(id);

  if (!userData) {
    return res.status(400).send({ error: { message: 'no such user found' } });
  }

  res.send(userData);
};

export default getUser;
