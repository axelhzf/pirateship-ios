var React = require('react-native');
var { View, Text } = React;
var styles = require("../styles/styles");

var Downloads = React.createClass({
  render() {
    return (
      <View style={styles.content}>
        <Text>Downloads</Text>
      </View>
    )
  }
});

module.exports = Downloads;