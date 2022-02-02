import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(request: AuthCredentialDto): Promise<void> {
    const { username, password } = request;
    const hashedPassword = await this.generateHashedPassword(password);
    return this.usersRepository.createUser(username, hashedPassword);
  }

  async signIn(request: AuthCredentialDto): Promise<string> {
    const { username, password } = request;
    const user = await this.usersRepository.findOne({ username: username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.ensureCorrectPassword(user, password);

    return 'success';
  }

  private async generateHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  private async ensureCorrectPassword(
    user: User,
    password: string,
  ): Promise<void> {
    const isExact = await bcrypt.compare(password, user.passwordhash);
    if (!isExact) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
