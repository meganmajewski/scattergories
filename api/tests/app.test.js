const request = require('supertest');
const express = require('express');
const index = require("../routes/index.js");
const database = require('../db/database');

const app = express();
app.use(index);
  describe('GET /answers', function() {
    it('responds with json', function(done) {
      const mock = jest.spyOn(database, 'getAllAnswers');
      mock.mockImplementation(() => Promise.resolve({
        response: []
      }));  // replace the implementation
  
      request(app)
        .get('/answers')
        .set('Accept', 'application/json')
        .expect(200,  { response: { results: { response: [] } } }, done)
    });
  });