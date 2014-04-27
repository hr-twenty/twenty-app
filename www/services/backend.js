angular.module('app.services.backend', [])

.factory('Backend', ['$http', function($http) {
	
	var dbHost = 'http://65.52.118.73:55555';

	var post = function(path, payload, callback) {
		console.log("POSTing to " + path);
		payload = JSON.stringify(payload);
		$http.post(dbHost + path, payload)
		.success(function(data, status) {
			console.log("POST successful.");
			if(callback) callback(data, status);
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

	return {
		dbHost: dbHost,
		get: get,
		post: post
	};

}]);