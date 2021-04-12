import angular from 'angular';
import 'angular-mocks';

import AppHubService from '../apphub';

describe('AppHub Service', function(){

      var apphub, $window;
      const TENANT_PATH = '/tenant';

      beforeEach(inject(function($injector){
        $window = {nav: {contextPath: '', main: {},profile:{},settings:{}}, location: {pathname:'/uappTwo/'}};
        $window.nav.main.items = [{icon: 'fa-file', id:'uappOne.0', path: '/uappOne/#/'}, {icon: 'fa-bar-chart', id:'uappTwo.0', path: '/uappTwo/#/'}];
				$window.nav.profile.items = [{icon: 'fa-file', id:'uappThree.0', path: '/uappThree/#/'}, {icon: 'fa-bar-chart', id:'uappFour.0', path: '/uappFour/#/'}];
				$window.nav.settings.items = [{icon: 'fa-file', id:'uappFive.0', path: '/uappFive/#/'}, {icon: 'fa-bar-chart', id:'uappSix.0', path: '/uappSix/#/'}];
        $window.nav.paths = {uappOne: '/uappOne', uappTwo: '/uappTwo', uappThree: '/uappThree', uappFour: '/uappFour', uappFive: '/uappFive', uappSix: '/uappSix'};
				$window.nav.contextPath = '',
				$window.sessionStorage = {};
        $window.sessionStorage.setItem = function(k,v) {$window.sessionStorage[k] = v};
        $window.sessionStorage.getItem = function(k) {return $window.sessionStorage[k]};
        $window.sessionStorage.removeItem = function(k) {delete $window.sessionStorage[k]};

				apphub = new AppHubService($window);
      }));

        it('should return the correct path for a valid id', function(){
            expect(apphub.getPath('uappOne')).toEqual('/uappOne');
						expect(apphub.getPath('uappFour')).toEqual('/uappFour');
						expect(apphub.getPath('uappFive')).toEqual('/uappFive');
        });
        it('should return an empty string for an invalid id', function(){
            expect(apphub.getPath('bogusMicroapp')).toEqual('');
        });
        it('should return a path for the current app', function(){
            expect(apphub.getPath()).toEqual('/uappTwo');
        });
        it('should get the current app id', function(){
            expect(apphub.getCurrentApp()).toEqual('uappTwo');
        });
        it('should identify unavailable apps', function(){
            expect(apphub.appAvailable('uappOne')).toBeTruthy();
            expect(apphub.appAvailable('bogusMicroapp')).toBeFalsy();
        });
				it('should return true to the available apps', function(){
					expect(apphub.appAvailable('uappOne')).toBeTruthy();
					expect(apphub.appAvailable('uappTwo')).toBeTruthy();
					expect(apphub.appAvailable('uappThree')).toBeTruthy();
					expect(apphub.appAvailable('uappFour')).toBeTruthy();
					expect(apphub.appAvailable('uappFive')).toBeTruthy();
					expect(apphub.appAvailable('uappSix')).toBeTruthy();
				});
        // separate tests with a context path
        it ('should return the correct path (multi-tenant)', function() {
            setupMultiTenant();
            expect(apphub.getPath('uappOne')).toEqual('/tenant/uappOne');
        });
        it('should return an empty micro-app for an invalid id (multi-tenant)', function(){
            setupMultiTenant();
            expect(apphub.getPath('bogusMicroapp')).toEqual(TENANT_PATH);
        });
        it('should return a path for the current app (multi-tenant)', function(){
            setupMultiTenant();
            expect(apphub.getPath()).toEqual('/tenant/uappTwo');
        });
        it('should identify unavailable apps (multi-tenant)', function(){
            setupMultiTenant();
            expect(apphub.appAvailable('uappOne')).toBeTruthy();
            expect(apphub.appAvailable('bogusMicroapp')).toBeFalsy();
        });

        // tests for local storage
        it ('should save and restore state information for the current microapp', function() {
            let myState = {context: 'main', id: 'one-uuid-or-another', someValue: 42};
            apphub.setState(myState);
            let s = apphub.getState();
            expect(s.someValue).toEqual(42);
            expect(s.context).toEqual('main');
            // add to state, overwriting a value
            let myOtherState = {curApp: "analysis", someValue: 55};
            apphub.setState(myOtherState);
            s = apphub.getState();
            expect(s.someValue).toEqual(55);
            expect(s.curApp).toEqual('analysis');
            expect(s.context).toEqual('main');
        });
        it ('should handle null and undefined and empty state setting without dying', function() {
            spyOn(console, 'error');
            apphub.setState(null);
            apphub.setState();
            apphub.setState({});
            expect(console.error).toHaveBeenCalled();
        });
        it ('should return whether or not local storage exists for a key', function() {
            apphub.setLocalStore('testing', 'hi there');
            expect(apphub.hasLocalStore('testing')).toBeTruthy();
            expect(apphub.hasLocalStore('testing12345')).toBeFalsy();
        });

        it ('should be able to remove local storage for a key', function() {
            apphub.setLocalStore('testing', 'hi there');
            expect(apphub.hasLocalStore('testing')).toBeTruthy();
            apphub.removeLocalStore('testing');
            expect(apphub.hasLocalStore('testing')).toBeFalsy();
        });

        it ('should call apphub.notify', function() {
          spyOn(apphub, 'notify');

          let messageObj = {
            type: 'blue',
            isPersistent: false,
            icon: 'info-circle',
            text: 'You have chosen to view',
            actionLabel: 'Accept',
            actionLink: 'http://google.com'
          };

          apphub.notify(messageObj);
          expect(apphub.notify).toHaveBeenCalled();

        });

        it ('should call apphub.removeAllNotification', function() {
          spyOn(apphub, 'removeAllNotification');
          apphub.removeAllNotification();
          expect(apphub.removeAllNotification).toHaveBeenCalled();
        });


        // extra setup for multi-tenant path
        let setupMultiTenant = () => {
            $window.nav.contextPath = TENANT_PATH;
            $window.location.pathname = TENANT_PATH + $window.location.pathname;
            for(let i=0; i<$window.nav.main.items.length; i++) {
                $window.nav.main.items[i].path = TENANT_PATH + $window.nav.main.items[i].path;
            }
            for (let i in $window.nav.paths) {
                $window.nav.paths[i] = TENANT_PATH + $window.nav.paths[i];
            }
        }
});

