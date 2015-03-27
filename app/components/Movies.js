var React = require('react-native');
var { View, Text } = React;
var styles = require("../styles/styles");

var Movies = React.createClass({
  render() {
    return (
      <View style={styles.content}>
        <Text>Movies</Text>
      </View>
    )
  }
});

module.exports = Movies;