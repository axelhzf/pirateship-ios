var React = require('react-native');
var { View, Text } = React;
var styles = require("../styles/styles");

var Shows = React.createClass({
  render() {
    return (
      <View style={styles.content}>
        <Text>shows</Text>
      </View>
    )
  }
});

module.exports = Shows;