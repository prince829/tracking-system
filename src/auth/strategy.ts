/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from 'src/modules/users/repository/user.repository';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hello',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { id: string }): Promise<any> {
    try {
      const userInfo = await this.userRepository.getByField({ id: payload.id });
      if (!userInfo) throw new UnauthorizedException();
      return userInfo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
