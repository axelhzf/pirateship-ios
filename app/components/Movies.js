var React = require('react-native');
var { View, Text } = React;
var styles = require("../styles/styles");

var Movies = React.createClass({
  statics : {
    title: "Movies",
    tabIcon: "ios7-film"
  },
  render() {
    return (
      <View style={styles.content}>
        <Text>Movies</Text>
      </View>
    )
  }
});

module.exports = Movies;