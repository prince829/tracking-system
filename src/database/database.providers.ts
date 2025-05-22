import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import { User } from 'src/modules/users/schema/user.schema';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(process.cwd(), 'data', 'database.sqlite'),
        logging: false,
      });
      sequelize.addModels([User]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
