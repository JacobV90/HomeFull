///<reference path="../typings/index.d.ts"/>

var app = angular.module('app', ['ionic', 'app.controllers', 'ngCordova','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
  
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      window.StatusBar.styleLightContent();
    }

  });
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

  $stateProvider

  .state('shelters', {
    url: '/shelters',
    templateUrl: 'templates/shelters.html',
    controller: 'ShelterCtrl'
  })

  .state('home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'ShelterCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/shelters');
});
