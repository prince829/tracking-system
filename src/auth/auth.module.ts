import { Module } from '@nestjs/common';
import { JWTStrategy } from './strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepositoryModule } from 'src/modules/users/repository/user.repository.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'hello',
      signOptions: { expiresIn: '1h' },
    }),
    UserRepositoryModule,
  ],
  providers: [JWTStrategy, JwtService],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
