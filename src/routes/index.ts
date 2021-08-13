import express from 'express';
import {
  createUser,
  deleteUser,
  getImagePath,
  getUser,
  getUsers,
  updateUser,
} from '../controllers';

const router = express.Router();

router.post('/', createUser);

router.get('/', getUsers);

router.get('/user/:id', getUser);

router.get('/image/:id', getImagePath);

router.patch('/user/:id', updateUser);

router.delete('/user/:id', deleteUser);

export default router;
