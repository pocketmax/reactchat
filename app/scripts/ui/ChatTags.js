/** @jsx React.DOM */
var React = require('react'),
    TagsInput = require('react-tagsinput');

var presidents = [
    "George Washington",
    "John Adams",
    "Thomas Jefferson",
    "James Madison",
    "James Monroe",
    "John Quincy Adams",
    "Andrew Jackson",
    "Martin van Buren",
    "William H. Harrison",
    "John Tyler",
    "James K. Polk",
    "Zachary Taylor",
    "Millard Fillmore",
    "Franklin Pierce",
    "James Buchanan",
    "Abraham Lincoln",
    "Andrew Johnson",
    "Ulysses S. Grant",
    "Rutherford Hayes",
    "James Garfield",
    "Chester Arthur",
    "Benjamin Harrison",
    "Grover Cleveland",
    "William McKinley",
    "Theodore Roosevelt",
    "William Taft",
    "Woodrow Wilson",
    "Warren Harding",
    "Calvin Coolidge",
    "Herbert C. Hoover",
    "Franklin Delano Roosevelt",
    "Harry S Truman",
    "Dwight David Eisenhower",
    "John Fitzgerald Kennedy",
    "Lyndon Baines Johnson",
    "Richard Milhous Nixon",
    "Gerald R. Ford",
    "James Earl Carter",
    "Ronald Wilson Reagan",
    "George H. W. Bush",
    "Bill Jefferson Clinton",
    "George W. Bush",
    "Barack Obama"
];
var TagsComponent = React.createClass({
    displayName: "TagsComponent",
    getInitialState: function () {
        return {
            completions: []
        };
    },
    complete: function (value) {
        if (value === "") {
            return this.setState({
                completions: []
            });
        }
        this.setState({
            completions: presidents.filter(function (comp) {
                return comp.substr(0, value.length) == value && this.refs.tags.getTags().indexOf(comp) == -1;
            }.bind(this))
        });
    },
    beforeAdd: function (tag) {
        if (presidents.indexOf(tag) !== -1) {
            return true;
        }
        if (this.state.completions.length === 1) {
            return this.state.completions[0];
        }
        return false;
    },
    add: function () {
        this.setState({
            completions: []
        });
    },
    render: function () {
        var completionNodes = this.state.completions.map(function (comp) {
            var add = function (e) {
                this.refs.tags.addTag(comp);
            }.bind(this);
            return React.createElement("span", {},React.createElement("a", { className: "president", onClick: add }, comp)," ");
        }.bind(this));
        var tagsInputProps = {
            ref: "tags",
            tags: [],
            onChangeInput: this.complete,
            onTagAdd: this.add,
            onBeforeTagAdd: this.beforeAdd,
            addOnBlur: false,
            placeholder: "President"
        };
        return (
            React.createElement("div", null,
                React.createElement(TagsInput, tagsInputProps),
                React.createElement("div", { style: { marginTop: "10px" } }, completionNodes)
            )
        );
    }
});

module.exports = TagsComponent;
