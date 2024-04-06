import { Repository, EntityRepository } from 'typeorm';
import { User } from './auth.entity';
import { CreateUserDto } from './dto/create_user.dt';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async createUser(userData: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = userData.email;
    user.password = userData.password;
    user.profile = userData.profile;

    try {
      await user.save()
    } catch (error) {
      console.log(error.code);
    }
 
    return user;
  }
}
