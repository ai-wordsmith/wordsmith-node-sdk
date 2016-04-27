'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;

describe('Template Collection', function() {
  var TemplateCollection = require('../lib/TemplateCollection');

  var settings = require('./testConfig.json');

  var testKey = settings.key;
  var testUserAgent = settings.userAgent;
  var testProject = settings.testProject;

  var apiClient = require('../lib/API')(testKey, testUserAgent);

  var collection = new TemplateCollection(testProject, apiClient);

  describe('Constructor', function() {

    it('should make a Template Collection', function () {
      expect(collection).to.respondTo('all');
      expect(collection).to.respondTo('find');
      expect(collection).to.have.property('templates');
    });

  });

  describe('All Templates', function() {

    it('should list all templates', function() {
      var firstTemplate = collection.all().then(function(templates) {
        return templates[0];
      });

      return expect(firstTemplate).to.eventually.have.property('name');
      return expect(firstTemplate).to.eventually.have.property('slug');
    });

  });

  describe('Find Template', function() {

    it('should find a template', function() {
      return expect(collection.find('test')).to.eventually.have.property('name');
      return expect(collection.find('test')).to.eventually.have.property('slug');
    });

  });

});
