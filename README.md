# Wordsmith API client for Node.js

## Intro to Wordsmith

[Wordsmith](https://wordsmith.automatedinsights.com) makes it easy to generate thousands of stories, reports, and articles in the time it takes to write just one. Wordsmith is a natural language generation tool that enables users to turn data into text using dynamic templates. The platform is easy to learn, and powerful enough to make each piece of content totally unique.

## How you interact with Wordsmith

The Wordsmith API allows developers to generate new content using the Templates created in the Wordsmith web app by users at your company. Developers can use the API to send new data which will trigger the generation of new text content. You have complete control over when you generate and use the content.

## Installation
Run `npm install wordsmith --save-dev` in your console.

## Usage

Every resource is accessible via the `wordsmith` instance:

```javascript
var wordsmith = require('wordsmith')('your_api_key', 'your_user_agent');
// wordsmith.{METHOD} or wordsmith.{RESOURCE}.{METHOD}
```

All resources return a Promise for easy asynchronous management.

## Available Resources & Methods

### List Projects

Returns an array of Projects

```javascript
wordsmith.projects.all()
  .then(function(projects) {
    // do something with projects
  })
  .catch(function(error) {
    // deal with errors
  });
```

### Find a Project

Returns a specific Project based on its slug-name

```javascript
wordsmith.projects.find('YOUR_PROJECT_SLUG')
  .then(function(project) {
    // do something with project
  })
  .catch(function(error) {
    // deal with errors
  });
```

### Get the data schema of a Project

Returns a the data schema of a specific Project. The data schema details the data that must be passed when generating content (see below).

```javascript
wordsmith.projects.find('YOUR_PROJECT_SLUG')
  .then(function(project) {
    return project.schema();
  })
  .then(function(schema) {
    // do something with schema
  })
  .catch(function(error) {
    // deal with errors
  });

/*
Schema:

  {
    a: "Number",
    b: "Number",
    c: "Number"
  }
*/
```

### List Templates

Returns an array of Templates

```javascript
wordsmith.projects.find('YOUR_PROJECT_SLUG')
  .then(function(project) {
    return project.templates.all();
  })
  .then(function(templates) {
    // do something with templates
  })
  .catch(function(error) {
    // deal with errors
  });
```

### Find a Template

Returns a single Template based on its slug-name

```javascript
wordsmith.projects.find('YOUR_PROJECT_SLUG')
  .then(function(project) {
    return project.templates.find('YOUR_TEMPLATE_SLUG');
  })
  .then(function(template) {
    // do something with template
  })
  .catch(function(error) {
    // deal with errors
  });
```

### Generate Content

Turns data into narrative content. Data should be in the form of an object with keys for each data variable your Template uses. To see which keys are required, look at the data schema returned by `project.schema()` above.

```javascript
wordsmith.projects.find('YOUR_PROJECT_SLUG')
  .then(function(project) {
    return project.templates.find('YOUR_TEMPLATE_SLUG');
  })
  .then(function(template) {
    return template.generate(YOUR_DATA_OBJECT);
  })
  .then(function(content) {
    // do something with content
  })
  .catch(function(error) {
    // deal with errors
  });

/*
Data object example:

    {
      a: 1,
      b: 2,
      c: 3
    }
*/
```

## Development

Run tests using `mocha` from the root of the repo.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/automatedinsightsinc/wordsmith-node-sdk

