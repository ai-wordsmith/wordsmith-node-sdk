'use strict';

function Template ( template, apiClient, projectSlug ) {
  this.name = template.name;
  this.slug = template.slug;

  this.api = apiClient;
  this.projectSlug = projectSlug;
}

Template.prototype = {

  generate: function(data) {
    if (!data || typeof data !== "object") {
      return Promise.reject( Error('Missing data object for generating content.') );
    }

    //call generate api
    var endpoint = 'projects/'
                  + this.projectSlug
                  + '/templates/'
                  + this.slug
                  + '/outputs';

    return this.api.request(endpoint, 'POST', data)
      .then(function(result) {
        return result.content;
      })
      .catch(Promise.reject.bind(Promise));
  }

};

module.exports = Template;
