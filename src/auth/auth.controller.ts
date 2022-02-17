import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  signUp(@Body() request: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(request);
  }

  @Post('signin')
  signIn(@Body() request: AuthCredentialDto): Promise<AuthResponseDto> {
    return this.authService.signIn(request);
  }

  @Get('error')
  getError(): string {
    try {
      throw new Error('Error!');
    } catch (error) {
      this.logger.error('AN ERROR OCCURED', error.stack);
    }
    return 'This is an error';
  }

  @Get('config')
  getConfig(): string {
    return this.configService.get('TEST_VAL');
  }
}
