var React = require("react-native");
var {StyleSheet, ActivityIndicatorIOS, View, Text} = React;

var Loading = React.createClass({

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS size="large"/>
      </View>
    )
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = Loading;

