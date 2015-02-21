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
		this.bindAsObject(new Firebase("https://burning-fire-3434.firebaseio.com/tagchat/chatrooms/" + this.getParams().roomId + "/messages"), "items");
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
		console.log(this.getParams());
		return <div>
			<ChatWindow items={this.state.items} />
			<ChatMessage userProfile={this.state.userProfile} addAction={this.addMessage} />
			<Auth userProfile={this.state.userProfile} doUserAuth={this.userAuth} />
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
