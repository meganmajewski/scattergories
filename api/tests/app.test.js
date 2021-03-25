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
        .expect(200,  { response: { results: { response: [] } } }, done())
    });
    it('responds with an error if something goes wrong', function(done) {
      const mock = jest.spyOn(database, 'getAllAnswers');
      mock.mockImplementation(() => Promise.reject());
  
      request(app)
        .get('/answers')
        .set('Accept', 'application/json')
        .expect(500, done())
    });
  });
  describe('POST /answers', ()=> {
    it('should add answers to the database', (done)=> {
      const mock = jest.spyOn(database, 'addAnswers')
      const payload = [{answer: {gameid: "", categoryId: "", userId: "", input: ""}}]
      request(app)
        .post('/answers')
        .set('Content-type', 'application/json')
        .send({payload})
        .end((err, res) => {
          if (err) {
           reject(new Error('An error occured' + err))
          }
          resolve(res.body)
         })

      expect(mock).toHaveBeenCalled()
    })
  })