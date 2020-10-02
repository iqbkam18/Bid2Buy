const request = require('supertest');
const app = require('../../src/server/app').app;
const db = require('../../src/server/db/user-repository');

beforeEach(() => {
  db.populate();
});

test('Get all items', async () => {
  const agent = request.agent(app);
  const response = await agent.get('/api/items');
  expect(response.statusCode).toBe(200);
});

test('Logout', async () => {
  const agent = request.agent(app);
  const response = await agent.get('/api/logout');
  expect(response.statusCode).toBe(200);
});

test('Test Login', async () => {
  const agent = request.agent(app);
  const response = await agent
    .post('/api/login')
    .send({ userId: 'admin', password: 'admin' });
  expect(response.statusCode).toBe(204);
});

test('Test Signup', async () => {
  const agent = request.agent(app);
  const response = await agent
    .post('/api/signup')
    .send({ userId: 'admin123', password: 'admin123' });
  expect(response.statusCode).toBe(201);
});

test('Test Fail Login', async () => {
  const agent = request.agent(app);
  const response = await agent
    .post('/api/login')
    .send({ userId: 'admin12', password: 'admin' });
  expect(response.statusCode).toBe(401);
});

test('Get User Session', async () => {
  const agent = request.agent(app);
  const response = await agent.post('/api/user').send();
  expect(response.statusCode).toBe(200);
});

test('Get Single Item By ID', async () => {
  const agent = request.agent(app);
  const response = await agent.get('/api/item/1');
  expect(response.status).toBe(200);
});

test('Get User Items Without Credentials', async () => {
  let response;
  const agent = request.agent(app);

  response = await agent
    .get('/user/items')
    .set('Content-Type', 'application/json');

  expect(response.statusCode).toBe(200);
});

test('Add a Bid', async () => {
  const agent = request.agent(app);
  let response;
  response = await agent
    .patch('/api/bidding/1/123')
    .set('Content-Type', 'application/json');

  expect(response.statusCode).toBe(200);
});

test('Change Sold Status', async () => {
  const agent = request.agent(app);
  let response;
  response = await agent
    .patch('/api/user/item/1')
    .set('Content-Type', 'application/json');

  expect(response.statusCode).toBe(200);
});
