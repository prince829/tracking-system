import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserRepositoryModule } from './modules/users/repository/user.repository.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { UserModule } from './modules/users/user.module';
import { User } from './modules/users/schema/user.schema';
import { ProjectRepositoryModule } from './modules/projects/repositories/project.repository.module';
import { ProjectModule } from './modules/projects/project.module';
import { Project } from './modules/projects/schema/project.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: path.join(process.cwd(), 'data', 'database.sqlite'),
      logging: false,
      models: [User, Project],
      synchronize: true,
      autoLoadModels: true,
      sync: { alter: true },
    }),
    AuthModule,
    UserRepositoryModule,
    UserModule,
    ProjectRepositoryModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
