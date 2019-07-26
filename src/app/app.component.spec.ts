import { User } from '@data/entities/user.entity';
import {
  createConnection,
  getConnection,
  getRepository
} from 'typeorm';

beforeEach(() => {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: false
  });
});

afterEach(() => {
  const conn = getConnection();
  return conn.close();
});

test('add Andrew to database and check added', async () => {
  await getRepository(User).insert({
    FirstName: 'Andrew',
    LastName: 'Allen',
    Age: 28
  });
  let andrew = await getRepository(User).find({
    where: {
      id: 1
    }
  });
  expect(andrew[0].FirstName).toBe('Andrew');
});
