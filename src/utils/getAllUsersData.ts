import fs from 'fs';

import { User } from '../types/user';
import { DATA_FILE } from './constants';

const getAllUsersData = () => {
  if (fs.existsSync(DATA_FILE)) {
    const existingUsers = fs.readFileSync(DATA_FILE, 'utf8');
    return existingUsers ? (JSON.parse(existingUsers) as User[]) : [];
  }
  return [];
};

export default getAllUsersData;
