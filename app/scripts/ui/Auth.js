/** @jsx React.DOM */
var React = require('react');

var Auth0 = require('./plugins/Auth0');

var Auth = React.createClass({
	mixins: [Auth0],
	componentWillMount: function () {
		this.authInit();
	},
	getInitialState: function () {
		return {
			msg: null,
			items: []
		};
	},
	handleSubmit: function(e){
		e.preventDefault();

		if( this.props.userProfile ) {
			this.logout();
		} else {
			var that = this;
			this.login(function(err, profile, token){
				if (err) {
					console.log('There was an error...');
					console.log(err);
				} else {
					that.props.doUserAuth(profile, token);
				}
			});
		}

	},
	render: function () {

		if( this.props.userProfile ){
			var button = <div>
				<button>{'Logout'}</button>
				<b>Logged in as: {this.props.userProfile.nickname}</b>
			</div>;
		} else {
			var button = <button>{'Login'}</button>;
		}

		return <div>
			<form onSubmit={this.handleSubmit}>
			{button}
			</form>
		</div>;
	}

});




module.exports = Auth;
