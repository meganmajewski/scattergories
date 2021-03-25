const request = require('supertest');
const express = require('express');
const index = require("../routes/index.js");
const database = require('../db/database');

const app = express();
app.use(index);
describe('fix for supertest', function() {
  it('does nothing', ()=> {
    expect(true).toBe(true)
  })
});