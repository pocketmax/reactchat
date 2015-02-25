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
		if(!this.props.userProfile) return <div></div>;
		// TODO: need to add form validation i.e. can't send blank messages
		return <div>
			<form onSubmit={this.handleSubmit}>
				<div class="form-group">
					<textarea class="form-control" rows="10" placeholder="New Message" onChange={this.onChange} value={this.state.msg}></textarea>
				</div>
				<button className="btn btn-primary btn-lg pull-right btn-block">{'Send'}</button>
			</form>
		</div>;
	}
});

module.exports = ChatMessage;
