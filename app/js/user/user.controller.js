'use strict';

angular.module('user.controllers', ['user.services'])
.controller('UserListCtrl', ['UserService',function(UserService){
	var vm = this;
	activate();

	// initialize objects in view when loading
	function activate(){
		return UserService.getAll().then(getSuccessFn, getErrorFn);

		function getSuccessFn(data, status, headers, config) {
			var users = data.data;
      // reload users in service
      UserService.users = users;
		}

		function getErrorFn(data, status, headers, config) {
			//TODO show 500 page
			console.error('UserListCtrl.activate() get page failure!');
		}
	}
}]);
