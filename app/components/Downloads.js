var React = require('react-native');
var { View, Text } = React;
var styles = require("../styles/styles");

var Downloads = React.createClass({
  statics : {
    title: "Downloads",
    tabIcon: "ios7-cloud-download"
  },
  render() {
    return (
      <View style={styles.content}>
        <Text>Downloads</Text>
      </View>
    )
  }
});

module.exports = Downloads;