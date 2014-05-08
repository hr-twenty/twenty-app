angular.module('app.services.backend', [])

.factory('Backend', ['$http', function($http) {
	
	var dbHost = 'http://191.236.102.40:55555';
	// var dbHost = 'http://10.4.8.235:8000';

	var request = function(verb, path, payload, callback) {
		// If it's a GET request, put the payload inside a params object
		verb === 'get' ? payload = {'params': payload} : payload = payload;

		$http[verb](dbHost + path, payload)
		.success(function(data, status) {
			// console.log(verb+' successful.');
			if(callback) return callback(data, status);
		})
		.error(function(data, status) {
			throw new Error("There was an error in Backend."+ verb + ": ", data);
		});
	};

	var get = function(path, payload, callback) {
		return request('get', path, payload, callback);
	};

	var post = function(path, payload, callback) {
		return request('post', path, payload, callback);
	};

	var del = function(path, requestObject, callback) {
		return request('delete', path, requestObject, callback);
	};

	return {
		dbHost: dbHost,
		get: get,
		post: post,
		del: del
	};

}]);