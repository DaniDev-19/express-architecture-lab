const test = require('node:test');
const assert = require('node:assert/strict');
const pool = require('../src/db/pool');
const inyectDb = require('../src/middlewares/inyectDb.middleware');

test('inyectDb agrega el pool en req.db y llama a next', async () => {
  const request = {};
  const response = {};
  let nextCalled = false;

  const next = () => {
    nextCalled = true;
  };

  await inyectDb(request, response, next);

  assert.strictEqual(request.db, pool);
  assert.equal(nextCalled, true);
});
