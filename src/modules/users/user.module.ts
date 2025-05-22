import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryModule } from './repository/user.repository.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, UserRepositoryModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
