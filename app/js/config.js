'use strict';

angular.module('cfg', [])
.factory('cfgService', [ function() {

	var service = {
		api_host : 'localhost:3012',
		api_root : '/api/v1.0',
		token_key: 'slowpoke-token',
	};

	service.get = function(key){
		console.log('getting key=' + service[key]);
		return service[key];
	}
	
	service.getApiUrl = function(){
		return 'http://' + service.api_host + service.api_root;
	}
	
	return service;
}]);