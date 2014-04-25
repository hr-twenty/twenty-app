angular.module('app.services.users', [
  
]);

// .factory('Users', function($http, $q, Errors, _, Restangular) {

// 	return {
// 		query: function() {
//       var dfd = $q.defer();
//       Restangular.all('api/users').getList().then(function(data) {
//         console.log('GET Users: ', data);
//         dfd.resolve(data);
//       });

//       return dfd.promise;
//     }
// 	};

// });