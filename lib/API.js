'use strict';

var https = require('https');
var APIconfig = require('./config');

var API = function (key, agent) {
  if( !(this instanceof API) ) {
    return new API(key, agent);
  }

  this.key = key;
  this.userAgent = agent;
  this.version = APIconfig.version;
};

API.prototype = {

  request: function(path, method, data) {

    method = (method || 'GET').toUpperCase();

    var endpoint = makeEndpoint(path, this.version);

    if (data) { data = JSON.stringify({data: data}); }

    var requestOptions = buildRequestOptions({
      key: this.key,
      endpoint: endpoint,
      method: method,
      userAgent: this.userAgent,
      data: data
    });

    return execute(requestOptions, data);
  },

};

function makeEndpoint (path, version) {
  return '/v' + version + '/' + path;
}

function execute (requestOptions, data) {
  return new Promise(function (resolve, reject) {
    var req = https.request(requestOptions, function(res) {
      handleResponse(res, resolve, reject);
    }).on('error', function (e) {
        reject(e);
    });

    if (requestOptions.method === 'POST') req.write(data);

    req.end();
  });
}

function handleResponse(response, resolve, reject) {
  var statusCode = response.statusCode.toString();
  var body = '';

  response.on('data', function (chunk) {
      body += chunk;
  });

  response.on('end', function () {
    if (body && body != '') {
      var parsedBody = JSON.parse(body);

      if ( statusCode.match(/2[0-9]{2,2}/) ) {
        resolve( parsedBody.data );
      } else {
        reject( new Error(parsedBody.errors[0].detail) );
      }

    } else {
      reject( new Error('No response from Wordsmith API') );
    }
  });
}

function buildRequestOptions(options) {

  var requestOptions = {
    hostname: APIconfig.host,
    port: 443,
    path: options.endpoint,
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + options.key,
      'User-Agent': options.userAgent
    }
  };

  if (options.method === 'POST' && options.data) {
    requestOptions.headers['Content-Length'] = Buffer.byteLength(options.data);
  }

  return requestOptions;

}

function makePostData(data) {
  return JSON.stringify( {data: data} );
}

module.exports = API;
