angular.module('twenty', ['ionic', 'ui.router', 'app.main', 'app.messages.details', 'app.messages.list', 'app.settings'])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('main', {
        url: '/',
        views: {
          'left@': {
            templateUrl: 'settings/settings.html',
            controller: 'SettingsCtrl'
          },
          'right@': {
            templateUrl: 'messages/list/list.html',
            controller:'MessagesListCtrl'
          },
          'main@': {
            templateUrl: 'main/main.html',
            controller: 'MainIndexCtrl'
          }
        }
      })

      .state('conversation', {
        url: '/messages/:conversationId',
        views: {
          'main@': {
            templateUrl: 'messages/details/details.html',
            controller: 'MessagesDetailsCtrl'
          }
        }
      })

  });

	
