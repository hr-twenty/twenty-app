angular.module('twenty', ['ionic', 'directory.controllers', 'directory.services'])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('main', {
        url: '/main',
        templateUrl: 'templates/index.html',
        controller: 'MainIndexCtrl'
      })

      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      })

      .state('messages', {
        url: '/messages',
        templateUrl: 'templates/messages.html',
        controller: 'MessagesCtrl'
      })

      // set the default state if others are unavailable
      $urlRouterProvider.otherwise('/main');

  });

	
