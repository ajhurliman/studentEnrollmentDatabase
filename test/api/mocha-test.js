'use strict';

process.env.MONGO_URL = 'mongodb://localhost/hasMany_test';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

require('../../server');

var url = 'http://localhost:3000';
var studentId; //created in the student tests, used in enrollment tests
var sectionId; //created in section tests, used in enrollment tests
var enrollmentId; //created and used in enrollment tests

describe('student CRUD capabilities', function() {
  it('should create a student', function(done) {
    chai.request(url)
    .post('/api/students')
    .send({"studentName": "James"})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.studentName).to.eql('James');
      studentId = res.body._id;
      done();
    });
  });

  //read a student
  it('should read a student', function(done) {
    chai.request(url)
    .get('/api/students/' + studentId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.studentName).to.eql('James');
      done();
    });
  });

  //update a student
  it('should update a student', function(done) {
    chai.request(url)
    .put('/api/students/'+ studentId)
    .send({"studentName": "Jeremy"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.studentName).to.eql('Jeremy');
      done();
    });
  });

  //destroy a student
  it('should destroy a student', function(done) {
    chai.request(url)
    .delete('/api/students/' + studentId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});//end student describe block

describe('section CRUD capabilities', function() {
  //create a section
  it('should create a section', function(done) {
    chai.request(url)
    .post('/api/sections')
    .send({"sectionName": "Reactor Analysis"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.sectionName).to.eql("Reactor Analysis");
      sectionId = res.body._id;
      done();
    });
  });

  //read a section
  it('should read a section', function(done) {
    chai.request(url)
    .get('/api/sections/' + sectionId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.sectionName).to.eql("Reactor Analysis");
      done();
    });
  });

  //update a section
  it('should update a section', function(done) {
    chai.request(url)
    .put('/api/sections/' + sectionId)
    .send({"sectionName": "Combinatorics"})
    .end(function(err, res) {
      console.dir(res);
      console.dir(err);
      expect(err).to.eql(null);
      expect(res.body.sectionName).to.eql("Combinatorics");
      done();
    });
  });

  //destroy a section
  it('should destroy a section', function(done) {
    chai.request(url)
    .delete('/api/sections/' + sectionId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('we got \'em chief!!');
      done();
    });
  });
});//end section describe block

//Enrollments shouldn't be updated, hence the test is for CRD, not CRUD.
//Updating enrollments won't be DRY if deleting/ enrolling in a class
//results in further actions (notifications, issuing bills based off
//of the number of credits a student has, etc.) which may be developed
//in the future.
describe('enrollment CRD capabilities', function() {
  //create an enrollment
  it('should create an enrollment', function(done) {
    chai.request(url)
    .post('/api/enrollments')
    .send({"enrolledStudent": studentId,
      "sectionEnrolledIn": sectionId})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.enrolledStudent).to.eql(studentId);
      expect(res.body.sectionEnrolledIn).to.eql(sectionId);
      enrollmentId = res.body._id;
      done();
    });
  });

  //read an enrollment
  it('should read an enrollment', function(done) {
    chai.request(url)
    .get('/api/enrollments/' + enrollmentId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.enrolledStudent).to.eql(studentId);
      expect(res.body.sectionEnrolledIn).to.eql(sectionId);
      done();
    });
  });

  //destroy an enrollment
  it('should destroy an enrollment', function(done) {
    chai.request(url)
    .delete('/api/enrollments/' + enrollmentId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('we got \'em chief!!');
      done();
    });
  });
});// end enrollment describe block
