import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import ListItem from '../../src/models/listItem';
import User from '../../src/models/user';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});

afterEach(async () => {
  await ListItem.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('My List API', () => {
  it('should add an item to my list', async () => {
    const response = await request(app)
      .post('/api/mylist')
      .send({ userId: 'user1', contentId: 'movie1', contentType: 'Movie' });

    expect(response.status).toBe(201);
    expect(response.body.contentId).toBe('movie1');
  });

  it('should remove an item from my list', async () => {
    await request(app)
      .post('/api/mylist')
      .send({ userId: 'user1', contentId: 'movie1', contentType: 'Movie' });

    const response = await request(app)
      .delete('/api/mylist/movie1')
      .send({ userId: 'user1' });

    expect(response.status).toBe(204);
  });

  it('should list items in my list', async () => {
    await request(app)
      .post('/api/mylist')
      .send({ userId: 'user1', contentId: 'movie1', contentType: 'Movie' });
    await request(app)
      .post('/api/mylist')
      .send({ userId: 'user1', contentId: 'tvshow1', contentType: 'TVShow' });

    const response = await request(app)
      .get('/api/mylist')
      .send({ userId: 'user1' });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
