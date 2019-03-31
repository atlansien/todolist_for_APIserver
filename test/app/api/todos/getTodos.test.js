const request = require('supertest');
const assert = require('power-assert');
const app = require('../../../../app');

describe('test 「GET/api/todos」', () => {
    it('totosリストがjson形式としてresponse.bodyで返ってきている', async() => {
        const response = await request(app)
            .get('/api/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        const todos = response.body;
        assert.equal(Array.isArray(todos), true);
        todos.forEach(todos => {
            assert.equal(typeof todos.id, "number");
            assert.equal(typeof todos.title, "string");
            assert.equal(typeof todos.body, "string");
            assert.equal(typeof todos.createdAt, "string");
            assert.equal(typeof todos.updatedAt, "string");
        })
            
    })
})
