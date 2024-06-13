import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@server/app.module';
import { describe, beforeEach, test, afterEach } from 'vitest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  test('/personal/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/personal/user')
      .expect(200)
      .expect({
        login: 'yarastqt',
      });
  });
});
