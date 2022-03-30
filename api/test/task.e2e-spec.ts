import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setUpApp } from '../src/setup-app';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let cookie;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setUpApp(app);
    await app.init();
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'email@domain.com', password: 'password' });
    cookie = await res.get('Set-Cookie');
  });

  it('handle create task with periodoicity', async () => {
    await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ name: 'taskname', periodicity: 'monthly', count: 1 })
      .expect(201);
  });

  it('handle create task with deadline', async () => {
    const deadline = new Date();
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ name: 'taskname', deadline, count: 1 })
      .expect(201);
  });

  it('throw a error if deadline is not a date', async () => {
    const deadline = 'fdjhfkjhsd';
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ name: 'taskname', deadline, count: 1 })
      .expect(400);

    expect(res.body.message).toContain('deadline must be a Date instance');
  });

  it('throw and error if not auth ', async () => {
    await request(app.getHttpServer())
      .post('/tasks')
      .send({ name: 'taskname', periodicity: 'monthly', count: 1 })
      .expect(403);
  });

  it('throw an error if there is neither periodicity and deadline', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ name: 'taskname', count: 1 })
      .expect(400);

    expect(res.body.message).toContain('deadline must be a Date instance');
    expect(res.body.message).toContain(
      'periodicity must be a valid enum value',
    );
  });

  it('throw an error if periodicity is not an enum', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ name: 'taskname', periodicity: 'truc', count: 1 })
      .expect(400);

    expect(res.body.message).toContain(
      'periodicity must be a valid enum value',
    );
  });

  it('throw an error if there is no name', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ periodicity: 'monthly', count: 1 })
      .expect(400);

    expect(res.body.message).toContain('name must be a string');
  });

  it('throw an error if name is empty', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ periodicity: 'monthly', count: 1, name: '' })
      .expect(400);

    expect(res.body.message).toContain('name should not be empty');
  });

  it('throw an error if deadline is not a date', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ name: 'taskname', deadline: 'truc', count: 1 })
      .expect(400);

    expect(res.body.message).toContain('deadline must be a Date instance');
  });

  it('handle put', async () => {
    const count = 6;

    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ name: 'taskname', periodicity: 'monthly', count: 1 });

    const id = res.body.id;
    const description = 'this is a task';

    const { body } = await request(app.getHttpServer())
      .put(`/tasks/${id}`)
      .set('Cookie', cookie)
      .send({ name: 'taskname', periodicity: 'weekly', count, description })
      .expect(200);

    expect((body.count = count));
    expect((body.description = description));
  });

  it('trow a error if not found ', async () => {
    await request(app.getHttpServer())
      .put(`/tasks/6`)
      .set('Cookie', cookie)
      .send({ name: 'taskname', periodicity: 'weekly', count: 5 })
      .expect(404);
  });

  describe('DELETE', () => {
    it('handle delete task', async () => {
      const res = await request(app.getHttpServer())
        .post('/tasks')
        .set('Cookie', cookie)
        .send({ name: 'taskname', periodicity: 'monthly', count: 1 });

      const id = res.body.id;

      await request(app.getHttpServer())
        .delete(`/tasks/${id}`)
        .set('Cookie', cookie)
        .expect(200);
    });

    it('trow a error if not found', async () => {
      await request(app.getHttpServer())
        .delete(`/tasks/6`)
        .set('Cookie', cookie)
        .expect(404);
    });
  });
});
