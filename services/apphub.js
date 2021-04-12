
const GLOBAL_KEY = "_apphub";
const STATE_KEY = 'state';
const locations = ['main', 'settings', 'profile'];

/**
 * @ngdoc service
 * @name AppHubModule.service:AppHubService
 * @author j.defrisco@ge.com
 * @memberOf AppHubModule
 * @description AppHub convenience methods
 */
class AppHubService {

    constructor($window){
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
    getPath(uappId) {
        let id = uappId ? uappId : this.getCurrentApp();
        return  this.$window.nav && this.$window.nav.paths[id] ? this.$window.nav.paths[id] : this.getContext();
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
    getCurrentApp() {
        var id;
        let curPath = this.$window.location.pathname.toLowerCase();  // this is how they appear in window.nav
        let navItems = this.$window.nav && this.$window.nav.paths ? this.$window.nav.paths : {};

        for(let key in this.$window.nav){
            if(this.$window.nav.hasOwnProperty(key) && locations.indexOf(key) !== -1){

                let region = this.$window.nav[key];
                for (let i = 0, len = region.items.length; i < len; i++) {
                  let item = region.items[i];
                  let nextId = item.id.substring(0,item.id.lastIndexOf('.'));
                  let itemPath = new RegExp('^'+navItems[nextId] + '/','i');
                  if(navItems.hasOwnProperty(nextId) && itemPath.test(curPath)){
                      id = nextId;
                      break;
                  }
              }
                if(id){
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
    setState(value) {
        // require an object here
        if (typeof value == 'object') {
            let curState = this.getLocalStore(STATE_KEY, GLOBAL_KEY);
            // merge in new state
            for (let p in value) {
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
    getState() {
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
    setLocalStore(key, value, appId) {
        let k = (appId || this.getCurrentApp()) + ':' + key;
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
    hasLocalStore(key, appId) {
        let app = appId || this.getCurrentApp();
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
    getLocalStore(key, appId) {
        let app = appId || this.getCurrentApp();
        let v = this.$window.sessionStorage.getItem(app + ':' + key) || '{}';
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
    removeLocalStore(key, appId) {
        let app = appId || this.getCurrentApp();
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
    appAvailable(uappId) {
        return this.getPath(uappId) != this.getContext();
    }
    // convenience function to get the current multi-tenant context
    getContext() {
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
    notify(message) {

      var event = new CustomEvent('apphub.notify', {detail: {message: message}});
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
    removeAllNotification() {
      var event = new CustomEvent('apphub.notify', {detail: {message: null, action: 'removeAll'}});
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
    getPreferredLocale() {
      return  this.$window.nav && this.$window.nav.user && this.$window.nav.user.preferredLocale ? this.$window.nav.user.preferredLocale : '';
    }




    static serviceFactory($window){
        return new AppHubService($window);
    }


}

// class constants

// Strict DI for minification (order is important)
AppHubService.serviceFactory.$inject = ['$window'];

// Export an instance
export default AppHubService.serviceFactory;
