import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() request: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(request);
  }

  @Post('signin')
  signIn(@Body() request: AuthCredentialDto): Promise<AuthResponseDto> {
    return this.authService.signIn(request);
  }
}
