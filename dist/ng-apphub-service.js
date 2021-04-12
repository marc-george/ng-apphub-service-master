(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular")) : factory(root["angular"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(1);

var _angular2 = _interopRequireDefault(_angular);

var _apphub = __webpack_require__(2);

var _apphub2 = _interopRequireDefault(_apphub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var appHubModule = _angular2.default.module('AppHubModule', [])

// Services
.service('AppHubService', _apphub2.default).run(['$log', function ($log) {}]);

exports.default = appHubModule;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLOBAL_KEY = "_apphub";
var STATE_KEY = 'state';
var locations = ['main', 'settings', 'profile'];

/**
 * @ngdoc service
 * @name AppHubModule.service:AppHubService
 * @author j.defrisco@ge.com
 * @memberOf AppHubModule
 * @description AppHub convenience methods
 */

var AppHubService = function () {
    function AppHubService($window) {
        _classCallCheck(this, AppHubService);

        this.$window = $window;
    }

    /**
     * @ngdoc
     * @name AppHubService#getPath
     * @methodOf AppHubModule.service:AppHubService
     * @description
     * Given a microapp id, get the path to the microapp
     * If no id is supplied, returns the path to the current microapp
     * @example
     * ```
     * let url = apphub.getPath('analytics');
     * ```
     */


    _createClass(AppHubService, [{
        key: 'getPath',
        value: function getPath(uappId) {
            var id = uappId ? uappId : this.getCurrentApp();
            return this.$window.nav && this.$window.nav.paths[id] ? this.$window.nav.paths[id] : this.getContext();
        }

        /**
         * @ngdoc
         * @name AppHubService#getCurrentApp
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Return the id of the current microapp
         * @example
         * ```
         * let url = apphub.getPath(apphub.getCurrentApp());
         * ```
         */

    }, {
        key: 'getCurrentApp',
        value: function getCurrentApp() {
            var id;
            var curPath = this.$window.location.pathname.toLowerCase(); // this is how they appear in window.nav
            var navItems = this.$window.nav && this.$window.nav.paths ? this.$window.nav.paths : {};

            for (var key in this.$window.nav) {
                if (this.$window.nav.hasOwnProperty(key) && locations.indexOf(key) !== -1) {

                    var region = this.$window.nav[key];
                    for (var i = 0, len = region.items.length; i < len; i++) {
                        var item = region.items[i];
                        var nextId = item.id.substring(0, item.id.lastIndexOf('.'));
                        var itemPath = new RegExp('^' + navItems[nextId] + '/', 'i');
                        if (navItems.hasOwnProperty(nextId) && itemPath.test(curPath)) {
                            id = nextId;
                            break;
                        }
                    }
                    if (id) {
                        break;
                    }
                }
            }
            return id ? id : null;
        }

        /**
         * @ngdoc
         * @name AppHubService#setState
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Save some global (cross micro-app) state to local storage. Merges passed object with current state.
         * @param {Object} value - an object holding the state to save
         * @example
         * ```
         * apphub.setState(value);
         * ```
         */

    }, {
        key: 'setState',
        value: function setState(value) {
            // require an object here
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
                var curState = this.getLocalStore(STATE_KEY, GLOBAL_KEY);
                // merge in new state
                for (var p in value) {
                    if (value.hasOwnProperty(p)) {
                        curState[p] = value[p];
                    }
                }
                this.setLocalStore(STATE_KEY, curState, GLOBAL_KEY);
            } else {
                console.error('setState() called without an object to store');
            }
        }

        /**
         * @ngdoc
         * @name AppHubService#getState
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Retrieve the global (cross-microapp) state from local storage.
         * @returns {Object} - if there is no local storage associated with the passed key, an empty object is returned.
         * @example
         * ```
         * let curState = apphub.getState();
         * ```
         */

    }, {
        key: 'getState',
        value: function getState() {
            return this.getLocalStore(STATE_KEY, GLOBAL_KEY);
        }

        /**
         * @ngdoc
         * @name AppHubService#setLocalStore
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Save some app-specific info to local storage
         * @param {string} key - the key used to store/retrieve the value
         * @param {Object} value - an object holding the value to save
         * @param {string=} appId - the appId to associate the key with. Defaults to the current microapp.
         * @example
         * ```
         * apphub.setLocalStore(key, value);
         * ```
         */

    }, {
        key: 'setLocalStore',
        value: function setLocalStore(key, value, appId) {
            var k = (appId || this.getCurrentApp()) + ':' + key;
            this.$window.sessionStorage.setItem(k, JSON.stringify(value));
        }

        /**
         * @ngdoc
         * @name AppHubService#hasLocalStore
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Tests to see if local storage exists for the key. appId is optional - defaults to current app.
         * @param {string} key - the key used to store/retrieve the value
         * @param {string=} appId - the appId to associate the key with. Defaults to the current microapp.
         * @returns {Boolean} - true if there is local storage associated with the passed key
         * @example
         * ```
         * if (apphub.getLocalStore('prefs')) {...;
         * ```
         */

    }, {
        key: 'hasLocalStore',
        value: function hasLocalStore(key, appId) {
            var app = appId || this.getCurrentApp();
            return this.$window.sessionStorage.getItem(app + ':' + key) ? true : false;
        }

        /**
         * @ngdoc
         * @name AppHubService#getLocalStore
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Get app-specific info from local storage. appId is optional - defaults to current app.
         * @param {string} key - the key used to store/retrieve the value
         * @param {string=} appId - the appId to associate the key with. Defaults to the current microapp.
         * @returns {Object} - if there is no local storage associated with the passed key, an empty object is returned.
         * @example
         * ```
         * let myvalue = apphub.getLocalStore('prefs');
         * ```
         */

    }, {
        key: 'getLocalStore',
        value: function getLocalStore(key, appId) {
            var app = appId || this.getCurrentApp();
            var v = this.$window.sessionStorage.getItem(app + ':' + key) || '{}';
            return JSON.parse(v);
        }

        /**
         * @ngdoc
         * @name AppHubService#removeLocalStore
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Remove app-specific info from local storage. appId is optional - defaults to current app.
         * @param {string} key - the key used to store/retrieve the value
         * @param {string=} appId - the appId to associate the key with. Defaults to the current microapp.
         * @returns nothing
         * @example
         * ```
         * apphub.removeLocalStore('prefs');
         * ```
         */

    }, {
        key: 'removeLocalStore',
        value: function removeLocalStore(key, appId) {
            var app = appId || this.getCurrentApp();
            this.$window.sessionStorage.removeItem(app + ':' + key);
        }

        /**
         * @ngdoc
         * @name AppHubService#appAvailable
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Return true if the app for the passed appId is accessible by the current user
         * @example
         * ```
         * let appAvailable = apphub.appAvailable('someMicroappId');
         * ```
         */

    }, {
        key: 'appAvailable',
        value: function appAvailable(uappId) {
            return this.getPath(uappId) != this.getContext();
        }
        // convenience function to get the current multi-tenant context

    }, {
        key: 'getContext',
        value: function getContext() {
            return this.$window.nav && this.$window.nav.contextPath ? this.$window.nav.contextPath : '';
        }

        /**
         * @ngdoc
         * @name AppHubService#notify
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Send message to pxh chrome oasts and notifications, this feature provides visual banner and notification queue list
         * to user for notification purpose. Toasts are little messages for the user that appear at the bottom of the viewport
         * on mobile, and at the upper-right corner of the browser window on tablet and mobile. Calling this method with required
         * message object will get pxh chrome to show the message banner from top-down fashion, the same message will also be
         * added in the notification list section next to the bottom of the navigation bar.
         * @param {object} configuration object containing your application specific message plus several other
         * properties that you can configure:
         *   - icon : css class using font awesome (you can use all supported class see http://fontawesome.io/icons/)
         *   - type : color (blue,red,orange,green)
         *   - text : message text that you intend to notify user
         *   - persistence: boolean, if false, then banner dismisses in a few seconds
         *   - timestamp: time stamp(optional) if you choose to add this information
         *   - actionLabel: action button text(optional)   if you would like to provide button for other user interaction
         *   - actionCallback: call back function(optional)  when user clicks the action button on the toast banner
         *   - actionLink: href(optional) that it will navigate user to when clicked
         * ** Note: if you provide actionLink, do not provide actioinCallback as the same time.
         * @example
         * ```
         * //In your controller, after you inject appHubService
         *
         *    let messageObj = {
         *      type: 'red',
         *      isPersistent: true,
         *      icon: 'exclamation-circle',
         *      text: 'Red Alert! System needs maintenance!',
         *      actionLabel: 'OK',
         *      timestamp: '9:55 AM',
         *      actionCallback:  function(){ } //your call back function
         *     };
         *
         *    this.apphubService.notify(messageObj);
         *
         *
         *    let messageObjEx2 = {
         *      type: 'orange',
         *      isPersistent: false,
         *      icon: 'rocket',
         *      text: 'Calculation starting...'
         *     };
         *
         *    this.apphubService.notify(messageObjEx2);
         *
         *
         *    let messageObjEx3 = {
         *      type: 'blue',
         *      isPersistent: false,
         *      icon: 'thumbs-o-up',
         *      text: 'Room temperature is rising by 2 degree',
         *      actionLabel: 'Go to google',
         *      actionLink: 'http://google.com'
         *     };
         *
         *    this.apphubService.notify(messageObjEx3);
         * ```
         */

    }, {
        key: 'notify',
        value: function notify(message) {

            var event = new CustomEvent('apphub.notify', { detail: { message: message } });
            this.$window.dispatchEvent(event);
        }
        /**
         * @ngdoc
         * @name AppHubService#removeAllNotification
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * Remove all pxh chrome notification list and toast messages on the page
         * @example
         * ```
         * //In your controller, after you inject appHubService
         * this.apphubService.removeAllNotification();
         *
         * ```
         * */

    }, {
        key: 'removeAllNotification',
        value: function removeAllNotification() {
            var event = new CustomEvent('apphub.notify', { detail: { message: null, action: 'removeAll' } });
            this.$window.dispatchEvent(event);
        }

        /**
         * @ngdoc
         * @name AppHubService#getPreferredLocale
         * @methodOf AppHubModule.service:AppHubService
         * @description
         * returns user preferred locale key if it is declared
         * If locale key is found, returns the empty string
         * @example
         * ```
         * let localeKey = apphub.getPreferredLocale();
         * ```
         */

    }, {
        key: 'getPreferredLocale',
        value: function getPreferredLocale() {
            return this.$window.nav && this.$window.nav.user && this.$window.nav.user.preferredLocale ? this.$window.nav.user.preferredLocale : '';
        }
    }], [{
        key: 'serviceFactory',
        value: function serviceFactory($window) {
            return new AppHubService($window);
        }
    }]);

    return AppHubService;
}();

// class constants

// Strict DI for minification (order is important)


AppHubService.serviceFactory.$inject = ['$window'];

// Export an instance
exports.default = AppHubService.serviceFactory;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ng-apphub-service.js.map