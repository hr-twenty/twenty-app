angular.module('twenty', [
  'ionic',
  'ui.router',
  'app.services',
  'app.main',
  'app.messages.details',
  'app.messages.list',
  'app.settings'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


    .state('main', {
      url: '/main',
      abstract: true,
      controller: 'MainIndexCtrl',
      templateUrl: 'templates/side-menus.html'
    })

    .state('main.home', {
      url:'/home',
      views: {
        'left': {
          templateUrl: 'settings/settings.html',
          controller: 'SettingsCtrl'
        },
        'right': {
          templateUrl: 'messages/list/list.html',
          controller: 'MessagesListCtrl'
        },
        'main': {
          templateUrl: 'main/main.html',
          controller: 'MainIndexCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html'
      //controller: 'LoginCtrl'
    })

    .state('conversation', {
      url: '/messages/:conversationId',
      templateUrl: 'messages/details/details.html',
      controller: 'MessagesDetailsCtrl'
    })
  });

	
