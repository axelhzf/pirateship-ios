var React = require("react-native");

var {View, Text, ScrollView, Image} = React;

var Movie = React.createClass({

  render() {
    var movie = this.props.movie;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: movie.images.fanart.medium}}></Image>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>Year: {movie.year}, Rating: {movie.rating.toFixed(1)}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </ScrollView>
    )
  }

});

var styles = {
  container: {
    flexGrow: 1
  },
  image: {
    height: 150,
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  subtitle: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  overview: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
};

module.exports = Movie;
