'use strict';

angular.module('user.services', ['cfg'])
.factory('PageService', [ '$http', 'cfgService', '_', function($http, cfgService, _) {

	var service = {
			users : [],
			roles : [],
			key: 'user-list',
	};

	// get role by name
	service.getByName = function(name) {
		console.log('role.service.get(' + name + ')');
		return $http.get(cfgService.getApiUrl() + '/role/' + name);
	};

	service.getAll = function(){
		return $http.get(cfgService.getApiUrl() + '/roles');
	};

  /**
    * load user by id
    * @return promise for http get
    */
    service.get = function(id) {
      $log.debug('service get user by id = %s', id);
      return $http.get(cfgService.getApiUrl() + 'posts/' + id);
    };

   /**
    * create user
    * @param {user} data user to save
    * @return promise for http POST
    */
 	service.create = function(data) {
 		return $http.post(cfgService.getApiUrl() + 'users', data);
 	};

   /**
    * create user
    * @param {String} id user id to update
    * @param {user} data user to save
    * @return promise for http POST
    */
 	service.update = function(data, id) {
 		$log.debug('service PUT user by id = %s', id);
 		return $http.put(cfgService.getApiUrl() + 'users/' + id, data);
 	};

 	service.deleteById = function(id) {
 		return $http.delete(cfgService.getApiUrl() + 'users/' + id);
 	};

 	service.sort = function(){
 		return _.sortBy(service.users, 'id');
 	};

	return service;
}]);
