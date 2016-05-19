'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;

describe('Projects', function() {
  var settings = require('./testConfig.json');

  var testKey = settings.key;
  var testUserAgent = settings.userAgent;
  var testProjectSlug = settings.testProjectSlug;
  var testTemplateSlug = settings.testTemplateSlug;
  var testData = settings.testData;

  var wordsmithLocation = '../lib/wordsmith';
  var wordsmith = require(wordsmithLocation)(testKey, testUserAgent);

  describe('Constructor', function() {

    it('should create a projects object', function() {
      expect(wordsmith.projects).to.be.a('object');
    });

  });

  describe('List projects', function() {

    it('should list projects', function() {
      expect(wordsmith.projects).to.respondTo('all');
      return expect( wordsmith.projects.all() ).to.eventually.not.be.empty;
    });

  });

  describe('Find a project', function() {

    it('should find a specific project', function() {
      expect(wordsmith.projects).to.respondTo('find');
      return expect( wordsmith.projects.find(testProjectSlug) )
        .to.eventually.have.property('name');
      return expect( wordsmith.projects.find(testProjectSlug) )
        .to.eventually.have.property('slug');
      return expect( wordsmith.projects.find(testProjectSlug) )
        .to.eventually.to.respondTo('schema');
    });

    it('should throw an error if it cant find a project', function() {
      return expect( wordsmith.projects.find('t') )
        .to.eventually.be.rejectedWith(Error);
    });

  });

  describe('Get Data Schema', function() {

    it('should find data schema for a project', function() {
      return expect( wordsmith.projects.find(testProjectSlug).then(function(project) {
        return project.schema;
      }) )
        .to.eventually.be.deep.equal(
        {
          a: "Number",
          b: "Number",
          c: "Number"
        });
    });

  });

});
