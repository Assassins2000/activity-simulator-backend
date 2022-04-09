import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registerDto';
import LoginResponseEntity from './entities/loginReponseEntity';
import BaseUserWithIdEntity from '@app/modules/baseEntities/baseUserWithId.entity';
import { DUser } from '@app/domains/models';
import { accountRoutingManager, Components } from './router';
import { UserWithSuchUsernameExistException } from './exceptions';
import { AccountServiceError } from './types';

@Controller(accountRoutingManager.basePath)
export class AccountController {
  constructor(private readonly authService: AccountService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(accountRoutingManager.getSubPath(Components.Login))
  public async login(@Body() signInDto: LoginDto): Promise<LoginResponseEntity> {
    return await this.authService.validateUser(signInDto);
  }

  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(accountRoutingManager.getSubPath(Components.GetMe))
  public async getMe(@Request() req: { user: DUser }): Promise<BaseUserWithIdEntity> {
    return this.authService.getUserWithRequiredData(req.user);
  }

  @Post(accountRoutingManager.getSubPath(Components.Register))
  public async register(@Body() signUpDto: RegisterDto): Promise<boolean> {
    const result: BaseUserWithIdEntity | AccountServiceError = await this.authService.createUser(signUpDto);
    if (!(result instanceof BaseUserWithIdEntity)) {
      throw new UserWithSuchUsernameExistException(result.message);
    }
    return true;
  }
}
