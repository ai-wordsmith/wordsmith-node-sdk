'use strict';

function Wordsmith (api_key, user_agent) {
  if (!(this instanceof Wordsmith)) {
    return new Wordsmith(api_key, user_agent);
  }

  if (!api_key || typeof api_key !== 'string') {
    throw Error('Must pass API key when using Wordsmith');
  }

  if (!user_agent || typeof user_agent !== 'string') {
    throw Error('Must pass a user_agent when using Wordsmith');
  }

  this.api = require('./API')(api_key, user_agent);
  this.projects = require('./ProjectCollection')(this.api);

};

module.exports = Wordsmith;
