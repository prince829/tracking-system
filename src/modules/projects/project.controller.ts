import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import {
  CreateProjectDto,
  ProjectListDto,
  UpdateProjectDto,
} from './dto/project.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Project')
@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post('create')
  @ApiConsumes('application/json')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createProject(
    @Body() dto: CreateProjectDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.projectService.createProject(dto, req.user);
    return res.status(result.code).send(result);
  }
  @Patch('update')
  @ApiConsumes('application/json')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async updateProject(
    @Body() dto: UpdateProjectDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.projectService.updateProject(dto, req.user);
    return res.status(result.code).send(result);
  }
  @Put('list')
  @ApiConsumes('application/json')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async projectList(
    @Body() dto: ProjectListDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.projectService.projectList(dto, req.user);
    return res.status(result.code).send(result);
  }
  @Delete('delete/:id')
  @ApiConsumes('application/json')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async deleteProject(
    @Param() id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.projectService.deleteProject(id, req.user);
    return res.status(result.code).send(result);
  }
}
