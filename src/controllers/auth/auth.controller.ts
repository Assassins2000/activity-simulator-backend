import { Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth/auth.service';
import { SignInDto } from './dto/signIn.dto';
import LoginResponseEntity from './entities/loginReponseEntity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  public async login(@Body() signInDto: SignInDto): Promise<LoginResponseEntity> {
    return await this.authService.validateUser(signInDto);
  }
}
