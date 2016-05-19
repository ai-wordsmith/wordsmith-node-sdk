'use strict';

var TemplateCollection = require('./TemplateCollection');

function Project(project, apiClient) {
  this.api = apiClient;
  this.slug = project.slug;
  this.name = project.name;
  this.schema = project.schema;
  this.templates = new TemplateCollection(project, apiClient);
}

module.exports = Project;
