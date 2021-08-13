import { Request, Response } from 'express';

import { getAllUsersData } from '../utils';

const getUsers = (req: Request, res: Response) => res.send(getAllUsersData());

export default getUsers;
