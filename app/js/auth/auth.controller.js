'use strict';

angular.module('auth.controllers', ['auth.services'])
.controller('NavCtrl', ['$state','AuthService',function($state, AuthService){
	var vm = this;
	
	vm.isAuthenticated = function(){
		var res = AuthService.isAuthenticated();
		console.log('NavCtrl.isAuthenticated() res =' + res);
		return res;
	}
	
	vm.user = AuthService.getToken('ocbl.user');
	
	vm.logout = function(){
		console.log('NavCtrl.logout()');
		AuthService.logout();
		$state.go('home');
	}
}])
.controller('ProfileCtrl', ['AuthService','profile', function(AuthService, profile){
	var vm = this;
	vm.profile = profile;
	//activate();
	
	// initialize the user when loading
	// function activate(){
	// 	vm.user = AuthService.getToken('ocbl.user');
	// 	console.log('get returned user from localstorage, vm.user=%j', vm.user);
	// }
}])
.controller('RegisterCtrl', ['$state', 'AuthService',
function($state, AuthService) {
	var vm = this;
	
	vm.register = function() {
		return AuthService.register(vm.user).then(registerSuccessFn, registerErrorFn);

		function registerSuccessFn(data, status, headers, config) {
			// return data 
			// 	success: token: token-string
			//	failure: status: 5000(DATABASE_ERROR); message: string
			var token = data.data.token;
			console.log('login success, got token from server, token=%j', token);
			
			// save token string to browser local storage
			AuthService.saveToken(token);
			
			// parse the token into user, and return to profile page
			
			var username = AuthService.getUser();
			
			if(username){
				$state.go('profile',{'username': username});
			} else {
				console.error('login failure! could not parse username from token');
			}
		}


		function loginErrorFn(data, status, headers, config) {
			vm.error = data.message;
			console.error('register failure! message={0}', data.message);
		}
	};
}])
.controller('LoginCtrl', ['$state', 'AuthService',
function($state, AuthService) {
	var vm = this;
	vm.user = {};

	/**
	 * username and password will be enforced by angularjs directive
	 */
	vm.login = function(){
		console.log('in LoginCtrl.login() user = {0}', vm.user.username);
		AuthService.login(vm.user).then(loginSuccessFn, loginErrorFn);
		
		function loginSuccessFn(data, status, headers, config) {
			var token = data.data.token;
			console.log('login success, got token from server, data=%j', data);
			
			// save token string to browser local storage
			AuthService.saveToken(token);
			
			// parse the token into user, and return to profile page
			
			var username = AuthService.getUser();
			
			if(username){
				$state.go('profile',{'username': username});
			} else {
				console.error('login failure! could not parse username from token');
			}
			
		}

		function loginErrorFn(data, status, headers, config) {
			vm.error = data.message;
			console.error('login failure! message={0}', data.message);
		}
	}
}]);
