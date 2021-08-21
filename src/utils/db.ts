import { createConnection } from 'typeorm';

// import ormconfig from '../../ormconfig';
// import User from '../entities/User';

export const getConnection = async () => {
  return createConnection();
};
