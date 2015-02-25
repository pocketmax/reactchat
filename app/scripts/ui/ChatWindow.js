/** @jsx React.DOM */
var React = require('react');

var ChatWindow = React.createClass({
	render: function () {
		var items = this.props.items;
		var createItem = function (val) {

			var listStyle = {
				height: 310
			};
			var listGroupStyle = {
				'text-align': 'right'
			};

			return <div className="form-group">
				<div scroll-glue className="list-group" style={listStyle}>
					<div className="list-group-item list-group-item-success" style={listGroupStyle}>
						<div class="row">
							<b>{items[val]['from']}</b><br />
                            {items[val]['msg']}
						</div>
					</div>
				</div>
			</div>;
		};
		var keys = Object.keys(this.props.items);
		return <div>{keys.map(createItem)}</div>;
	}
});

module.exports = ChatWindow;
