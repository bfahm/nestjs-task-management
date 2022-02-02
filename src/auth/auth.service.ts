import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  signUp(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;
    return this.usersRepository.createUser(username, password);
  }
}
