'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;

describe('API Client', function() {
  var apiPath = '../lib/API';

  var settings = require('./testConfig.json');

  var testKey = settings.key;
  var testUserAgent = settings.userAgent;
  var testProjectSlug = settings.testProjectSlug;
  var testTemplateSlug = settings.testTemplateSlug;
  var testData = settings.testData;

  var testAPI = require(apiPath)(testKey, testUserAgent);
  var config = require('../lib/config.js');

  describe('Constructor', function() {

    it('should make a new API client', function() {
      expect(testAPI).to.be.a('object');
      expect(testAPI).to.have.property('key');
      expect(testAPI).property('key').to.equal(testKey);
      expect(testAPI).to.have.property('userAgent');
      expect(testAPI).property('userAgent').to.equal(testUserAgent);
      expect(testAPI).property('version').to.equal(config.version);
      expect(testAPI).property('host').to.equal(config.host);
    });

    it('should detect missing values from config file', function() {
      expect(config.version).to.not.be.empty;
      expect(config.version).to.be.a('string');
      expect(config.host).to.not.be.empty;
      expect(config.host).to.be.a('string');
    });

  });

  describe('request()', function() {

    it('should return results', function() {
      expect( testAPI ).to.respondTo('request');
      return expect( testAPI.request('projects', 'get') )
        .to.eventually.not.be.empty;
    });

    it('should return errors from the API', function() {
      return expect( testAPI.request('projcts', 'get') )
        .to.eventually.be.rejectedWith(Error);
    });

    it('should handle posting data', function() {
      var endpoint = makeGenerateURL(testProjectSlug, testTemplateSlug);
      return expect( testAPI.request(endpoint, 'POST', testData) )
        .to.eventually.have.property("content");
    });

  });

  function makeGenerateURL(project, template) {
    return 'projects/' + project + '/templates/' + template + '/outputs';
  }

});
