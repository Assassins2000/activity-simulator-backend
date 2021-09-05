import {
  Get,
  Request,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService, AccountServiceError } from './account.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import LoginResponseEntity from './entities/loginReponseEntity';
import BaseUserWithIdEntity from '@app/controllers/baseEntities/baseUserWithId.entity';
import { DUser } from '@app/domains/models/user.model';

class UserWithSuchUsernameExistException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

@Controller('auth')
export class AccountController {
  constructor(private readonly authService: AccountService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  public async login(@Body() signInDto: LoginDto): Promise<LoginResponseEntity> {
    return await this.authService.validateUser(signInDto);
  }

  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/whoAmI')
  public async whoAmI(@Request() req: { user: DUser }): Promise<BaseUserWithIdEntity> {
    return this.authService.getUserWithRequiredData(req.user);
  }

  @Post('/signup')
  public async signUp(@Body() signUpDto: SignupDto): Promise<boolean> {
    const result: BaseUserWithIdEntity | AccountServiceError = await this.authService.createUser(signUpDto);
    if (!(result instanceof BaseUserWithIdEntity)) {
      throw new UserWithSuchUsernameExistException(result.message);
    }
    return true;
  }
}
