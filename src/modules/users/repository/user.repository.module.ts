import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../schema/user.schema';
import { UserRepository } from './user.repository';

// @Global()
@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [UserRepository],
  providers: [UserRepository],
})
export class UserRepositoryModule {}
