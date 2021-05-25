// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { Strategy } from 'passport-http-bearer';
// import { PassportStrategy } from '@nestjs/passport';
//
// @Injectable()
// export class BearerToken extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }
//
//   async validate(token: string) {
//     const user = await this.authService.validate(token);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
