import getAllUsersData from './getAllUsersData';
import { User } from '../types/user';

const getUserData = (id: string) =>
  getAllUsersData().find((el: User) => el.id === id);

export default getUserData;
