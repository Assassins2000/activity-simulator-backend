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
import { RegisterDto } from './dto/register.dto';
import BaseUserEntity from '@app/sharedModules/baseEntities/baseUser.entity';
import { DUser } from '@app/domains/models';
import { accountRoutingManager, Components } from './router';
import { UserWithSuchUsernameExistException } from './exceptions';
import { AccountServiceError, LoginResponse } from './types';

@Controller(accountRoutingManager.basePath)
export class AccountEntryController {
  constructor(private readonly authService: AccountService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(accountRoutingManager.getSubPath(Components.Login))
  public async login(@Body() signInDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.validateUser(signInDto);
  }

  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(accountRoutingManager.getSubPath(Components.GetMe))
  public async getMe(@Request() req: { user: DUser }): Promise<BaseUserEntity> {
    return this.authService.getUserWithRequiredData(req.user);
  }

  @Post(accountRoutingManager.getSubPath(Components.Register))
  public async register(@Body() signUpDto: RegisterDto): Promise<boolean> {
    const result: BaseUserEntity | AccountServiceError = await this.authService.createUser(signUpDto);
    if (!(result instanceof BaseUserEntity)) {
      throw new UserWithSuchUsernameExistException(result.message);
    }
    return true;
  }
}
