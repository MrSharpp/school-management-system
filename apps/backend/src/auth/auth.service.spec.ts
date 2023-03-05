import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { ZodValidationPipe } from 'nestjs-zod';

describe('Authentication', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ZodValidationPipe());
    await module.init();
    await app.listen(3000);
  });

  it('POST /login with no body', () => {
    return request(app.getHttpServer()).post('/login').expect(400);
  });

  it('POST /login with email only', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ email: 'hello@world.com' })
      .expect(400);
  });

  it('POST /login with valid email & password', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ email: 'admin@scms.com', password: 'meriyara' })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
