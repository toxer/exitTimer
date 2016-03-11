// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'time.controllers', 'ionic-timepicker', 'standard.directive', 'filters'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
     //   $httpProvider.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
   //     $httpProvider.defaults.headers.post["Access-Control-Allow-Headers"] = "Cache-Control, Pragma, Origin, Authorization,   Content-Type, X-Requested-With";
    //    $httpProvider.defaults.headers.post["Access-Control-Allow-Methods"] = "GET, PUT, POST";
     //   $httpProvider.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"
           $httpProvider.defaults.timeout = 5000;
        
        
    
        //setup dei content type di default espliciti
        
        //$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        //  $httpProvider.defaults.headers.post['Content-Type'] =  'application/json';
       // $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
       // 


        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
                
            })

        // Each tab has its own nav history stack:

            .state('tab.time', {
                url: '/time',
                views: {
                    'tab-time': {
                        templateUrl: 'templates/tab-time.html',
                        controller: 'TimeCtrl'
                    }
                }
            })

            .state('tab.device', {
                url: '/device',
                views: {
                    'tab-device': {
                        templateUrl: 'templates/tab-device.html',
                        controller: 'Sipert'
                    }
                }
            })

            .state('tab.setup', {
                url: '/setup',
                views: {
                    'tab-setup': {
                        templateUrl: 'templates/tab-setup.html',
                        controller: 'SetupCtrl'
                      
                    }
                }
            })

  

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/time');

    })

    