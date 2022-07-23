import { Controller, Post, Req, UseGuards, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DSession, DUser } from '@app/domains/models';
import { CreateSessionService, CloseSessionService } from './services';
import { Components, createAndCloseSessionRoutingManager } from './router';
import { UserHasActiveSessionsError } from './types/userHasActiveSessionError.type';
export { Components, createAndCloseSessionRoutingManager } from './router';

@Controller(createAndCloseSessionRoutingManager.basePath)
export class CreateAndCloseSessionController {
  constructor(
    private readonly createSessionService: CreateSessionService,
    private readonly closeSessionService: CloseSessionService,
  ) {}

  @UseGuards(AuthGuard('bearer'))
  @Post(createAndCloseSessionRoutingManager.getSubPath(Components.CreateSession))
  async createSession(@Req() req: { user: DUser }): Promise<DSession | UserHasActiveSessionsError> {
    return this.createSessionService.run(req.user);
  }

  @UseGuards(AuthGuard('bearer'))
  @Put('closeSession/:id')
  async closeSession(@Param('id') id: string): Promise<boolean> {
    return this.closeSessionService.run(id);
  }
}
