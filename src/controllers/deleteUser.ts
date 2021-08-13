import { Request, Response } from 'express';
import fs from 'fs';

import {
  DATA_FILE,
  deleteFileById,
  getAllUsersData,
  getUserData,
} from '../utils';

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const allUsers = getAllUsersData();
  const user = getUserData(id);

  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify([...allUsers.filter((user) => user.id !== id)]),
  );

  deleteFileById(id);

  res.send(user);
};

export default deleteUser;
