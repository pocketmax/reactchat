/** @jsx React.DOM */
var React = window.React = require('react'),
	ChatWindow = require('./ui/ChatWindow'),
	ChatMessage = require('./ui/ChatMessage'),
	Auth = require('./ui/Auth');

var ReactChat = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function () {
		return {
			items: [],
			userProfile: null
		};
	},
	componentWillMount: function () {
		this.bindAsObject(new Firebase("https://burning-fire-3434.firebaseio.com/tagchat/chatrooms/2c5daa2710777330020edb18b0f1a5c4/messages"), "items");
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
		return <div>
			<ChatWindow items={this.state.items} />
			<ChatMessage userProfile={this.state.userProfile} addAction={this.addMessage} />
			<Auth userProfile={this.state.userProfile} doUserAuth={this.userAuth} />
		</div>;
	}
});

React.render(<ReactChat />, document.getElementById("app"));
