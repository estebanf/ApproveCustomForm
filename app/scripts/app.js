'use strict';

/**
 * @ngdoc overview
 * @name approveCustomFormApp
 * @description
 * # approveCustomFormApp
 *
 * Main module of the application.
 */
angular
  .module('approveCustomFormApp', [
    'ngRoute',
    'ngSanitize',
    'ngLoadingOverlay'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
