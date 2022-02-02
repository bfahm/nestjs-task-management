import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(username: string, password: string): Promise<void> {
    const user = this.create({
      username: username,
      password: password,
    });

    await this.save(user);
  }
}
