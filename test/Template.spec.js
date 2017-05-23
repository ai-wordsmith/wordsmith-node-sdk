'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;

describe('Template', function() {
  var settings = require('./testConfig.json');

  var testKey = settings.key;
  var testUserAgent = settings.userAgent;
  var testProjectSlug = settings.testProjectSlug;
  var testTemplateSlug = settings.testTemplateSlug;
  var testData = settings.testData;
  var testProject = settings.testProject;

  var apiClient = require('../lib/API')(testKey, testUserAgent);

  var Template = require('../lib/Template');
  var t = new Template(testProject.templates[0], apiClient, 'test');

  describe('Constructor', function() {

    it('should make a rich Template object', function() {
      expect(t).to.be.a('object');
      expect(t).to.have.property('name');
      expect(t).to.have.property('slug');
      expect(t).to.have.property('api');
      expect(t).to.have.property('projectSlug');
      expect(t).to.respondTo('generate');
    });

  });

  describe('generate()', function() {

    it('should generate content', function() {
      expect( t ).to.respondTo('generate');
      return expect( t.generate(testData) ).to.eventually.not.be.empty;
    });

    it('should error if invalid args', function() {
      t.generate().catch(function(err) {
        expect(err).to.be.a('Error')
      });
    });

  });

  describe('test()', function() {

    it('should test test endpoint', function() {
      expect( t ).to.respondTo('test');
      return expect( t.test(testData) ).to.eventually.equal('Generation successful');
    });

    it('should test content', function() {
      t.test({}).catch(function(err) {
        expect(err).to.be.a('Error')
      });
    });

    it('should error if invalid args', function() {
      t.test().catch(function(err) {
        expect(err).to.be.a('Error')
      });
    });

  });

});
