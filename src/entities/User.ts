import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn({ type: 'text' })
  id!: string;

  @Column({ name: 'first_name', type: 'text' })
  firstName!: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName!: string;

  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text' })
  image!: string;

  static create(data: Omit<User, 'id' | 'image'>) {
    const user = new User();

    user.id = v4();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;

    return user;
  }
}

export default User;
