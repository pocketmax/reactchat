/** @jsx React.DOM */
var React = require('react');

var ChatWindow = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
    },
    render: function () {
        var createItem = function (msg) {
            return <div><b>{msg.from}</b>
                <br/>{msg.body}</div>;
        };
        console.log(this.props.items);
        return <div>{this.props.items.map(createItem)}</div>;
    }
});


module.exports = ChatWindow;
