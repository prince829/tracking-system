import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  project_name: string;

  @IsNumber()
  @IsOptional()
  manager_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  budgeted_hours: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  hourly_rate: number;
}

export class UpdateProjectDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  project_name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  project_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  budgeted_hours: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  hourly_rate: number;
}
export class ProjectListDto{
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  limit: number;
}
