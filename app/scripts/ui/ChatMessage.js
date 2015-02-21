/** @jsx React.DOM */
var React = require('react');

var ChatMessage = React.createClass({
	getInitialState: function () {
		return {
			msg: null,
			items: []
		};
	},
	onChange: function (e) {
		this.setState({msg: e.target.value});
	},
	handleSubmit: function (e) {
		e.preventDefault();

		var msg = {
			from: this.props.userProfile.nickname,
			msg: this.state.msg
		};
		this.props.addAction(msg);
		this.setState({msg: ''});
	},
	render: function () {
		console.log('test');
		if(!this.props.userProfile) return <div></div>;
		console.log('ing');
		return <div>
			<form onSubmit={this.handleSubmit}>
				<textarea onChange={this.onChange} value={this.state.msg} />
				<button>{'Send'}</button>
			</form>
		</div>;
	}
});

module.exports = ChatMessage;
