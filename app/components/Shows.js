var React = require('react-native');
var { View, Text } = React;
var styles = require("../styles/styles");

var Shows = React.createClass({
  statics : {
    title: "TV Shows",
    tabIcon: "ios7-monitor"
  },
  render() {
    return (
      <View style={styles.content}>
        <Text>shows</Text>
      </View>
    )
  }
});

module.exports = Shows;