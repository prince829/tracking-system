import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../schema/project.schema';
import { CreationAttributes, QueryTypes, WhereOptions } from 'sequelize';
import { ProjectListDto } from '../dto/project.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: typeof Project,
    private readonly sequelize:Sequelize
  ) {}
  async save(data: CreationAttributes<Project>): Promise<Project> {
    return await this.projectModel.create(data);
  }
  async getByField(params: WhereOptions<Project>): Promise<Project | null> {
    return await this.projectModel.findOne({ where: params, raw: true });
  }
  async updateById(
    data: Partial<Project>,
    Filterable: WhereOptions<Project>,
  ): Promise<any> {
    const [affectedCount, affectedRows] = await this.projectModel.update(data, {
      where: Filterable,
      returning: true,
    });

    return { affectedCount, affectedRows };
  }
  async projectLst(body:ProjectListDto):Promise<{data:Array<Project>, total_count: number, total_pages: number}>{
    const {page,limit}=body;
            let query=`SELECT * FROM projects`
            let countQuery= `SELECT COUNT(*) AS total_count from projects`
            if(page && limit){
                query+= ` LIMIT :limit OFFSET :offset`
            }
            const [branchList,countInfo]=await Promise.all([
                this.sequelize.query(query,{
                replacements:{
                    limit: limit??10,
                    offset: (page-1)*limit
                },
                type: QueryTypes.SELECT
            }),
            this.sequelize.query(countQuery,{
                replacements:{},
                type: QueryTypes.SELECT
            })
            ])
            const totalCount = (countInfo[0] as any)?.total_count || 0
            const totalPages= Math.ceil(totalCount/limit)
            return {data:branchList, total_count:totalCount, total_pages: totalPages} as any
  }
}
