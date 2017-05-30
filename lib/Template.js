'use strict';

function Template ( template, apiClient, projectSlug ) {
  this.name = template.name;
  this.slug = template.slug;

  this.api = apiClient;
  this.projectSlug = projectSlug;
}

Template.prototype = {

  generate: function(data) {
    checkData(data);

    return this.api.request(endpoint(this, '/outputs'), 'POST', data)
      .then(function(result) {
        return result.content;
      })
      .catch(Promise.reject.bind(Promise));
  },

  test: function(data) {
    checkData(data);

    return this.api.request(endpoint(this, '/test'), 'POST', data)
      .then(function(result) {
        return result;
      })
      .catch(Promise.reject.bind(Promise));
  }

};

function checkData(data) {
  if (!data || typeof data !== "object") {
    return Promise.reject( Error('Missing data object for generating content.') );
  }
}

function endpoint(template, path) {
  return 'projects/' + template.projectSlug + '/templates/' + template.slug + path;
}

module.exports = Template;
