'use strict';

var Project = require('./Project');

function ProjectCollection (apiClient) {
  if (!(this instanceof ProjectCollection)) {
    return new ProjectCollection(apiClient);
  }

  this.api = apiClient;
}

ProjectCollection.prototype = {

  all: function() {
    var _this = this;
    return this.api.request('projects','get').then(function(projects) {
      return projects.map(function(project) {
        return new Project(project, _this.api);
      });
    });
  },

  find: function(slug) {
    var _this = this;
    return this.all().then(function(projects) {
      var match;

      for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        if ( project.slug === slug ) {
          match = project;
        }
      };

      if (match) {
          return match;
      } else {
        return Promise.reject( Error('Project not found with slug: ' + slug) );
      }
    });
  },

};

module.exports = ProjectCollection;
