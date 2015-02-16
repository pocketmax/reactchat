/** @jsx React.DOM */
var React = require('react');

var ChatMessage = React.createClass({
    getInitialState: function () {
        return {
            msg: null,
            items: [],
            itemsASDF: this.props.items
        };
    },
    onChange: function(e) {
        this.setState({msg: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();

        var msg = {
            from: 'foo bar',
            body: this.state.msg
        };
        this.props.addAction(msg);
    },
    render: function () {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <textarea onChange={this.onChange} value={this.state.msg} />
                <button>{'Send'}</button>
            </form>
        </div>;
    }
});

module.exports = ChatMessage;
