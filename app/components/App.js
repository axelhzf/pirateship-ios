'use strict';

var React = require('react-native');
var Tabs = require("./Tabs");

var {AppRegistry} = React;

var App = React.createClass({
  render: function () {
    return (
      <Tabs/>
    )
  }
});

AppRegistry.registerComponent('App', () => App);
