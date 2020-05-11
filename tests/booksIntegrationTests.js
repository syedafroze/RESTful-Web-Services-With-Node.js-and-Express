require('should');

const request = require('supertest');

const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app= require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud test',()=>{
  it('should allow book to be posted and return id',(done)=>{
    const bookPost = {title:"MFCS" ,author:"sandeep"};
    agent.post('/api/books')
    .send(bookPost)
    .expect(200)
    .end((err,results)=>{
      results.body.title.should.equal("MFCS");
      results.body.should.have.property('_id');
      done();
    });
  });

  afterEach((done)=>{
    Book.deleteMany({}).exec();
    done();
  });
  afterEach((done)=>{
    mongoose.connection.close();
    app.server.close(done());
    
  })
});