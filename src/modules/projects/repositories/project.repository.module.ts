import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from '../schema/project.schema';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  exports: [ProjectRepository],
  providers: [ProjectRepository],
})
export class ProjectRepositoryModule {}
