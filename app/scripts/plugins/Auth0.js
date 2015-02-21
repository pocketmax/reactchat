/** @jsx React.DOM */
var React = require('react');

var lock = new Auth0Lock('DNEZl7eBk5zKsShshgW4E4ADyFTELkzq', 'pocketmax.auth0.com');

var Auth0 = {
	authInit: function(){
		$.ajaxSetup({
			beforeSend: function (xhr) {
				if (localStorage.getItem('userToken')) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
				}
			}
		});
	},
	login: function(cb){

		lock.show(cb);

	},
	logout: function(){
		// TODO: use Auth0 to logout
		//signout code goes here
		console.log(lock);
		localStorage.remove('profile');
		localStorage.remove('token');
	}
};

module.exports = Auth0;
