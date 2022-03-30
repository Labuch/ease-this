import { User } from '../../users/user.entity';
import { Task } from '../../tasks/task.entity';

export function ormConfig(): any {
  return {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dbadmin',
    password: 'coucou42',
    entity: [User, Task],
    database:
      process.env.NODE_ENV === 'testing' ? 'nest_db_test' : 'nest_db_dev',
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeout: 150000,
    extra: {
      connectionLimit: 20,
    },
  };
}
