import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import {
  CreateProjectDto,
  ProjectListDto,
  UpdateProjectDto,
} from './dto/project.dto';
import { IResponse } from 'src/helpers/IResponseHandler';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async createProject(body: CreateProjectDto, user: any): Promise<IResponse> {
    if (user.role != 'manager')
      return { code: 403, message: 'you are not authorized', success: false };
    body.manager_id = user.id;
    const createProject = await this.projectRepo.save(body);
    if (!createProject)
      return { code: 400, message: 'Something went wrong', success: false };
    return {
      code: 200,
      message: 'Project created successfully',
      success: true,
      data: createProject,
    };
  }
  async updateProject(body: UpdateProjectDto, user: any): Promise<IResponse> {
    if (user.role != 'manager')
      return { code: 403, message: 'you are not authorized', success: false };
    const { project_id, ...rest } = body;
    const updateProject = await this.projectRepo.updateById(
      rest as Partial<UpdateProjectDto>,
      {
        manager_id: user.id as number,
        id: project_id,
      },
    );
    if (updateProject.affectedRows == 0)
      return { code: 400, message: 'Something went wrong', success: false };
    return {
      code: 200,
      message: 'Project updated successfully',
      success: true,
      data: updateProject,
    };
  }
  async projectList(body: ProjectListDto, user: any): Promise<IResponse> {
    if (user.role == 'user')
      return { code: 403, message: 'you are not authorized', success: false };
    const projectList = await this.projectRepo.projectLst(body);
    return {
      code: 200,
      message: 'Project list fetched successfully',
      success: true,
      data: projectList,
    };
  }
  async deleteProject(id: string, user: any): Promise<IResponse> {
    if (user.role == 'user')
      return { code: 403, message: 'you are not authorized', success: false };
    await this.projectRepo.deleteOne({
      manager_id: user.id,
      id: parseInt(id),
    });
    return {
      code: 200,
      message: 'Project deleted successfully',
      success: true,
      data: {},
    };
  }
}
