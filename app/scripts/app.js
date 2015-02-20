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
	mixins: [ReactFireMixin],
    getInitialState: function () {
        return {
            items: []
        };
    },
	componentWillMount: function(){
		this.bindAsObject(new Firebase("https://burning-fire-3434.firebaseio.com/tagchat/chatrooms/2c5daa2710777330020edb18b0f1a5c4/messages"), "items");
	},
    addMessage: function(msg){
		this.firebaseRefs.items.child(new Date().getTime().toString()).set(msg);
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
