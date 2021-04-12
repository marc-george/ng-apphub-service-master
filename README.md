# ng-apphub-service

This is an angular service that provides some common convenience methods for the AppHub

## Usage

##### To use as NPM module
```
npm install git+https://github.build.ge.com/hubs/ng-apphub-service.git#master

```
Then you can load the module in your angular app like so:

```
import AppHubModule from '@hubs/ng-apphub-service';
or 
const AppHubModule = require("@hubs/ng-apphub-service");
```

##### To use as JSPM component

To use this module in your ES6 application, add the following to your config.js

```
System.config({
  "paths": {
    "ge:*": "jspm_packages/ge/*.js"
  }
});
System.config({
  "map": {
    "hubs/ng-apphub-service": "ge:hubs/ng-apphub-service@master",
  }
});
```

Then you can load the module in your angular app like so:

```
import AppHubModule from 'hubs/ng-apphub-service';
```

and then inject the module as a dependency:

```
let AppModule = angular.module('app', [
  'AppHubModule',
])
```

This module includes an AppHubService service, which you can then inject into your app's controllers and services. 
There are ngDocs for usage of the service within your code. See instructions below for generating and viewing the docs.

To see it in action, visit <microapp reference url> 

## Testing

There are unit tests written for the AppHubService. 
 
To run the tests, clone the repository:
```
% git clone git@github.build.ge.com:hubs/ng-apphub-service.git
```
 
 then cd into the directory and install the development dependencies:
```
% cd ng-apphub-service
% jspm install
% npm install
```
then run the tests:
```
% gulp test
```
This will run all the unit tests and create a coverage report in dist/coverage

## Documentation

To see ng-apphub-service methods api documentation please follow these steps below
To generate the ngDocs, clone the repository:
```
% git clone git@github.build.ge.com:hubs/ng-apphub-service.git
```

then cd into the directory and install the development dependencies:
```
% cd ng-apphub-service
% jspm install
% npm install
```
then generate the docs:
```
% gulp docs
```

and serve the docs:
```
% gulp connect:docs
```

and visit http://localhost:9001 to view the docs


