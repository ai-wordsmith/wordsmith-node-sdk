'use strict';

var Template = require('./Template');

function TemplateCollection (project, apiClient) {
  this.api = apiClient;
  this.templates = makeTemplates(project.templates, apiClient, project.slug);
}

TemplateCollection.prototype = {

  all: function() {
    return Promise.resolve(this.templates);
  },

  find: function(slug) {
    var match;

    for (var i = 0; i < this.templates.length; i++) {
      var template = this.templates[i];
      if (template.slug === slug) {
        return Promise.resolve(template);
      }
    };

    return Promise.reject( Error('Template not found with slug: ' + slug) );
  }

};

function makeTemplates (templates, apiClient, projectSlug) {
  return templates.map(function(template) {
    return new Template(template, apiClient, projectSlug);
  });
}

module.exports = TemplateCollection;
