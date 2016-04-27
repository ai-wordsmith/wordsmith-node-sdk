'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;

describe('Project', function () {
  var settings = require('./testConfig.json');

  var testKey = settings.key;
  var testUserAgent = settings.userAgent;
  var testProjectSlug = settings.testProjectSlug;
  var testProject = settings.testProject;
  var testTemplateSlug = settings.testTemplateSlug;
  var testData = settings.testData;

  var Project = require('../lib/Project');

  var apiClient = require('../lib/API')(testKey, testUserAgent);

  describe('Constructor', function() {

    it('should create a project object', function() {
      var p =  new Project(testProject, apiClient);
      expect( p ).to.be.a('object');
      expect( p ).to.respondTo('schema');
      expect( p ).to.have.property('templates');
      expect( p ).to.have.property('name');
      expect( p ).to.have.property('slug');
      expect( p ).to.have.property('api');
    });

  });

  describe('Schema', function() {

    it('should return the schema of a project', function() {
      var p = new Project(testProject, apiClient);
      expect( p ).to.respondTo('schema');
      return expect( p.schema() ).to.eventually.be.deep.equal(
      {
        a: "Number",
        b: "Number",
        c: "Number"
      })
    });

  });

});

