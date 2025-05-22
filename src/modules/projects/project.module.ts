import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepositoryModule } from './repositories/project.repository.module';

@Module({
  imports: [ProjectRepositoryModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
