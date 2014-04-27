angular.module('twenty', [
  'ionic',
  'ui.router',
  'app.services',
  'app.main',
  'app.main.details',
  'app.messages.details',
  'app.messages.list',
  'app.settings',
  'app.login',
  'app.services.backend'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'templates/side-menus.html'
    })

    .state('main.home', {
      url:'/home/:menuState',
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

    .state('conversation', {
      url: '/messages/:conversationId',
      templateUrl: 'messages/details/details.html',
      controller: 'MessagesDetailsCtrl'
    })

    .state('settingsDetails', {
      url: '/settings/',
      templateUrl: 'messages/details/details.html',
      controller: 'MessagesDetailsCtrl'
    })

    .state('userDetails', {
      url: '/users/:otherUserId',
      templateUrl: 'user-details/user-details.html',
      controller: 'MainDetailsCtrl',
      resolve: {
        otherUserData: ['$http', '$stateParams', 'Backend', function($http, $stateParams, Backend) {
          // TODO: do we need error handling here?
          return $http.get(Backend.dbHost + '/users', {params: {userId: $stateParams.otherUserId}}).success(function(data) { return data; });
        }]
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    })
  });

	
