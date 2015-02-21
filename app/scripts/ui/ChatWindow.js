/** @jsx React.DOM */
var React = require('react');

var ChatWindow = React.createClass({
	render: function () {
		var items = this.props.items;
		var createItem = function (val) {
			return <div>
				<b>{items[val]['from']}</b>
				<br/>{items[val]['msg']}
			</div>;
		};
		var keys = Object.keys(this.props.items);
		return <div>{keys.map(createItem)}</div>;
	}
});

module.exports = ChatWindow;
