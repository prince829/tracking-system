import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../schema/user.schema';
import { CreationAttributes, WhereOptions } from 'sequelize';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    // private readonly sequelize: Sequelize,
  ) {}
  async save(data: CreationAttributes<User>): Promise<User> {
    return await this.userModel.create(data);
  }
  async getByField(params: WhereOptions<User>): Promise<User | null> {
    return await this.userModel.findOne({ where: params, raw: true });
  }
}
