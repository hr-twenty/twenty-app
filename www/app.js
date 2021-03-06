angular.module('twenty', [
  'ionic',
  'ui.router',
  'app.services',
  'app.services.connections',
  'app.services.users',
  'app.main',
  'app.main.details',
  'app.main.ownprofile',
  'app.messages.details',
  'app.messages.list',
  'app.settings',
  'app.settings.preferences',
  'app.settings.delete',
  'app.login',
  'app.loading',
  'app.directives',
  'app.cards',
  'ionic.contrib.ui.cards'
])

.controller('TwentyCtrl', function($scope) {
  ionic.Platform.ready(function() {
    // StatusBar will be undefined during development.
    StatusBar.styleDefault();
    // Default is black. See link below for more customization
    // http://plugins.cordova.io/#/package/org.apache.cordova.statusbar
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'templates/side-menus.html'
    })

    .state('main.home', {
      url:'#/home/:menuState/',
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
      url: '/messages/:otherId',
      templateUrl: 'messages/details/details.html',
      controller: 'MessagesDetailsCtrl'
    })

    .state('preferences', {
      url: '/preferences',
      templateUrl: 'settings/preferences.html',
      controller: 'PreferencesCtrl'
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

    .state('ownDetails', {
      url: '/own-profile',
      templateUrl: 'user-details/own-details.html',
      controller: 'OwnProfileCtrl'
    })

    .state('ownDetails.edit', {
      url: '/own-profile/edit',
      templateUrl: ''
    })

    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    })

    .state('delete', {
      url: '/delete',
      templateUrl: 'delete/delete.html',
      controller: 'DeleteCtrl'
    })

    .state('loading', {
      url: '/loading',
      templateUrl: 'loading/loading.html',
      controller: 'LoadingCtrl'
    })

    .state('otherwise', {
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
    });

    $urlRouterProvider.when('', '/login');

  });










