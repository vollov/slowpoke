'use strict';

angular.module('user', ['user.controllers','ui.router'])
.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('users-list', {
		url : '/users',
		templateUrl : 'js/user/views/list.html',
		controller : 'UserListCtrl',
		controllerAs: 'vm',
		onEnter : [ '$state', 'UserService', function($state, UserService) {
			// populate user list on load
			console.log('UserListCtrl onEnter');
		} ],
		data:{
			requireLogin: false
		}
	});
	// .state('register', {
	// 	url : '/register',
	// 	templateUrl : 'js/auth/views/register.html',
	// 	controller : 'RegisterCtrl',
	// 	controllerAs: 'vm',
	// 	onEnter : [ '$state', 'AuthService', function($state, AuthService) {
	// 		// disable login if user is authenticated
	// 		if (AuthService.isAuthenticated()) {
	// 			$state.go('home');
	// 		}
	// 	} ],
	// 	data:{
	// 		requireLogin: false
	// 	}
	// })
	// .state('profile', {
	// 	url : '/profile/:username',
	// 	templateUrl : 'js/auth/views/profile.html',
	// 	controller: 'ProfileCtrl',
	// 	controllerAs: 'vm',
	// 	resolve : {
	// 		profile : ['$stateParams',
	// 		function($stateParams) {
	// 			console.log('profile username=' + $stateParams.username);
	// 			return $stateParams.username;
  //
	// 		}]
	// 	},
	// 	data:{
	// 		requireLogin: false
	// 	}
	// });

}]);
