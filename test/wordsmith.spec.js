'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;

describe('Wordsmith API', function() {
  var wordsmithLocation = '../lib/wordsmith';

  var settings = require('./testConfig.json');

  var testKey = settings.key;
  var testUserAgent = settings.userAgent;
  var testProjectSlug = settings.testProjectSlug;
  var testTemplateSlug = settings.testTemplateSlug;
  var testData = settings.testData;

  var wordsmith = require(wordsmithLocation)(testKey, testUserAgent);

  describe('Constructor', function() {

    it('should allow creating a wordsmith instance', function() {
      expect(wordsmith).to.be.a('object');
      expect(wordsmith).to.have.property('api');
    });

    it('should error if no api key passed', function() {
      expect( require(wordsmithLocation).bind() ).to.throw(Error);
    });

    it('should error if no user-agent passed', function() {
      expect( require(wordsmithLocation).bind(testKey, 'foo') ).to.throw(Error);
    });

  });

  describe('wordsmith.projects', function() {

    it('should have projects', function() {
      expect( wordsmith.projects ).to.not.be.empty;
      expect( wordsmith.projects ).to.respondTo('all');
    });

  });

  describe('find project, find template, and generate content', function() {

    it('should generate content', function() {
      expect( testAll() ).to.eventually.not.be.empty;
    });

    it('should throw error on bad generation', function() {
      expect( testBadData() ).to.eventually.throw(Error);
    })

  });

  function getTestTemplate () {

     return wordsmith
      .projects.find('test')
      .then(function(project) {
        return project.templates.find('test');
      })

  }

  function testAll () {

    return getTestTemplate().then(function(template) {
      return template.generate(testData);
    });
  }

  function testBadData () {

      return getTestTemplate().then(function(template) {
        return template.generate({foo: 'a'});
      });
  }

});


