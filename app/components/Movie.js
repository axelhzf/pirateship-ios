var React = require("react-native");
var styles = require("../styles/styles");

var {View, Text} = React;

var Movie = React.createClass({

  render() {
    var movie = this.props.movie;
    return (
      <View style={styles.content}>
        <Text>{movie.title}</Text>
      </View>
    )
  }

});

module.exports = Movie;
