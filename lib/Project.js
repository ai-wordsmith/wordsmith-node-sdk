'use strict';

var TemplateCollection = require('./TemplateCollection');

function Project(project, apiClient) {
  this.api = apiClient;
  this.slug = project.slug;
  this.name = project.name;
  this.templates = new TemplateCollection(project, apiClient);
}

Project.prototype = {

  schema: function() {
    return this.api.request('projects/' + this.slug, 'get').then(function(response) {
      return response.schema;
    });
  }

};

module.exports = Project;
