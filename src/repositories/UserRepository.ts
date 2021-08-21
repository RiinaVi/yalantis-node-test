import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  put(user: User) {
    return this.insert(user);
  }

  list() {
    return this.find();
  }

  patch(id: User['id'], data: Partial<Omit<User, 'id'>>) {
    return this.update({ id }, data);
  }

  drop(id: User['id']) {
    return this.delete({ id });
  }

  getById(id: User['id']) {
    return this.findOne({ id });
  }
}

export default UserRepository;
