import { User } from '../src/users/user.entity';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {});

global.afterEach(async () => {
  const conn = getConnection();
  await conn.dropDatabase();
  await conn.close();
});
