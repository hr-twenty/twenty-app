angular.module('app.services.backend', [])

.factory('Backend', ['$http', function($http) {
	
	var dbHost = 'http://65.52.118.73:55555';

	/* There is definitely a further abstraction that can be done here:
	 * We could do something like:
	 * var req = function(verb, path, payload, callback)
	 */
	
	var request = function(verb, path, payload, callback) {
		console.log(verb+'ing to ' + path);
		// If it's a GET request, put the payload inside a params object
		verb === 'get' ? payload = {'params': payload} : payload = payload;

		$http[verb](dbHost + path, payload)
		.success(function(data, status) {
			console.log(verb+' successful.');
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

/* Blocking these off in the event that the abstraction doesn't work as expected

	var post = function(path, payload, callback) {
		console.log("POSTing to " + path);
		payload = JSON.stringify(payload);
		$http.post(dbHost + path, payload)
		.success(function(data, status) {
			console.log("POST successful.");
			if(callback) return callback(data, status);
		})
		.error(function(data, status) {
			throw new Error("There was an error in Backend.post: ", data);
		});
	};

	var get = function(path, requestObject, callback) {
		console.log("POSTing to " + path);
		// requestObject = JSON.stringify(requestObject);
		$http.get(dbHost + path, {params: requestObject})
		.success(function(data, status) {
			console.log("GET successful.");
			callback(data, status);
		})
		.error(function(data, status) {
			throw new Error("There was an error in Backend.get: ", data);
		});
	};
// */

	

	return {
		dbHost: dbHost,
		get: get,
		post: post,
		del: del
	};

}]);