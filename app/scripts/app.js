/** @jsx React.DOM */
var React = window.React = require('react'),
	ChatWindow = require('./ui/ChatWindow'),
	ChatMessage = require('./ui/ChatMessage'),
	Auth = require('./ui/Auth'),
	Router = require('react-router'),
	DefaultRoute = Router.DefaultRoute,
	Link = Router.Link,
	Route = Router.Route,
	RouteHandler = Router.RouteHandler;

var ReactChat = React.createClass({
	mixins: [ReactFireMixin, Router.State],
	getInitialState: function () {
		return {
			items: [],
			userProfile: null
		};
	},
	componentWillMount: function () {
		this.bindAsArray(new Firebase("https://burning-fire-3434.firebaseio.com/tagchat/chatrooms/" + this.getParams().roomId + "/messages"), "items");
	},
	addMessage: function (msg) {
		this.firebaseRefs.items.child(new Date().getTime().toString()).set(msg);
	},
	userAuth: function(profile, token){

		// Save the JWT token.
		localStorage.setItem('userToken', token);
		this.setState({
			userProfile: profile
		});

	},
	render: function () {
		return <div className="row">
			<div className="col-sm-8 ">
				<ChatWindow items={this.state.items} />
				<Auth userProfile={this.state.userProfile} doUserAuth={this.userAuth} />
			</div>
			<div className="col-sm-4">
				<ChatMessage userProfile={this.state.userProfile} addAction={this.addMessage} />
			</div>
			<RouteHandler/>
		</div>;



	}
});
var routes = (
	<Route name="app" path=":roomId" handler={ReactChat} />
);
Router.run(routes, function (Handler) {
	React.render(<Handler />, document.getElementById("app"));
//	React.render(<Handler />, document.body);
});
