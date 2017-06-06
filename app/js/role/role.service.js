'use strict';

angular.module('role.services', ['cfg'])
.factory('PageService', [ '$http', 'cfgService', function($http, cfgService) {

	var service = {
			users : [],
			roles : [],
			key: 'user-list',
	};

	// get role by name
	service.get = function(name) {
		console.log('role.service.get(' + name + ')');
		return $http.get(cfgService.getApiUrl() + '/role/' + name);
	};

	service.getAll = function(){
		return $http.get(cfgService.getApiUrl() + '/roles');
	};
	
	return service;
}]);
