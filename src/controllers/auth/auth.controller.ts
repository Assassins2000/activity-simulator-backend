import { Post, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth/auth.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() signInDto: SignInDto): Promise<string> {
    return await this.authService.validateUser(signInDto);
  }
}
