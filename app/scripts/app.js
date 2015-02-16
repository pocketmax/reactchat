/** @jsx React.DOM */
var mockMsgs = [{
    from: 'tom jones',
    body: 'its not unusual'
},{
    from: 'michael jackson',
    body: 'beat it'
}];

var React = window.React = require('react'),
    ChatWindow = require('./ui/ChatWindow'),
    ChatMessage = require('./ui/ChatMessage');


var ReactChat = React.createClass({
    getInitialState: function () {
        return {
            items: mockMsgs
        };
    },
    addMessage: function(msg){
        var nextItems = this.state.items;
        nextItems.push(msg);
        this.setState({items: nextItems});

    },
    render: function () {
        return (
            <div>
                <ChatWindow items={this.state.items}/>
                <ChatMessage addAction={this.addMessage} />
            </div>
        );
    }
});


React.render(<ReactChat />, document.getElementById("app"));
