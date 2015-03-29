var React = require('react-native');
var Loading = require("./Loading");

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
  } = React;

var globalStyles = require("../styles/styles");
var Movie = require("./Movie");

var apiClient = require("../ApiClient");

var Movies = React.createClass({

  statics: {
    title: "Movies",
    tabIcon: "ios7-film"
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
      loaded: false
    }
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    apiClient.get("movies")
      .then((response) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response),
          loaded: true
        });
      })
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
          style={styles.listView}
          />
        <Loading visible={!this.state.loaded}/>
      </View>
    );
  },

  renderMovie(movie) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.selectRow(movie)}>
          <View style={styles.row}>
            <Image
              source={{uri: movie.images.poster.thumb}}
              style={styles.thumbnail}
              />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.year}>{movie.year}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  selectRow(movie) {
    this.props.navigator.push({
      title: movie.title,
      component: Movie,
      passProps: {movie}
    });
  }

});

var styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 10
  },
  year: {
    marginLeft: 10
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

module.exports = Movies;