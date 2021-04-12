import angular from 'angular';
import AppHubService from '../services/apphub';

/**
 * @ngdoc object
 * @name AppHubModule
 * @description
 * A set of common utilities for AppHub.
 * @example
 * ```
    import AppHubModule from './<path to main>/module.js';
    let AppModule = angular.module('app', ['AppHubModule']);
 * ```
 */
let appHubModule = angular.module('AppHubModule', [])

  // Services
  .service('AppHubService', AppHubService)

  .run(['$log', function($log){}]);

export default appHubModule;
